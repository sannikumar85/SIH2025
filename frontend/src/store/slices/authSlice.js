import { createSlice } from '@reduxjs/toolkit'

const getStoredUser = () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      }
    }
  } catch (error) {
    console.warn('Error loading user from localStorage:', error)
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false
  }
}

const initialState = {
  ...getStoredUser(),
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
      state.error = null
      
      try {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      } catch (error) {
        console.warn('Could not save auth data to localStorage:', error)
      }
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.token = null
      state.user = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      state.loading = false
      state.error = null
      
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } catch (error) {
        console.warn('Could not clear localStorage:', error)
      }
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      try {
        localStorage.setItem('user', JSON.stringify(state.user))
      } catch (error) {
        console.warn('Could not update user in localStorage:', error)
      }
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  clearError 
} = authSlice.actions

export default authSlice.reducer