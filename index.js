require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // for logging
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/item.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerSetup = require('./swagger/swagger');

const PORT = process.env.PORT || 3000;
const app = express();

// Database connection
connectDB();

// Middleware setup
app.use(helmet()); 
app.use(cors({
    origin: `http://localhost:${PORT}`, // allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
  }));
app.use(morgan('dev'));  // Logs HTTP requests
app.use(express.json());  // Parsing incoming JSON requests
app.use(mongoSanitize()); // Sanitize against NoSQL injection
// Swagger setup 
swaggerSetup(app);
// API routes
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);
app.use('/uploads', express.static('uploads'));

// Catch-all route for any undefined endpoints (404)
app.all('*', (req, res) => res.status(404).json({ error: 'Not Found' }));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
