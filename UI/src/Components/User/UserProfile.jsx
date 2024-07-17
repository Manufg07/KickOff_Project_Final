import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log('API Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('User Data:', data);
        setUser(data);
      })
      .catch(error => console.error('Error fetching user details:', error));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600">Favorite Team: {user.fav_team1}</p>
            <p className="text-gray-600">Favorite Player: {user.fav_player}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="text-gray-600">Number of Friends: {user.friends?.length || 0}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-gray-600">Number of Posts: {user.posts?.length || 0}</p>
          <div className="mt-4">
            {user.posts?.map((post) => (
              <div key={post.id} className="mb-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                {post.image && <img src={post.image} alt="Post" className="mt-2" />}
                {post.video && (
                  <video controls className="mt-2">
                    <source src={post.video} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
