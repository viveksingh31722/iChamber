const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide an event date'],
  },
  location: {
    type: String,
    required: [true, 'Please provide an event location'],
  },
  type: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    default: 'offline',
  },
  registrationLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['upcoming', 'past'],
    default: 'upcoming',
  },
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
