const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a publication title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  author: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  pdfUrl: {
    type: String, // Can be used when status is published
  },
  status: {
    type: String,
    enum: ['published', 'coming_soon'],
    default: 'coming_soon',
  },
  coverImageUrl: {
    type: String,
  },
}, {
  timestamps: true
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
