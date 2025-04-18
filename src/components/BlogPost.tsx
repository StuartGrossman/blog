import React from 'react';
import { BlogPost as BlogPostType } from '../services/firebaseService';
import { format } from 'date-fns';

interface BlogPostProps {
  post: BlogPostType;
  isAuthenticated: boolean;
  onDelete: (id: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, isAuthenticated, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(post.createdAt.toDate()).toLocaleDateString()}
          </div>
          <div className="prose max-w-none">
            {post.content}
          </div>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => onDelete(post.id || '')}
            className="text-gray-500 hover:text-gray-700 ml-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPost; 