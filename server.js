const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();
console.log(__dirname)

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.static());

// Routes
app.use('/api', require('./routes/auth')); // Authentication routes for login and registration
app.use('/api/opportunity', require('./routes/opportunity')); // Opportunity routes for adding and viewing opportunities
app.use('/api/complaints', require('./routes/Complaint')); // Complaints routes
app.use('/api/interviews', require('./routes/Interview')); // Interview feedback routes
app.use('/api/exams', require('./routes/Exam')); // Interview feedback routes
app.use('/api/pts', require('./routes/PT'));
// Default route for root
app.get('/', (req, res) => {
  res.send('Welcome to Campus Harmony API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
