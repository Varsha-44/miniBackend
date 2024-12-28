const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin:"https://minifrontend.vercel.app",
  credentials: true
}));
app.use(express.json()); // Parse incoming JSON requests

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();
console.log(__dirname); // Make sure the path is correct for the public directory

// Routes
app.use('/api', require('./routes/auth')); // Authentication routes for login and registration
app.use('/api/opportunity', require('./routes/opportunity')); // Opportunity routes for adding and viewing opportunities
app.use('/api/complaints', require('./routes/Complaint')); // Complaints routes
app.use('/api/interviews', require('./routes/Interview')); // Interview feedback routes
app.use('/api/exams', require('./routes/Exam')); // Interview feedback routes
app.use('/api/pts', require('./routes/PT'));

// Default route for root (serving index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
