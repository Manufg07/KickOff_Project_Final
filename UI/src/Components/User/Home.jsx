import React from 'react'
import Navbar from './Navbar'
import SidebarLeft from './SidebarLeft'
import MainContent from './MainContent'
import SidebarRight from './SidebarRight'

const Home = () => {
  return (
    <>
    {/* <!-- Main content --> */}
    <div className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-12 gap-4">
    <SidebarLeft/>
    <MainContent/>
    <SidebarRight/>
    </div>
    </>
  )
}

export default Home