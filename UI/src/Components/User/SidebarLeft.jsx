import React, { useState, useEffect } from 'react';
import Post from './Post';
import Leagues from './Leagues';
import UpdateProfile from './UpdateProfile';
import favteam from '../../assets/Land.jpeg';
import pl from '../../assets/204.jpg';

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

  const updateConnectedFriends = () => {
    fetchConnectedFriends();
  };

  return (
    <>
      <div className="col-span-12 md:col-span-3 bg-white shadow-lg p-4 space-y-4 rounded-lg">
        <h2 className="text-lg font-semibold text-purple-600">Dashboard</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold">Connected Friends</h3>
            <div id="connectedFriends">
              <ul className="mt-2">
                {connectedFriends.map(friend => (
                  <li key={friend._id} className="text-gray-700 flex items-center my-2">
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
          </div>

          <div>
            <h3 className="text-md font-semibold">Favorite Team</h3>
            <div className="mb-2 flex items-center">
              <img src={favteam} alt="Fav_Team" className="w-10 h-10 rounded-full mr-2" />
              <span>{user.fav_team1}</span>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold">Favorite Player</h3>
            <div className="mb-2 flex items-center">
              <img src={pl} alt="Fav_Player" className="w-10 h-10 rounded-full mr-2" />
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
