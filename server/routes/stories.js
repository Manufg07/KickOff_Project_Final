// routes/stories.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { storyUpload } = require('../routes/multerConfig');
const Story = require('../models/Story');
const moment = require('moment');

// Create a new story
router.post('/stories', auth, storyUpload.single('media'), async (req, res) => {
  const { text, mediaType } = req.body;
  const media = req.file ? req.file.filename : null;

  if (!mediaType || !media) {
    return res.status(400).json({ error: 'Media type and media file are required' });
  }

  try {
    const newStory = new Story({
      user: req.user.userId,
      text,
      mediaType,
      media,
      createdAt: new Date(),
    });

    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'Could not create story' });
  }
});

// Get all active stories (within the last 24 hours)
router.get('/stories', auth, async (req, res) => {
  try {
    const now = moment();
    const stories = await Story.find({
      createdAt: {
        $gte: now.subtract(24, 'hours').toDate(),
      },
    })
      .populate('user', ['username', 'profilePicture'])
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Could not fetch stories' });
  }
});

// Get stories by a specific user
router.get('/stories/user/:userId', auth, async (req, res) => {
  try {
    const now = moment();
    const stories = await Story.find({
      user: req.params.userId,
      createdAt: {
        $gte: now.subtract(24, 'hours').toDate(),
      },
    })
      .populate('user', ['username', 'profilePicture'])
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (error) {
    console.error('Error fetching user stories:', error);
    res.status(500).json({ error: 'Could not fetch user stories' });
  }
});



module.exports = router;
