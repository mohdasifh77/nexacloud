import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, XCircle, ArrowRight, Zap } from 'lucide-react'
import axios from 'axios'

const FALLBACK_PLANS = [
  {
    id: 'starter', name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for startups and small teams',
    color: '#6366f1', popular: false, cta: 'Start Free Trial',
    features: [
      { name: '5 Projects', included: true },
      { name: '10 GB Storage', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'API Access', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Custom Domain', included: false },
      { name: 'Team Collaboration', included: false },
      { name: 'SLA Guarantee', included: false },
    ]
  },
  {
    id: 'pro', name: 'Pro',
    price: { monthly: 79, yearly: 790 },
    description: 'For growing teams that need more power',
    color: '#8b5cf6', popular: true, cta: 'Start Free Trial',
    features: [
      { name: 'Unlimited Projects', included: true },
      { name: '100 GB Storage', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Priority Support', included: true },
      { name: 'API Access', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Custom Domain', included: true },
      { name: 'Team Collaboration', included: true },
      { name: 'SLA Guarantee', included: false },
    ]
  },
  {
    id: 'enterprise', name: 'Enterprise',
    price: { monthly: 199, yearly: 1990 },
    description: 'For large organizations with complex needs',
    color: '#0ea5e9', popular: false, cta: 'Contact Sales',
    features: [
      { name: 'Unlimited Everything', included: true },
      { name: '1 TB Storage', included: true },
      { name: 'Custom Analytics', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Advanced API', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Custom Domain', included: true },
      { name: 'Team Collaboration', included: true },
      { name: 'SLA Guarantee', included: true },
    ]
  }
]

function PlanCard({ plan, billing }) {
  const price = billing === 'yearly'
    ? Math.round(plan.price.yearly / 12)
    : plan.price.monthly

  const savings = plan.price.monthly * 12 - plan.price.yearly

  return (
    <div className={`card-glass flex flex-col relative overflow-hidden ${plan.popular ? 'ring-2 ring-brand-500/50 scale-105' : ''}`}>
      {plan.popular && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent" />
      )}
      {plan.popular && (
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-brand-600/30 text-brand-300 border border-brand-500/30">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 flex-1">
        {/* Plan header */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
               style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}30` }}>
            <Zap size={18} style={{ color: plan.color }} />
          </div>
          <h3 className="font-bold text-xl text-white mb-1">{plan.name}</h3>
          <p className="text-sm text-white/40">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className="font-extrabold text-5xl text-white">${price}</span>
            <span className="text-white/40 text-sm pb-1.5">/month</span>
          </div>
          {billing === 'yearly' && savings > 0 && (
            <p className="text-xs text-emerald-400 mt-1">
              Save ${savings}/year with annual billing
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map(f => (
            <li key={f.name} className="flex items-center gap-3 text-sm">
              {f.included
                ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                : <XCircle     size={16} className="text-white/20 shrink-0" />
              }
              <span className={f.included ? 'text-white/80' : 'text-white/25 line-through'}>
                {f.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-8 pt-0">
        <Link
          to={plan.id === 'enterprise' ? '/contact' : '/contact'}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            plan.popular
              ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
              : 'border border-white/10 hover:border-brand-500/40 hover:bg-brand-600/10 text-white/70 hover:text-white'
          }`}
        >
          {plan.cta}
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const [plans, setPlans]     = useState(FALLBACK_PLANS)

  useEffect(() => {
    axios.get('/api/pricing')
      .then(res => { if (res.data.data?.length) setPlans(res.data.data) })
      .catch(() => {})
  }, [])

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4">Pricing</span>
          <h1 className="font-extrabold text-5xl lg:text-6xl text-white mt-4 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 p-1 rounded-xl border border-white/10 bg-white/5">
            {['monthly', 'yearly'].map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  billing === b
                    ? 'bg-brand-600 text-white shadow-lg'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {b}
                {b === 'yearly' && (
                  <span className="ml-2 text-xs bg-emerald-400/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        {/* FAQ / Guarantee */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm text-white/60">
              14-day free trial · No credit card · Cancel anytime · 99.9% uptime SLA
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
