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
    fav_player: '',
    profilePicture: ''
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
          fav_player: data.fav_player,
          profilePicture: data.profilePicture || ''
        });
        fetchUserPosts(); // Fetch posts after fetching user data
      })
      .catch(error => console.error('Error fetching user details:', error));
  };

  const fetchUserPosts = () => {
    fetch('/api/posts/user', {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col items-center space-y-4">
          {userData.profilePicture && (
            <img
              src={`/api/uploads/profile_pictures/${userData.profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <h1 className="text-2xl font-bold text-center">{userData.username}</h1>
          <p className="text-gray-600 text-center">{userData.email}</p>
          <p className="text-gray-600 text-center">{userData.phone}</p>
          <p className="text-gray-600 text-center">Favorite Team: {userData.fav_team1}</p>
          <p className="text-gray-600 text-center">Favorite Player: {userData.fav_player}</p>
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
            className="mt-6 ml-64 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Edit Profile
          </button>
        )}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="text-gray-600">Number of Friends: {userData.friends?.length || 0}</p>
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-gray-600">Number of Posts: {userPosts.length || 0}</p>
          <div className="mt-4">
            {userPosts.map((post) => (
              <div key={post._id} className="mb-4 text-left">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                {post.image && <img src={`/api/uploads/${post.image}`} alt="Post" className="mt-2" />}
                {post.video && (
                  <video controls className="mt-2">
                    <source src={`/api/uploads/${post.video}`} type="video/mp4" />
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
