// multerConfig.js
const multer = require('multer');
const path = require('path');

// Multer configuration for post images and videos
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const postUpload = multer({ storage: postStorage });

// Multer configuration for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pictures/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const profileUpload = multer({ storage: profileStorage });

module.exports = {
  postUpload,
  profileUpload,
};