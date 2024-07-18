import React, { useEffect } from 'react';

const AdminMainArea = () => {

  useEffect(() => {
   
    fetch('/api/admin/totalUsers', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Fetch total users response status:', response.status); 
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) }); // json
      }
      return response.json();
    })
    .then(data => {
      console.log('Received total users data:', data); 
      document.getElementById('totalUsers').innerText = data.totalUsers;
    })
    .catch(error => console.error('Error fetching total users:', error));
    
  
  fetch('/api/admin/totalPosts', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('Fetch total posts response status:', response.status); 
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text) }); 
    }
    return response.json();
  })
  .then(data => {
    console.log('Received total posts data:', data); // Debugging 
    document.getElementById('totalPosts').innerText = data.totalPosts;
  })
  .catch(error => console.error('Error fetching total posts:', error));
}, []);

  return (
    <>
      <section id="content" className="bg-gray-50 shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border-l-4 border-r-4 border-blue-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex items-center">
            <div>
              <h3 className="text-blue-900 text-sm font-semibold mb-1">Total Users</h3>
              <p id="totalUsers" className="text-3xl font-bold text-blue-900">Loading...</p>
            </div>
          </div>
          <div id="totalPostsContainer" className="bg-white border-l-4 border-r-4 border-green-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex items-center">
            <div>
              <h3 className="text-green-900 text-sm font-semibold mb-1">Total Posts</h3>
              <p id="totalPosts" className="text-3xl font-bold text-green-900">Loading...</p>
              {/* {totalPosts} */}
            </div>
          </div>
          <div className="bg-white border-l-4 border-r-4 border-yellow-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex items-center">
            <div>
              <h3 className="text-yellow-900 text-sm font-semibold mb-1">Active Users</h3>
              <p className="text-3xl font-bold text-yellow-900">Loading...</p>
              {/* {activeUsers} */}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 px-4">
          <h2 className="text-lg font-semibold text-purple-600 mb-4">Admin Dashboard</h2>
          <p>Select sidebar to view.</p>
        </div>  
      </section>
    </>
  );
}

export default AdminMainArea;
