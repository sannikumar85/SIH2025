class VoiceService {
  constructor() {
    this.recognition = null
    this.synthesis = null
    this.isListening = false
    this.isReading = false
    this.currentVoices = []
    
    this.initializeRecognition()
    this.initializeSynthesis()
  }

  initializeRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      
      this.recognition.continuous = false
      this.recognition.interimResults = true
      this.recognition.maxAlternatives = 1
    }
  }

  initializeSynthesis() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis
      
      // Load voices
      const loadVoices = () => {
        this.currentVoices = this.synthesis.getVoices()
      }
      
      loadVoices()
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = loadVoices
      }
    }
  }

  // Speech Recognition
  startListening(language = 'hi', onResult, onError, onEnd) {
    if (!this.recognition || this.isListening) return false

    this.recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
    this.isListening = true

    let finalTranscript = ''
    let interimTranscript = ''

    this.recognition.onresult = (event) => {
      finalTranscript = ''
      interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      if (onResult) {
        onResult({
          final: finalTranscript,
          interim: interimTranscript,
          isFinal: finalTranscript !== ''
        })
      }
    }

    this.recognition.onerror = (event) => {
      this.isListening = false
      if (onError) {
        const errorMessage = this.getErrorMessage(event.error, language)
        onError(errorMessage)
      }
    }

    this.recognition.onend = () => {
      this.isListening = false
      if (onEnd) onEnd()
    }

    try {
      this.recognition.start()
      return true
    } catch (error) {
      this.isListening = false
      if (onError) onError(this.getErrorMessage(error.message, language))
      return false
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  // Text to Speech
  speak(text, options = {}) {
    if (!this.synthesis || this.isReading) return false

    // Stop any current speech
    this.synthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set voice
    const language = options.language || 'hi'
    const voice = this.getVoiceForLanguage(language)
    if (voice) utterance.voice = voice

    // Set options
    utterance.rate = options.rate || 1
    utterance.pitch = options.pitch || 1
    utterance.volume = options.volume || 1
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US'

    this.isReading = true

    utterance.onstart = () => {
      this.isReading = true
      if (options.onStart) options.onStart()
    }

    utterance.onend = () => {
      this.isReading = false
      if (options.onEnd) options.onEnd()
    }

    utterance.onerror = (event) => {
      this.isReading = false
      if (options.onError) options.onError(event.error)
    }

    try {
      this.synthesis.speak(utterance)
      return true
    } catch (error) {
      this.isReading = false
      if (options.onError) options.onError(error.message)
      return false
    }
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel()
      this.isReading = false
    }
  }

  getVoiceForLanguage(language) {
    if (!this.currentVoices.length) return null

    // Try to find voice for the specific language
    const langCode = language === 'hi' ? 'hi' : 'en'
    let voice = this.currentVoices.find(v => v.lang.startsWith(langCode))
    
    // Fallback to any voice
    if (!voice) {
      voice = this.currentVoices.find(v => v.lang.includes(langCode === 'hi' ? 'IN' : 'US'))
    }
    
    return voice || this.currentVoices[0]
  }

  getErrorMessage(error, language = 'hi') {
    const errors = {
      'network': {
        hi: 'नेटवर्क की समस्या। कृपया अपना इंटरनेट कनेक्शन जांचें।',
        en: 'Network error. Please check your internet connection.'
      },
      'not-allowed': {
        hi: 'माइक्रोफोन की अनुमति नहीं दी गई। कृपया सेटिंग्स में अनुमति दें।',
        en: 'Microphone permission denied. Please allow microphone access.'
      },
      'no-speech': {
        hi: 'कोई आवाज़ नहीं सुनाई दी। कृपया फिर से कोशिश करें।',
        en: 'No speech detected. Please try again.'
      },
      'audio-capture': {
        hi: 'माइक्रोफोन तक पहुंच नहीं मिल सकी।',
        en: 'Could not access microphone.'
      },
      'service-not-allowed': {
        hi: 'आवाज़ सेवा उपलब्ध नहीं है।',
        en: 'Voice service not available.'
      },
      'aborted': {
        hi: 'आवाज़ पहचान रद्द कर दी गई।',
        en: 'Voice recognition was aborted.'
      }
    }

    return errors[error]?.[language] || errors['network'][language]
  }

  // Feature detection
  isRecognitionSupported() {
    return !!(this.recognition)
  }

  isSynthesisSupported() {
    return !!(this.synthesis)
  }

  isSupported() {
    return this.isRecognitionSupported() && this.isSynthesisSupported()
  }
}

export default new VoiceService()