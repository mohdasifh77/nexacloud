import { Link } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="orb orb-purple w-[400px] h-[400px] top-1/4 left-1/2 -translate-x-1/2 opacity-20" />
      <div className="text-center relative z-10">
        <div className="font-extrabold text-[180px] leading-none gradient-text opacity-20 select-none">
          404
        </div>
        <div className="-mt-10">
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center mx-auto mb-6">
            <Zap size={28} className="text-brand-400" />
          </div>
          <h1 className="font-bold text-3xl text-white mb-3">Page not found</h1>
          <p className="text-white/40 mb-8 max-w-sm mx-auto">
            The page you're looking for has moved or doesn't exist. Let's get you back on track.
          </p>
          <Link to="/" className="btn-primary">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
