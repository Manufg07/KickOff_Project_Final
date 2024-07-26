// EmojiPicker.js
import React from 'react';
import { emojis } from './emoji'; // Import the emoji data

const EmojiPicker = ({ onEmojiClick }) => {
  return (
    <div className="absolute top-16 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <div className="grid grid-cols-6 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="text-2xl p-2 hover:bg-gray-100 rounded transition duration-200"
            onClick={() => onEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
