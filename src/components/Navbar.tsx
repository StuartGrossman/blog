import React, { useState } from 'react';
import AddModal from './AddModal';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePostSuccess = () => {
    // You can add any success handling here, like showing a toast notification
    console.log('Blog post created successfully');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Blog</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleAddClick}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Add new post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handlePostSuccess}
      />
    </nav>
  );
};

export default Navbar; 