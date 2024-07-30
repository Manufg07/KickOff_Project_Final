// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: '' },
  mediaType: { type: String, required: true }, // Add this field
  media: { type: String, required: true }, // Add this field
  createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
