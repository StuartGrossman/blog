import React, { useState, useEffect } from 'react';
import { saveBlogPost } from '../services/firebaseService';
import { useAuth } from '../contexts/AuthContext';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { setIsAuthenticated: setGlobalAuth } = useAuth();

  useEffect(() => {
    // Reset state when modal opens/closes
    if (!isOpen) {
      setIsAuthenticated(false);
      setPassword('');
      setContent('');
      setError(null);
    }
  }, [isOpen]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8000/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setGlobalAuth(true);
        setError(null);
        localStorage.setItem('auth_token', password);
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Error verifying password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await saveBlogPost({
        title: '',
        content
      });
      onSuccess();
      onClose();
      setContent('');
    } catch (err) {
      setError('Failed to save post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {!isAuthenticated ? (
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Password</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !password.trim()}
                >
                  {loading ? 'Verifying...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Thoughts</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !content.trim()}
                >
                  {loading ? 'Saving...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddModal; 