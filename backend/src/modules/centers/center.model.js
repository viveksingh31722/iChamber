const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Please provide the center country'],
    trim: true,
  },
  missionStatement: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
  },
  officeAddress: {
    type: String,
  },
}, {
  timestamps: true
});

const Center = mongoose.model('Center', centerSchema);

module.exports = Center;
