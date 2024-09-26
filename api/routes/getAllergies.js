const express = require('express');
const admin = require('../firebaseAdmin'); // Centralized Firebase Admin instance
const { isEmail } = require('validator');

const router = express.Router();

// Get Allergies Route
router.get('/get-allergies', async (req, res) => {
    const { email } = req.query; // Expecting the email in the query parameters

    console.log('Received get allergies request for email:', email);

    // Check if email is provided
    if (!email) {
        console.log('Get allergies failed: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    if (!isEmail(email)) {
        console.log('Get allergies failed: Invalid email format:', email);
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Check if user exists
        const userSnapshot = await admin.firestore().collection('users').doc(email).get();

        if (!userSnapshot.exists) {
            console.log('Get allergies failed: User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        // Get user's allergies
        const userData = userSnapshot.data();
        const allergies = userData.allergies || []; // Default to an empty array if no allergies found

        console.log('Allergies retrieved successfully for email:', email);

        return res.status(200).json({ allergies });
    } catch (error) {
        console.error('Error retrieving allergies:', error);
        return res.status(500).json({ error: 'Error retrieving allergies', details: error.message });
    }
});

module.exports = router;
