import React from 'react'

const AdminRegister = () => {
  return (
    <>
    <div className="bg-[url('/images/5618236.jpg')] bg-cover bg-gray-100 flex items-center justify-center min-h-screen ">
    <div className="text-center fixed top-8 w-full">
        <h1 className="text-6xl font-bold text-white bounce-in flex items-center justify-center">
            <i className="fas fa-futbol spin mr-4"></i> Kick Off
        </h1>
    </div>
    <div  className= "mx-auto bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md mt-28 border border-gray-300">
        <h2 className="text-2xl font-bold mb-2 text-gray-100">Create an Account</h2>
        <form action="#" method="POST">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-100">Username</label>
                <input type="text" id="username" name="username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required/>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100">Email</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required/>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-100">Password</label>
                <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required/>
            </div>
            <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-gray-100">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" required/>
            </div>
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="terms" name="terms" className="mr-2"/>
                <label htmlFor="terms" className="text-black-500">I agree to the <a href="#" className="text-black-500 hover:underline">terms and conditions</a></label>
            </div>
            <a href="home.html"><button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button></a>
        </form>
        <a className="text-pink-400 hover:text-red-500 ml-80 pt-20 underline" href="admin/login">Login</a>
    </div>
</div>
    </>
  )
}

export default AdminRegister