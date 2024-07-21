import React, { useEffect, useState } from 'react';
import Post from './Post';
import '../../App.css'

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

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
      setCommentingPostId(null); // Reset the commenting post ID after comment is added
      setCommentText(''); // Clear the comment text
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const toggleShowAllComments = (postId) => {
    setShowAllComments((prevShowAllComments) => ({
      ...prevShowAllComments,
      [postId]: !prevShowAllComments[postId],
    }));
  };

  return (
    <div className="col-span-6 bg-white shadow-lg p-4 rounded-lg mt-8">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Latest</h2>
      <Post onPostCreated={handlePostCreated} />
      <div id="posts" className="mt-6 space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {posts.map((post) => (
          <div key={post._id} className="mb-4">
            <h3 className="text-lg font-semibold">
              {post.user ? post.user.username : 'Unknown User'}
            </h3>
            {post.image && (
              <img src={`/api/uploads/${post.image}`} alt={`Post Image - ${post.text}`} className="mt-2" />
            )}
            {post.video && (
              <video controls className="mt-2">
                <source src={`/api/uploads/${post.video}`} type="video/mp4" />
              </video>
            )}
            <p className="text-gray-700">{post.text}</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => handleLike(post._id)}
                className="text-purple-600 hover:text-purple-800"
              >
                Like ({post.likes.length})
              </button>
              <button
                onClick={() => setCommentingPostId(post._id)}
                className="ml-4 text-gray-600 hover:text-gray-800"
              >
                Comment
              </button>
            </div>
            {post.likes.length > 0 && (
              <div className="mt-2">
                <h4 className="text-md font-semibold">Liked by</h4>
                {post.likes.map((like) => (
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
                ))}
              </div>
            )}
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
            {commentingPostId === post._id && (
              <div className="mt-4">
                <textarea
                  className="w-full border rounded-lg p-2"
                  rows="2"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  onClick={() => handleComment(post._id, commentText)}
                  className="mt-2 bg-purple-600 text-white py-1 px-4 rounded-lg"
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
