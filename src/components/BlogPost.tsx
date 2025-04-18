import React from 'react';
import { BlogPost as BlogPostType } from '../services/firebaseService';
import { format } from 'date-fns';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="mr-4">By {post.author}</span>
        <span>{format(post.createdAt.toDate(), 'MMMM d, yyyy')}</span>
      </div>
      <div className="prose max-w-none text-gray-700">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};

export default BlogPost; 