import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../Components/Admin/AdminNavBar'
import AdminSidebar from '../Components/Admin/AdminSidebar'

const AdminLayout = () => {
  return (
    <>
    <AdminNavBar/>
    <AdminSidebar/>
    <Outlet/>
    </>
  )
}

export default AdminLayout