import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Play, Shield, Zap, BarChart3, Globe,
  Lock, Cpu, GitBranch, Server, Star, CheckCircle2,
  TrendingUp, Users, Activity
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

/* ─── Stats Counter ───────────────────────────────────── */
function StatCard({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const target = parseInt(value)
    const step   = Math.ceil(target / 60)
    const timer  = setInterval(() => {
      setCount(prev => {
        if (prev + step >= target) { clearInterval(timer); return target }
        return prev + step
      })
    }, 20)
    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center">
      <div className="font-extrabold text-4xl lg:text-5xl gradient-text mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white/40">{label}</div>
    </div>
  )
}

/* ─── Feature Card ────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc, color }) {
  return (
    <div className="card-glass p-6 group cursor-default">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </div>
  )
}

/* ─── Testimonial Card ────────────────────────────────── */
function TestimonialCard({ item }) {
  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div className="flex gap-1">
        {Array(item.rating).fill(0).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-sm text-white/60 leading-relaxed flex-1">"{item.text}"</p>
      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: item.avatarColor }}
        >
          {item.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <p className="text-xs text-white/40">{item.role} · {item.company}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Newsletter ──────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await axios.post('/api/newsletter', { email })
      toast.success(res.data.message)
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="orb orb-purple w-96 h-96 -top-20 left-1/2 -translate-x-1/2 opacity-30" />
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <span className="section-label mb-6 inline-flex">Newsletter</span>
        <h2 className="font-bold text-4xl text-white mb-4">
          Stay ahead of the curve
        </h2>
        <p className="text-white/50 mb-8">
          Product updates, engineering insights, and industry news — straight to your inbox. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={submit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                       placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-sm py-3 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}

/* ─── Main Home Page ──────────────────────────────────── */
export default function Home() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(res => setTestimonials(res.data.data))
      .catch(() => {})
  }, [])

  const features = [
    { icon: Zap,       title: 'Instant Deployments',    desc: 'Push code and go live in seconds. Zero-downtime blue-green deployments with automatic rollback on failure.',           color: '#6554fa' },
    { icon: BarChart3, title: 'Real-Time Analytics',    desc: 'Monitor your app\'s performance with live dashboards, custom alerts, and AI-powered anomaly detection.',               color: '#06b6d4' },
    { icon: Shield,    title: 'Enterprise Security',    desc: 'SOC 2 Type II certified. End-to-end encryption, RBAC, audit logs, and DDoS protection included.',                     color: '#10b981' },
    { icon: Globe,     title: 'Global CDN',             desc: 'Serve users from 200+ edge locations worldwide. Sub-50ms latency for any geography.',                                 color: '#f59e0b' },
    { icon: GitBranch, title: 'CI/CD Pipeline',         desc: 'Automated testing, staging environments, and one-click production releases. GitHub and GitLab native.',               color: '#8b5cf6' },
    { icon: Server,    title: 'Managed Infrastructure', desc: 'We handle servers, scaling, backups, and patches. You focus entirely on shipping features.',                          color: '#f43f5e' },
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background orbs */}
        <div className="orb orb-purple w-[600px] h-[600px] top-0 left-1/4 opacity-40" />
        <div className="orb orb-cyan   w-[400px] h-[400px] bottom-10 right-1/4 opacity-30" />
        <div className="orb orb-violet w-[300px] h-[300px] top-1/3 right-10 opacity-20" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(101,84,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(101,84,250,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30
                          bg-brand-600/10 text-brand-300 text-sm font-mono mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now with AI-powered auto-scaling · v2.4 released
          </div>

          {/* Headline */}
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-8xl text-white leading-[1.05] mb-6 animate-fade-up">
            Ship faster.<br />
            <span className="gradient-text">Scale smarter.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
             style={{ animationDelay: '0.1s', opacity: 0 }}>
            NexaCloud is the all-in-one platform that gives engineering teams the power to deploy,
            monitor, and scale applications — without the infrastructure headaches.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
               style={{ animationDelay: '0.2s', opacity: 0 }}>
            <Link to="/pricing" className="btn-primary text-base px-8 py-4">
              Start Free — No Credit Card
              <ArrowRight size={18} />
            </Link>
            <button className="btn-ghost text-base px-8 py-4">
              <Play size={16} className="fill-white/70" />
              Watch Demo (3 min)
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/30">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#6554fa','#06b6d4','#10b981','#f59e0b'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#050510]"
                       style={{ background: c }} />
                ))}
              </div>
              <span>10,000+ engineers trust NexaCloud</span>
            </div>
            <span className="hidden sm:block">·</span>
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="ml-1">4.9/5 on G2</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard value="10000"  suffix="+"  label="Active Engineers" />
          <StatCard value="99"     suffix=".9%" label="Uptime SLA" />
          <StatCard value="200"    suffix="+"   label="Edge Locations" />
          <StatCard value="5000000" suffix="+"  label="Deployments / Month" />
        </div>
      </section>

      {/* ── Features ──────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4">Platform Features</span>
            <h2 className="font-bold text-4xl lg:text-5xl text-white mt-4 mb-4">
              Everything your team needs
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Built by engineers, for engineers. Every feature is designed to remove friction and accelerate your delivery.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/features" className="btn-ghost">
              View all features <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-label mb-4">How It Works</span>
            <h2 className="font-bold text-4xl text-white mt-4">
              From code to production in 3 steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-brand-600/0 via-brand-600/40 to-brand-600/0" />

            {[
              { step: '01', icon: GitBranch, title: 'Connect your repo', desc: 'Link GitHub, GitLab, or Bitbucket. NexaCloud automatically detects your stack.' },
              { step: '02', icon: Cpu,        title: 'Configure pipeline', desc: 'Define environments, secrets, and deploy rules using our visual editor or YAML.' },
              { step: '03', icon: Activity,   title: 'Deploy & monitor', desc: 'Push to deploy. Watch real-time logs, metrics, and alerts from one dashboard.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-20 h-20 rounded-2xl bg-brand-600/15 border border-brand-500/25
                                flex items-center justify-center mx-auto mb-6 relative">
                  <Icon size={28} className="text-brand-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-600
                                   text-white text-xs font-mono font-semibold flex items-center justify-center">
                    {step.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="section-label mb-4">Testimonials</span>
              <h2 className="font-bold text-4xl text-white mt-4">
                Loved by engineering teams
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {testimonials.map(t => <TestimonialCard key={t.id} item={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="card-glass p-12 relative overflow-hidden">
            <div className="orb orb-purple w-64 h-64 -top-10 -left-10 opacity-40" />
            <div className="orb orb-cyan   w-48 h-48 -bottom-10 -right-10 opacity-30" />
            <div className="relative z-10">
              <h2 className="font-extrabold text-4xl lg:text-5xl text-white mb-4">
                Ready to <span className="gradient-text">scale</span> your team?
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Join 10,000+ engineers already shipping faster with NexaCloud. Start your 14-day free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/pricing" className="btn-primary px-8 py-4">
                  Start Free Trial <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-ghost px-8 py-4">
                  Talk to Sales
                </Link>
              </div>
              <p className="text-xs text-white/25 mt-6">
                No credit card required · 14-day free trial · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
