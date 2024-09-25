// routes/auth/signup.js
const express = require('express');
const logger = require('../../logger');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    logger.error('Invalid email signup attempt');
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const firestore = admin.firestore();
    const userRef = firestore.collection('users').doc(email);

    const userDoc = await userRef.get();
    if (userDoc.exists) {
      logger.error('Email already registered');
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Store the new user
    await userRef.set({
      email,
      signupDate: new Date().toISOString()
    });

    logger.info(`New signup with email: ${email}`);
    return res.status(200).json({ message: 'Signup successful', email });
  } catch (error) {
    logger.error(`Error signing up: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Basic email validation function
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

module.exports = router;
