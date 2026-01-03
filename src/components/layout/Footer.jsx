import React from 'react'
import { Brain, Github, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                ThoughtFlow
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Organize your thoughts effortlessly. Capture, manage, and find inspiration in your notes.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-600">Features</a></li>
              <li><a href="#" className="hover:text-primary-600">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-600">API</a></li>
              <li><a href="#" className="hover:text-primary-600">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-600">About</a></li>
              <li><a href="#" className="hover:text-primary-600">Blog</a></li>
              <li><a href="#" className="hover:text-primary-600">Careers</a></li>
              <li><a href="#" className="hover:text-primary-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} ThoughtFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer