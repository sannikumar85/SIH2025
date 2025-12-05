import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import authReducer from './slices/authSlice'
import appReducer from './slices/appSlice'
import voiceReducer from './slices/voiceSlice'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    app: appReducer,
    voice: voiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.NODE_ENV !== 'production',
})