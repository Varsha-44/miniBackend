const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  trainingSession: {
    type: String,
    required: true,
  },
  feedback:
  {
    type:String,
    required:true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('PT', feedbackSchema);
module.exports = Feedback;
