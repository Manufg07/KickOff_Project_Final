import React from 'react'
import AdminNavBar from './AdminNavBar'
import AdminSidebar from './AdminSidebar'
import AdminMainArea from './AdminMainArea'

const AdminHome = () => {
  return (
    <>
    <div className="bg-gray-100 font-sans">
        <AdminSidebar/>
        
        {/* <!-- Main area --> */}
        <div id="Maincontent" className="ml-20 sm:ml-36">
            <AdminNavBar/>
            <AdminMainArea/>
        </div>
    </div>
    </>
  )
}

export default AdminHome