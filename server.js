const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// CORS Middleware
const corsOptions = {
  origin: 'https://minifrontend.vercel.app', // Allow frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  credentials: true, // Allow cookies or credentials if necessary
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

app.use(express.json()); // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', require('./routes/auth')); // Authentication routes
app.use('/api/opportunity', require('./routes/opportunity'));
app.use('/api/complaints', require('./routes/Complaint'));
app.use('/api/interviews', require('./routes/Interview'));
app.use('/api/exams', require('./routes/Exam'));
app.use('/api/pts', require('./routes/PT'));

// Default route for root
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
