import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const FriendsProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
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
  }, [username]);

  const fetchUserData = () => {
    fetch(`/api/user/friend-profile/${username}`, {
     
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
        fetchUserPosts();
        fetchConnectedFriends();
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

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-pink-500 to-blue-500 ">
      <motion.div 
        className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center space-y-6">
          {userData.profilePicture && (
            <motion.img
              src={`/api/uploads/profile_pictures/${userData.profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <motion.h1 
            className="text-3xl font-bold text-center text-gray-800"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {userData.username}
          </motion.h1>
          <p className="text-gray-700 text-center">{userData.email}</p>
          <p className="text-gray-700 text-center">{userData.phone}</p>
          <p className="text-gray-700 text-center">Favorite Team: {userData.fav_team1}</p>
          <p className="text-gray-700 text-center">Favorite Player: {userData.fav_player}</p>
        </div>
        <div className="mt-8 text-center">
          {/* <motion.h2 
            className="text-2xl font-semibold text-gray-800"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Friends
          </motion.h2>
          <p className="text-gray-700">Number of Friends: {userData.friends?.length || 0}</p>
          <ul className="mt-4 space-y-2">
            {userData.friends?.map(friend => (
              <motion.li 
                key={friend._id} 
                className="text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {friend.username}
              </motion.li>
            ))}
          </ul> */}
        </div>
        {/* <div className="mt-8 text-center">
          <motion.h2 
            className="text-2xl font-semibold text-gray-800"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connected Friends
          </motion.h2>
          <ul className="mt-4 space-y-2 flex flex-wrap justify-center">
            {connectedFriends.map(friend => (
              <motion.li 
                key={friend._id} 
                className="text-gray-700 flex items-center justify-center my-2 space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {friend.profilePicture && (
                  <img
                    src={`/api/uploads/profile_pictures/${friend.profilePicture}`}
                    alt="Friend Profile"
                    className="w-8 h-8 rounded-full object-cover shadow-md"
                  />
                )}
                <span>{friend.username}</span>
              </motion.li>
            ))}
          </ul>
        </div> */}
        <div className="mt-8 text-center">
          {/* <motion.h2 
            className="text-2xl font-semibold text-gray-800"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Posts
          </motion.h2>
          <p className="text-gray-700">Number of Posts: {userPosts.length || 0}</p> */}
          {/* <div className="mt-6 space-y-6">
            {userPosts.map(post => (
              <motion.div 
                key={post._id} 
                className="bg-gray-100 p-4 rounded-lg shadow-lg text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-800">{post.text}</h3>
                {post.image && <img src={`/api/uploads/${post.image}`} alt="Post" className="mt-2 rounded-lg shadow-md" />}
                {post.video && (
                  <video controls className="mt-2 rounded-lg shadow-md">
                    <source src={`/api/uploads/${post.video}`} type="video/mp4" />
                  </video>
                )}
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-300"
                >
                  Delete Post
                </button>
              </motion.div>
            ))}
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default FriendsProfile;
