import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1',
  timeout: 60000, // Increased to 60 seconds for AI responses
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log('API Response:', response)
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    console.error('API Error Response:', error.response)
    
    const message = error.response?.data?.message || error.message || 'An error occurred'
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/profile'
      toast.error('Session expired. Please login again.')
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.')
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
      toast.error('Network error. Please check your connection.')
    } else {
      toast.error(message)
    }
    
    return Promise.reject(error)
  }
)

export default api

// API endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/updateprofile', data),
  updatePassword: (data) => api.put('/auth/updatepassword', data),
  bookmark: (schemeId) => api.post(`/auth/bookmark/${schemeId}`),
  markLearned: (termId) => api.post(`/auth/learn/${termId}`),
  saveCalculation: (data) => api.post('/auth/calculation', data)
}

export const bankingAPI = {
  getTerms: (params) => api.get('/banking/terms', { params }),
  getTerm: (slug) => api.get(`/banking/terms/${slug}`),
  getCategories: () => api.get('/banking/categories'),
  getStats: () => api.get('/banking/stats')
}

export const schemesAPI = {
  getSchemes: (params) => api.get('/schemes', { params }),
  getScheme: (id) => api.get(`/schemes/${id}`),
  checkEligibility: (id, data) => api.post(`/schemes/check-eligibility/${id}`, data),
  getCategories: () => api.get('/schemes/categories/list')
}

export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  getHistory: (sessionId) => api.get(`/chat/history/${sessionId}`),
  clearHistory: (sessionId) => api.delete(`/chat/history/${sessionId}`),
  getFAQs: (language) => api.get('/chat/faqs', { params: { language } })
}

export const calculatorAPI = {
  calculateEMI: (data) => api.post('/calculator/emi', data),
  compareLoan: (data) => api.post('/calculator/compare', data),
  checkEligibility: (data) => api.post('/calculator/eligibility', data)
}

export const feedbackAPI = {
  submit: (data) => api.post('/feedback', data),
  getStats: () => api.get('/feedback/stats')
}