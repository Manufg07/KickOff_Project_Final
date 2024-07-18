require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User'); // 
const Post = require('../models/Post')
const verifyAdminToken = require('../middleware/VerifyAdminToken'); //
const router = express.Router();

// Load environment variables
const { JWT_SECRET } = process.env;

// Admin Registration
router.post('/register', async (req, res) => {
  const { username, email, password, confirm_password, terms } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (!terms) {
    return res.status(400).json({ error: 'You must agree to the terms and conditions' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token to the client
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Endpoint to get total users
router.get('/totalUsers',  async (req, res) => {
  try {
      const totalUsers = await User.countDocuments({});
      res.json({ totalUsers });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching total users');
  }
});

//post
router.get('/totalPosts', async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments({});
    res.json({ totalPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total posts');
  }
});

router.get('/users', async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching users' });
  }
});


// DELETE user by userId
router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOneAndDelete({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

//fetch post
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Endpoint to get user registrations per month
router.get('/user-registrations', async (req, res) => {
  try {
    const registrations = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching registration data' });
  }
});

// Admin Logout
router.get('/logout', (req, res) => {
  res.clearCookie('AuthToken');
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
