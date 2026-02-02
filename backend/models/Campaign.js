import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  enhancedPrompt: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    required: true,
    enum: ['Professional', 'Witty', 'Urgent', 'Inspirational']
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  hashtags: [{
    type: String
  }],
  ctaText: {
    type: String,
    default: 'Shop Now'
  },
  logoUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    default: 'anonymous'
  }
});

export default mongoose.model('Campaign', campaignSchema);
