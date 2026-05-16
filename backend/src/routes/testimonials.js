const express = require('express');
const router = express.Router();

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow Inc.',
    avatar: 'SC',
    avatarColor: '#6366f1',
    text: 'NexaCloud transformed our entire infrastructure. We reduced deployment time by 80% and our engineering team is more productive than ever. The CI/CD pipeline alone saved us hundreds of hours.',
    rating: 5,
    metrics: { improvement: '80% faster deployments' }
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Lead Engineer',
    company: 'Pulse Analytics',
    avatar: 'MR',
    avatarColor: '#8b5cf6',
    text: 'The analytics dashboard is worth every penny. Real-time insights have helped us make data-driven decisions consistently. Our uptime went from 97% to 99.99% within the first month.',
    rating: 5,
    metrics: { improvement: '99.99% uptime achieved' }
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'VP Engineering',
    company: 'Orbit Systems',
    avatar: 'PP',
    avatarColor: '#0ea5e9',
    text: 'Migrating to NexaCloud was the best technical decision we made this year. Seamless zero-downtime deployments, excellent monitoring, and the support team is genuinely outstanding.',
    rating: 5,
    metrics: { improvement: 'Zero downtime migrations' }
  },
  {
    id: 4,
    name: 'James Wright',
    role: 'Founder & CEO',
    company: 'LaunchPad Studio',
    avatar: 'JW',
    avatarColor: '#10b981',
    text: 'As a startup, cost efficiency matters. NexaCloud gave us enterprise-grade infrastructure at a price point we could actually afford. Scaled from 100 to 50,000 users without a single issue.',
    rating: 5,
    metrics: { improvement: '500x user growth supported' }
  }
];

// GET /api/testimonials
router.get('/', (req, res) => {
  res.json({ success: true, data: TESTIMONIALS });
});

module.exports = router;
