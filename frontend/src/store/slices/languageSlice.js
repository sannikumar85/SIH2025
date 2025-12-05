import { createSlice } from '@reduxjs/toolkit'

const getStoredLanguage = () => {
  try {
    return localStorage.getItem('language') || 'hi'
  } catch {
    return 'hi'
  }
}

const initialState = {
  current: getStoredLanguage(),
  translations: {}
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload
      try {
        localStorage.setItem('language', action.payload)
      } catch (error) {
        console.warn('Could not save language to localStorage:', error)
      }
    },
    setTranslations: (state, action) => {
      state.translations = { ...state.translations, ...action.payload }
    }
  }
})

export const { setLanguage, setTranslations } = languageSlice.actions
export default languageSlice.reducer