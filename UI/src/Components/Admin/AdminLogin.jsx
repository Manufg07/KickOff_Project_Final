import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IMG from '../../assets/5618236.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save the token and redirect to the admin homepage
        localStorage.setItem('AdminToken', data.token);
        navigate('/Adminhome');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${IMG})` }} className="bg-cover flex items-center justify-center min-h-screen">
        <div className="text-center fixed top-8 w-full">
          <h1 className="text-6xl font-bold text-white bounce-in flex items-center justify-center">
            <i className="fas fa-futbol spin mr-4"></i> Kick Off
          </h1>
        </div>
        <div className="mx-auto bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md mt-16 border-2 border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Login</h2>
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-200">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Link to="/adminforgot" className="text-black-500 hover:underline">Forgot Password?</Link>
              <Link to="/admin-register" className="text-white hover:underline">Sign Up</Link>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
