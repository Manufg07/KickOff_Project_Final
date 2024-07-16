import React from 'react'

const AdminNavBar = () => {
  return (
    <>
            <nav className="bg-blue-800 shadow-lg p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="text-2xl font-bold text-white ml-40">Admin Dashboard</span>
                    <a href="home.html" className="text-white hover:underline">Back to Home</a>
                </div>
            </nav>
    </>
  )
}

export default AdminNavBar