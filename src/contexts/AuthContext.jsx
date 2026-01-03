import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await authAPI.getProfile()
          console.log('Profile response:', response.data) // Debug log
          setUser(response.data)
        } catch (error) {
          console.error('Auth error:', error) // Debug log
          localStorage.removeItem('token')
          setUser(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      console.log('Login attempt with:', { email, password }) // Debug log
      const response = await authAPI.login({ email, password })
      console.log('Login response:', response.data) // Debug log
      
      const { token, ...userData } = response.data
      localStorage.setItem('token', token)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error) // Debug log
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please check your credentials.',
      }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await authAPI.register({ username, email, password })
      const { token, ...userData } = response.data
      localStorage.setItem('token', token)
      setUser(userData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/'
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext