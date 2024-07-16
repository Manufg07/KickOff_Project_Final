import React from 'react'
import Post from './Post'
import Leagues from './Leagues'
import UpdateProfile from './UpdateProfile'

const SidebarLeft = () => {
  return (
    <>
        {/* <!-- Sidebar L--> */}
<div className="col-span-3 bg-white shadow-lg p-4 space-y-4 rounded-lg">
    <h2 className="text-lg font-semibold text-purple-600">Dashboard</h2>
    <div className="space-y-4">
            
        {/* <!-- Connected Friends--> */}
        <div>
            <h3 className="text-md font-semibold">Connected Friends</h3>
            <div id="connectedFriends">
                {/* <!-- Connected friends will be dynamically added here --> */}
            </div>
            
        </div>

        <Post/>

       
  {/* <!-- Favorite Team--> */}
        <div>
            <h3 className="text-md font-semibold">Favorite Team</h3>
            <div className="mb-2 flex items-center">
                <img src="https://via.placeholder.com/40" alt="Fav_Team" className="w-10 h-10 rounded-full mr-2"/>
                {/* <span>{{fav_team1}}</span> */}
            </div>
        </div>

        {/* <!-- Favorite Player--> */}
        <div>
            <h3 className="text-md font-semibold">Favorite Player</h3>
            <div className="mb-2 flex items-center">
                <img src="https://via.placeholder.com/40" alt="Fav_Player" className="w-10 h-10 rounded-full mr-2"/>
                {/* <span>{{fav_player}}</span> */}
            </div>
        </div>

        <Leagues/>

        <UpdateProfile/>
          
                       {/* <!-- <div className="p-4 mt-96">
                    <button className="w-full flex items-center justify-center rounded-lg py-1 bg-blue-800 hover:bg-red-500 transition duration-300 focus:outline-none">
                       <span className="ml-2"><a href="User_Login.html"> Logout</a></span>
                    </button>
                </div> --> */}
    </div>
</div>

    </>
  )
}

export default SidebarLeft