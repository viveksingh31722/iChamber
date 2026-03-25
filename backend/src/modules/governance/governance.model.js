const mongoose = require('mongoose');

const governanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, 'Please provide a designation'],
  },
  bio: {
    type: String,
  },
  profileImageUrl: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const Governance = mongoose.model('Governance', governanceSchema);

module.exports = Governance;
