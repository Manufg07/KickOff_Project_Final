import React from 'react'
import AdminNavBar from './AdminNavBar'

const UserDetails = () => {
  return (
    <>
    <div class="bg-gray-100 font-sans leading-normal tracking-normal">
    <AdminNavBar/>
    <div class="container mx-auto mt-8 p-4">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">User Details</h2>
            <div class="mb-4 text-center">
                <img id="profilePicture" class="w-32 h-32 rounded-full mx-auto mb-4" src="" alt="Profile Picture"/>
                <h3 id="usernameTitle" class="text-xl font-semibold text-gray-800"></h3>
            </div>
            <div>
                <h4 class="text-gray-700 font-semibold">Posts</h4>
                <p id="postsCount" class="text-gray-900 bg-gray-100 rounded-md p-2"></p>
            </div>
            <div>
                <h4 class="text-gray-700 font-semibold">Friends</h4>
                <p id="friendsCount" class="text-gray-900 bg-gray-100 rounded-md p-2"></p>
            </div>
            <div class="mb-4">
                <label for="username" class="block text-gray-700 font-semibold">Username</label>
                <p id="username" class="text-gray-900 bg-gray-100 rounded-md p-2"></p>
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 font-semibold">Email</label>
                <p id="email" class="text-gray-900 bg-gray-100 rounded-md p-2"></p>
            </div>
            <div class="mb-4">
                <label for="fav_team1" class="block text-gray-700 font-semibold">Favorite Team 1</label>
                <p id="fav_team1" class="text-gray-900 bg-gray-100 rounded-md p-2"></p>
            </div>
            <div class="mb-4">
                <label for="fav_player" class="block text-gray-700 font-semibold">Favorite Football Player</label>
                <p id="fav_player" class="text-gray-900 bg-gray-100 rounded-md p-2"></p>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default UserDetails