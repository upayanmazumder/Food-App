const express = require('express');
const admin = require('../firebaseAdmin');
const { isEmail } = require('validator');

const router = express.Router();

router.post('/update-allergies', async (req, res) => {
    const { email, allergies } = req.body;

    console.log('Received update allergies request with body:', req.body);

    if (!email) {
        console.log('Update failed: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    if (!isEmail(email)) {
        console.log('Update failed: Invalid email format:', email);
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!Array.isArray(allergies)) {
        console.log('Update failed: Allergies should be an array');
        return res.status(400).json({ error: 'Allergies should be an array' });
    }

    for (const allergy of allergies) {
        if (typeof allergy !== 'string') {
            console.log('Update failed: Allergy values should be strings');
            return res.status(400).json({ error: 'Allergy values should be strings' });
        }
    }

    try {
        const userSnapshot = await admin.firestore().collection('users').doc(email).get();

        if (!userSnapshot.exists) {
            console.log('Update failed: User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        await userSnapshot.ref.set({ allergies }, { merge: true }); 
        console.log('Allergies updated successfully for email:', email);

        return res.status(200).json({ message: 'Allergies updated successfully' });
    } catch (error) {
        console.error('Error updating allergies:', error);
        return res.status(500).json({ error: 'Error updating allergies', details: error.message });
    }
});

module.exports = router;
