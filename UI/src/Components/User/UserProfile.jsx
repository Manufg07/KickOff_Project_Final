import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            // src={user.profilePicture || 'default-profile-pic-url'}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">username</h1>
            <p className="text-gray-600">email</p>
            <p className="text-gray-600">phone</p>
            <p className="text-gray-600">Favorite Team: </p>
            <p className="text-gray-600">Favorite Player: </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="text-gray-600">Number of Friends: </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-gray-600">Number of Posts: </p>
          <div className="mt-4">
            {/* {user.posts.map((post) => ( */}
              <div  className="mb-4">
                <h3 className="text-lg font-semibold"></h3>
                <p className="text-gray-700"></p>
                {/* {post.image && <img src={post.image} alt="Post" className="mt-2" />}
                {post.video && ( */}
                  <video controls className="mt-2">
                    {/* <source src={post.video} type="video/mp4" /> */}
                  </video>
                {/* )} */}
              </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;