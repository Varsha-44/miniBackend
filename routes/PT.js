const express = require('express');
const Feedback = require('../models/PT'); // Feedback model
const { check, validationResult } = require('express-validator');
const router = express.Router();

// Submit feedback
router.post(
  '/',
  [
    check('feedback').notEmpty().withMessage('Feedback is required'),
    check('company').notEmpty().withMessage('Company is required'),
    check('trainingSession').notEmpty().withMessage('Training session is required'),
    check('userId').notEmpty().withMessage('User ID is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { feedback, company, trainingSession, userId } = req.body;
      const newFeedback = new Feedback({ feedback, company, trainingSession, userId });
      await newFeedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (err) {
      console.error('Error submitting feedback:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Fetch feedback (raw or grouped)
router.get('/', async (req, res) => {
  try {
    const { grouped } = req.query;
    const feedbacks = await Feedback.find();

    if (grouped === 'true') {
      const groupedFeedback = feedbacks.reduce((groups, feedback) => {
        const key = `${feedback.company}-${feedback.trainingSession}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(feedback);
        return groups;
      }, {});
      return res.status(200).json(groupedFeedback);
    }

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
