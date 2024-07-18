import React from 'react'
// import AdminHomePage from '../../Pages/Admin/AdminHomePage'
import { Link } from 'react-router-dom'

const AdminNavBar = () => {
  return (
    <>
            <nav className="bg-blue-800 shadow-lg p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="text-2xl font-bold text-white ml-40">Admin Dashboard</span>
                    <Link to="/AdminHome" className="text-white hover:underline">Back to Home</Link>
                </div>
            </nav>
    </>
  )
}

export default AdminNavBar