const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '', // Placeholder until generated
  },
  tags: {
    type: [String],
    default: [],
  },
  tagline: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ad', adSchema);
