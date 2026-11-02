import { Link } from 'react-router-dom'
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const cols = [
    { title: 'Explore', links: ['Indian Cities', 'Treatments', 'AYUSH Systems', 'Accredited Hospitals', 'Patient Stories'] },
    { title: 'Company', links: ['About Us', 'How It Works', 'Careers', 'Press', 'Contact'] },
    { title: 'Support', links: ['Help Center', 'Visa for India', 'Insurance', 'Privacy Policy', 'Terms'] },
  ]
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-500 text-white">
                <Leaf size={20} strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-extrabold text-white">Medgrid <span className="text-primary-400 text-sm">India</span></span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              India's trusted medical tourism platform — connecting you with world-class hospitals and authentic AYUSH wellness retreats across 8+ cities. Transparent pricing, end-to-end logistics, and a dedicated coordinator by your side.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg bg-slate-800 text-slate-400 transition hover:bg-primary-600 hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-400 transition hover:text-primary-400">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><Phone size={14} /> +91 80 4567 8900</span>
            <span className="inline-flex items-center gap-2"><Mail size={14} /> care@medgrid.in</span>
            <span className="inline-flex items-center gap-2"><MapPin size={14} /> Available across 8+ Indian cities</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 Medgrid India Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
