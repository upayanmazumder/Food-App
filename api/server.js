const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');

dotenv.config();

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebaseconfig.json'), 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
