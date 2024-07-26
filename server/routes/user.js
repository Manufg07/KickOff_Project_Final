const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const { profileUpload } = require('./multerConfig')
const verifyToken = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');


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
  

router.post('/update-profile', auth, profileUpload.single('profilePicture'), async (req, res) => {
  const { username, email, phone, fav_team1, fav_player } = req.body;
  const profilePicture = req.file ? req.file.filename : null;

  try {
    const updateData = { username, email, phone, fav_team1, fav_player };
    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    // Update user details in the database
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
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

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Endpoint to get friend suggestions
router.get('/friend-suggestions', verifyToken, async (req, res) => {
  const loggedInUserId = req.user.userId;

  try {
    let users = await User.find({ _id: { $ne: loggedInUserId } }).select('username _id profilePicture');
    users = shuffleArray(users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching friend suggestions:', error);
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
    const loggedInUser = await User.findById(loggedInUserId)
      .populate('friends', 'username profilePicture'); // include profilePicture

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

router.get('/fposts', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the userId from the decoded JWT
    const posts = await Post.find({ user: userId })
      .populate('user', ['username', 'profilePicture'])
      .populate('likes', ['username', 'profilePicture'])
      .populate('comments.user', ['username', 'profilePicture'])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Could not fetch posts' });
  }
});



router.delete('/posts/:postId', verifyToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Find the post and ensure it belongs to the logged-in user
    const post = await Post.findOne({ _id: postId, user: userId });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Could not delete post' });
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
// Generate a random token
// In-memory storage for simplicity (use a database in production)
let tokens = {};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Forgot Password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Generate a token
  const token = crypto.randomBytes(20).toString('hex');

  // Store the token with an expiry time
  tokens[email] = {
    token,
    expires: Date.now() + 3600000, // 1 hour
  };

  // Send email
  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'KICKoff Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://localhost:3000/reset/${token}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email.' });
    } else {
      res.json({ message: 'Password reset link sent to your email.' });
    }
  });
});

// Endpoint to reset the password
router.post('/reset-password', (req, res) => {
  const { token, email, newPassword } = req.body;

  if (!tokens[email] || tokens[email].token !== token || Date.now() > tokens[email].expires) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }

  // Here you should update the user's password in the database.
  // For simplicity, we're just going to clear the token.
  delete tokens[email];

  res.json({ message: 'Password has been reset.' });
});

// Route to get a friend's profile by username
router.get('/friend-profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      fav_team1: user.fav_team1,
      fav_player: user.fav_player,
      profilePicture: user.profilePicture,
      friends: user.friends
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching friend profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
