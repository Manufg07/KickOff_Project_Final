const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage });

// router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create a new post
router.post('/posts', authMiddleware, upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  const { text } = req.body;
  const image = req.files['image'] ? req.files['image'][0].filename : null;
  const video = req.files['video'] ? req.files['video'][0].filename : null;

  try {
    const newPost = new Post({
      user: req.user.userId,
      text,
      image,
      video,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Could not create post' });
  }
});

// Get all posts
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', ['username', 'profilePicture'])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Could not fetch posts' });
  }
});

// Get posts by user
router.get('/posts/user/:userId', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', ['username', 'profilePicture'])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Could not fetch user posts' });
  }
});

router.delete('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/posts/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the auth middleware
    const posts = await Post.find({ user: userId })
      .populate('user', ['username', 'profilePicture'])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Could not fetch user posts' });
  }
});

module.exports = router;
