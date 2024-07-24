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
      .populate('likes', ['username', 'profilePicture'])
      .populate('comments.user', ['username', 'profilePicture'])
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

// Like a post
router.post('/posts/:postId/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Add or remove user from likes array
    if (post.likes.includes(req.user.userId)) {
      post.likes.pull(req.user.userId);
    } else {
      post.likes.push(req.user.userId);
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Could not like post' });
  }
});

// Comment on a post
router.post('/posts/:postId/comment', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      user: req.user.userId,
      text,
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();
    await updatedPost.populate('comments.user', 'username').execPopulate();

    res.json(updatedPost);
  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ error: 'Could not comment on post' });
  }
});
// Fetch post details including likes and comments
router.get('/posts/:postId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', ['username', 'profilePicture'])
      .populate('likes', ['username', 'profilePicture'])
      .populate('comments.user', ['username', 'profilePicture'])
      .exec();
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error('Error fetching post details:', error);
    res.status(500).json({ error: 'Could not fetch post details' });
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
    const userId = req.user._id;
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
