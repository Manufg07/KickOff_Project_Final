const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Post = require('../models/Post');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
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

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request
    console.log('User ID:', userId); // Debug statement
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

router.get('/posts', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request
    console.log('User ID for Posts:', userId); // Debug statement
    const posts = await Post.find({ user: userId });
    console.log('Fetched Posts:', posts); // Debug statement

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// router.put('/profile', async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you have user ID in the request object
//     const updatedData = req.body;

//     const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      text: `To reset your password, click the following link: ${process.env.FRONTEND_URL}/reset-password?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset link sent' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating reset token' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
