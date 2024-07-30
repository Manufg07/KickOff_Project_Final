import React, { useState } from 'react';

const StoryUpload = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [mediaType, setMediaType] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file);
        setMediaType('image');
      } else if (file.type.startsWith('video/')) {
        setVideo(file);
        setMediaType('video');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mediaType === 'image' && image) {
      formData.append('media', image);
    } else if (mediaType === 'video' && video) {
      formData.append('media', video);
    }
    formData.append('mediaType', mediaType);

    try {
      const response = await fetch('/api/st/stories', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const result = await response.json();
      console.log('Story uploaded:', result);
      // You can refresh the stories list here
    } catch (error) {
      console.error('Error uploading story:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="bg-gray-200 p-2 rounded-lg" />
      <button type="submit" className="mt-2 bg-purple-600 text-white py-1 px-4 rounded-lg">Upload Story</button>
    </form>
  );
};

export default StoryUpload;
