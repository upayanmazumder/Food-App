const express = require('express');
const admin = require('../firebaseAdmin');
const { isEmail } = require('validator');

const router = express.Router();

router.get('/get-allergies', async (req, res) => {
    const { email } = req.query;

    console.log('Received get allergies request for email:', email);

    if (!email) {
        console.log('Get allergies failed: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    if (!isEmail(email)) {
        console.log('Get allergies failed: Invalid email format:', email);
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {

        const userSnapshot = await admin.firestore().collection('users').doc(email).get();

        if (!userSnapshot.exists) {
            console.log('Get allergies failed: User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userSnapshot.data();
        const allergies = userData.allergies || [];

        console.log('Allergies retrieved successfully for email:', email);

        return res.status(200).json({ allergies });
    } catch (error) {
        console.error('Error retrieving allergies:', error);
        return res.status(500).json({ error: 'Error retrieving allergies', details: error.message });
    }
});

module.exports = router;
