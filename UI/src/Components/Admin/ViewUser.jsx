import React, { useEffect, useState } from 'react';

const ViewUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetch('/api/admin/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    fetch(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.userId !== userId));
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <>
      <div className="bg-gray-100 ml-40">
        <div className="container max-w-6xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
          <div className="text-3xl font-bold text-center mb-6 text-indigo-600">Users List</div>
          <div className="text-right mb-6">
            <button className="bg-indigo-500 text-white rounded px-4 py-2 ml-2 hover:bg-indigo-600">Search</button>
            <button className="bg-indigo-500 text-white rounded px-4 py-2 ml-2 hover:bg-indigo-600">Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Mobile</th>
                  <th className="px-32 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                    <td className="px-32 py-4 whitespace-nowrap">
                      <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Edit</button>
                      <button className="bg-red-500 text-white rounded px-4 py-2 ml-2 hover:bg-red-600" onClick={() => handleDelete(user.userId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
