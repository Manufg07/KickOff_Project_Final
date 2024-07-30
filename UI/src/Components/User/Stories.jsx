import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../App.css';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/st/stories', {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        setStories(result);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause();
      }
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-purple-600 mb-2">Stories</h2>
      <motion.div
        className="flex space-x-4 overflow-x-auto no-scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            className="relative w-32 h-32 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <p className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full px-2 py-1">{story.user.username}</p>
            {story.mediaType === 'image' && story.media && (
              <motion.img
                src={`/api/uploads/stories/${story.media}`}
                alt="story"
                className="w-full h-full object-cover rounded-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {story.mediaType === 'video' && story.media && (
              <motion.video
                ref={(el) => (videoRefs.current[index] = el)}
                src={`/api/uploads/stories/${story.media}`}
                controls
                className="w-full h-full object-cover rounded-lg"
                onPlay={() => handlePlay(index)}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stories;
