const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebaseconfig.json'), 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure the app by setting various HTTP headers
app.use(morgan('dev')); // Log requests to the console
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
