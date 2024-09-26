const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load Firebase configuration from the JSON file
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebaseconfig.json'), 'utf8'));

// Initialize the Firebase Admin SDK with the storage bucket
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: 'food-app-6c3d4.appspot.com', // Replace with your actual bucket name
});

module.exports = admin;
