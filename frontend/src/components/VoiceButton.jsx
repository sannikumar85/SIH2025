import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp } from 'react-icons/fa'
import { startListening, stopListening, setTranscript, setVoiceError } from '../store/slices/voiceSlice'
import voiceService from '../services/voiceService'
import { motion } from 'framer-motion'

const VoiceButton = () => {
  const dispatch = useDispatch()
  const { isListening, isReading, isSpeechSupported } = useSelector((state) => state.voice)
  const { current: currentLanguage } = useSelector((state) => state.language)
  const [isPressed, setIsPressed] = useState(false)

  const handleVoiceInput = useCallback(() => {
    if (isListening) {
      voiceService.stopListening()
      dispatch(stopListening())
      return
    }

    dispatch(startListening())
    
    voiceService.startListening(
      currentLanguage,
      (result) => {
        if (result.isFinal) {
          dispatch(setTranscript(result.final))
          dispatch(stopListening())
        }
      },
      (error) => {
        dispatch(setVoiceError(error))
      },
      () => {
        dispatch(stopListening())
      }
    )
  }, [isListening, currentLanguage, dispatch])

  if (!isSpeechSupported) {
    return null
  }

  return (
    <motion.button
      onClick={handleVoiceInput}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-200 z-50 flex items-center justify-center ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 voice-recording'
          : 'bg-primary-600 hover:bg-primary-700'
      } ${isPressed ? 'scale-95' : 'scale-100'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isListening ? 'Stop listening' : 'Start voice input'}
    >
      {isListening ? (
        <FaMicrophoneSlash className="w-6 h-6 text-white animate-voice-pulse" />
      ) : isReading ? (
        <FaVolumeUp className="w-6 h-6 text-white" />
      ) : (
        <FaMicrophone className="w-6 h-6 text-white" />
      )}
      
      {/* Recording indicator */}
      {isListening && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping" />
      )}
    </motion.button>
  )
}

export default VoiceButton