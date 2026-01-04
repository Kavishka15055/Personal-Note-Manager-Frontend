import React, { useState, useEffect } from 'react'
import { X, Tag, Pin } from 'lucide-react'
import { notesAPI } from '../../services/api'

const NoteForm = ({ note, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    isPinned: false
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        category: note.category,
        isPinned: note.isPinned
      })
    }
  }, [note])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let response
      
      if (note) {
        response = await notesAPI.update(note._id, formData)
      } else {
        response = await notesAPI.create(formData)
      }

      onSave(response.data)
    } catch (error) {
      console.error('Failed to save note:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'General',
    'Personal',
    'Work',
    'Ideas',
    'Learning',
    'To-Do',
    'Project',
    'Meeting',
    'Reference'
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="rounded-xl bg-white shadow-2xl">
          <div className="border-b border-gray-200 px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {note ? 'Edit Note' : 'New Note'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 py-4">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field text-sm py-2"
                  placeholder="Note title..."
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field text-sm py-2 pl-9"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Options
                  </label>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isPinned"
                        checked={formData.isPinned}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Pin className="h-3.5 w-3.5" />
                        Pin note
                      </span>
                    </label>
                  </div>
                </div> */}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field text-sm py-2 resize-none"
                  placeholder="Write your thoughts here..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-outline px-4 py-2 text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 text-sm"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : note ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NoteForm