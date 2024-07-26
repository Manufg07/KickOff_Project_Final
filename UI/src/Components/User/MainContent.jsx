import React, { useEffect, useState, useRef } from 'react';
import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import Post from './Post';
import EmojiPicker from '../EmojiPicker'; // Import the custom emoji picker
import '../../App.css';

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState({});
  const [showLikedUsers, setShowLikedUsers] = useState({});
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false); // State for emoji picker visibility

  const likedUsersRefs = useRef({});
  const commentsRefs = useRef({});

  useEffect(() => {
    fetchPosts();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    Object.keys(likedUsersRefs.current).forEach(postId => {
      if (likedUsersRefs.current[postId] && !likedUsersRefs.current[postId].contains(event.target)) {
        setShowLikedUsers(prevShowLikedUsers => ({
          ...prevShowLikedUsers,
          [postId]: false,
        }));
      }
    });

    Object.keys(commentsRefs.current).forEach(postId => {
      if (commentsRefs.current[postId] && !commentsRefs.current[postId].contains(event.target)) {
        setShowAllComments(prevShowAllComments => ({
          ...prevShowAllComments,
          [postId]: false,
        }));
        setIsEmojiPickerVisible(false); // Hide emoji picker when clicking outside
      }
    });
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/pt/posts', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error fetching posts', error);
      setError('Failed to fetch posts');
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/pt/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, text) => {
    console.log('Posting Comment:', { postId, text }); // Debugging log
    try {
      const response = await fetch(`/api/pt/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
      setCommentText('');
    } catch (error) {
      console.error('Error commenting on post:', error);
    } finally {
      setCommentingPostId(null);
      setIsEmojiPickerVisible(false); // Hide emoji picker after commenting
    }
  };

  const toggleShowAllComments = (postId) => {
    setShowAllComments((prevShowAllComments) => ({
      ...prevShowAllComments,
      [postId]: !prevShowAllComments[postId],
    }));
  };

  const toggleShowLikedUsers = (postId) => {
    setShowLikedUsers((prevShowLikedUsers) => ({
      ...prevShowLikedUsers,
      [postId]: !prevShowLikedUsers[postId],
    }));
  };

  const onEmojiClick = (emoji) => {
    setCommentText(prevText => prevText + emoji);
    setIsEmojiPickerVisible(false);
  };

  return (
    <div className="col-span-12 md:col-span-6 bg-white shadow-lg p-4 rounded-lg mt-8">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Latest</h2>
      <Post onPostCreated={handlePostCreated} />
      <div id="posts" className="mt-6 space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {posts.map((post) => (
          post.user && (
            <div key={post._id} className="mb-4 relative">
              <h3 className="text-lg font-semibold">
                {post.user.username}
              </h3>
              {post.image && (
                <img src={`/api/uploads/${post.image}`} alt={`Post Image - ${post.text}`} className="mt-2 w-full object-cover rounded-lg" />
              )}
              {post.video && (
                <video controls className="mt-2 w-full rounded-lg">
                  <source src={`/api/uploads/${post.video}`} type="video/mp4" />
                </video>
              )}
              <p className="text-gray-700">{post.text}</p>
              <div className="flex flex-col items-start mt-2 relative">
                <div className="flex items-center">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {post.liked ? (
                      <HeartIcon className="w-6 h-6 text-red-500" /> // Filled heart if liked
                    ) : (
                      <HeartIconOutline className="w-6 h-6" /> // Outline heart if not liked
                    )}
                  </button>
                  <span
                    className="ml-1 cursor-pointer mt-1"
                    onClick={() => toggleShowLikedUsers(post._id)}
                  >
                    {post.likes.length} likes
                  </span>
                  {showLikedUsers[post._id] && (
                    <div
                      ref={(el) => (likedUsersRefs.current[post._id] = el)}
                      className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg p-2 shadow-lg z-10 w-64"
                    >
                      <h4 className="text-md font-semibold mb-2">Liked by</h4>
                      {post.likes.length > 0 ? (
                        post.likes.map((like) => (
                          <div key={like._id} className="flex items-center mt-2">
                            {like.profilePicture && (
                              <img
                                src={`/api/uploads/profile_pictures/${like.profilePicture}`}
                                alt={`${like.username}'s profile`}
                                className="w-8 h-8 rounded-full object-cover mr-2"
                              />
                            )}
                            <span className="text-gray-800 font-semibold">{like.username}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No likes yet</p>
                      )}
                    </div>
                  )}
                </div>
                {post.comments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Comments</h4>
                    {post.comments.slice(0, showAllComments[post._id] ? post.comments.length : 2).map((comment) => (
                      <div key={comment._id} className="mt-2 flex items-start">
                        {comment.user.profilePicture && (
                          <img
                            src={`/api/uploads/profile_pictures/${comment.user.profilePicture}`}
                            alt={`${comment.user.username}'s profile`}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                        )}
                        <div>
                          <span className="text-gray-800 font-semibold">{comment.user.username}</span>
                          <p className="text-gray-600">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    {post.comments.length > 2 && (
                      <button
                        onClick={() => toggleShowAllComments(post._id)}
                        className="text-blue-500 hover:underline"
                      >
                        {showAllComments[post._id] ? 'Hide comments' : 'View all comments'}
                      </button>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setCommentingPostId(post._id)}
                  className="text-blue-500 hover:underline mt-4"
                >
                  Comment
                </button>
                {commentingPostId === post._id && (
                  <div className="mt-4 w-full" ref={(el) => (commentsRefs.current[post._id] = el)}>
                    <div className="relative">
                      <textarea
                        className="w-full border rounded-lg p-2"
                        rows="2"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                        onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
                      >
                        😀
                      </button>
                      {isEmojiPickerVisible && (
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      )}
                    </div>
                    <button
                      onClick={() => handleComment(post._id, commentText)}
                      className="mt-2 bg-purple-600 text-white py-1 px-4 rounded-lg"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default MainContent;
