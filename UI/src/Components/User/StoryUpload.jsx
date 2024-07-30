import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
      window.location.reload();
      // You can refresh the stories list here
    } catch (error) {
      console.error('Error uploading story:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="bg-gray-200 p-2 rounded-lg w-full mb-2"
      />
      <motion.button
        type="submit"
        className="mt-2 bg-purple-600 text-white py-1 px-4 rounded-lg w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Upload Story
      </motion.button>
    </motion.form>
  );
};

export default StoryUpload;
