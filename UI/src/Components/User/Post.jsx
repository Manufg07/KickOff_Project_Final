import React, { useState } from 'react';

const Post = ({ onPostCreated }) => {
  const [isPostSectionVisible, setIsPostSectionVisible] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const togglePostButton = () => {
    setIsPostSectionVisible(!isPostSectionVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      const response = await fetch('/api/pt/posts', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newPost = await response.json();
      onPostCreated(newPost);
      setText('');
      setImage(null);
      setVideo(null);
      setIsPostSectionVisible(false);
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <>
      <h3
        id="togglePostButton"
        className="text-md font-semibold cursor-pointer border border-gray-400 bg-gray-300 rounded-lg w-auto text-center"
        onClick={togglePostButton}
      >
        Post Your Content
      </h3>
      {isPostSectionVisible && (
        <div id="postSection" className="mt-4">
          <form id="postForm" encType="multipart/form-data" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="postText" className="block text-gray-700 font-medium">Text</label>
              <textarea
                id="postText"
                name="text"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="postImage" className="block text-gray-700 font-medium">Image</label>
              <input
                type="file"
                id="postImage"
                name="image"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image && <img src={URL.createObjectURL(image)} alt="Image Preview" className="mt-2 max-w-xs rounded-lg shadow-md" />}
            </div>
            <div>
              <label htmlFor="postVideo" className="block text-gray-700 font-medium">Video</label>
              <input
                type="file"
                id="postVideo"
                name="video"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setVideo(e.target.files[0])}
              />
              {video && (
                <video className="mt-2 max-w-xs rounded-lg shadow-md" controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                </video>
              )}
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition duration-300">
              Post
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Post;
