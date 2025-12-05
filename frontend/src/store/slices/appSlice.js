import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOnline: navigator.onLine,
  isLoading: false,
  notification: null,
  sidebarOpen: false,
  theme: 'light'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = null
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      try {
        localStorage.setItem('theme', action.payload)
      } catch (error) {
        console.warn('Could not save theme to localStorage:', error)
      }
    }
  }
})

export const {
  setOnlineStatus,
  setLoading,
  setNotification,
  clearNotification,
  toggleSidebar,
  setSidebarOpen,
  setTheme
} = appSlice.actions

export default appSlice.reducer