// MongoDB initialization script
db = db.getSiblingDB('nexacloud');

// Create collections with validation
db.createCollection('contacts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'message'],
      properties: {
        name: { bsonType: 'string' },
        email: { bsonType: 'string' },
        message: { bsonType: 'string' }
      }
    }
  }
});

db.createCollection('newsletter');
db.createCollection('analytics');

// Seed pricing plans
db.pricing.insertMany([
  {
    name: 'Starter',
    price: 29,
    billing: 'month',
    color: '#6366f1',
    features: [
      '5 Projects',
      '10 GB Storage',
      'Basic Analytics',
      'Email Support',
      'API Access',
      'SSL Certificate'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: 79,
    billing: 'month',
    color: '#8b5cf6',
    features: [
      'Unlimited Projects',
      '100 GB Storage',
      'Advanced Analytics',
      'Priority Support',
      'API Access',
      'SSL Certificate',
      'Custom Domain',
      'Team Collaboration'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 199,
    billing: 'month',
    color: '#0ea5e9',
    features: [
      'Unlimited Everything',
      '1 TB Storage',
      'Custom Analytics',
      '24/7 Dedicated Support',
      'Advanced API',
      'SSL Certificate',
      'Custom Domain',
      'Team Collaboration',
      'SLA Guarantee',
      'On-premise Option'
    ],
    popular: false
  }
]);

// Seed testimonials
db.testimonials.insertMany([
  {
    name: 'Sarah Chen',
    role: 'CTO at TechFlow',
    avatar: 'SC',
    text: 'NexaCloud transformed our infrastructure. We reduced deployment time by 80% and our team is more productive than ever.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Lead Engineer at Pulse',
    avatar: 'MR',
    text: 'The analytics dashboard alone is worth every penny. Real-time insights have helped us make data-driven decisions consistently.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'VP Engineering at Orbit',
    avatar: 'PP',
    text: 'Migrating to NexaCloud was the best decision we made. Seamless CI/CD, zero downtime deployments, outstanding support.',
    rating: 5
  }
]);

print('✅ MongoDB initialized with seed data');
