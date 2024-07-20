// import React, { useEffect, useState } from 'react';
// import uefa from '../../assets/uefA.jpeg'
// import match2 from '../../assets/Real.jpeg'


// const SidebarRight = () => {
//   const [friendSuggestions, setFriendSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // friend suggestions 
//     fetch('/api/user/friend-suggestions', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Friend Suggestions:', data); 
//         setFriendSuggestions(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching friend suggestions:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleFollow = (userId) => {
  
//     fetch(`/api/user/follow/${userId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Follow successful:', data);
        
//       })
//       .catch(error => {
//         console.error('Error following user:', error);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="col-span-3 bg-white shadow-lg p-4 rounded-lg">
//       <h2 className="text-lg font-semibold text-purple-600 mb-4">Friends</h2>
//       <div id="friendSuggestions">
//         {friendSuggestions.map((friend) => (
//           <div key={friend._id} className="mb-4 flex items-center justify-between">
//             <div>
//               <p className="text-gray-800">{friend.username}</p>
//             </div>
//             <button
//               onClick={() => handleFollow(friend._id)}
//               className="bg-purple-600 text-white py-1 px-3 rounded-lg hover:bg-purple-700 transition duration-300"
//             >
//               Follow
//             </button>
//           </div>
//         ))}
//       </div>

//       <div>
//         <h3 className="text-md font-semibold">Recent Matches</h3>
//         <div className="mb-2">
//           <img src={uefa} alt="Match 1" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
//           <p className="text-gray-600">Team A vs Team B</p>
//         </div>
//         <div className="mb-2">
//           <img src={match2} alt="Match 2" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
//           <p className="text-gray-600">Team C vs Team D</p>
//         </div>
//       </div>

//       <div>
//         <h3 className="text-md font-semibold">Upcoming Events</h3>
//         <div className="mb-2">
//           <img src="/images/uefA.jpeg" alt="Event 1" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
//           <p className="text-gray-600">Event Name 1</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarRight;

import React, { useEffect, useState } from 'react';
import uefa from '../../assets/uefA.jpeg';
import match2 from '../../assets/Real.jpeg';

const SidebarRight = ({ updateConnectedFriends }) => {
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/friend-suggestions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFriendSuggestions(data);
        } else {
          console.error('Data is not an array:', data);
          setFriendSuggestions([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching friend suggestions:', error);
        setLoading(false);
      });
  }, []);

  const handleFollow = (userId) => {
    fetch(`/api/user/follow/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Follow successful:', data);
          setFriendSuggestions((prevSuggestions) =>
            prevSuggestions.filter((friend) => friend._id !== userId)
          );
          // Update connected friends list in SidebarLeft
          updateConnectedFriends();
        } else {
          console.error('Follow failed:', data);
        }
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
        {Array.isArray(friendSuggestions) && friendSuggestions.length > 0 ? (
          friendSuggestions.map((friend) => (
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
          ))
        ) : (
          <p>No friend suggestions available</p>
        )}
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
