import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const PLANS = ['General Inquiry', 'Starter Plan', 'Pro Plan', 'Enterprise']

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', subject: '', message: '', plan: ''
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/contact', {
        ...form,
        plan: form.plan?.toLowerCase().replace(' plan', '').replace('general inquiry', 'general') || 'general'
      })
      toast.success(res.data.message)
      setSent(true)
      setForm({ name: '', email: '', company: '', subject: '', message: '', plan: '' })
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors?.length) {
        errors.forEach(e => toast.error(e.message))
      } else {
        toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="orb orb-purple w-[400px] h-[400px] top-10 left-0 opacity-20" />
      <div className="orb orb-cyan   w-[300px] h-[300px] bottom-20 right-0 opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4">Contact Us</span>
          <h1 className="font-extrabold text-5xl text-white mt-4 mb-4">
            Let's start a conversation
          </h1>
          <p className="text-white/40 max-w-lg mx-auto">
            Have questions about NexaCloud? Our team responds within 24 hours. For enterprise inquiries, expect a call within 4 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail,    label: 'Email us',     value: 'hello@nexacloud.io',  sub: 'We reply within 24 hours'         },
              { icon: Phone,   label: 'Call us',      value: '+1 (888) 123-4567',  sub: 'Mon–Fri, 9am–6pm PST'             },
              { icon: MapPin,  label: 'Visit us',     value: 'San Francisco, CA',   sub: '100 Tech Blvd, Suite 400'         },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="card-glass p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/25 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-white/30 font-mono uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white font-semibold text-sm">{value}</p>
                  <p className="text-xs text-white/30 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}

            {/* Response time promise */}
            <div className="card-glass p-6">
              <h4 className="font-semibold text-white mb-3">Our Response Promise</h4>
              <ul className="space-y-2 text-sm text-white/50">
                {[
                  ['General inquiries', '< 24 hours'],
                  ['Technical support', '< 4 hours'],
                  ['Enterprise sales',  '< 2 hours'],
                  ['Critical issues',   '< 30 minutes'],
                ].map(([type, time]) => (
                  <li key={type} className="flex justify-between">
                    <span>{type}</span>
                    <span className="text-emerald-400 font-semibold">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card-glass p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400/30
                                  flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-2">Message sent!</h3>
                  <p className="text-white/40 text-sm mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-ghost text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                   placeholder:text-white/25 focus:outline-none focus:border-brand-500/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                   placeholder:text-white/25 focus:outline-none focus:border-brand-500/50 transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => update('company', e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                   placeholder:text-white/25 focus:outline-none focus:border-brand-500/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                        Interested In
                      </label>
                      <select
                        value={form.plan}
                        onChange={e => update('plan', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                   focus:outline-none focus:border-brand-500/50 transition appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0f0f22]">Select a plan…</option>
                        {PLANS.map(p => (
                          <option key={p} value={p} className="bg-[#0f0f22]">{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      placeholder="How can we help?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                 placeholder:text-white/25 focus:outline-none focus:border-brand-500/50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="Tell us about your project, team size, and what you're hoping to achieve…"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                 placeholder:text-white/25 focus:outline-none focus:border-brand-500/50 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
                      : <><Send size={16} /> Send Message</>
                    }
                  </button>

                  <p className="text-center text-xs text-white/25">
                    By submitting, you agree to our Privacy Policy. We never sell your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
