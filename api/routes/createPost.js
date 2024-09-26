const express = require('express');
const admin = require('../firebaseAdmin'); // Import centralized Firebase Admin SDK
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique filenames

const router = express.Router();

// Set up multer for image uploads (store in memory to upload to Firebase directly)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, and .png files are allowed'));
    }
  },
});

// POST route for creating a new post
router.post('/createpost', upload.single('image'), async (req, res) => {
  const { title, description, email } = req.body; // Include email in the body

  // Validate title, description, and email
  if (!title || !description || !email) {
    return res.status(400).json({ error: 'Title, description, and email are required' });
  }

  // Check if image file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    // Generate a unique filename for the image
    const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;

    // Create a reference to Firebase Storage
    const bucket = admin.storage().bucket();

    // Upload the image to Firebase Storage
    const file = bucket.file(`posts/${fileName}`);
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // Make the file publicly accessible and get its URL
    await file.makePublic();
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/posts/${fileName}`;

    // Create a new post object
    const newPost = {
      title,
      description,
      imageUrl, // Firebase Storage URL
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Store the post data in the user's document
    const userRef = admin.firestore().collection('users').doc(email);
    await userRef.set({
      posts: admin.firestore.FieldValue.arrayUnion(newPost) // Add new post to the user's posts array
    }, { merge: true }); // Merge to avoid overwriting other fields

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post', details: error.message });
  }
});

module.exports = router;
