const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const firebaseConfig = JSON.parse(fs.readFileSync('./firebaseconfig.json', 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In-memory store for simplicity (optional, for demonstration)
const users = {};

// Signup Route
app.post('/signup', async (req, res) => {
  const { email } = req.body;

  console.log('Received signup request with body:', req.body);

  if (!email) {
    console.log('Signup failed: Email is required');
    return res.status(400).json({ message: 'Email is required' });
  }

  // Check if user already exists
  if (users[email]) {
    console.log('Signup failed: User already exists for email:', email);
    return res.status(400).json({ message: 'User already exists' });
  }

  // Store user in in-memory store and Firebase
  users[email] = { email };

  try {
    await admin.firestore().collection('users').doc(email).set({ email });
    console.log('User registered successfully with email:', email);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login Route
app.post('/login', (req, res) => {
  const { email } = req.body;

  console.log('Received login request with body:', req.body);

  if (!email) {
    console.log('Login failed: Email is required');
    return res.status(400).json({ message: 'Email is required' });
  }

  // Check if user exists
  if (!users[email]) {
    console.log('Login failed: User not found for email:', email);
    return res.status(404).json({ message: 'User not found' });
  }

  console.log('Login successful for email:', email);
  return res.status(200).json({ message: 'Login successful', user: users[email] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
