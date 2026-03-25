const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a platform name'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
  },
  fullDescription: {
    type: String,
  },
  keyFocusAreas: [{
    type: String,
  }],
  bannerImageUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

const Platform = mongoose.model('Platform', platformSchema);

module.exports = Platform;
