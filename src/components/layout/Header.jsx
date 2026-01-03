import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, LogOut, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 sm:h-7 md:h-8 lg:h-10 w-7 sm:w-7 md:w-8 lg:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <Brain className="lg:h-6 md:h-5 sm:h-4 h-4 lg:w-6 md:w-5 sm:w-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Thought<span className="text-gradient">Flow</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.username}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="btn-secondary hidden sm:inline-flex"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header