const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const allergensRoutes = require('./routes/allergens');
const updateAllergiesRoutes = require('./routes/updateAllergies');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
