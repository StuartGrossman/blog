import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddModal from './AddModal';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                My Thoughts
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="ml-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <AddModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => setIsAddModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar; 