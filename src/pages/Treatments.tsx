import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Search, Clock, ShieldCheck, ArrowRight, CheckCircle2, HeartPulse, Users } from 'lucide-react'
import { packages, ayushCategories, modernCategories } from '../data/packages'
import { ADDITIONAL_TRAVELER_RATE, calculatePackagePrice, INCLUDED_TRAVELERS, MAX_TRAVELERS } from '../lib/packagePricing'
import { datasetNotice } from '../data/network'

export default function Treatments() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [ayushOnly, setAyushOnly] = useState(false)
  const [travelers, setTravelers] = useState(INCLUDED_TRAVELERS)

  const cities = Array.from(new Set(packages.map((p) => p.city)))
  const filtered = packages.filter((p) =>
    (cat ? p.category === cat : true) &&
    (city ? p.city === city : true) &&
    (ayushOnly ? p.isAyush : true) &&
    (p.procedure.toLowerCase().includes(q.toLowerCase()) || p.hospital.toLowerCase().includes(q.toLowerCase())),
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="max-w-2xl">
        <span className="chip bg-accent-50 text-accent-600"><HeartPulse size={13} /> Treatments</span>
        <h1 className="section-title mt-3 text-4xl">Treatment packages across India</h1>
        <p className="mt-3 text-slate-600">Compare care pathways across India by specialty, city, and therapy type. Package figures are planning estimates and are confirmed in writing by the selected provider.</p>
      </div>

      <div className="mt-6 flex items-start gap-3 border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        <ShieldCheck size={17} className="mt-1 shrink-0 text-primary-600" />
        <p>{datasetNotice}</p>
      </div>

      {/* AYUSH toggle */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setAyushOnly(false)} className={`chip border transition ${!ayushOnly ? 'bg-primary-50 text-primary-700 border-primary-300' : 'bg-white text-slate-600 border-slate-200'}`}>
          All treatments
        </button>
        <button onClick={() => setAyushOnly(true)} className={`chip border transition ${ayushOnly ? 'bg-primary-50 text-primary-700 border-primary-300' : 'bg-white text-slate-600 border-slate-200'}`}>
          <Leaf size={12} /> AYUSH only
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-6">
          <div className="card p-5">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="input pl-10" />
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-display text-sm font-bold text-slate-900">Specialty</h3>
            <div className="mt-3 space-y-1">
              <button onClick={() => setCat(null)} className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${!cat ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                All specialties
              </button>
              <p className="px-3 pt-2 text-xs font-bold uppercase text-slate-400">Modern Medicine</p>
              {modernCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${cat === c ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {c}
                </button>
              ))}
              <p className="px-3 pt-2 text-xs font-bold uppercase text-primary-500"><Leaf size={10} className="inline mr-1" />AYUSH</p>
              {ayushCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${cat === c ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-display text-sm font-bold text-slate-900">City</h3>
            <div className="mt-3 space-y-1">
              <button onClick={() => setCity(null)} className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${!city ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                All cities
              </button>
              {cities.map((c) => (
                <button key={c} onClick={() => setCity(c)} className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${city === c ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-5 flex flex-col gap-3 border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-2"><Users size={17} className="mt-0.5 text-primary-600" /><div><p className="text-sm font-bold text-slate-900">Travel party pricing</p><p className="mt-1 text-xs text-slate-500">The patient and one companion are included in every package.</p></div></div><label className="flex items-center gap-2 text-xs font-bold text-slate-700">People traveling<select value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} className="input w-auto rounded-md py-2 text-xs">{Array.from({ length: MAX_TRAVELERS - INCLUDED_TRAVELERS + 1 }, (_, index) => index + INCLUDED_TRAVELERS).map((count) => <option key={count} value={count}>{count}</option>)}</select></label></div>
          <p className="mb-4 text-sm text-slate-500">{filtered.length} package{filtered.length !== 1 && 's'} found</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((p, i) => (
              <div key={p.id} className="card group overflow-hidden hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <div className={`relative h-24 p-5 ${p.isAyush ? 'bg-gradient-to-br from-primary-600 to-primary-400' : 'bg-gradient-to-br from-accent-500 to-primary-500'}`}>
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <span className="chip bg-white/20 text-white backdrop-blur">{p.isAyush && <Leaf size={11} className="mr-0.5" />}{p.category}</span>
                      <p className="mt-1.5 text-base">🇮🇳 {p.city}</p>
                    </div>
                    {p.tag && <span className="chip bg-white text-primary-700 shadow-soft">{p.tag}</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-slate-900 leading-snug">{p.procedure}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.hospital}</p>
                  <div className="mt-3 flex items-center justify-between border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <div>
                      <p className="text-xs text-slate-400">Illustrative estimate for {travelers} travelers</p>
                      <p className="font-display text-lg font-extrabold text-primary-600">${calculatePackagePrice(p.priceFrom, travelers).toLocaleString()}</p>
                    </div>
                    <span className="text-right text-xs text-slate-500">Provider quote required</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Clock size={11} /> {p.stayDays}-day stay</span>
                    <span className="inline-flex items-center gap-1"><ShieldCheck size={11} className="text-primary-500" /> Review with provider</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.includes.slice(0, 3).map((inc) => (
                      <span key={inc} className="text-xs text-slate-500 inline-flex items-center gap-1"><CheckCircle2 size={11} className="text-primary-400" /> {inc}</span>
                    ))}
                  </div>
                  {p.category === 'Transplant' && <div className="mt-3 flex items-start gap-2 border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800"><Users size={14} className="mt-0.5 shrink-0" /><span><strong>Donor details required.</strong> The quote team will guide donor compatibility and documentation.</span></div>}
                  <p className="mt-3 text-[11px] text-slate-400">{travelers > INCLUDED_TRAVELERS ? `Includes ${INCLUDED_TRAVELERS} people + ${Math.round(ADDITIONAL_TRAVELER_RATE * 100)}% per additional traveler` : 'Includes patient + 1 companion'}</p>
                  <Link to="/inquiry" className="btn-primary w-full mt-3">Get Quote <ArrowRight size={15} /></Link>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="card p-12 text-center text-slate-500">No packages match your filters. Try a broader search.</div>
          )}
        </div>
      </div>
    </div>
  )
}
