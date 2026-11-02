import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Plane, Leaf } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/cities', label: 'Cities' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/ayush', label: 'AYUSH', highlight: true },
  { to: '/hospitals', label: 'Hospitals' },
  { to: '/stories', label: 'Stories' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white shadow-glow transition group-hover:scale-105">
              <Leaf size={20} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
              Med<span className="text-primary-600">grid</span>
              <span className="ml-1 hidden sm:inline text-xs font-semibold text-slate-400">India</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  } ${l.highlight ? 'text-primary-600' : ''}`
                }
              >
                {l.highlight && <span className="mr-1">🌿</span>}
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/treatments" className="btn-ghost text-slate-600" aria-label="Search">
              <Search size={18} />
            </Link>
            <button onClick={() => nav('/inquiry')} className="btn-secondary text-sm px-4 py-2.5">
              <Plane size={16} /> Free Quote
            </button>
            <button onClick={() => nav('/login')} className="btn-primary text-sm px-4 py-2.5">
              Sign In
            </button>
          </div>

          <button className="lg:hidden btn-ghost p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-fade-in">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              {l.highlight && <span className="mr-1">🌿</span>}
              {l.label}
            </NavLink>
          ))}
          <button onClick={() => { setOpen(false); nav('/inquiry') }} className="btn-secondary w-full mt-2">
            <Plane size={16} /> Free Quote
          </button>
          <button onClick={() => { setOpen(false); nav('/login') }} className="btn-primary w-full">
            Sign In
          </button>
        </div>
      )}
    </header>
  )
}
