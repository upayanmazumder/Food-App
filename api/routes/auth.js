const express = require('express');
const admin = require('firebase-admin');
const { isEmail } = require('validator');

const router = express.Router();

// Single Auth Route
router.post('/auth', async (req, res) => {
    const { email } = req.body;

    console.log('Received auth request with body:', req.body);

    if (!email) {
        console.log('Auth failed: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    if (!isEmail(email)) {
        console.log('Auth failed: Invalid email format:', email);
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Check if user exists
        const userSnapshot = await admin.firestore().collection('users').doc(email).get();

        if (userSnapshot.exists) {
            // If user exists, log them in
            console.log('Login successful for email:', email);
            return res.status(200).json({ message: 'Login successful', user: userSnapshot.data() });
        } else {
            // If user doesn't exist, sign them up
            console.log('Signing up new user with email:', email);
            await admin.firestore().collection('users').doc(email).set({ email });
            console.log('User registered successfully with email:', email);
            return res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: 'Error during authentication', details: error.message });
    }
});

module.exports = router;
