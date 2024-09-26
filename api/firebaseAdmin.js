const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load Firebase configuration from the JSON file
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebaseconfig.json'), 'utf8'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

module.exports = admin;
