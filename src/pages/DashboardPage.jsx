import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Calendar,
  Tag,
  Star,
  MoreVertical,
  Trash2,
  Edit,
  StarOff,
  Eye
} from 'lucide-react'
import NoteForm from '../components/notes/NoteForm'
import NoteDetailModal from '../components/notes/NoteDetailModal' // You'll need to create this
import { notesAPI } from '../services/api'
import { toast } from 'react-hot-toast'

const DashboardPage = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null) // For viewing note details
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [categories, setCategories] = useState([])
  const [showActionsMenu, setShowActionsMenu] = useState(null) // Track which note's menu is open

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    let filtered = notes

    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory)
    }

    // Sort notes: pinned notes first
    filtered = filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

    setFilteredNotes(filtered)
  }, [notes, searchTerm, selectedCategory])

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getAll()
      const sortedNotes = response.data.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })
      setNotes(sortedNotes)
      extractCategories(sortedNotes)
    } catch (error) {
      toast.error('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  const extractCategories = (notesList) => {
    const uniqueCategories = [...new Set(notesList.map(note => note.category))]
    setCategories(uniqueCategories)
  }

  const handleCreateNote = () => {
    setEditingNote(null)
    setShowNoteForm(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setShowNoteForm(true)
    setShowActionsMenu(null) // Close menu when editing
  }

  const handleViewNote = (note) => {
    setSelectedNote(note)
  }

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await notesAPI.delete(id)
      setNotes(notes.filter(note => note._id !== id))
      setSelectedNote(null) // Close detail modal if open
      toast.success('Note deleted successfully')
    } catch (error) {
      toast.error('Failed to delete note')
    }
    setShowActionsMenu(null) // Close menu after delete
  }

  // Handle pin/unpin
  const handleTogglePin = async (note) => {
    try {
      const updatedNote = { ...note, isPinned: !note.isPinned }
      const response = await notesAPI.update(note._id, updatedNote)
      
      setNotes(notes.map(n => n._id === note._id ? response.data : n))
      
      // If viewing note detail, update it
      if (selectedNote && selectedNote._id === note._id) {
        setSelectedNote(response.data)
      }
      
      toast.success(note.isPinned ? 'Note unpinned' : 'Note pinned')
    } catch (error) {
      toast.error('Failed to update note')
    }
    setShowActionsMenu(null) // Close menu after pin/unpin
  }

  const handleNoteSave = (note) => {
    if (editingNote) {
      setNotes(notes.map(n => n._id === note._id ? note : n))
      toast.success('Note updated successfully')
    } else {
      const noteWithPinned = { ...note, isPinned: note.isPinned || false }
      setNotes([noteWithPinned, ...notes])
      toast.success('Note created successfully')
    }
    extractCategories([...notes, note])
    setShowNoteForm(false)
    setEditingNote(null)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showActionsMenu) {
        setShowActionsMenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showActionsMenu])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading your thoughts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Thoughts</h1>
              <p className="text-gray-600">
                {notes.length} notes • {categories.length} categories
              </p>
            </div>
            <button
              onClick={handleCreateNote}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              New Note
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 card">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field pl-10"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                View
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 rounded-lg border p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'border-primary-500 bg-primary-50 text-primary-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Grid className="mx-auto h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 rounded-lg border p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'border-primary-500 bg-primary-50 text-primary-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <List className="mx-auto h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Total Notes',
              value: notes.length,
              color: 'from-primary-500 to-primary-600',
              icon: <Tag className="h-6 w-6" />
            },
            {
              label: 'Today\'s Notes',
              value: notes.filter(n => {
                const today = new Date().toDateString()
                return new Date(n.createdAt).toDateString() === today
              }).length,
              color: 'from-secondary-500 to-secondary-600',
              icon: <Calendar className="h-6 w-6" />
            },
            {
              label: 'Starred',
              value: notes.filter(n => n.isPinned).length,
              color: 'from-yellow-500 to-orange-500',
              icon: <Star className="h-6 w-6" />
            },
            {
              label: 'Categories',
              value: categories.length,
              color: 'from-accent-500 to-green-500',
              icon: <Filter className="h-6 w-6" />
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notes Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note, index) => (
              <div
                key={note._id}
                onClick={() => handleViewNote(note)}
                className={`group card animate-slide-up cursor-pointer hover:border-primary-300 hover:shadow-md transition-all duration-200 ${
                  note.isPinned ? 'border-2 border-yellow-300 bg-yellow-50' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {note.title}
                      </h3>
                      {note.isPinned && (
                        <span className="text-yellow-500" title="Pinned note">
                          <Star className="h-4 w-4 fill-current" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                        <Tag className="h-3 w-3" />
                        {note.category}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowActionsMenu(showActionsMenu === note._id ? null : note._id)
                      }}
                      className="rounded-lg p-2 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    {/* Actions Menu - Only shows on three dots click */}
                    {showActionsMenu === note._id && (
                      <div className="absolute right-0 top-full z-50 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTogglePin(note)
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {note.isPinned ? (
                            <>
                              <StarOff className="h-4 w-4" />
                              Unpin
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4" />
                              Pin to Top
                            </>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditNote(note)
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNote(note._id)
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mb-4 text-gray-600 line-clamp-3 h-20">
                  {note.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(note.updatedAt)}</span>
                  <span className="text-xs inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {note.content.length > 100 ? 'Long' : 'Short'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotes.map((note, index) => (
              <div
                key={note._id}
                onClick={() => handleViewNote(note)}
                className={`group card animate-slide-up cursor-pointer hover:border-primary-300 hover:shadow-md transition-all duration-200 ${
                  note.isPinned ? 'border-l-4 border-l-yellow-400 bg-yellow-50' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {note.title}
                        </h3>
                        {note.isPinned && (
                          <span className="text-yellow-500" title="Pinned note">
                            <Star className="h-4 w-4 fill-current" />
                          </span>
                        )}
                      </div>
                      <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                        {note.category}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2 ">
                      {note.content}
                    </p>
                    <div className="mt-3 text-sm text-gray-500">
                      {formatDate(note.updatedAt)}
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowActionsMenu(showActionsMenu === note._id ? null : note._id)
                      }}
                      className="rounded-lg p-2 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    {/* Actions Menu - Only shows on three dots click */}
                    {showActionsMenu === note._id && (
                      <div className="absolute right-0 top-full z-50 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTogglePin(note)
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {note.isPinned ? (
                            <>
                              <StarOff className="h-4 w-4" />
                              Unpin
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4" />
                              Pin to Top
                            </>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditNote(note)
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNote(note._id)
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100">
              <Search className="h-10 w-10 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No notes found
            </h3>
            <p className="mb-8 text-gray-600">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first note to get started!'}
            </p>
            <button
              onClick={handleCreateNote}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Your First Note
            </button>
          </div>
        )}
      </div>

      {showNoteForm && (
        <NoteForm
          note={editingNote}
          onSave={handleNoteSave}
          onClose={() => {
            setShowNoteForm(false)
            setEditingNote(null)
          }}
        />
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">
            <div className="max-h-[80vh] overflow-y-auto p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedNote.title}</h2>
                    {selectedNote.isPinned && (
                      <span className="text-yellow-500" title="Pinned note">
                        <Star className="h-5 w-5 fill-current" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                      <Tag className="h-3 w-3" />
                      {selectedNote.category}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      Created: {formatDate(selectedNote.createdAt)}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      Updated: {formatDate(selectedNote.updatedAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="ml-4 rounded-lg p-2 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">{selectedNote.content}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleTogglePin(selectedNote)}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  {selectedNote.isPinned ? (
                    <>
                      <StarOff className="h-4 w-4" />
                      Unpin
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4" />
                      Pin Note
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setEditingNote(selectedNote)
                    setSelectedNote(null)
                    setShowNoteForm(true)
                  }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(selectedNote._id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage