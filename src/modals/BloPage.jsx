import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useData } from '../context/DataContext';
import axios from 'axios';
import { TbHeartPlus } from 'react-icons/tb';
import { FaRegComment } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import { VscArrowSwap } from 'react-icons/vsc';
import { BsThreeDots } from 'react-icons/bs';
// import image23 from './image/image23.JPEG';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-2-production-0f74.up.railway.app/api',
  withCredentials: true
});

// Axios interceptors for authentication
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

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

const BlogPage = ({ postId, isOpen, onClose }) => {
  const { user } = useData();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = image23;
  };

  // Fetch post data
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/api/blog/${postId}`);
      const postData = response.data.data || response.data;
      
      setPost(postData);
      setLikeCount(postData.likes || 0);
      setIsLiked(postData.likedBy?.includes(user?._id) || false);
      setComments(postData.comments || []);
      
      // Increment views
      await api.patch(`/api/blog/${postData._id}/views`);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.response?.data?.message || 'Failed to load post');
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  // Handle like action
  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like posts');
      navigate('/login');
      return;
    }

    try {
      setIsLikeLoading(true);
      const endpoint = isLiked ? 'unlike' : 'like';
      const response = await api.post(`/api/blog/${post._id}/${endpoint}`);
      
      setIsLiked(!isLiked);
      setLikeCount(response.data.likes || likeCount + (isLiked ? -1 : 1));
      toast.success(isLiked ? 'Post unliked' : 'Post liked');
    } catch (err) {
      console.error('Like error:', err);
      toast.error(err.response?.data?.message || 'Failed to update like status');
    } finally {
      setIsLikeLoading(false);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!user) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }

    try {
      const tempComment = {
        _id: `temp-${Date.now()}`,
        text: commentText,
        author: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar
        },
        createdAt: new Date().toISOString()
      };

      setComments(prev => [tempComment, ...prev]);
      setCommentText('');

      const response = await api.post(`/api/blog/${post._id}/comments`, {
        content: commentText
      });

      if (response.data?.success) {
        setComments(prev => [
          response.data.comment,
          ...prev.filter(c => !c._id.startsWith('temp-'))
        ]);
        toast.success('Comment added successfully');
      }
    } catch (err) {
      setComments(prev => prev.filter(c => !c._id.startsWith('temp-')));
      toast.error(err.response?.data?.message || 'Failed to add comment');
    }
  };

  // Handle post deletion
  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await api.delete(`/api/blog/${post._id}`);
      toast.success('Post deleted successfully');
      onClose();
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete post');
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await api.delete(`/api/blog/${post._id}/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
      toast.success('Comment deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  // Load data when modal opens
  useEffect(() => {
    if (isOpen && postId) {
      fetchPost();
    }
  }, [isOpen, postId]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="text-center py-8 text-red-500">
            {error || 'Post not found'}
            <button 
              onClick={fetchPost} 
              className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
            >
              Retry
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <div className="flex items-center">
            <img 
              className="h-10 w-10 rounded-full object-cover mr-3"
              src={post.author?.avatar || image23} 
              alt={post.author?.name} 
              onError={handleImageError}
            />
            <div>
              <h3 className="font-medium">{post.author?.name || 'Unknown'}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Post content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          
          {post.imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto max-h-96 object-cover"
                onError={handleImageError}
              />
            </div>
          )}
          
          <div 
            className="prose max-w-none mb-6 text-gray-700" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* Post actions */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <button 
              onClick={handleLike}
              disabled={isLikeLoading}
              className="flex items-center group"
            >
              {isLikeLoading ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-red-500 rounded-full"></div>
              ) : (
                <TbHeartPlus className={`text-2xl ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 group-hover:text-red-300'}`} />
              )}
              <span className={`ml-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                {likeCount}
              </span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center group"
            >
              <FaRegComment className={`text-2xl ${showComments ? 'text-blue-500' : 'text-gray-500 group-hover:text-blue-300'}`} />
              <span className={`ml-1 ${showComments ? 'text-blue-500' : 'text-gray-500'}`}>
                {comments.length}
              </span>
            </button>

            <CiBookmark className="text-2xl text-gray-500 hover:text-blue-300" />
            <VscArrowSwap className="text-2xl text-gray-500 hover:text-blue-300" />
            
            {(user?._id === post.author?._id || user?.isAdmin) && (
              <button 
                onClick={handleDeletePost}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
              
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  >
                    Post
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment._id} className="flex items-start group">
                      <img 
                        src={comment.author?.avatar || image23} 
                        alt={comment.author?.name} 
                        className="h-8 w-8 rounded-full object-cover mr-3"
                        onError={handleImageError}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-sm">{comment.author?.name}</p>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                          {(user?._id === comment.author?._id || user?.isAdmin) && (
                            <button 
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No comments yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;