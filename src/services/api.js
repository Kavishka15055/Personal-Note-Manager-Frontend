import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('API URL:', API_URL) // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log('Request token:', token) // Debug log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Request config:', config) // Debug log
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response) // Debug log
    return response
  },
  (error) => {
    console.error('Response error:', error.response) // Debug log
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (data) => {
    console.log('Login request:', data) // Debug log
    return api.post('/auth/login', data)
  },
  register: (data) => {
    console.log('Register request:', data) // Debug log
    return api.post('/auth/register', data)
  },
  getProfile: () => {
    console.log('Get profile request') // Debug log
    return api.get('/auth/profile')
  },
}

export const notesAPI = {
  getAll: () => api.get('/notes'),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
}

export default api