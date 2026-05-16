const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['page_view', 'button_click', 'form_submit', 'pricing_view', 'demo_request']
  },
  page: String,
  element: String,
  sessionId: String,
  userAgent: String,
  ipAddress: String,
  country: String,
  referrer: String,
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

analyticsSchema.index({ event: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
