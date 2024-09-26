const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const getUniqueAllergens = () => {
    const allergensData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/allergens.json'), 'utf8'));
    const allergensSet = new Set();

    allergensData.forEach(item => {
        item.allergens.split(', ').forEach(allergen => {
            allergensSet.add(allergen);
        });
    });

    return Array.from(allergensSet)
        .filter(allergen => allergen !== 'None')
        .sort();
};

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
