import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Target, Lightbulb, Users } from 'lucide-react'

const TEAM = [
  { name: 'Alex Kim',      role: 'CEO & Co-founder',      avatar: 'AK', color: '#6554fa', bio: 'Former Staff Engineer at Stripe. Built payment infrastructure at scale.' },
  { name: 'Priya Sharma',  role: 'CTO & Co-founder',      avatar: 'PS', color: '#06b6d4', bio: 'Ex-Google SRE. Expert in distributed systems and reliability engineering.' },
  { name: 'Jordan Walsh',  role: 'Head of Product',        avatar: 'JW', color: '#10b981', bio: 'Previously Product Lead at Vercel. Obsessed with developer experience.' },
  { name: 'Maria Santos',  role: 'Head of Engineering',    avatar: 'MS', color: '#f59e0b', bio: '10+ years building cloud infrastructure at AWS and HashiCorp.' },
  { name: 'David Park',    role: 'Lead Designer',          avatar: 'DP', color: '#8b5cf6', bio: 'Design systems expert. Former senior designer at Linear and Figma.' },
  { name: 'Aisha Johnson', role: 'Head of Customer Success',avatar: 'AJ', color: '#f43f5e', bio: 'Built support organizations at Twilio and PagerDuty from 0 to 100.' },
]

const VALUES = [
  { icon: Heart,     color: '#f43f5e', title: 'Developer-first', desc: 'Every decision starts with the question: does this make engineers\' lives better?' },
  { icon: Target,    color: '#6554fa', title: 'Radical reliability', desc: 'We treat uptime like a moral obligation, not a marketing metric.' },
  { icon: Lightbulb, color: '#f59e0b', title: 'Relentless innovation', desc: 'Shipping is in our DNA. We move fast without breaking things.' },
  { icon: Users,     color: '#10b981', title: 'Customer obsession', desc: 'Your success is our success. We win together or not at all.' },
]

export default function About() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="orb orb-purple w-[400px] h-[400px] top-20 left-10 opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero */}
        <div className="text-center mb-20">
          <span className="section-label mb-4">About Us</span>
          <h1 className="font-extrabold text-5xl lg:text-6xl text-white mt-4 mb-6 leading-tight">
            Built by engineers,<br/>
            <span className="gradient-text">for engineers</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            We started NexaCloud after spending years fighting painful deployments, opaque infrastructure, and fragmented tooling. We knew there had to be a better way.
          </p>
        </div>

        {/* Story */}
        <div className="card-glass p-10 lg:p-14 mb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-bold text-3xl text-white mb-5">Our Story</h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>NexaCloud was founded in 2021 by Alex Kim and Priya Sharma, two engineers who had spent the previous decade building infrastructure at some of the world's largest tech companies.</p>
                <p>After watching countless talented engineering teams spend more time fighting their tools than building products, they set out to create the platform they always wished existed.</p>
                <p>Today, NexaCloud serves over 10,000 engineers across 2,000+ companies — from early-stage startups to publicly traded enterprises — helping them ship faster and scale further.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded',   value: '2021' },
                { label: 'Engineers', value: '10K+' },
                { label: 'Companies', value: '2K+'  },
                { label: 'Countries', value: '80+'  },
              ].map(({ label, value }) => (
                <div key={label} className="bg-brand-600/10 border border-brand-500/20 rounded-2xl p-6 text-center">
                  <div className="font-extrabold text-3xl gradient-text">{value}</div>
                  <div className="text-sm text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl text-white">What we believe</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card-glass p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                     style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl text-white">Meet the team</h2>
            <p className="text-white/40 mt-3">World-class engineers and operators, united by a shared mission.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map(member => (
              <div key={member.name} className="card-glass p-6 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: member.color }}
                >
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-brand-400 mb-2">{member.role}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Careers CTA */}
        <div className="card-glass p-10 text-center relative overflow-hidden">
          <div className="orb orb-cyan w-48 h-48 -right-10 -bottom-10 opacity-30" />
          <div className="relative z-10">
            <h2 className="font-bold text-3xl text-white mb-3">Join our team</h2>
            <p className="text-white/40 mb-6 max-w-md mx-auto">
              We're hiring across engineering, design, product, and sales. Come build the future of developer infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                View Open Roles <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
