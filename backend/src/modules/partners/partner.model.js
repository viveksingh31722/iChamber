const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, 'Please provide the organization name'],
    trim: true,
  },
  logoUrl: {
    type: String,
    required: [true, 'Please provide the partner logo URL'],
  },
  websiteUrl: {
    type: String,
  },
  partnershipType: {
    type: String,
    enum: ['strategic', 'knowledge', 'sponsor', 'other'],
    default: 'strategic',
  },
}, {
  timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
