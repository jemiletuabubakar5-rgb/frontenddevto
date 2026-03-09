
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TbHeartPlus } from 'react-icons/tb';
import { CiBookmark } from 'react-icons/ci';
import { VscArrowSwap } from 'react-icons/vsc';
import { BsThreeDots, BsXLg } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import image23 from './image/image23.jpeg';
import { useData } from '../context/DataContext';
import CommentForm from './CommentForm';
const BASE_URL = "https://backend-2-production-0f74.up.railway.app";
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Detail = () => {
  const { id: postIdFromUrl } = useParams();
  const navigate = useNavigate();
  const { 
    user, 
    currentPost, 
    postLoading, 
    postError, 
    fetchSinglePost,
    likePost,
    unlikePost,
    followUser,
    unfollowUser,
    deletePost,
    deleteComment,
    addComment,
    fetchComments,
    fetchAuthorPosts,
    incrementPostViews,
    checkLikeStatus,
    checkFollowStatus
  } = useData();
  
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [error, setError] = useState(null);

const [localPost, setLocalPost] = useState(() => ({
  ...(currentPost || { _id: postIdFromUrl }),
  author: {
    ...(currentPost?.author || {}),
    followers: Array.isArray(currentPost?.author?.followers) 
      ? currentPost.author.followers 
      : [],
    followersCount: Array.isArray(currentPost?.author?.followers)
      ? currentPost.author.followers.length
      : 0
  }
}));
 
  useEffect(() => {
    const loadPostData = async () => {
      try {
        if (postIdFromUrl) {
          const post = await fetchSinglePost(postIdFromUrl);
          if (post) {
            const views = await incrementPostViews(postIdFromUrl);
            setViews(views);
            
            // Initialize complete post data
            const completePost = {
              ...post,
              author: {
                ...post.author,
                followers: Array.isArray(post.author?.followers) ? post.author.followers : [],
                followersCount: post.author?.followers?.length || 0
              }
            };

            setLocalPost(completePost);
            
            // Load comments
            try {
              const commentsData = await fetchComments(postIdFromUrl);
              setComments(commentsData || []);
            } catch (commentsError) {
              console.error('Comments load error:', commentsError);
              setComments([]);
            }

            // Check follow status if user is logged in
            if (user?._id) {
              const isUserFollowing = await checkFollowStatus(post.author._id);
              setIsFollowing(isUserFollowing);
            }
          }
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setError(error);
        if (error.message.includes('404')) {
          navigate('/');
        }
      }
    };

    loadPostData();
  }, [postIdFromUrl, user?._id]);

  // Load author posts
  useEffect(() => {
    let isMounted = true;
    
    if (localPost?.author?._id && isMounted) {
      const loadPosts = async () => {
        try {
          setLoadingPosts(true);
          const posts = await fetchAuthorPosts(localPost.author._id);
          if (isMounted) {
            setAuthorPosts(posts || []);
          }
        } catch (error) {
          if (isMounted) {
            setPostsError(error.message);
          }
        } finally {
          if (isMounted) {
            setLoadingPosts(false);
          }
        }
      };
      
      loadPosts();
    }

    return () => { isMounted = false; };
  }, [localPost?.author?._id]);

  // Like functionality
  const handleLikeClick = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to interact with posts');
      navigate('/login');
      return;
    }

    try {
      setIsLikeLoading(true);
      
      if (isLiked) {
        await unlikePost(localPost._id);
        setIsLiked(false);
        setLocalPost(prev => ({
          ...prev,
          likes: Math.max(0, prev.likes - 1),
          likedBy: prev.likedBy.filter(id => id !== user._id)
        }));
        toast.success('Post unliked');
      } else {
        await likePost(localPost._id);
        setIsLiked(true);
        setLocalPost(prev => ({
          ...prev,
          likes: prev.likes + 1,
          likedBy: [...prev.likedBy, user._id]
        }));
        toast.success('Post liked');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        const serverMessage = error.response.data?.message || '';
        if (serverMessage.includes('already liked')) {
          setIsLiked(true);
          toast.error('You already liked this post');
        } else if (serverMessage.includes('not liked')) {
          setIsLiked(false);
          toast.error("You haven't liked this post");
        } else {
          toast.error(serverMessage || 'Invalid operation');
        }
        
        const correctStatus = await checkLikeStatus(localPost._id);
        setIsLiked(correctStatus);
      } else {
        toast.error('Network error - please try again');
      }
    } finally {
      setIsLikeLoading(false);
    }
  };

  // Follow/Unfollow functionality
  // const handleFollowAction = async () => {
  //   if (!user) {
  //     toast.error('Please login to follow users');
  //     navigate('/login');
  //     return;
  //   }

  //   if (!localPost?.author?._id) {
  //     toast.error('User data not available');
  //     return;
  //   }

  //   if (user._id === localPost.author._id) {
  //     toast.error("You can't follow yourself");
  //     return;
  //   }

  //   setIsFollowLoading(true);
  //   try {
  //     // Optimistic UI update
  //     const newFollowingState = !isFollowing;
  //     setIsFollowing(newFollowingState);
      
  //     // Calculate new followers count
  //     const newFollowersCount = newFollowingState 
  //       ? localPost.author.followersCount + 1 
  //       : Math.max(0, localPost.author.followersCount - 1);

  //     // Update local state immediately
  //     setLocalPost(prev => ({
  //       ...prev,
  //       author: {
  //         ...prev.author,
  //         followers: newFollowingState 
  //           ? [...prev.author.followers, user._id] 
  //           : prev.author.followers.filter(id => id !== user._id),
  //         followersCount: newFollowersCount
  //       }
  //     }));

  //     // Make API call
  //     const response = newFollowingState 
  //       ? await followUser(localPost.author._id)
  //       : await unfollowUser(localPost.author._id);

  //     if (!response?.success) {
  //       // Revert if API call failed
  //       setIsFollowing(isFollowing);
  //       setLocalPost(prev => ({
  //         ...prev,
  //         author: {
  //           ...prev.author,
  //           followers: isFollowing 
  //             ? [...prev.author.followers, user._id] 
  //             : prev.author.followers.filter(id => id !== user._id),
  //           followersCount: isFollowing 
  //             ? localPost.author.followersCount + 1 
  //             : Math.max(0, localPost.author.followersCount - 1)
  //         }
  //       }));
  //       throw new Error(response?.error || 'Operation failed');
  //     }

  //     toast.success(response.message);
      
  //     // Update with server response if available
  //     if (response.updatedAuthor) {
  //       setLocalPost(prev => ({
  //         ...prev,
  //         author: {
  //           ...prev.author,
  //           followers: response.updatedAuthor.followers,
  //           followersCount: response.updatedAuthor.followersCount
  //         }
  //       }));
  //     }

  //     // Cache follow status
  //     localStorage.setItem(
  //       `follow_${localPost.author._id}_${user._id}`,
  //       JSON.stringify({
  //         isFollowing: newFollowingState,
  //         followersCount: newFollowersCount
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Follow/Unfollow error:', error);
  //     toast.error(error.message.includes('not found') 
  //       ? 'The user you tried to unfollow no longer exists' 
  //       : error.message || 'Failed to update follow status');
  //   } finally {
  //     setIsFollowLoading(false);
  //   }
  // };

  // Load cached follow status on mount
  useEffect(() => {
    if (user?._id && localPost?.author?._id) {
      const cached = localStorage.getItem(`follow_${localPost.author._id}_${user._id}`);
      if (cached) {
        const { isFollowing, followersCount } = JSON.parse(cached);
        setIsFollowing(isFollowing);
        setLocalPost(prev => ({
          ...prev,
          author: {
            ...prev.author,
            followers: isFollowing 
              ? [...prev.author.followers, user._id] 
              : prev.author.followers.filter(id => id !== user._id),
            followersCount
          }
        }));
      }
    }
  }, [user?._id, localPost?.author?._id]);

  const handleDeletePost = async () => {
    try {
      await deletePost(localPost._id);
      toast.success('Post deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteComment(localPost._id, commentId);
      toast.success('Comment deleted');
      const updatedComments = await fetchComments(localPost._id);
      setComments(updatedComments || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCommentSubmit = async (text) => {
    if (!text.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      setIsCommentLoading(true);
      const newComment = await addComment(localPost._id, text);
      
      setComments(prev => {
        const prevComments = Array.isArray(prev) ? prev : [];
        return [newComment, ...prevComments];
      });
      
      setLocalPost(prev => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1
      }));
      
      toast.success('Comment added!');
    } catch (error) {
      console.error('Comment submission error:', error);
      toast.error(error.message || 'Failed to add comment');
    } finally {
      setIsCommentLoading(false);
    }
  };

  const navigateToProfile = () => {
    if (localPost?.author?._id) {
      navigate(`/user/${localPost.author._id}`);
    }
  };

 
const handleFollowAction = async () => {
  // ... existing checks ...

  try {
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    
    // Safely get current followers
    const currentFollowers = Array.isArray(localPost.author.followers) 
      ? localPost.author.followers 
      : [];
    
    // Calculate new followers
    const newFollowers = newFollowingState
      ? [...currentFollowers, user._id]
      : currentFollowers.filter(id => id !== user._id);
    
    // Update local state
    setLocalPost(prev => ({
      ...prev,
      author: {
        ...prev.author,
        followers: newFollowers,
        followersCount: newFollowers.length
      }
    }));

    // ... rest of the follow/unfollow logic ...
  } catch (error) {
    // ... error handling ...
  }
};

// In your follow status cache loading
useEffect(() => {
  if (user?._id && localPost?.author?._id) {
    const cached = localStorage.getItem(`follow_${localPost.author._id}_${user._id}`);
    if (cached) {
      const { isFollowing, followersCount } = JSON.parse(cached);
      setIsFollowing(isFollowing);
      setLocalPost(prev => ({
        ...prev,
        author: {
          ...prev.author,
          followers: Array.isArray(prev.author?.followers)
            ? isFollowing
              ? [...prev.author.followers, user._id]
              : prev.author.followers.filter(id => id !== user._id)
            : isFollowing
              ? [user._id]
              : [],
          followersCount
        }
      }));
    }
  }
}, [user?._id, localPost?.author?._id]);

    useEffect(() => {
    let isMounted = true;
const loadPostData = async () => {
  try {
    if (postIdFromUrl) {
      const post = await fetchSinglePost(postIdFromUrl);
      if (post) {
        const views = await incrementPostViews(postIdFromUrl);
        setViews(views);
        setIsLiked(post.likedBy?.includes(user?._id) || false);
        
        // Load comments with error handling
        try {
          const commentsData = await fetchComments(postIdFromUrl);
          setComments(commentsData);
        } catch (commentsError) {
          console.error('Comments load error:', commentsError);
          setComments([]);
        }
        
        setLocalPost({
          ...post,
          _id: post._id || post.id || postIdFromUrl
        });
      }
    }
  } catch (error) {
    console.error('Error loading post:', error);
    setError(error);
    if (error.message.includes('404')) {
      navigate('/');
    }
  }
};

    loadPostData();
    
    return () => { isMounted = false; };
  }, [postIdFromUrl]);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
        <button 
          onClick={() => {
            setError(null);
            fetchSinglePost(postIdFromUrl);
          }} 
          className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (postLoading) return <LoadingSpinner />;
  
  if (postError) return (
    <div className="text-center py-8 text-red-500">
      {postError}
      <button 
        onClick={() => fetchSinglePost(postIdFromUrl)} 
        className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
      >
        Retry
      </button>
    </div>
  );
  
  if (!localPost?._id) return (
    <div className="text-center py-8">
      Post not found
      <button 
        onClick={() => navigate('/')} 
        className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded"
      >
        Go Home
      </button>
    </div>
  );

  return (
    <div className="flex w-full bg-gray-100 min-h-screen gap-6 p-4">
      {/* Left sidebar - Post actions */}
      <div className="bg-gray-100 w-20 sticky top-0 h-full">
        <div className="ml-4 mt-4 space-y-8">
          <button 
            onClick={handleLikeClick}
            disabled={isLikeLoading || !localPost?._id}
            className={`flex flex-col items-center group ${isLikeLoading ? 'opacity-50' : ''}`}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
          >
            <TbHeartPlus className={`text-2xl ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'} group-hover:text-red-300`} />
            <span className={`mt-1 text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
              {localPost.likes || 0}
            </span>
          </button>

          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center group"
            aria-label="Show comments"
          >
            <FaRegComment className={`text-2xl ${showComments ? 'text-blue-500' : 'text-gray-500 group-hover:text-blue-300'}`} />
            <span className={`mt-1 text-sm ${showComments ? 'text-blue-500' : 'text-gray-500'}`}>
              {comments.length || 0}
            </span>
          </button>

          <div className="flex flex-col items-center group">
            <CiBookmark className="text-2xl text-gray-500 group-hover:text-blue-300" />
            <span className="mt-1 text-gray-500 text-sm">0</span>
          </div>
          
          <VscArrowSwap className="text-2xl mx-auto text-gray-500 hover:text-blue-300" />
          
          <BsThreeDots className="text-2xl mx-auto text-gray-500 hover:text-blue-300" />

          {(user?._id === localPost.author?._id || user?.isAdmin) && (
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex flex-col items-center group text-red-500 hover:text-red-700"
              aria-label="Delete post"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="mt-1 text-sm">Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content - Post details */}
      <div className="flex-1">
        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          {/* Author info */}
          <div className="flex items-center mb-6">
            <div 
              className="cursor-pointer"
              onClick={navigateToProfile}
            >
              <img 
                className="h-10 w-10 rounded-full object-cover"
                src={localPost.author?.avatar || image23} 
                alt={localPost.author?.name || 'Author'} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = image23;
                }}
              />
            </div>
            <div className="ml-3">
              <div 
                className="font-medium text-gray-800 hover:underline cursor-pointer"
                onClick={navigateToProfile}
              >
                {localPost.author?.name || 'Author'}
              </div>
              <div className="text-gray-500 text-sm">
                Posted {new Date(localPost.createdAt).toLocaleDateString()} • 
                <span className="ml-1">{localPost.views || views} views</span>
              </div>
            </div>
          </div>

          {/* Post content */}
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{localPost.title}</h1>
          
          <div 
            className="prose max-w-none mb-6 text-gray-700" 
            dangerouslySetInnerHTML={{ __html: localPost.content }} 
          />
          
    {localPost.image && (
  <div className="mb-6 rounded-lg overflow-hidden">
    <img
      src={`https://backend-2-production-0f74.up.railway.app/uploads/${localPost.image}`}
      alt={localPost.title}
      className="w-full h-auto max-h-96 object-cover"
      loading="lazy"
      onError={(e) => {
        e.target.src = image23;
      }}
    />
  </div>
)}

          {/* Comments section */}
          {showComments && (
            <div className="bg-white rounded-lg p-6 mt-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
              
              <CommentForm
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onSubmit={handleCommentSubmit}
                loading={isCommentLoading}
                disabled={!localPost?._id || isCommentLoading}
              />

              <div className="space-y-4 mt-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-0 group">
                      <div className="flex items-start">
                        <img 
                          src={comment.author?.avatar || image23} 
                          alt={comment.author?.name}
                          className="h-8 w-8 rounded-full object-cover mr-3"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = image23;
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">
                                {comment.author?.name || 'Anonymous'}
                              </div>
                              <div className="text-gray-500 text-xs mb-1">
                                {new Date(comment.createdAt).toLocaleString()}
                              </div>
                            </div>
                            {(user?._id === comment.author?._id || user?.isAdmin) && (
                              <button 
                                onClick={() => handleDeleteComment(comment._id)}
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Delete comment"
                              >
                                <BsXLg className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No comments yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - Author profile and more posts */}
      <div className="w-80 sticky top-0 h-full hidden lg:block">
        {localPost?.author && (
          <div className="bg-white rounded-lg mb-4 shadow-sm">
            <div className="bg-purple-700 rounded-t-lg h-16 relative">
              <div className="absolute -bottom-4 left-4 flex items-center">
                <div 
                  className="cursor-pointer"
                  onClick={navigateToProfile}
                >
                  <img 
                    className="h-16 w-16 rounded-full border-2 border-white object-cover"
                    src={localPost.author.avatar || image23}
                    alt={localPost.author.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = image23;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="pt-10 px-4 pb-4">
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={handleFollowAction}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={!user || !localPost?.author || user._id === localPost.author._id}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                  onClick={navigateToProfile}
                  className="flex-1 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  View Profile
                </button>
              </div>
              
              <div className="mt-4 text-gray-600">
                <p className="text-sm">{localPost.author.bio || 'No bio available'}</p>
                
                <div className="flex gap-4 mt-3 text-sm">
                  <div 
                    className="cursor-pointer hover:underline"
                    onClick={navigateToProfile}
                  >
                    <span className="font-bold">
                      {localPost.author.followersCount || 0}
                    </span>
                    <span className="text-gray-500 ml-1">Followers</span>
                  </div>
                  <div 
                    className="cursor-pointer hover:underline"
                    onClick={navigateToProfile}
                  >
                    <span className="font-bold">{localPost.author.following?.length || 0}</span>
                    <span className="text-gray-500 ml-1">Following</span>
                  </div>
                  <div 
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate(`/user/${localPost.author._id}/posts`)}
                  >
                    <span className="font-bold">{authorPosts.length || 0}</span>
                    <span className="text-gray-500 ml-1">Posts</span>
                  </div>
                </div>

           {localPost.image && (
  <div className="mb-6 rounded-lg overflow-hidden">
    <img 
      src={`https://backend-2-production-0f74.up.railway.app/uploads/${localPost.image}`}
      alt={localPost.title}
      className="w-full h-auto max-h-96 object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = image23;
      }}
    />
  </div>
)}
              </div>
            </div>
          </div>
        )}

        {/* More from author section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            More from {localPost?.author?.name || 'Author'}
          </h2>
          
          {loadingPosts ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : postsError ? (
            <div className="text-center py-4">
              <p className="text-red-500 text-sm mb-2">
                {postsError.includes('404') ? 'No other posts found' : postsError}
              </p>
              <button
                onClick={() => localPost?.author?._id && fetchAuthorPosts(localPost.author._id)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
              >
                Retry
              </button>
            </div>
          ) : authorPosts.length > 0 ? (
            <div className="space-y-3">
              {authorPosts.map(post => (
                <div 
                  key={post._id} 
                  className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  <h3 className="font-medium text-gray-800 line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.createdAt).toLocaleDateString()} • {post.views} views
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm text-center py-4">
              No other posts available
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Delete Post</h3>
            <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;