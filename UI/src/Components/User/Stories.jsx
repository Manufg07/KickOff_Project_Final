import React, { useEffect, useState } from 'react';

const Stories = () => {
  const [stories, setStories] = useState([]);

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

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-purple-600 mb-2">Stories</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {stories.map((story) => (
          <div key={story._id} className="relative w-32 h-32 flex-shrink-0">
            <p className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full px-2 py-1">{story.user.username}</p>
            {story.mediaType === 'image' && story.media && (
              <img
                src={`/api/uploads/stories/${story.media}`}
                alt="story"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {story.mediaType === 'video' && story.media && (
              <video
                src={`/api/uploads/stories/${story.media}`}
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
