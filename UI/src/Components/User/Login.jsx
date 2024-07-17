import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Bg from '../User/Images/bg.jpg';
import '../../custom-animations.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save the token and redirect to the user's homepage
        localStorage.setItem('AuthToken', data.token);
        navigate('/home');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${Bg})` }} className="bg-cover flex items-center justify-center min-h-screen">
        <div className="text-center fixed top-8 w-full">
          <h1 className="text-6xl font-bold text-white flex items-center justify-center animate-bounceIn">
            <i className="fas fa-futbol mr-4 animate-spin"></i> Kick Off
          </h1>
        </div>
        <div className="mr-auto ml-8 bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md mx-16 mt-16 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-200">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Link to="/forgot" className="text-black-500 hover:underline">Forgot Password?</Link>
              <Link to="/user-register" className="text-white hover:underline">Sign Up</Link>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
