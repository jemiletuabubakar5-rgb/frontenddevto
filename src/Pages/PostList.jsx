

import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaRegComment, FaEllipsisH } from 'react-icons/fa';
// import { formatDistanceToNow } from 'date-fns';
import image23 from './image/image23.jpeg';
import image27 from './image/image27.jpeg';

const PostsList = () => {
  const { 
    posts = [], 
    fetchPosts, 
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    user,
    likePost,
    unlikePost,
    checkUserLike,
    deletePost
  } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, currentPage]);

  const handleLike = async (postId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const post = posts.find(p => p._id === postId);
      if (checkUserLike(post)) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      fetchPosts();
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">All Posts</h1>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 shadow-sm animate-pulse">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-40 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      
      {posts.length === 0 && !isLoading ? (
        <div className="text-center py-8 text-gray-500">
          No posts available. Create one!
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {posts.map(post => {
              const isLiked = checkUserLike(post);
              const likeCount = post.likedBy?.length || 0;
              const commentCount = post.comments?.length || 0;
              const isAuthor = user?._id === post.author?._id;

              return (
                <div key={post._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => navigate(`/user/${post.author?._id}`)}
                    >
                      <img 
                        src={post.author?.avatar || image23} 
                        alt={post.author?.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = image23;
                        }}
                      />
                      <div>
                        <h3 className="font-medium">{post.author?.name || 'Anonymous'}</h3>
                        <p className="text-gray-500 text-sm">
                          {/* {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} */}
                        </p>
                      </div>
                    </div>
                    
                    {(isAuthor || user?.isAdmin) && (
                      <div className="relative group">
                        <button className="text-gray-500 hover:text-gray-700">
                          <FaEllipsisH />
                        </button>
                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                          <button 
                            onClick={() => handleDelete(post._id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            Delete Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
{post.image && (
  <div className="md:w-1/2 lg:w-1/3">
    <img 
      src={
        post.image.startsWith('http') 
          ? post.image 
          : `${import.meta.env.VITE_API_URL}${post.image}`
      }
      alt={post.title}
      className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
      onClick={() => navigate(`/post/${post._id}`)}
      onError={(e) => {
        console.error('Image failed to load:', e.target.src);
        e.target.onerror = null;
        e.target.src = image27;
      }}
    />
  </div>
)}
                  
                  <div className="flex items-center space-x-4 text-gray-500 mt-3">
                    <button 
                      onClick={() => handleLike(post._id)}
                      className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                    >
                      {isLiked ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                      <span>{likeCount}</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate(`/post/${post._id}`)}
                      className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                    >
                      <FaRegComment />
                      <span>{commentCount}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = currentPage <= 3 
                    ? i + 1 
                    : currentPage >= totalPages - 2 
                      ? totalPages - 4 + i 
                      : currentPage - 2 + i;
                  if (page < 1 || page > totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded transition-colors ${
                        currentPage === page 
                          ? 'bg-blue-500 text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsList;