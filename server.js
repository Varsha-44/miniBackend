const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// CORS Middleware Configuration
const corsOptions = {
  origin: "https://minifrontend.vercel.app",  // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers
  credentials: true,  // If you're using cookies or other credentials
};

app.use(cors(corsOptions)); // Enable CORS with the above options

// Other middlewares
app.use(express.json());  // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', require('./routes/auth'));
app.use('/api/opportunity', require('./routes/opportunity'));
app.use('/api/complaints', require('./routes/Complaint'));
app.use('/api/interviews', require('./routes/Interview'));
app.use('/api/exams', require('./routes/Exam'));
app.use('/api/pts', require('./routes/PT'));

// Catch-all route for frontend (for single-page apps)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
