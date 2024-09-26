const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const allergensRoutes = require('./routes/allergens');
const updateAllergiesRoutes = require('./routes/updateAllergies');
const createPostRoutes = require('./routes/createPost');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use default port 3000 if PORT is not defined

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Default route to show API is working
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Routes
app.use('/api', authRoutes);
app.use('/api', allergensRoutes);
app.use('/api', updateAllergiesRoutes);
app.use('/api', createPostRoutes); // Add createpost route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  // Application specific logging, throwing an error, or other logic here
  process.exit(1); // Exit the process to avoid undefined states
});

// Graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
