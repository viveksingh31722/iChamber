const mongoose = require('mongoose');

const InvestorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  businessName: { type: String, required: true },
  businessTitle: { type: String, required: true },
  occupation: {
    type: String,
    enum: ['Investor', 'Partner', 'Seeker'],
    required: true
  },
  state: { type: String, required: true },
  country: { type: String, required: true },
  newsletterOptIn: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InvestorApplication', InvestorSchema);
