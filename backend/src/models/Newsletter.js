const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  name: {
    type: String,
    trim: true
  },
  subscribed: {
    type: Boolean,
    default: true
  },
  unsubscribeToken: {
    type: String,
    default: () => uuidv4()
  },
  source: {
    type: String,
    enum: ['website', 'blog', 'referral', 'other'],
    default: 'website'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
