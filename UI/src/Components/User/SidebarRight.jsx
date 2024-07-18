import React, { useEffect, useState } from 'react';
import uefa from '../../assets/uefA.jpeg'
import match2 from '../../assets/Real.jpeg'


const SidebarRight = () => {
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch friend suggestions from the API
    fetch('/api/user/friend-suggestions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Friend Suggestions:', data); // Debugging line
        setFriendSuggestions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching friend suggestions:', error);
        setLoading(false);
      });
  }, []);

  const handleFollow = (userId) => {
    // Handle follow action
    fetch(`/api/user/follow/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Follow successful:', data);
        // Optionally update the UI to reflect the follow action
      })
      .catch(error => {
        console.error('Error following user:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-3 bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Friends</h2>
      <div id="friendSuggestions">
        {friendSuggestions.map((friend) => (
          <div key={friend._id} className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-gray-800">{friend.username}</p>
            </div>
            <button
              onClick={() => handleFollow(friend._id)}
              className="bg-purple-600 text-white py-1 px-3 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-md font-semibold">Recent Matches</h3>
        <div className="mb-2">
          <img src={uefa} alt="Match 1" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
          <p className="text-gray-600">Team A vs Team B</p>
        </div>
        <div className="mb-2">
          <img src={match2} alt="Match 2" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
          <p className="text-gray-600">Team C vs Team D</p>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold">Upcoming Events</h3>
        <div className="mb-2">
          <img src="/images/uefA.jpeg" alt="Event 1" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
          <p className="text-gray-600">Event Name 1</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
