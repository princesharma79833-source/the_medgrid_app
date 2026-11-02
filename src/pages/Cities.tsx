import { useState } from 'react'
import { MapPin, ArrowRight, Search, Building2, Leaf, Clock, TrendingDown } from 'lucide-react'
import { indianCities } from '../data/destinations'

export default function Cities() {
  const [q, setQ] = useState('')
  const filtered = indianCities.filter((d) =>
    d.city.toLowerCase().includes(q.toLowerCase()) ||
    d.state.toLowerCase().includes(q.toLowerCase()) ||
    d.topTreatments.some((t) => t.toLowerCase().includes(q.toLowerCase())),
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip bg-primary-100 text-primary-700"><MapPin size={13} /> Indian Cities</span>
        <h1 className="section-title mt-3 text-4xl">Heal across India's top medical cities</h1>
        <p className="mt-3 text-slate-600">From surgical hubs like Chennai and Delhi to wellness capitals like Kerala and Rishikesh — compare hospitals, AYUSH centers, and savings across India.</p>
        <div className="mt-6 relative max-w-md mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search city, state, or treatment…" className="input pl-11" />
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => (
          <div key={d.id} className="card group p-6 hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{d.emoji}</span>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">{d.city}</h3>
                <p className="text-sm text-slate-500">{d.state}</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{d.blurb}</p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-primary-50/70 p-3 text-center">
                <TrendingDown size={14} className="mx-auto text-primary-500" />
                <p className="text-xs text-slate-500 mt-1">Savings</p>
                <p className="font-display font-bold text-primary-700 text-sm">{d.avgSavings}</p>
              </div>
              <div className="rounded-xl bg-accent-50/70 p-3 text-center">
                <Building2 size={14} className="mx-auto text-accent-500" />
                <p className="text-xs text-slate-500 mt-1">Hospitals</p>
                <p className="font-display font-bold text-accent-700 text-sm">{d.hospitals}</p>
              </div>
              <div className="rounded-xl bg-primary-50/70 p-3 text-center">
                <Leaf size={14} className="mx-auto text-primary-500" />
                <p className="text-xs text-slate-500 mt-1">AYUSH</p>
                <p className="font-display font-bold text-primary-700 text-sm">{d.ayushCenters}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500">Specialties</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {d.topTreatments.map((t) => (
                  <span key={t} className="chip bg-slate-100 text-slate-600">{t}</span>
                ))}
              </div>
            </div>

            <button className="btn-secondary w-full mt-5 group-hover:bg-primary-50">
              Explore hospitals <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
