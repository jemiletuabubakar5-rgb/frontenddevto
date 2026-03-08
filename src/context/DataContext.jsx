


import axios from 'axios';
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';


// Create context with default values
const DataContext = createContext({
  user: null,
  posts: [],
  isLoading: false,
  currentPost: null,
  // ... other default values
});

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
const API_URL = "https://backend-2-production-0f74.up.railway.app/api/blog";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-2-production-0f74.up.railway.app/api',
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postError, setPostError] = useState(null);
  const [authorPosts, setAuthorPosts] = useState(null);
  const [comments, setComments] = useState([]);

  // Helper functions
  const handleError = (error, defaultMessage = 'An error occurred') => {
    const message = error.response?.data?.message || error.message || defaultMessage;
    toast.error(message);
    console.error(error);
    return { error: message };
  };

  const handleResponse = (response, successMessage) => {
    if (successMessage) toast.success(successMessage);
    return response.data;
  };
// In your DataContext.jsx
const register = async (userData) => {
  try {
    setIsLoading(true);
    const response = await api.post('/users/register', userData);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    
    toast.success('Registration successful!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed');
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const login = async (credentials) => {
  try {
    setIsLoading(true);
    const response = await api.post('/users/login', credentials);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

    const fetchPosts = useCallback(async (page = 1, limit = 10) => {
    try {
      setIsLoading(true);
      const response = await api.get('/blog/all', { params: { page, limit } });
      
      const processedPosts = response.data.data.map(post => ({
        ...post,
        imageUrl: post.image 
          ? `${import.meta.env.VITE_API_URL || 'https://backend-2-production-0f74.up.railway.app/api'}/uploads/${post.image}`
          : null
      }));
      
      setPosts(processedPosts);
      return processedPosts;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load posts');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);




  const fetchSinglePost = async (postId) => {
    try {
      setPostLoading(true);
      setPostError(null);
      
      if (!isValidObjectId(postId)) {
        throw new Error('Invalid post ID format');
      }

      const response = await api.get(`/blog/${postId}`);
      
      const processedPost = {
        ...response.data.data,
        imageUrl: response.data.data.image 
          ? `${import.meta.env.VITE_API_URL || 'https://backend-2-production-0f74.up.railway.app/api'}/uploads/${response.data.data.image}`
          : null
      };

      setCurrentPost(processedPost);
      return processedPost;
    } catch (error) {
      console.error('Fetch single post error:', error);
      setPostError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setPostLoading(false);
    }
  };

  const incrementPostViews = async (postId) => {
    try {
      const response = await api.patch(`/blog/${postId}/views`);
      return response.data.views;
    } catch (error) {
      console.error('Failed to increment views:', error);
      return 0;
    }
  };

 

const createPost = async (formData) => {
  try {
    const response = await api.post('/blog/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.success) {
      await fetchPosts(); // Refresh posts list
      return response.data;
    }
    throw new Error(response.data.message || 'Post creation failed');
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
};





  


const deletePost = async (postId) => {
  try {
    await axios.delete(`${API_URL}/${postId}/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

  } catch (error) {
    console.error(error);
  }
};
  // ========== LIKE/COMMENT FUNCTIONS ========== //
  const checkUserLike = (post) => {
    if (!user || !post) return false;
    return post.likedBy?.includes(user._id) || false;
  };

const likePost = async (postId) => {
  try {
    // Validate postId
    if (!isValidObjectId(postId)) {
      throw new Error(`Invalid post ID: ${postId}`);
    }

    const response = await api.post(`/blog/${postId}/like`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Like failed');
    }

    return response.data;

  } catch (error) {
    console.error('Like error:', {
      status: error.response?.status,
      data: error.response?.data,
      postId,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

const unlikePost = async (postId) => {
  try {
    // Validate postId
    if (!isValidObjectId(postId)) {
      throw new Error(`Invalid post ID: ${postId}`);
    }

    const response = await api.post(`/blog/${postId}/unlike`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Unlike failed');
    }

    return response.data;

  } catch (error) {
    console.error('Unlike error:', {
      status: error.response?.status,
      data: error.response?.data,
      postId,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

const checkLikeStatus = async (postId) => {
  try {
    if (!user?._id) return false;
    
    const response = await api.get(`/blog/${postId}/like-status`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    return response.data?.hasLiked || false;
    
  } catch (error) {
    console.error('Like status check failed:', error);
    return false;
  }
};


  const fetchAuthorPosts = async (authorId) => {
    try {
      if (!isValidObjectId(authorId)) {
        throw new Error(`Invalid author ID format: ${authorId}`);
      }

      const response = await api.get(`/users/${authorId}/posts`);
      const data = handleResponse(response);

      const processedPosts = data.posts.map(post => ({
        ...post,
        imageUrl: post.imageUrl || 
          `${import.meta.env.VITE_API_URL || 'https://backend-2-production-0f74.up.railway.app/api'}/${post.image}`.replace(/\\/g, '/')
      }));

      setAuthorPosts(processedPosts);
      return processedPosts;
    } catch (error) {
      throw handleError(error, 'Failed to load author posts');
    }
  };





  const addComment = async (postId, content) => {
  console.log('Attempting to add comment to post:', postId);
  console.log('Comment content:', content);
  try {
    if (!isValidObjectId(postId)) {
      console.error('Invalid post ID format:', postId);
      throw new Error('Invalid post ID format');
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      console.error('Invalid comment content:', content);
      throw new Error('Comment content is required');
    }

    console.log('Sending comment to server...');
    const response = await api.post(`/blog/${postId}/comment`, { content });
    console.log('Server response:', response.data);
    
    if (!response.data?.success) {
      console.error('Server response indicates failure:', response.data);
      throw new Error(response.data?.message || 'Failed to add comment');
    }

    console.log('Comment added successfully:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Add comment error:', {
      postId,
      error: error.response?.data || error.message,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};


const fetchComments = async (postId) => {
  try {
    // Validate post ID
    if (!isValidObjectId(postId)) {
      console.error('Invalid post ID:', postId);
      return [];
    }

    // Add authorization header if user is logged in
    const headers = {};
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await api.get(`/blog/${postId}/comments`, { headers });
    
    // Ensure we always return an array
    return Array.isArray(response.data?.comments) ? response.data.comments : [];
    
  } catch (error) {
    console.error('Fetch comments error:', {
      error: error.response?.data || error.message,
      postId,
      timestamp: new Date().toISOString()
    });
    
    // Return empty array but show error to user if it's not a 404
    if (error.response?.status !== 404) {
      toast.error('Failed to load comments');
    }
    return [];
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    if (!isValidObjectId(postId) || !isValidObjectId(commentId)) {
      throw new Error('Invalid post or comment ID');
    }

    const response = await api.delete(`/blog/${postId}/comments/${commentId}`);
    
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to delete comment');
    }

    return response.data;
    
  } catch (error) {
    console.error('Delete comment error:', {
      error: error.response?.data || error.message,
      postId,
      commentId,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

const followUser = async (userId) => {
  try {
    console.log(`Attempting to follow user: ${userId}`);
    console.log(`Current token: ${localStorage.getItem('token')}`);

    const response = await api.post(
      `/users/${userId}/follow`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Follow action failed');
    }

    // Update local state
    setUser(prev => ({
      ...prev,
      following: [...(prev.following || []), userId]
    }));

    return {
      success: true,
      message: 'Followed successfully'
    };

  } catch (error) {
    console.error('Follow error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      userId,
      timestamp: new Date().toISOString()
    });
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid follow request');
    }
    throw new Error(error.message || 'Failed to follow user');
  }
};

const unfollowUser = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/unfollow`);
    
    if (response.data?.error?.includes('transaction')) {
      // Retry without transaction flag if supported
      return await api.post(`/users/${userId}/unfollow?noTransaction=true`);
    }

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Unfollow failed');
    }

    return response.data;
  } catch (error) {
    console.error('Unfollow failed:', {
      error: error.response?.data || error.message,
      userId,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

const checkFollowStatus = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/follow-status`);
    return response.data.isFollowing;
  } catch (error) {
    console.error('Check follow status error:', error);
    return false;
  }
};


  useEffect(() => {
    const initialize = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (!userData._id && userData.id) userData._id = userData.id;
          setUser(userData);
        } catch (error) {
          console.error('User parse error:', error);
          logout();
        }
      }
      await fetchPosts();
    };
    initialize();
  }, []);

  return (
    <DataContext.Provider value={{
      user,
      posts,
      isLoading,
      postLoading,
      currentPost,
      postError,
      authorPosts,
      comments,
      register,
      login,
      logout,
      fetchPosts,
      fetchSinglePost,
      createPost,
      deletePost,
      likePost,
      unlikePost,
      addComment,
      fetchComments,
      incrementPostViews,
      followUser,
      fetchAuthorPosts,
      checkUserLike,
      unfollowUser,
      checkLikeStatus,
      deleteComment,
      checkFollowStatus
    }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook with validation
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;