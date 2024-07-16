import React from 'react'
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const toggleSubMenu = (submenuId) => {
        const submenu = document.getElementById(submenuId);
        submenu.classList.toggle('hidden');
    };
  return (
    <>
    {/* <!-- Sidebar --> */}
    <div id="sidebar" className="fixed left-0 top-0 h-full bg-blue-800 text-gray-100 w-20 sm:w-36 overflow-y-auto z-50">
            <div className="p-4">
                {/* <!-- Sidebar header --> */}
                <h2 className="text-xl font-bold mb-4">KICK off</h2>
                {/* <!-- navigation --> */}
                <ul className="space-y-4">
                    <li>
                        <button className="sidebar-link w-full flex items-center justify-center rounded-lg py-2 hover:bg-gray-700 transition duration-300 focus:outline-none" 
                        onClick={() => toggleSubMenu('userManagement')}>
                            <i className="fas fa-users"></i>
                        </button>
                        <ul id="userManagement" className="submenu hidden ml-4 mt-2 space-y-2">
                            <li><Link to="/user" className="load-content block px-2 py-1 rounded-lg hover:bg-gray-700 transition duration-300" >View Users</Link></li>
                        </ul>
                    </li>
                    <li>
                        <button className="sidebar-link w-full flex items-center justify-center rounded-lg py-2 hover:bg-gray-700 transition duration-300 focus:outline-none" 
                        onClick={() => toggleSubMenu('contentManagement')}>
                            <i className="fas fa-file-alt"></i>
                        </button>
                        <ul id="contentManagement" className="submenu hidden ml-4 mt-2 space-y-2">
                            <li><Link to="/post" className="block px-2 py-1 rounded-lg hover:bg-gray-700 transition duration-300">Manage Posts</Link></li>
                            <li><a href="#" className="block px-2 py-1 rounded-lg hover:bg-gray-700 transition duration-300">Manage Comments</a></li>
                        </ul>
                    </li>
                    <li>
                        <button className="sidebar-link w-full flex items-center justify-center rounded-lg py-2 hover:bg-gray-700 transition duration-300 focus:outline-none" 
                        onClick={() => toggleSubMenu('analytics')}>
                            <i className="fas fa-chart-line"></i>
                        </button>
                        <ul id="analytics" className="submenu hidden ml-4 mt-2 space-y-2">
                            <li><Link to="/engagement" className="load-content block px-2 py-1 rounded-lg hover:bg-gray-700 transition duration-300" >User Engagement</Link></li>
                            <li><a href="#" className="load-content block px-2 py-1 rounded-lg hover:bg-gray-700 transition duration-300" data-file="/admin/content.html">Content Performance</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="p-4 mt-96">
                <button className="w-full flex items-center justify-center rounded-lg py-1 bg-blue-800 hover:bg-red-500 transition duration-300 focus:outline-none">
                <span className="ml-2"><a href="adminLogin.html"> Logout</a></span>
                </button>
            </div>
        </div>
    </>
  )
}

export default AdminSidebar