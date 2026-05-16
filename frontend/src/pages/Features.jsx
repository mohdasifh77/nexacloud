import { Link } from 'react-router-dom'
import {
  Zap, BarChart3, Shield, Globe, GitBranch, Server,
  Lock, Cpu, Activity, Database, Cloud, Terminal,
  ArrowRight, CheckCircle2
} from 'lucide-react'

const FEATURES = [
  {
    category: 'Deployment',
    icon: Zap,
    color: '#6554fa',
    title: 'Instant Deployments',
    desc: 'Push code and go live in seconds. Our intelligent pipeline handles building, testing, and deploying your application automatically.',
    bullets: ['Zero-downtime blue-green deployments', 'Automatic rollback on health check failure', 'Preview environments for every PR', 'Multi-region deployment support']
  },
  {
    category: 'Observability',
    icon: BarChart3,
    color: '#06b6d4',
    title: 'Real-Time Analytics & Monitoring',
    desc: 'Full-stack observability from infrastructure to user behavior. Never be caught off guard by issues in production.',
    bullets: ['Live metrics, logs, and traces', 'AI-powered anomaly detection', 'Custom alerts and on-call routing', 'SLA tracking dashboard']
  },
  {
    category: 'Security',
    icon: Shield,
    color: '#10b981',
    title: 'Enterprise-Grade Security',
    desc: 'SOC 2 Type II certified with end-to-end encryption, advanced access controls, and comprehensive audit logging.',
    bullets: ['RBAC and SSO/SAML support', 'Secrets management with vault', 'DDoS protection included', 'Audit logs with retention']
  },
  {
    category: 'Infrastructure',
    icon: Globe,
    color: '#f59e0b',
    title: 'Global Edge Network',
    desc: '200+ edge locations worldwide for sub-50ms latency. Your users get fast experiences regardless of geography.',
    bullets: ['200+ global PoPs', 'Automatic SSL/TLS certificates', 'Smart traffic routing', 'Built-in DDoS scrubbing']
  },
  {
    category: 'DevOps',
    icon: GitBranch,
    color: '#8b5cf6',
    title: 'CI/CD Pipeline',
    desc: 'Native integrations with GitHub, GitLab, and Bitbucket. Automate everything from test to production.',
    bullets: ['Visual pipeline builder', 'Parallel test execution', 'Artifact caching', 'Deployment approval workflows']
  },
  {
    category: 'Platform',
    icon: Server,
    color: '#f43f5e',
    title: 'Managed Infrastructure',
    desc: 'We handle servers, databases, scaling, and patches. Focus entirely on shipping features your users love.',
    bullets: ['Auto-scaling based on traffic', 'Managed Postgres, Redis, MongoDB', 'Automated backups with PITR', 'Infrastructure as code']
  },
]

export default function Features() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] top-0 right-0 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label mb-4">Platform Features</span>
          <h1 className="font-extrabold text-5xl lg:text-6xl text-white mt-4 mb-4">
            Built for serious<br/>
            <span className="gradient-text">engineering teams</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Every feature is carefully crafted to eliminate friction, increase reliability, and help you ship more with less toil.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            const isEven = i % 2 === 0
            return (
              <div key={f.title} className={`card-glass p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <span className="section-label mb-4 inline-flex">{f.category}</span>
                  <h2 className="font-bold text-3xl text-white mt-4 mb-3">{f.title}</h2>
                  <p className="text-white/50 leading-relaxed mb-6">{f.desc}</p>
                  <ul className="space-y-3">
                    {f.bullets.map(b => (
                      <li key={b} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 size={16} style={{ color: f.color }} className="shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`flex items-center justify-center ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div
                    className="w-48 h-48 rounded-3xl flex items-center justify-center animate-float"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}
                  >
                    <Icon size={80} style={{ color: f.color, opacity: 0.8 }} strokeWidth={1} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="font-bold text-3xl text-white mb-4">
            Ready to experience it?
          </h2>
          <p className="text-white/40 mb-8">Start your free 14-day trial. No credit card required.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pricing" className="btn-primary px-8 py-4">
              View Pricing <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-ghost px-8 py-4">
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
