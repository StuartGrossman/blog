import { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Save a new blog post
export const saveBlogPost = async (post: Omit<BlogPost, 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await fetch('http://localhost:8000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        password: localStorage.getItem('auth_token')
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to save blog post');
    }

    const data = await response.json();
    return { ...post, id: data.id, createdAt: Timestamp.now(), updatedAt: Timestamp.now() };
  } catch (error) {
    console.error('Error saving blog post:', error);
    throw error;
  }
};

// Get all blog posts
export const getBlogPosts = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const posts = await response.json();
    return posts.map((post: any) => ({
      ...post,
      createdAt: Timestamp.fromDate(new Date(post.timestamp)),
      updatedAt: Timestamp.fromDate(new Date(post.timestamp))
    })) as BlogPost[];
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
};

// Subscribe to blog posts updates
export const subscribeToBlogPosts = (
  onUpdate: (posts: BlogPost[]) => void,
  onError: (error: Error) => void
) => {
  // For now, we'll poll the server every 5 seconds
  const interval = setInterval(async () => {
    try {
      const posts = await getBlogPosts();
      onUpdate(posts);
    } catch (error) {
      onError(error as Error);
    }
  }, 5000);

  // Return cleanup function
  return () => clearInterval(interval);
};

// Delete a blog post
export const deleteBlogPost = async (postId: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: localStorage.getItem('auth_token')
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to delete blog post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}; 