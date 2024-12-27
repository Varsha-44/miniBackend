const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  studentName: {
    type: String,
    required: function () {
      return !this.anonymous;
    },
  },
  rollNumber: {
    type: String,
    required: function () {
      return !this.anonymous;
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
