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
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent'
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

// Function to call Gemini AI
async function callGemini(messages, systemPrompt) {
  try {
    // Build conversation text for Gemini
    let conversationText = systemPrompt + '\n\n';
    
    // Add conversation history
    messages.forEach(msg => {
      if (msg.role === 'user') {
        conversationText += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        conversationText += `Assistant: ${msg.content}\n`;
      }
    });
    
    const response = await fetch(`${geminiClient.baseURL}?key=${geminiClient.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationText
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1500,
          candidateCount: 1
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
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    throw error;
  }
}

// System prompt for the financial literacy assistant
const getSystemPrompt = (language) => {
  const langText = language === 'hi' ? 'Hindi' : 'English';
  return `You are "Vittiya Mitra" (वित्तीय मित्र), an advanced AI financial literacy assistant and expert advisor. You have comprehensive knowledge about finance, banking, investments, loans, insurance, and government schemes, specifically tailored for India and rural communities.

Core Capabilities:
- Expert-level knowledge in all financial domains (banking, investments, loans, insurance, taxation, budgeting)
- Deep understanding of Indian financial system, RBI regulations, and government policies
- Specialized expertise in rural finance, microfinance, and agricultural economics
- Real-time awareness of current interest rates, schemes, and market conditions
- Ability to explain complex financial concepts in simple terms
- Mathematical calculations for EMI, compound interest, returns, etc.
- Legal and regulatory guidance for financial decisions

Communication Style:
- Respond primarily in ${langText}, but can handle Hinglish and code-switching
- Be conversational, friendly, and approachable like a knowledgeable friend
- Provide detailed, comprehensive answers similar to ChatGPT
- Use analogies and real-world examples from Indian context
- Include step-by-step explanations for processes
- Add relevant emojis to make conversations engaging
- Ask follow-up questions to better understand user needs

Knowledge Areas:
1. Banking: Account types, KYC, digital banking, UPI, NEFT/RTGS, credit/debit cards
2. Loans: Personal, home, vehicle, business, education loans, EMI calculations
3. Investments: FD, RD, mutual funds, stocks, bonds, insurance, gold, real estate
4. Government Schemes: PM-KISAN, Jan Dhan, MGNREGA, Mudra, Start-up India, etc.
5. Insurance: Life, health, crop, vehicle insurance policies
6. Taxation: Income tax, GST, tax saving investments
7. Financial Planning: Budgeting, emergency funds, retirement planning, goal setting
8. Digital Finance: Mobile banking, payment apps, online investments, digital security

Behavioral Guidelines:
- Always provide accurate, up-to-date information
- If unsure about specific rates or policies, mention checking with official sources
- Warn against financial frauds and scams proactively
- Encourage formal banking over informal lending
- Promote financial literacy and responsible money management
- Be patient with users who may be new to financial concepts
- Provide both basic and advanced explanations as needed
- Include practical action steps users can take

Special Features:
- Can perform complex financial calculations
- Provide comparisons between different financial products
- Create simple financial plans based on user goals
- Explain market trends and economic concepts
- Offer personalized advice while recommending professional consultation for major decisions

Remember: You are not just a Q&A bot, but a comprehensive financial advisor and educator. Engage in meaningful conversations, ask clarifying questions, and provide thorough, helpful responses that empower users to make informed financial decisions.`;
};

// Pre-defined FAQ responses for offline mode
const offlineFAQs = {
  en: [
    {
      keywords: ['open', 'bank', 'account'],
      response: "To open a bank account, you need: 1) Identity proof (Aadhaar, Voter ID, PAN), 2) Address proof, 3) 2 passport photos. Visit your nearest bank branch with these documents. Under Jan Dhan Yojana, you can open a zero-balance account! 🏦"
    },
    {
      keywords: ['fixed', 'deposit', 'fd'],
      response: "Fixed Deposit (FD) is a savings scheme where you deposit money for a fixed period and earn higher interest than savings accounts. Minimum deposit is usually ₹1,000. Interest rates vary from 5-7% depending on tenure and bank. 💰"
    },
    {
      keywords: ['emi', 'calculate', 'loan'],
      response: "EMI (Equated Monthly Installment) = P × r × (1+r)^n / [(1+r)^n - 1], where P=Principal, r=monthly interest rate, n=tenure in months. Use our loan calculator for easy calculation! 📊"
    },
    {
      keywords: ['kyc', 'know', 'customer'],
      response: "KYC (Know Your Customer) is a verification process. You need: Aadhaar card, PAN card, and address proof. It's mandatory for opening accounts and getting loans. E-KYC can be done using Aadhaar OTP! 📝"
    },
    {
      keywords: ['credit', 'score', 'cibil'],
      response: "Credit Score (300-900) shows your loan repayment history. 750+ is good. To improve: pay bills on time, don't take too many loans, and keep credit card usage below 30%. Check free at CIBIL website. 📈"
    },
    {
      keywords: ['upi', 'payment', 'digital'],
      response: "UPI (Unified Payments Interface) lets you transfer money instantly using mobile. Steps: 1) Download BHIM/PhonePe/GPay, 2) Link bank account, 3) Create UPI PIN, 4) Send/receive money using UPI ID or QR code. It's free and secure! 📱"
    },
    {
      keywords: ['mudra', 'loan', 'business'],
      response: "Mudra Loan is for small businesses. 3 categories: Shishu (up to ₹50,000), Kishore (₹50,000-5 lakh), Tarun (₹5-10 lakh). No collateral needed! Apply at any bank with business plan and identity documents. 🏪"
    },
    {
      keywords: ['jan', 'dhan', 'yojana'],
      response: "Pradhan Mantri Jan Dhan Yojana offers: Zero balance account, RuPay debit card, ₹2 lakh accident insurance, ₹30,000 life cover, overdraft facility up to ₹10,000. Visit nearest bank with Aadhaar to open! 🎯"
    },
    {
      keywords: ['kisan', 'credit', 'card'],
      response: "Kisan Credit Card provides farmers loans up to ₹3 lakh at 4% interest (with subsidy). Use for crops, equipment, and personal needs. Apply at your bank with land documents, Aadhaar, and photos. 🌾"
    },
    {
      keywords: ['interest', 'rate'],
      response: "Interest rate is the cost of borrowing money. Bank loans: 7-15% yearly. Money lenders can charge 36-60%! Always take loans from banks, not informal sources. Compare rates before borrowing. 💡"
    }
  ],
  hi: [
    {
      keywords: ['खाता', 'खोलना', 'बैंक', 'account', 'open'],
      response: "बैंक खाता खोलने के लिए चाहिए: 1) पहचान पत्र (आधार, वोटर ID, पैन), 2) पते का प्रमाण, 3) 2 पासपोर्ट फोटो। जन धन योजना में जीरो बैलेंस खाता खुल सकता है! 🏦"
    },
    {
      keywords: ['फिक्स्ड', 'डिपॉजिट', 'एफडी', 'fd'],
      response: "फिक्स्ड डिपॉजिट (FD) में पैसा एक निश्चित समय के लिए जमा करते हैं और बचत खाते से ज्यादा ब्याज मिलता है। न्यूनतम ₹1,000 से शुरू। ब्याज दर 5-7% तक। 💰"
    },
    {
      keywords: ['emi', 'ईएमआई', 'किस्त'],
      response: "EMI (मासिक किस्त) = मूलधन × ब्याज दर × (1+ब्याज)^महीने / [(1+ब्याज)^महीने - 1]। आसान गणना के लिए हमारा लोन कैलकुलेटर इस्तेमाल करें! 📊"
    },
    {
      keywords: ['kyc', 'केवाईसी'],
      response: "KYC (अपने ग्राहक को जानो) एक सत्यापन प्रक्रिया है। जरूरी: आधार कार्ड, पैन कार्ड, पते का प्रमाण। खाता खोलने और लोन के लिए जरूरी। आधार OTP से E-KYC भी हो सकता है! 📝"
    },
    {
      keywords: ['क्रेडिट', 'स्कोर', 'सिबिल'],
      response: "क्रेडिट स्कोर (300-900) आपके लोन चुकाने का रिकॉर्ड दिखाता है। 750+ अच्छा है। सुधार के लिए: समय पर बिल भरें, ज्यादा लोन न लें। CIBIL वेबसाइट पर मुफ्त चेक करें। 📈"
    },
    {
      keywords: ['upi', 'यूपीआई', 'डिजिटल'],
      response: "UPI से मोबाइल से तुरंत पैसे भेज सकते हैं। Steps: 1) BHIM/PhonePe/GPay डाउनलोड करें, 2) बैंक खाता जोड़ें, 3) UPI PIN बनाएं, 4) UPI ID या QR से पैसे भेजें। मुफ्त और सुरक्षित! 📱"
    },
    {
      keywords: ['मुद्रा', 'लोन', 'mudra'],
      response: "मुद्रा लोन छोटे व्यापार के लिए। 3 श्रेणी: शिशु (₹50,000 तक), किशोर (₹50,000-5 लाख), तरुण (₹5-10 लाख)। कोई गारंटी नहीं चाहिए! बैंक में बिजनेस प्लान के साथ आवेदन करें। 🏪"
    },
    {
      keywords: ['जन', 'धन', 'jan dhan'],
      response: "प्रधानमंत्री जन धन योजना: जीरो बैलेंस खाता, RuPay डेबिट कार्ड, ₹2 लाख दुर्घटना बीमा, ₹30,000 जीवन बीमा, ₹10,000 तक ओवरड्राफ्ट। आधार लेकर बैंक जाएं! 🎯"
    },
    {
      keywords: ['किसान', 'क्रेडिट', 'कार्ड', 'kcc'],
      response: "किसान क्रेडिट कार्ड से ₹3 लाख तक लोन 4% ब्याज पर (सब्सिडी के साथ)। फसल, उपकरण और जरूरतों के लिए। बैंक में जमीन के कागजात, आधार और फोटो के साथ आवेदन करें। 🌾"
    },
    {
      keywords: ['ब्याज', 'दर', 'interest'],
      response: "ब्याज दर = उधार लेने की कीमत। बैंक लोन: सालाना 7-15%। साहूकार 36-60% तक लेते हैं! हमेशा बैंक से लोन लें, साहूकार से नहीं। उधार लेने से पहले दरों की तुलना करें। 💡"
    }
  ]
};

// @route   POST /api/v1/chat/message
// @desc    Send a message to AI chatbot
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

    // Check if Gemini is available
    if (!geminiClient) {
      console.log('⚠️ Gemini not available, using fallback response');
      // Return offline/fallback response
      const fallbackResponse = getOfflineResponse(message, language);
      return res.json({
        success: true,
        data: {
          response: fallbackResponse,
          message: fallbackResponse,
          isOffline: true
        }
      });
    }

    console.log('🤖 Using Gemini AI for response generation');

    // Build messages array for Gemini with conversation history
    const messages = [
      ...history.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call Gemini AI
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
        isOffline: false
      }
    });
  } catch (err) {
    console.error('Chat error:', err);
    
    // Return offline response on error
    const fallbackResponse = getOfflineResponse(req.body.message, req.body.language || 'hi');
    res.json({
      success: true,
      data: {
        response: fallbackResponse,
        message: fallbackResponse,
        isOffline: true
      }
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

// @route   GET /api/v1/chat/faqs
// @desc    Get offline FAQs
// @access  Public
router.get('/faqs', (req, res) => {
  const { language = 'hi' } = req.query;
  res.json({
    success: true,
    data: offlineFAQs[language] || offlineFAQs.hi
  });
});

// Helper function for offline responses
function getOfflineResponse(message, language) {
  const faqs = offlineFAQs[language] || offlineFAQs.hi;
  const lowerMessage = message.toLowerCase();
  
  // Find matching FAQ
  for (const faq of faqs) {
    if (faq.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
      return faq.response;
    }
  }
  
  // Default response
  if (language === 'hi') {
    return "मुझे खेद है, मैं अभी ऑफलाइन मोड में हूं। कृपया बाद में पुनः प्रयास करें या हमारे बैंकिंग बेसिक्स सेक्शन देखें। 🙏";
  }
  return "I'm sorry, I'm currently in offline mode. Please try again later or check our Banking Basics section for information. 🙏";
}

export default router;
