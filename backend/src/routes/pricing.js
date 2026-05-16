const express = require('express');
const router = express.Router();

// Static pricing data (in production, fetch from DB)
const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for startups and small teams',
    color: '#6366f1',
    features: [
      { name: '5 Projects', included: true },
      { name: '10 GB Storage', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'API Access', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Custom Domain', included: false },
      { name: 'Team Collaboration', included: false },
      { name: 'SLA Guarantee', included: false }
    ],
    popular: false,
    cta: 'Start Free Trial'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 79, yearly: 790 },
    description: 'For growing teams that need more power',
    color: '#8b5cf6',
    features: [
      { name: 'Unlimited Projects', included: true },
      { name: '100 GB Storage', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Priority Support', included: true },
      { name: 'API Access', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Custom Domain', included: true },
      { name: 'Team Collaboration', included: true },
      { name: 'SLA Guarantee', included: false }
    ],
    popular: true,
    cta: 'Start Free Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 199, yearly: 1990 },
    description: 'For large organizations with complex needs',
    color: '#0ea5e9',
    features: [
      { name: 'Unlimited Everything', included: true },
      { name: '1 TB Storage', included: true },
      { name: 'Custom Analytics', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Advanced API', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Custom Domain', included: true },
      { name: 'Team Collaboration', included: true },
      { name: 'SLA Guarantee', included: true }
    ],
    popular: false,
    cta: 'Contact Sales'
  }
];

// GET /api/pricing
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: PRICING_PLANS
  });
});

module.exports = router;
