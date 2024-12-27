const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  examName: { type: String, required: true },
  examDate: { type: Date, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Exam", FeedbackSchema);

module.exports = Feedback;