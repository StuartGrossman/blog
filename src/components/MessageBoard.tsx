import React, { useEffect, useState } from 'react';
import { BlogPost, getBlogPosts, subscribeToBlogPosts } from '../services/firebaseService';
import DeleteModal from './DeleteModal';
import '../styles/animations.css';

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 10); // Reduced from 30ms to 10ms for faster typing

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span className="font-mono whitespace-pre-wrap">{displayedText}</span>;
};

const formatDate = (timestamp: any) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const BlogPostCard: React.FC<{ 
  post: BlogPost; 
  index: number;
  onDelete: (id: string) => void;
}> = ({ post, index, onDelete }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-lg relative transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl animate-fadeInUp"
      style={{
        animationDelay: `${index * 0.2}s`,
        borderLeft: '4px solid #3B82F6',
      }}
    >
      <button
        onClick={() => onDelete(post.id!)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
      </div>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <TypewriterText text={post.content} delay={index * 0.2} />
      </div>
    </div>
  );
};

const MessageBoard: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string>('');

    const loadPosts = async () => {
        try {
            setLoading(true);
            const fetchedPosts = await getBlogPosts();
            setPosts(fetchedPosts);
            setError(null);
        } catch (error) {
            setError('Failed to load posts');
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
        const unsubscribe = subscribeToBlogPosts(
            (updatedPosts) => setPosts(updatedPosts),
            (error) => console.error('Error subscribing to posts:', error)
        );
        return () => unsubscribe();
    }, []);

    const handleDeleteClick = (postId: string) => {
        setSelectedPostId(postId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSuccess = () => {
        loadPosts();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fadeIn">
                Blog Posts
            </h1>
            <div className="space-y-6">
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600 animate-fadeIn">No blog posts yet. Be the first to write one!</p>
                ) : (
                    posts.map((post, index) => (
                        <BlogPostCard 
                            key={post.id} 
                            post={post} 
                            index={index}
                            onDelete={handleDeleteClick}
                        />
                    ))
                )}
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                postId={selectedPostId}
                onDelete={handleDeleteSuccess}
            />
        </div>
    );
};

export default MessageBoard; 