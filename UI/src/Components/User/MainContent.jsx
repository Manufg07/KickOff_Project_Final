import React, { useEffect, useState } from 'react';
import Post from './Post';

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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
      console.log('data:',data)
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error fetching posts', error);
      setError('Failed to fetch posts');
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="col-span-6 bg-white shadow-lg p-4 rounded-lg mt-8">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Latest</h2>
      <Post onPostCreated={handlePostCreated} />
      <div id="posts" className="mt-6 space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {posts.map((post) => (
          <div key={post._id} className="mb-4">
            {/* <h3 className="text-lg font-semibold">{post.user.username}</h3> */}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;

