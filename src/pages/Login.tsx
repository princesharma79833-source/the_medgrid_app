import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-16">
      <div className="card p-8">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-600 text-white shadow-glow">
            <Globe size={26} strokeWidth={2.5} />
          </span>
          <h1 className="section-title mt-4 text-2xl">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{mode === 'login' ? 'Sign in to manage your treatment journey' : 'Start your medical travel journey with Medgrid'}</p>
        </div>

        <div className="mt-6 flex rounded-xl bg-slate-100 p-1">
          <button onClick={() => setMode('login')} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-white text-primary-700 shadow-soft' : 'text-slate-500'}`}>
            Sign In
          </button>
          <button onClick={() => setMode('signup')} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-white text-primary-700 shadow-soft' : 'text-slate-500'}`}>
            Sign Up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === 'signup' && (
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-10" placeholder="Full name" />
            </div>
          )}
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-10" placeholder="Email address" />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" className="input pl-10" placeholder="Password" />
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-200" /> Remember me
              </label>
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-700">Forgot password?</a>
            </div>
          )}

          <button className="btn-primary w-full">
            {mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-5 rounded-xl bg-primary-50/70 p-4">
          <p className="text-xs font-semibold text-primary-700 mb-2">With a Medgrid account you can:</p>
          <ul className="space-y-1.5">
            {['Save and compare treatment packages', 'Track your quote requests', 'Chat with your care coordinator'].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={14} className="text-primary-500" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <Link to="/inquiry" className="font-semibold text-primary-600 hover:text-primary-700">Get a free quote first</Link>
        </p>
      </div>
    </div>
  )
}
