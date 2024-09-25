const express = require('express');
const admin = require('firebase-admin');
const { isEmail } = require('validator');

const router = express.Router();

// Single Update Allergies Route
router.post('/update-allergies', async (req, res) => {
    const { email, allergies } = req.body;

    console.log('Received update allergies request with body:', req.body);

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

    try {
        // Check if user exists
        const userSnapshot = await admin.firestore().collection('users').doc(email).get();

        if (!userSnapshot.exists) {
            console.log('Update failed: User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        // Clear the user's allergies list by setting it to an empty array
        await userSnapshot.ref.update({ allergies: [] });
        console.log('Cleared allergies for email:', email);

        // Update the user's allergies with the new values
        await userSnapshot.ref.update({ allergies });
        console.log('Allergies updated successfully for email:', email);

        return res.status(200).json({ message: 'Allergies updated successfully' });
    } catch (error) {
        console.error('Error updating allergies:', error);
        return res.status(500).json({ error: 'Error updating allergies', details: error.message });
    }
});

module.exports = router;
