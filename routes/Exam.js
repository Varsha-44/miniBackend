const express = require("express");
const Feedback = require("../models/Exam");

const router = express.Router();

// Route to submit feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to fetch all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ interviewDate: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
