const express = require('express');
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');
const logger = require('../config/logger');
const router = express.Router();

// POST /api/newsletter
router.post('/', [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('name').optional().trim().isLength({ max: 100 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, name } = req.body;

    // Check existing
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        await existing.save();
        return res.json({ success: true, message: 'Welcome back! You\'ve been resubscribed.' });
      }
      return res.json({ success: true, message: 'You\'re already subscribed!' });
    }

    await Newsletter.create({ email, name, source: 'website' });
    logger.info(`New newsletter subscriber: ${email}`);

    res.status(201).json({
      success: true,
      message: '🎉 You\'re subscribed! Watch your inbox for updates.'
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/newsletter/unsubscribe/:token
router.get('/unsubscribe/:token', async (req, res, next) => {
  try {
    const subscriber = await Newsletter.findOne({ unsubscribeToken: req.params.token });
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Token not found' });
    }
    subscriber.subscribed = false;
    await subscriber.save();
    res.json({ success: true, message: 'You\'ve been unsubscribed successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
