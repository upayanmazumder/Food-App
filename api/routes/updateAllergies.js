const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();
const db = admin.firestore(); // Get Firestore instance

// Route to update allergies
router.put('/updateallergies', async (req, res) => {
    const { userId, allergies } = req.body; // Expecting userId and allergies in the request body

    if (!userId || !Array.isArray(allergies)) {
        return res.status(400).json({ error: 'Invalid input. Please provide userId and an array of allergies.' });
    }

    try {
        // Update the user's allergies in Firestore
        await db.collection('users').doc(userId).set({ allergies }, { merge: true });

        res.status(200).json({ message: 'Allergies updated successfully.' });
    } catch (error) {
        console.error('Error updating allergies:', error);
        res.status(500).json({ error: 'Error updating allergies', details: error.message });
    }
});

module.exports = router;
