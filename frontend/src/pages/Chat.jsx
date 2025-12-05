import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaPaperPlane, FaMicrophone, FaVolumeUp, FaRobot, FaUser } from 'react-icons/fa'
import { chatAPI } from '../services/api'

const Chat = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)
  const { isOnline } = useSelector((state) => state.app)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'bot',
      content: currentLanguage === 'hi' 
        ? 'नमस्ते! मैं आपका वित्तीय मित्र हूं 🤝 मैं आपकी सभी financial queries में help कर सकता हूं - banking, loans, investments, government schemes, tax planning, और भी बहुत कुछ! आप हिंदी या English में कुछ भी पूछ सकते हैं। क्या सवाल है? 😊💡'
        : 'Hello! I am your Vittiya Mitra (Financial Friend) 🤝 I can help you with all kinds of financial questions - banking, loans, investments, government schemes, tax planning, and much more! You can ask me anything in Hindi or English. What would you like to know? 😊💡',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [currentLanguage])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Call the chat API with conversation history for better context
      console.log('Sending message to API:', {
        message: inputMessage.trim(),
        language: currentLanguage,
        userId: 'guest'
      })

      const response = await chatAPI.sendMessage({
        message: inputMessage.trim(),
        language: currentLanguage,
        userId: 'guest', // In a real app, this would be the actual user ID
        history: messages.slice(-10).map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      })

      console.log('API Response:', response)

      // Check if response has the expected structure
      if (response && response.data && response.data.response) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: response.data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('Invalid response structure from API')
      }
    } catch (error) {
      console.error('Chat error details:', error)
      console.error('Error response:', error.response?.data)
      
      let errorText = currentLanguage === 'hi'
        ? 'माफ करें, कुछ गलत हो गया। कृपया फिर से कोशिश करें।'
        : 'Sorry, something went wrong. Please try again.'
      
      // Show more specific error if available
      if (error.response?.data?.message) {
        errorText = error.response.data.message
      } else if (error.message) {
        errorText = error.message
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: errorText,
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert(currentLanguage === 'hi' ? 'वॉयस फीचर समर्थित नहीं है' : 'Voice feature not supported')
    }
  }

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-lg border-b p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FaRobot className="text-white text-lg" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {currentLanguage === 'hi' ? 'वित्तीय मित्र' : 'Financial Friend'}
            </h2>
            <p className="text-sm text-gray-500">
              {isOnline 
                ? (currentLanguage === 'hi' ? 'ऑनलाइन • AI सहायक' : 'Online • AI Assistant')
                : (currentLanguage === 'hi' ? 'ऑफलाइन मोड' : 'Offline Mode')
              }
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : message.isError 
                    ? 'bg-red-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.type === 'user' ? <FaUser /> : <FaRobot />}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.isError
                    ? 'bg-red-100 text-red-800'
                    : 'bg-white text-gray-800 border'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type === 'bot' && !message.isError && (
                      <button
                        onClick={() => speakMessage(message.content)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title={currentLanguage === 'hi' ? 'सुनें' : 'Listen'}
                      >
                        <FaVolumeUp className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <FaRobot />
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-lg border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isListening || isLoading}
            className={`p-3 rounded-full transition-colors ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={currentLanguage === 'hi' ? 'वॉयस इनपुट' : 'Voice Input'}
          >
            <FaMicrophone className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={currentLanguage === 'hi' 
              ? 'अपना सवाल टाइप करें...' 
              : 'Type your question...'
            }
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            title={currentLanguage === 'hi' ? 'भेजें' : 'Send'}
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </form>

        {/* Quick suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {(currentLanguage === 'hi' ? [
            'बैंक खाता कैसे खोलें?',
            'EMI कैलकुलेशन कैसे करें?',
            'Mutual funds में कैसे invest करें?',
            'Tax saving के तरीके बताइए',
            'SIP क्या होता है?',
            'FD vs mutual funds',
            'Credit score कैसे बढ़ाएं?',
            'Home loan के लिए documents'
          ] : [
            'How to open bank account?',
            'Calculate EMI for loans',
            'How to invest in mutual funds?',
            'Tax saving strategies',
            'What is SIP investment?',
            'Compare FD vs mutual funds',
            'How to improve credit score?',
            'Documents for home loan'
          ]).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(suggestion)}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chat