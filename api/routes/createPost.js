const express = require('express');
const admin = require('../firebaseAdmin');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
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

router.post('/createpost', upload.single('image'), async (req, res) => {
  const { email, title, description } = req.body;

  if (!email || !title || !description) {
    return res.status(400).json({ error: 'Email, title, and description are required' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;


    const bucket = admin.storage().bucket();

    const file = bucket.file(`posts/${fileName}`);
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    await file.makePublic();
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/posts/${fileName}`;

    const newPost = {
      title,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    const userDocRef = admin.firestore().collection('users').doc(email);
    await userDocRef.set({ posts: admin.firestore.FieldValue.arrayUnion(newPost) }, { merge: true });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post', details: error.message });
  }
});


module.exports = router;
