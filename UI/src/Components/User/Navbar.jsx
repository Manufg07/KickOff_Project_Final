import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/logo.svg';

const Navbar = () => {
  const [user, setUser] = useState({
    username: '',
    profilePicture: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    localStorage.removeItem('AuthToken');
    navigate('/');
  };

  const handleProfilePictureClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.id === 'overlay') {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/home" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={Logo} alt="Logo" className="w-10 h-10" />
            </motion.div>
            <motion.span
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              KICK off
            </motion.span>
          </Link>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {searchResults.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full z-10">
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
          <div className="flex items-center space-x-6">
            <motion.img
              whileHover={{ scale: 1.2 }}
              onClick={handleProfilePictureClick}
              src={user.profilePicture ? `/api/uploads/profile_pictures/${user.profilePicture}` : 'default-profile-pic-url'}
              alt="Profile"
              className="w-10 h-10 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg cursor-pointer"
            />
            <span id="username" className="text-white font-serif text-lg italic hover:text-yellow-300 transition duration-300">{user.username}</span>
            <Link to="/profile" className="text-white hover:text-yellow-300 transition duration-300 text-lg">Profile</Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleLogout}
              className="bg-purple-600 border bottom-1 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-lg"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div
          id="overlay"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
            <img
              src={user.profilePicture ? `/api/uploads/profile_pictures/${user.profilePicture}` : 'default-profile-pic-url'}
              alt="Profile"
              className="w-32 h-32 rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
