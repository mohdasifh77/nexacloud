const express    = require('express');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── In-Memory Store ──────────────────────────────────────
const contacts    = [];
const subscribers = [];

const PRICING = [
  {
    id: 'starter', name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for startups and small teams',
    color: '#6554fa', popular: false, cta: 'Start Free Trial',
    features: [
      { name: '5 Projects',        included: true  },
      { name: '10 GB Storage',     included: true  },
      { name: 'Basic Analytics',   included: true  },
      { name: 'Email Support',     included: true  },
      { name: 'API Access',        included: true  },
      { name: 'SSL Certificate',   included: true  },
      { name: 'Custom Domain',     included: false },
      { name: 'Team Collaboration',included: false },
      { name: 'SLA Guarantee',     included: false },
    ]
  },
  {
    id: 'pro', name: 'Pro',
    price: { monthly: 79, yearly: 790 },
    description: 'For growing teams that need more power',
    color: '#8b5cf6', popular: true, cta: 'Start Free Trial',
    features: [
      { name: 'Unlimited Projects',included: true  },
      { name: '100 GB Storage',    included: true  },
      { name: 'Advanced Analytics',included: true  },
      { name: 'Priority Support',  included: true  },
      { name: 'API Access',        included: true  },
      { name: 'SSL Certificate',   included: true  },
      { name: 'Custom Domain',     included: true  },
      { name: 'Team Collaboration',included: true  },
      { name: 'SLA Guarantee',     included: false },
    ]
  },
  {
    id: 'enterprise', name: 'Enterprise',
    price: { monthly: 199, yearly: 1990 },
    description: 'For large organizations with complex needs',
    color: '#0ea5e9', popular: false, cta: 'Contact Sales',
    features: [
      { name: 'Unlimited Everything',included: true },
      { name: '1 TB Storage',        included: true },
      { name: 'Custom Analytics',    included: true },
      { name: '24/7 Support',        included: true },
      { name: 'Advanced API',        included: true },
      { name: 'SSL Certificate',     included: true },
      { name: 'Custom Domain',       included: true },
      { name: 'Team Collaboration',  included: true },
      { name: 'SLA Guarantee',       included: true },
    ]
  }
];

const TESTIMONIALS = [
  { id:1, name:'Sarah Chen',       role:'CTO',            company:'TechFlow Inc.',   avatar:'SC', avatarColor:'#6554fa', rating:5, text:'NexaCloud transformed our infrastructure. Deployment time reduced by 80% and the team is more productive than ever.' },
  { id:2, name:'Marcus Rodriguez', role:'Lead Engineer',  company:'Pulse Analytics', avatar:'MR', avatarColor:'#8b5cf6', rating:5, text:'The analytics dashboard is worth every penny. Real-time insights helped us go from 97% to 99.99% uptime.' },
  { id:3, name:'Priya Patel',      role:'VP Engineering', company:'Orbit Systems',   avatar:'PP', avatarColor:'#0ea5e9', rating:5, text:'Migrating to NexaCloud was the best decision this year. Zero-downtime deployments and outstanding support.' },
  { id:4, name:'James Wright',     role:'Founder & CEO',  company:'LaunchPad Studio',avatar:'JW', avatarColor:'#10b981', rating:5, text:'Enterprise-grade infrastructure at startup prices. Scaled from 100 to 50K users without a single issue.' },
];

// ── Middleware ────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

// ── Routes ────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()) + 's',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: { status: 'in-memory', healthy: true },
      api:      { status: 'running',   healthy: true  }
    },
    memory: {
      used:  Math.round(process.memoryUsage().heapUsed  / 1024 / 1024) + 'MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
    },
    stats: {
      contacts:    contacts.length,
      subscribers: subscribers.length
    }
  });
});

app.get('/api/pricing', (_req, res) => {
  res.json({ success: true, data: PRICING });
});

app.get('/api/testimonials', (_req, res) => {
  res.json({ success: true, data: TESTIMONIALS });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message, company, subject, plan } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      errors: [
        !name    && { field:'name',    message:'Name is required'    },
        !email   && { field:'email',   message:'Email is required'   },
        !message && { field:'message', message:'Message is required' },
      ].filter(Boolean)
    });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success:false, errors:[{ field:'email', message:'Valid email required' }] });
  }
  const id = contacts.length + 1;
  contacts.push({ id, name, email, company, subject, message, plan: plan||'general', createdAt: new Date().toISOString() });
  console.log(`📨  Contact #${id}: ${name} <${email}>`);
  res.status(201).json({ success:true, message:"Thank you! We'll get back to you within 24 hours.", data:{ id } });
});

app.post('/api/newsletter', (req, res) => {
  const { email, name } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success:false, message:'Valid email required' });
  }
  if (subscribers.find(s => s.email === email)) {
    return res.json({ success:true, message:"You're already subscribed!" });
  }
  subscribers.push({ email, name, subscribedAt: new Date().toISOString() });
  console.log(`📧  Newsletter: ${email}`);
  res.status(201).json({ success:true, message:"🎉 You're subscribed! Watch your inbox for updates." });
});

app.get('/api/analytics/stats', (_req, res) => {
  res.json({
    success: true,
    data: {
      totalEvents: Math.floor(Math.random() * 5000) + 10000,
      period: '30 days',
      eventBreakdown: [
        { _id:'page_view',    count: Math.floor(Math.random()*4000)+8000 },
        { _id:'button_click', count: Math.floor(Math.random()*1000)+2000 },
        { _id:'form_submit',  count: Math.floor(Math.random()*200)+100   },
      ],
      dailyTrend: Array.from({ length:7 }, (_,i) => ({
        _id:   new Date(Date.now()-(6-i)*86400000).toISOString().slice(0,10),
        count: Math.floor(Math.random()*500)+300
      }))
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ success:false, message:`Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   🚀  NexaCloud API  is  running     ║');
  console.log(`  ║   http://localhost:${PORT}/api/health   ║`);
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});
