import React, { useState, useEffect } from 'react';
import Post from './Post';
import Leagues from './Leagues';
import UpdateProfile from './UpdateProfile';

const SidebarLeft = () => {
  const [user, setUser] = useState({
    fav_team1: '',
    fav_player: ''
  });
  const [connectedFriends, setConnectedFriends] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchConnectedFriends();
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

  const fetchConnectedFriends = () => {
    fetch('/api/user/connected-friends', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setConnectedFriends(data))
      .catch(error => console.error('Error fetching connected friends:', error));
  };

  return (
    <>
      {/* <!-- Sidebar L--> */}
      <div className="col-span-3 bg-white shadow-lg p-4 space-y-4 rounded-lg">
        <h2 className="text-lg font-semibold text-purple-600">Dashboard</h2>
        <div className="space-y-4">
          {/* <!-- Connected Friends--> */}
          <div>
            <h3 className="text-md font-semibold">Connected Friends</h3>
            <div id="connectedFriends">
              {connectedFriends.map(friend => (
                <div key={friend._id} className="mb-2 flex items-center">
                  <img
                    src={`https://via.placeholder.com/40?text=${friend.username?.charAt(0) || 'U'}`}
                    alt={friend.username || 'Unknown'}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span>{friend.username || 'Unknown'}</span>
                </div>
              ))}
            </div>
          </div>

          <Post />

          {/* <!-- Favorite Team--> */}
          <div>
            <h3 className="text-md font-semibold">Favorite Team</h3>
            <div className="mb-2 flex items-center">
              <img src="https://via.placeholder.com/40" alt="Fav_Team" className="w-10 h-10 rounded-full mr-2" />
              <span>{user.fav_team1}</span>
            </div>
          </div>

          {/* <!-- Favorite Player--> */}
          <div>
            <h3 className="text-md font-semibold">Favorite Player</h3>
            <div className="mb-2 flex items-center">
              <img src="https://via.placeholder.com/40" alt="Fav_Player" className="w-10 h-10 rounded-full mr-2" />
              <span>{user.fav_player}</span>
            </div>
          </div>

          <Leagues />

          <UpdateProfile />
        </div>
      </div>
    </>
  );
};

export default SidebarLeft;
