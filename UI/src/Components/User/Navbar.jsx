import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState({
    username: '',
    // profilePicture: '' // Add profilePicture field
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
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold text-white">KICK off</span>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="flex items-center space-x-4">
          {/* <img
            src={user.profilePicture || 'default-profile-pic-url'} // Use a default picture if none is provided
            alt="Profile"
            className="w-8 h-8 rounded-full"
          /> */}
          <span id="username" className="text-white">{user.username}</span>
          <Link to="/profile" className="text-white hover:underline">Profile</Link>
          <a href="/logout" className="text-white hover:underline">Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
