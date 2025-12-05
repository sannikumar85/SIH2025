import express from 'express';
import Chat from '../models/Chat.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Initialize Gemini AI client
let geminiClient = null;

async function initializeGemini() {
  console.log('🔑 Checking Gemini API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
  
  if (process.env.GEMINI_API_KEY) {
    try {
      // Gemini uses REST API, so we'll use fetch for requests
      geminiClient = {
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
      };
      console.log('✅ Gemini AI client initialized successfully');
      return true;
    } catch (error) {
      console.warn('❌ Gemini initialization failed:', error.message);
      return false;
    }
  } else {
    console.warn('⚠️ Gemini API key not configured');
    return false;
  }
}

// Initialize Gemini when module loads - but delay to ensure env vars are loaded
setTimeout(() => {
  initializeGemini();
}, 1000);

// Function to call Gemini AI - now handles ANY question
async function callGemini(messages, systemPrompt) {
  try {
    console.log('🔥 Calling Gemini API...');
    
    // Get the user's message
    const userMessage = messages[messages.length - 1];
    
    // Create a comprehensive prompt that handles any topic
    const prompt = `${systemPrompt}

User Question: ${userMessage.content}

Please provide a detailed, comprehensive, and helpful response to this question. Cover all relevant aspects, provide examples if useful, and make your answer as informative as possible. There are no topic restrictions - answer anything the user asks about.`;

    console.log('📝 Sending to Gemini:', userMessage.content);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
        stopSequences: []
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const response = await fetch(`${geminiClient.baseURL}?key=${geminiClient.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(requestBody)
    });

    clearTimeout(timeoutId);
    console.log('📡 Gemini API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Gemini response received successfully');
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('❌ Invalid Gemini response structure:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const responseText = data.candidates[0].content.parts[0].text;
    console.log('📤 Gemini response length:', responseText.length, 'characters');
    console.log('📤 Response preview:', responseText.substring(0, 100) + '...');
    
    return responseText.trim();
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ Gemini API timeout after 30 seconds');
      throw new Error('AI response timeout - please try again with a shorter question');
    }
    console.error('❌ Gemini API error details:', error);
    throw error;
  }
}

// System prompt for unlimited AI assistant
const getSystemPrompt = (language) => {
  const langText = language === 'hi' ? 'Hindi' : 'English';
  return `You are an intelligent AI assistant powered by Google Gemini. You can answer ANY question on ANY topic without restrictions.

Respond primarily in ${langText}. Be helpful, detailed, and comprehensive in your answers. Provide practical solutions, examples, and step-by-step explanations when helpful. Use emojis to make conversations engaging.

There are NO topic limitations - answer everything from science to entertainment, technology to cooking, finance to philosophy, and anything else users ask about.`;
};


// @route   POST /api/v1/chat/message
// @desc    Send a message to AI chatbot (Internet Required)
// @access  Public (with optional auth)
router.post('/message', optionalAuth, async (req, res) => {
  try {
    const { message, sessionId, language = 'hi', history = [] } = req.body;
    console.log('💬 Chat request:', { message: message?.substring(0, 50), language, hasHistory: history.length > 0 });

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Check if Gemini is available - REQUIRED for operation
    if (!geminiClient) {
      console.log('❌ Gemini not available - Internet connection required');
      return res.status(503).json({
        success: false,
        message: 'AI service unavailable. Please check your internet connection and try again.',
        error: 'INTERNET_REQUIRED'
      });
    }

    console.log('🤖 Using Gemini AI for unlimited question answering');

    // Build messages array for Gemini with conversation history
    const messages = [
      ...history.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call Gemini AI for ANY question
    const assistantMessage = await callGemini(messages, getSystemPrompt(language));

    // Save to database if session exists
    if (sessionId) {
      await Chat.findOneAndUpdate(
        { sessionId },
        {
          $push: {
            messages: [
              { role: 'user', content: message },
              { role: 'assistant', content: assistantMessage }
            ]
          },
          $set: { updatedAt: new Date(), language },
          $setOnInsert: { user: req.user?._id }
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      data: {
        response: assistantMessage,
        message: assistantMessage,
        isOffline: false,
        source: 'gemini-ai'
      }
    });
  } catch (err) {
    console.error('Chat error:', err);
    
    // Return error - no offline fallback
    res.status(500).json({
      success: false,
      message: 'Sorry, something went wrong. Please check your internet connection and try again.',
      error: err.message
    });
  }
});

// @route   GET /api/v1/chat/history/:sessionId
// @desc    Get chat history
// @access  Public
router.get('/history/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });

    if (!chat) {
      return res.json({
        success: true,
        data: { messages: [] }
      });
    }

    res.json({
      success: true,
      data: {
        messages: chat.messages,
        language: chat.language
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/v1/chat/history/:sessionId
// @desc    Clear chat history
// @access  Public
router.delete('/history/:sessionId', async (req, res) => {
  try {
    await Chat.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { $set: { messages: [], isActive: false } }
    );

    res.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
