// server.js
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./logger');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseconfig.json');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the signup route
app.use('/auth/signup', require('./routes/auth/signup'));

// Start the server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
