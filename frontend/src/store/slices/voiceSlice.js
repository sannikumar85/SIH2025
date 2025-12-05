import { createSlice } from '@reduxjs/toolkit'

const getVoiceSettings = () => {
  try {
    const settings = localStorage.getItem('voiceSettings')
    return settings ? JSON.parse(settings) : {
      speed: 1,
      pitch: 1,
      autoPlay: true,
      language: 'hi'
    }
  } catch {
    return {
      speed: 1,
      pitch: 1,
      autoPlay: true,
      language: 'hi'
    }
  }
}

const initialState = {
  isListening: false,
  isReading: false,
  isSpeechSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
  isSpeechSynthesisSupported: 'speechSynthesis' in window,
  settings: getVoiceSettings(),
  transcript: '',
  error: null
}

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    startListening: (state) => {
      state.isListening = true
      state.error = null
    },
    stopListening: (state) => {
      state.isListening = false
    },
    setTranscript: (state, action) => {
      state.transcript = action.payload
    },
    clearTranscript: (state) => {
      state.transcript = ''
    },
    startReading: (state) => {
      state.isReading = true
    },
    stopReading: (state) => {
      state.isReading = false
    },
    updateVoiceSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload }
      try {
        localStorage.setItem('voiceSettings', JSON.stringify(state.settings))
      } catch (error) {
        console.warn('Could not save voice settings:', error)
      }
    },
    setVoiceError: (state, action) => {
      state.error = action.payload
      state.isListening = false
      state.isReading = false
    },
    clearVoiceError: (state) => {
      state.error = null
    }
  }
})

export const {
  startListening,
  stopListening,
  setTranscript,
  clearTranscript,
  startReading,
  stopReading,
  updateVoiceSettings,
  setVoiceError,
  clearVoiceError
} = voiceSlice.actions

export default voiceSlice.reducer