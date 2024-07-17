import React from 'react';
import Bg from '../User/Images/bg.jpg';
import '../../custom-animations.css'; 

const UserForgot = () => {
  return (
    <>
      <div style={{ backgroundImage: `url(${Bg})` }} className="bg-cover flex items-center justify-center min-h-screen">
        <div className="text-center fixed top-8 w-full">
          <h1 className="text-6xl font-bold text-white flex items-center justify-center animate-bounceIn">
            <i className="fas fa-futbol mr-4 animate-spin"></i> Kick Off
          </h1>
        </div>
        <div className="mr-auto ml-8 bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md mx-16 mt-16 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Reset Password</h2>
          <form action="#" method="POST">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-200">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
            </div>
            {/* <div className="mb-4">
              <label htmlFo<Route path="/forgot" element={<UserForgot/>}/>r="password" className="block text-gray-200">Password</label>
              <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required />
            </div> */}
            {/* <div className="mb-4 flex items-center justify-between">
              <a href="User_Forgot.html" className="text-black-500 hover:underline">Login</a>
            </div> */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserForgot;
