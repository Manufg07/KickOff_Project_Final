import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    fav_team1: '',
    fav_player: ''
  });

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
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        console.log('User Data:', data);
        setUserData(data);
        setFormData({
          username: data.username,
          email: data.email,
          phone: data.phone,
          fav_team1: data.fav_team1,
          fav_player: data.fav_player
        });
        fetchUserPosts(); // Fetch posts after fetching user data
      })
      .catch(error => console.error('Error fetching user details:', error));
  };

  const fetchUserPosts = () => {
    fetch('/api/user/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log('API Response:', response);
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(posts => {
        console.log('User Posts:', posts);
        setUserPosts(posts);
      })
      .catch(error => console.error('Error fetching user posts:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        console.log('Updated User Data:', data);
        setUserData(data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating user details:', error));
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">{userData.username}</h1>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">{userData.phone}</p>
            <p className="text-gray-600">Favorite Team: {userData.fav_team1}</p>
            <p className="text-gray-600">Favorite Player: {userData.fav_player}</p>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Favorite Team</label>
              <input
                type="text"
                name="fav_team1"
                value={formData.fav_team1}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Favorite Player</label>
              <input
                type="text"
                name="fav_player"
                value={formData.fav_player}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Edit Profile
          </button>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="text-gray-600">Number of Friends: {userData.friends?.length || 0}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-gray-600">Number of Posts: {userPosts.length || 0}</p>
          <div className="mt-4">
            {userPosts.map((post) => (
              <div key={post._id} className="mb-4">
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
