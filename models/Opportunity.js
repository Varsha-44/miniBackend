const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  deadline: { type: Date, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },  // Added URL field
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
