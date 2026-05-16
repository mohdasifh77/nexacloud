import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features',  to: '/features' },
  { label: 'Pricing',   to: '/pricing'  },
  { label: 'About',     to: '/about'    },
  { label: 'Contact',   to: '/contact'  },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }           = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050510]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center
                            group-hover:bg-brand-500 transition-colors shadow-lg shadow-brand-600/30">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Nexa<span className="text-brand-400">Cloud</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.to
                    ? 'text-white bg-brand-600/20 border border-brand-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-ghost text-sm py-2">
              Sign In
            </Link>
            <Link to="/pricing" className="btn-primary text-sm py-2">
              Get Started Free
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#050510]/98 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.to
                    ? 'text-white bg-brand-600/20 border border-brand-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
              <Link to="/pricing" className="btn-primary text-sm justify-center">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
