const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // Step 1: Contact Info
  fullName: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  linkedIn: { type: String },

  // Step 2: Org Details
  organizationName: { type: String, required: true },
  industrySector: { type: String, required: true },
  organizationSize: { type: String, required: true },

  // Step 3: Preferences
  scope: {
    type: String,
    enum: ['National', 'International'],
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'active', 'expired', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Membership', MembershipSchema);
