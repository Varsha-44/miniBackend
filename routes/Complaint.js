const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaints');

// Route to get complaints (filtered by rollNumber if provided)
router.get('/', async (req, res) => {
  try {
    const { rollNumber } = req.query; // Get rollNumber from query params

    // Build query object
    const query = rollNumber ? { rollNumber } : {};
    const complaints = await Complaint.find(query);

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found.' });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error.message);
    res.status(500).json({ error: 'Failed to fetch complaints. Please try again later.' });
  }
});

// Route to submit a new complaint
router.post('/', async (req, res) => {
  const { category, description, studentName, rollNumber, anonymous } = req.body;

  // Validate required fields
  if (!category || !description) {
    return res.status(400).json({ error: 'Category and description are required.' });
  }

  // If the complaint is not anonymous, ensure student details are provided
  if (!anonymous && (!studentName || !rollNumber)) {
    return res.status(400).json({
      error: 'Student name and roll number are required for non-anonymous complaints.',
    });
  }

  try {
    // Create a new complaint object
    const newComplaint = new Complaint({
      category,
      description,
      anonymous: anonymous || false, // Default to false if not provided
      studentName: anonymous ? null : studentName,
      rollNumber: anonymous ? null : rollNumber,
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: 'Complaint submitted successfully!',
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error('Error saving complaint:', error.message);
    res.status(500).json({
      error: 'An error occurred while submitting the complaint. Please try again later.',
    });
  }
});

// Route to delete a complaint by its ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the complaint ID from the route parameters

    // Find the complaint by ID and delete it
    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    res.status(200).json({ message: 'Complaint deleted successfully!' });
  } catch (error) {
    console.error('Error deleting complaint:', error.message);
    res.status(500).json({
      error: 'Failed to delete the complaint. Please try again later.',
    });
  }
});

module.exports = router;
