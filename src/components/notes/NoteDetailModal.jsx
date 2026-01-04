import React from 'react';
import { Star, StarOff, Tag, Calendar, Edit, Trash2, X } from 'lucide-react';

const NoteDetailModal = ({ note, onClose, onEdit, onDelete, onTogglePin }) => {
  if (!note) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{note.title}</h2>
                  {note.isPinned && (
                    <span className="text-yellow-500" title="Pinned note">
                      <Star className="h-5 w-5 fill-current" />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                    <Tag className="h-3 w-3" />
                    {note.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    Created: {formatDate(note.createdAt)}
                  </span>
                  {note.createdAt !== note.updatedAt && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      Updated: {formatDate(note.updatedAt)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-4 rounded-lg p-2 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 text-base leading-relaxed">
                {note.content}
              </pre>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Last updated: {formatDate(note.updatedAt)}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onTogglePin(note)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  {note.isPinned ? (
                    <>
                      <StarOff className="h-4 w-4" />
                      Unpin Note
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
                    onEdit(note);
                    onClose();
                  }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this note?')) {
                      onDelete(note._id);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailModal;