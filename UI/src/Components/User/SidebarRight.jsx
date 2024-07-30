import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import uefa from '../../assets/uefA.jpeg';
import match2 from '../../assets/Real.jpeg';

const SidebarRight = ({ updateConnectedFriends }) => {
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchFriendSuggestions = async () => {
        try {
          const response = await fetch('/api/user/friend-suggestions', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) throw new Error('Failed to fetch friend suggestions');
          const data = await response.json();
          console.log('Friend Suggestions:', data); // Log friend suggestions
          if (Array.isArray(data)) {
            setFriendSuggestions(data);
          } else {
            console.error('Data is not an array:', data);
            setFriendSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching friend suggestions:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchFriendSuggestions();
    }, []);

  const handleFollow = async (userId) => {
    try {
      const response = await fetch(`/api/user/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setFriendSuggestions(prevSuggestions =>
          prevSuggestions.filter(friend => friend._id !== userId)
        );
        window.location.reload();
        updateConnectedFriends();
      } else {
        console.error('Follow failed:', data);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-12 md:col-span-3 bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Friends</h2>
      <div id="friendSuggestions">
        {Array.isArray(friendSuggestions) && friendSuggestions.length > 0 ? (
          friendSuggestions.map(friend => (
            <div key={friend._id} className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                {friend.profilePicture && (
                  <img
                    src={`/api/uploads/profile_pictures/${friend.profilePicture}`}
                    alt={`${friend.username}'s profile`}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                <Link to={`/user/${friend.username}`} className="text-gray-800">{friend.username}</Link>
              </div>
              <button
                onClick={() => handleFollow(friend._id)}
                className="bg-purple-600 text-white py-1 px-3 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Follow
              </button>
            </div>
          ))
        ) : (
          <p>No friend suggestions available</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-md font-semibold">Recent Matches</h3>
        <div className="mb-2">
          <img src={uefa} alt="Team A vs Team B" className="rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full"/>
          <p className="text-gray-600">Team A vs Team B</p>
        </div>
        <div className="mb-2">
          <img src={match2} alt="Team C vs Team D" className="rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full"/>
          <p className="text-gray-600">Team C vs Team D</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-md font-semibold">Upcoming Events</h3>
        <div className="mb-2">
          <img src="/images/uefA.jpeg" alt="Upcoming Event" className="rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full"/>
          <p className="text-gray-600">Event Name 1</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
