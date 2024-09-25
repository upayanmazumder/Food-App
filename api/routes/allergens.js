const express = require('express');
const admin = require('firebase-admin');
const { isEmail } = require('validator');

const router = express.Router();

// Update Allergy Conditions Route
router.put('/allergens', async (req, res) => {
    const { email, allergens } = req.body;

    console.log('Received allergens update request:', req.body);

    if (!email) {
        console.log('Update failed: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    if (!isEmail(email)) {
        console.log('Update failed: Invalid email format:', email);
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!Array.isArray(allergens)) {
        console.log('Update failed: Allergens must be an array');
        return res.status(400).json({ error: 'Allergens must be an array' });
    }

    try {
        // Update user's allergens in Firestore
        await admin.firestore().collection('users').doc(email).set({ allergens }, { merge: true });
        console.log('Allergy conditions updated successfully for email:', email);
        return res.status(200).json({ message: 'Allergy conditions updated successfully' });
    } catch (error) {
        console.error('Error updating allergy conditions:', error);
        return res.status(500).json({ error: 'Error updating allergy conditions', details: error.message });
    }
});

module.exports = router;
