import React from 'react'

const SidebarRight = () => {
  return (
    <>
        {/* <!-- Sidebar R--> */}
    <div className="col-span-3 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-purple-600 mb-4">Friends</h2>
        <div id="friendSuggestions">
            {/* <!-- Friend suggestions will be dynamically added here --> */}
        </div>
        {/* <!-- Recent Matches --> */}
        <div>
            <h3 className="text-md font-semibold">Recent Matches</h3>
            
            <div className="mb-2">
                <img src="/images/RM vs FCB.jpeg" alt="Match 1" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
                <p className="text-gray-600">Team A vs Team B</p>
            </div>

            <div className="mb-2">
                <img src="/images/FB.jpeg" alt="Match 2" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
                <p className="text-gray-600">Team C vs Team D</p>
            </div>
        </div>

        {/* <!-- Upcoming Events--> */}
        <div>
            <h3 className="text-md font-semibold">Upcoming Events</h3>
            <div className="mb-2">
                <img src="/images/uefA.jpeg" alt="Event 1" className="rounded-lg shadow-md hover:shadow-xl transition duration-300"/>
                <p className="text-gray-600">Event Name 1</p>
            </div>
        </div>

    </div>

    </>
  )
}

export default SidebarRight