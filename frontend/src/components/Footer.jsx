import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const LINKS = {
  Product:   [{ label: 'Features', to: '/features' }, { label: 'Pricing', to: '/pricing' }, { label: 'Changelog', to: '#' }, { label: 'Roadmap', to: '#' }],
  Company:   [{ label: 'About',    to: '/about'    }, { label: 'Blog',    to: '#'        }, { label: 'Careers',   to: '#' }, { label: 'Press',   to: '#' }],
  Support:   [{ label: 'Contact',  to: '/contact'  }, { label: 'Docs',    to: '#'        }, { label: 'Status',    to: '#' }, { label: 'Security',to: '#' }],
  Legal:     [{ label: 'Privacy',  to: '#'         }, { label: 'Terms',   to: '#'        }, { label: 'Cookies',   to: '#' }],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="font-bold text-lg text-white">
                Nexa<span className="text-brand-400">Cloud</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The SaaS platform built for modern engineering teams. Deploy faster, scale smarter, ship with confidence.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Github,   href: 'https://github.com' },
                { Icon: Twitter,  href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Mail,     href: '/contact' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center
                             text-white/40 hover:text-white hover:border-brand-500/40 hover:bg-brand-600/10
                             transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white/30 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 hover:text-white/90 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-mono">
            © {new Date().getFullYear()} NexaCloud, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/30 font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
