import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState({
    username: '',
    profilePicture: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      fetch(`/api/user/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error('Error searching for users:', error));
    } else {
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('User');

    // Navigate to the landing page (login or home page)
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-600 shadow-lg p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home">
          <span className="text-2xl font-bold text-white hover:scale-110 transform transition duration-300">KICK off</span>
        </Link>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {searchResults.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full">
              {searchResults.map((result) => (
                <Link
                  key={result._id}
                  to={`/profile/${result.username}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {result.username}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={user.profilePicture ? `/api/uploads/profile_pictures/${user.profilePicture}` : 'default-profile-pic-url'}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span id="username" className="text-white">{user.username}</span>
          <Link to="/profile" className="text-white hover:underline hover:text-yellow-400">Profile</Link>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#e3342f' }}
            onClick={handleLogout}
            className="text-white hover:underline"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
