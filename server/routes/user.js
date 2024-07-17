const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');

// Fetch user profile
router.get('/profile', auth, async (req, res) => {
    try {
      // Fetch user details from database
      const user = await User.findById(req.user.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Update user profile
router.post('/update-profile', auth, async (req, res) => {
    const { username, email, phone, fav_team1, fav_player } = req.body;
  
    try {
      // Update user details in database
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { username, email, phone, fav_team1, fav_player },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Helper function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Endpoint to get friend suggestions
router.get('/friend-suggestions', verifyToken, async (req, res) => {
  const loggedInUserId = req.user.userId;

  try {
    // Find all users except the logged-in user
    let users = await User.find({ _id: { $ne: loggedInUserId } }).select('username _id');

    // Shuffle the user list to provide random suggestions
    users = shuffleArray(users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friend suggestions' });
  }
});

// Endpoint to follow a user
router.post('/follow/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const loggedInUserId = req.user.userId;

  try {
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).json({ error: 'Logged-in user not found' });
    }

    if (!loggedInUser.friends.includes(userId)) {
      loggedInUser.friends.push(userId);
      await loggedInUser.save();
      res.json({ success: true, userId });
    } else {
      res.json({ success: true, message: 'Already following this user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// Endpoint to get connected friends
router.get('/connected-friends', verifyToken, async (req, res) => {
  const loggedInUserId = req.user.userId;

  try {
    const loggedInUser = await User.findById(loggedInUserId).populate('friends', 'username');
    if (!loggedInUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(loggedInUser.friends);
  } catch (error) {
    console.error('Error fetching connected friends:', error);
    res.status(500).json({ error: 'Failed to fetch connected friends' });
  }
});

module.exports = router;
