const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebaseconfig.json'), 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: 'food-app-6c3d4.appspot.com',
});

module.exports = admin;
