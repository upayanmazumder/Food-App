const express = require('express');
const admin = require('../firebaseAdmin');

const router = express.Router();

router.get('/get-recipes', async (req, res) => {
    try {
        const usersSnapshot = await admin.firestore().collection('users').get();

        // Log the number of users found
        console.log(`Number of users found: ${usersSnapshot.size}`);

        if (usersSnapshot.empty) {
            console.log('No users found');
            return res.status(404).json({ error: 'No users found' });
        }

        const allRecipes = [];

        // Iterate through each user document
        usersSnapshot.forEach(userDoc => {
            const userData = userDoc.data();
            console.log(`User: ${userDoc.id}`, userData); // Log each user document
            const posts = userData.posts || []; // Assuming posts are stored under this field

            // Push all posts (recipes) into allRecipes array
            allRecipes.push(...posts.map(post => ({
                title: post.title,
                description: post.description,
                imageUrl: post.imageUrl,
                createdAt: post.createdAt,
                userEmail: userDoc.id // Including the user email for reference
            })));
        });

        // Check if any recipes were collected
        console.log(`Number of recipes collected: ${allRecipes.length}`);

        // Sort all recipes by createdAt, newest first
        const sortedRecipes = allRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (sortedRecipes.length === 0) {
            console.log('No recipes found in user documents');
            return res.status(404).json({ error: 'No recipes available' });
        }

        console.log('All recipes retrieved successfully');

        return res.status(200).json({ recipes: sortedRecipes });
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        return res.status(500).json({ error: 'Error retrieving recipes', details: error.message });
    }
});

module.exports = router;
