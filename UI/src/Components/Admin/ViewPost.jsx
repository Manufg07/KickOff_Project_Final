import React, { useEffect, useState } from 'react';

const ViewPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts
    fetch('/api/admin/posts', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(data => {
      setPosts(data);
    })
    .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('Admintoken');
      const response = await fetch(`/api/user/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Post deleted:', data);
      // Optionally, update the state to remove the deleted post from the UI
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 ml-40">
        <div className="container max-w-6xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
          <div className="text-3xl font-bold text-center mb-6 text-indigo-600">Posts List</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Post ID</th>
                  {/* <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">User ID</th> */}
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Text</th>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Video</th>
                  <th className="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Created At</th>
                  <th className="px-32 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody id="postTableBody" className="divide-y divide-gray-200">
                {posts.map(post => (
                  <tr key={post._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post._id}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.userId}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.text}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.image ? <img src={`http://localhost:5000/uploads/${post.image}`} alt="Post" className="h-20" /> : 'No Image'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.video ? <video src={`http://localhost:5000/uploads/${post.video}`} className="h-20" controls /> : 'No Video'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(post.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-red-500 text-white rounded px-4 py-2 ml-16 items-center hover:bg-red-600" onClick={() => deletePost(post._id)}>Delete</button>
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
}

export default ViewPost;
