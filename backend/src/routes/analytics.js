const express = require('express');
const Analytics = require('../models/Analytics');
const router = express.Router();

// POST /api/analytics/track
router.post('/track', async (req, res, next) => {
  try {
    const { event, page, element, sessionId, metadata } = req.body;

    if (!event) return res.status(400).json({ success: false, message: 'Event is required' });

    await Analytics.create({
      event,
      page,
      element,
      sessionId,
      metadata,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer')
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// GET /api/analytics/stats
router.get('/stats', async (req, res, next) => {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalEvents, eventBreakdown, dailyTrend] = await Promise.all([
      Analytics.countDocuments({ createdAt: { $gte: last30Days } }),

      Analytics.aggregate([
        { $match: { createdAt: { $gte: last30Days } } },
        { $group: { _id: '$event', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      Analytics.aggregate([
        { $match: { createdAt: { $gte: last30Days } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        eventBreakdown,
        dailyTrend,
        period: '30 days'
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
