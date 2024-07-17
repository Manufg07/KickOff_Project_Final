import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bg from '../User/Images/bg.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, phone, password, confirm_password, terms } = formData;

    if (password !== confirm_password) {
      alert('Passwords do not match');
      return;
    }

    if (!terms) {
      alert('You must agree to the terms and conditions');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, password, confirm_password, terms }),
      });

      if (response.ok) {
        navigate('/user-login'); // Redirect to login page on successful registration
      } else {
        const errorData = await response.json();
        console.log(errorData)
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${Bg})` }} className="bg-cover bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="text-center fixed top-4 w-full">
        <h1 className="text-6xl font-bold text-white bounce-in flex items-center justify-center">
          <i className="fas fa-futbol spin mr-4"></i> Kick Off
        </h1>
      </div>
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-md mr-auto ml-6 mt-24 border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-100">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-100">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-100">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-100">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-gray-100">Confirm Password</label>
            <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} className="mr-2" />
            <label htmlFor="terms" className="text-gray-100">I agree to the <a href="#" className="text-black-500 hover:underline">terms and conditions</a></label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
        </form>
        <a className="text-white underline mt-4 block text-center" href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
