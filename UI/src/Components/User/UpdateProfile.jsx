import React, { useState } from 'react'

const UpdateProfile = () => {
    const [isUpdateSectionVisible, setIsUpdateSectionVisible] = useState(false);
  
    const toggleUpdateSection = () => {
      setIsUpdateSectionVisible(!isUpdateSectionVisible);
    };

  return (
    <>
     {/* <!-- Add Update--> */}
     <div className="flex justify-center mb-8 ml-[-4]">
            <button
                id="toggleUpdateSection" 
                className="bg-green-500 border border-green-600 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                onClick={toggleUpdateSection}>Toggle Update Section</button>
        </div>

        {isUpdateSectionVisible && (<div id="updateSection" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto  border border-gray-300">
            <h2 className="text-2xl font-bold mb-6">Update Your Information</h2>
            <form id="updateForm" action="/user/update-profile" method="post">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    id="username" 
                    name="username" 
                    required/>
                </div>
                    
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                    id="email" 
                    name="email" 
                    required/>
                </div>
                    
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Mobile</label>
                    <input type="tel"  
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                    id="phone" 
                    name="phone"
                    required/>
                </div>
                    
                <div className="mb-4">
                    <label htmlFor="fav_team1" className="block text-gray-700">Favorite Team</label>
                    <input type="text"  
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                    id="fav_team1" 
                    name="fav_team1"
                    required/>
                </div>
                    
                <div className="mb-4">
                    <label htmlFor="fav_player" className="block text-gray-700">Favorite Football Player</label>
                    <input type="text"  
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                    id="fav_player" 
                    name="fav_player"
                    required/>
                </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
            </form>
        </div>
        )}

    </>
  );
};

export default UpdateProfile