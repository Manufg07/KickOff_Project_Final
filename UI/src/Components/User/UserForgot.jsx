import React, { useState } from 'react';
import Bg from '../User/Images/bg.jpg';
import '../../custom-animations.css'; 

const UserForgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${Bg})` }} className="bg-cover flex items-center justify-center min-h-screen">
      <div className="text-center fixed top-8 w-full">
        <h1 className="text-6xl font-bold text-white flex items-center justify-center animate-bounceIn">
          <i className="fas fa-futbol mr-4 animate-spin"></i> Kick Off
        </h1>
      </div>
      <div className="mr-auto ml-8 bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md mx-16 mt-16 border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-200">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </form>
        {message && <p className="mt-4 text-gray-200">{message}</p>}
      </div>
    </div>
  );
};

export default UserForgot;
