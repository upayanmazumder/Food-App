const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Helper function to get unique allergens
const getUniqueAllergens = () => {
    const allergensData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/allergens.json'), 'utf8'));
    const allergensSet = new Set();

    allergensData.forEach(item => {
        // Split the allergens string and add each one to the Set
        item.allergens.split(', ').forEach(allergen => {
            allergensSet.add(allergen);
        });
    });

    // Convert Set to Array and sort it alphabetically
    return Array.from(allergensSet).sort();
};

// Route to get unique allergens
router.get('/allergens', (req, res) => {
    try {
        const uniqueAllergens = getUniqueAllergens();
        res.status(200).json({ allergens: uniqueAllergens });
    } catch (error) {
        console.error('Error retrieving allergens:', error);
        res.status(500).json({ error: 'Error retrieving allergens', details: error.message });
    }
});

module.exports = router;
