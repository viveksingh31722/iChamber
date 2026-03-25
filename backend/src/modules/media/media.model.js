const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a media/press release title'],
    trim: true,
  },
  source: {
    type: String,
    required: [true, 'Please provide the source (e.g., PIB, News Agency)'],
  },
  publishedDate: {
    type: Date,
    required: [true, 'Please provide the published date'],
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summary'],
  },
  externalLink: {
    type: String,
    required: [true, 'Please provide the external link to the full release'],
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
