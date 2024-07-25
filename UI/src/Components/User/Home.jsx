import React from 'react';
import Navbar from './Navbar';
import SidebarLeft from './SidebarLeft';
import MainContent from './MainContent';
import SidebarRight from './SidebarRight';

const Home = () => {
  return (
    <>
      <div className="relative max-w-7xl mx-auto mt-8 px-4 h-screen flex">
        <div className="fixed top-16 left-0 w-full sm:w-1/4 h-screen bg-gray-100 z-10 overflow-y-auto scrollbar-hidden">
          <SidebarLeft />
        </div>

       
        <div className="ml-0 sm:ml-[25%] mr-0 sm:mr-[25%] h-screen overflow-y-auto scrollbar-hidden">
          <MainContent />
        </div>

        <div className="fixed top-16 right-0 w-full sm:w-1/4 h-screen bg-gray-100 z-10 overflow-y-auto scrollbar-hidden">
          <SidebarRight />
        </div>
      </div>
    </>
  );
}

export default Home;
