require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // for logging
const connectDB = require('./config/db');
const itemRoutes = require('./routes/item.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerSetup = require('./swagger/swagger');

const app = express();

// Database connection
connectDB();

// Middleware setup
app.use(morgan('dev'));  // Logs HTTP requests
app.use(express.json());  // Parsing incoming JSON requests

// Swagger setup 
swaggerSetup(app);

// API routes
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

// Catch-all route for any undefined endpoints (404)
app.all('*', (req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
