const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const logger = require('../config/logger');
const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  body('company').optional().trim().isLength({ max: 100 }),
  body('subject').optional().trim().isLength({ max: 200 })
];

// POST /api/contact
router.post('/', contactValidation, async (req, res, next) => {
  try {
    // Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }

    const { name, email, company, subject, message, plan } = req.body;

    const contact = await Contact.create({
      name,
      email,
      company,
      subject,
      message,
      plan: plan || 'general',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`New contact submission: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! We\'ll get back to you within 24 hours.',
      data: { id: contact._id }
    });

  } catch (error) {
    next(error);
  }
});

// GET /api/contact (admin - list contacts)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-ipAddress -userAgent');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
