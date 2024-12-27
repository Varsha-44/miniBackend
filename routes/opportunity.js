const express = require('express');
const Opportunity = require('../models/Opportunity');

const router = express.Router();

// POST route for adding a new opportunity
router.post('/add', async (req, res) => {
  const { role, company, deadline, description, url } = req.body;

  try {
    const newOpportunity = new Opportunity({
      role,
      company,
      deadline,
      description,
      url,  // Store the URL in the database
    });

    const savedOpportunity = await newOpportunity.save();
    res.status(201).json(savedOpportunity); // Respond with the saved opportunity
  } catch (error) {
    res.status(500).json({ message: 'Error adding opportunity', error: error.message });
  }
});

// GET route for fetching all opportunities (optional)
router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunities', error: error.message });
  }
});

module.exports = router;
