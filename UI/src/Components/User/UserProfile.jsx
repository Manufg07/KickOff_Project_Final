import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [connectedFriends, setConnectedFriends] = useState([]);
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
        if (!response.ok) throw new Error('Failed to fetch user data');
        return response.json();
      })
      .then(data => {
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
        fetchConnectedFriends(); // Fetch connected friends after fetching user data
      })
      .catch(error => console.error('Error fetching user details:', error));
  };

  const fetchUserPosts = () => {
    fetch('/api/user/fposts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => console.error('Error fetching user posts:', error.message));
  };

  const fetchConnectedFriends = () => {
    fetch('/api/user/connected-friends', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch friends');
        return response.json();
      })
      .then(friends => {
        setConnectedFriends(friends);
      })
      .catch(error => console.error('Error fetching connected friends:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating user details:', error));
  };

  const handleDeletePost = (postId) => {
    fetch(`/api/user/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(() => {
        // Remove the deleted post from the state
        setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      })
      .catch(error => console.error('Error deleting post:', error.message));
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
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="text-gray-600">Number of Friends: {userData.friends?.length || 0}</p>
          <ul className="mt-2">
            {userData.friends?.map(friend => (
              <li key={friend._id} className="text-gray-700">{friend.username}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center">
          <ul className="mt-2">
            {connectedFriends.map(friend => (
              <li key={friend._id} className="text-gray-700 flex items-center justify-center my-2">
                {friend.profilePicture && (
                  <img
                    src={`/api/uploads/profile_pictures/${friend.profilePicture}`}
                    alt="Friend Profile"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                {friend.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-gray-600">Number of Posts: {userPosts.length || 0}</p>
          <div className="mt-4">
            {userPosts.map(post => (
              <div key={post._id} className="mb-4 text-left">
                <h3 className="text-lg font-semibold">{post.text}</h3>
                {post.image && <img src={`/api/uploads/${post.image}`} alt="Post" className="mt-2" />}
                {post.video && (
                  <video controls className="mt-2">
                    <source src={`/api/uploads/${post.video}`} type="video/mp4" />
                  </video>
                )}
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm"
                >
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
