import React, { useState } from 'react'

const Post = () => {

    const [isPostSectionVisible, setIsPostSectionVisible] = useState(false);

    const togglePostButton = () =>{
         setIsPostSectionVisible(!isPostSectionVisible);
    }

  return (
    <>
     {/* <!-- Toggle Button --> */}
     <h3 id="togglePostButton" className="text-md font-semibold cursor-pointer border border-gray-400 bg-gray-300 rounded-lg w-auto text-center" 
     onClick={togglePostButton}>Post Your Content</h3>

        {/* <!-- Content Posting Section --> */}
        {isPostSectionVisible && (<div id="postSection" className=" mt-4">
            <form id="postForm" encType="multipart/form-data" className="space-y-4">
                <div>
                    <label htmlFor="postText" className="block text-gray-700 font-medium">Text</label>
                    <textarea id="postText" name="text" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
                </div>
                
                <div>
                    <label htmlFor="postImage" className="block text-gray-700 font-medium">Image</label>
                    <input type="file" id="postImage" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" onChange="previewFile(event, 'imagePreview')"/>
                    <img id="imagePreview" className="mt-2 max-w-xs rounded-lg shadow-md" alt="Image Preview"/>
                </div>
                
                <div>
                    <label htmlFor="postVideo" className="block text-gray-700 font-medium">Video</label>
                    <input type="file" id="postVideo" name="video" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" onChange="previewFile(event, 'videoPreview')"/>
                    <video id="videoPreview" className="mt-2 max-w-xs rounded-lg shadow-md" controls></video>
                </div>
            
                <button type="submit" className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition duration-300">Post</button>
            </form>
        </div>
        )}
    </>
  );
};

export default Post