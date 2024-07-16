import React from 'react'
import IMG from '../../assets/5618236.jpg'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
  return (
    <>
        <div style={{ backgroundImage: `url(${IMG})` }} className=" bg-cover flex items-center justify-center min-h-screen">
            <div className="text-center fixed top-8 w-full">
                <h1 className="text-6xl font-bold text-white bounce-in flex items-center justify-center">
                    <i className="fas fa-futbol spin mr-4"></i> Kick Off
                </h1>
            </div>
        <div  className="mx-auto  bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md mx-16 mt-16 border-2 border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">Login</h2>
            <form action="/admin/login"  method="POST">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-200">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required/>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-200">Password</label>
                    <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required/>
                </div>
                
                <div className="mb-4 flex items-center justify-between">
                    <a href="adminForgot.html" className="text-black-500 hover:underline">Forgot Password?</a>
                    <Link to="/admin-register" className="text-white hover:underline">Sign Up</Link>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
            </form>
        </div>
    </div>

    </>
  )
}

export default AdminLogin