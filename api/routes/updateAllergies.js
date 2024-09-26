const express = require('express');
const admin = require('../firebaseAdmin'); // Centralized Firebase Admin instance
const { isEmail } = require('validator');

const router = express.Router();

// Single Update Allergies Route
router.post('/update-allergies', async (req, res) => {
    const { email, allergies } = req.body;

    console.log('Received update allergies request with body:', req.body);

    // Check if email is provided
    if (!email) {
        console.log('Update failed: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    if (!isEmail(email)) {
        console.log('Update failed: Invalid email format:', email);
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate allergies array
    if (!Array.isArray(allergies)) {
        console.log('Update failed: Allergies should be an array');
        return res.status(400).json({ error: 'Allergies should be an array' });
    }

    // Validate each allergy in the array (ensure they are strings)
    for (const allergy of allergies) {
        if (typeof allergy !== 'string') {
            console.log('Update failed: Allergy values should be strings');
            return res.status(400).json({ error: 'Allergy values should be strings' });
        }
    }

    try {
        // Check if user exists
        const userSnapshot = await admin.firestore().collection('users').doc(email).get();

        if (!userSnapshot.exists) {
            console.log('Update failed: User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's allergies with the new values
        await userSnapshot.ref.set({ allergies }, { merge: true });  // Merge update, doesn't overwrite other fields
        console.log('Allergies updated successfully for email:', email);

        return res.status(200).json({ message: 'Allergies updated successfully' });
    } catch (error) {
        console.error('Error updating allergies:', error);
        return res.status(500).json({ error: 'Error updating allergies', details: error.message });
    }
});

module.exports = router;
