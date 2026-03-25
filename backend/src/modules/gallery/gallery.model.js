const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a media title'],
    trim: true,
  },
  description: {
    type: String,
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image',
  },
  mediaUrl: {
    type: String,
    required: [true, 'Please provide the media URL'],
  },
  eventDate: {
    type: Date,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
  },
}, {
  timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
