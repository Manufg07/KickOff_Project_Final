import React, { useState, useEffect } from 'react';

const UpdateProfile = () => {
  const [isUpdateSectionVisible, setIsUpdateSectionVisible] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    fav_team1: '',
    fav_player: ''
  });

  const fetchUserData = () => {
    fetch('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
        console.log(response); // Log the response status
        console.log(response.headers);
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
    }
  const toggleUpdateSection = () => {
    if (!isUpdateSectionVisible) {
      fetchUserData();
    }
    setIsUpdateSectionVisible(!isUpdateSectionVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/user/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error updating profile:', data.error);
        } else {
          alert('Profile updated successfully!');
        }
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <>
      <div className="flex justify-center mb-8 ml-[-4]">
        <button
          id="toggleUpdateSection"
          className="bg-green-500 border border-green-600 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          onClick={toggleUpdateSection}
        >
          Toggle Update Section
        </button>
      </div>

      {isUpdateSectionVisible && (
        <div id="updateSection" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto  border border-gray-300">
          <h2 className="text-2xl font-bold mb-6">Update Your Information</h2>
          <form id="updateForm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Mobile</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fav_team1" className="block text-gray-700">Favorite Team</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                id="fav_team1"
                name="fav_team1"
                value={user.fav_team1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fav_player" className="block text-gray-700">Favorite Football Player</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                id="fav_player"
                name="fav_player"
                value={user.fav_player}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
