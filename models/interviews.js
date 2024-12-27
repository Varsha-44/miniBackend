const mongoose = require("mongoose");

// Define the schema for feedback
const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  companyName: { type: String, required: true },
  interviewDate: { type: Date, required: true },
  experience: { type: String, required: true },
  tips: { type: String },
});

// Create the model
const Feedback = mongoose.model("interviews", feedbackSchema);

module.exports = Feedback;
