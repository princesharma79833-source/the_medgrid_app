import { Link } from 'react-router-dom'
import { Leaf, ArrowRight, Clock, CheckCircle2, Sparkles, Star, Quote } from 'lucide-react'
import { ayushSystems } from '../data/ayush'
import { packages } from '../data/packages'
import { stories } from '../data/stories'
import Stars from '../components/Stars'

export default function Ayush() {
  const ayushPackages = packages.filter((p) => p.isAyush)
  const ayushStories = stories.filter((s) => s.isAyush)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 to-white">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-12 text-center">
          <span className="chip bg-primary-100 text-primary-700"><Leaf size={13} /> AYUSH Wellness</span>
          <h1 className="section-title mt-4 text-4xl sm:text-5xl">AYUSH — ancient healing, alive in India</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Five traditional systems of medicine, recognized by the Government of India and practiced for millennia. Experience holistic wellness at authentic centers across India — from Ayurveda in Kerala to Yoga in Rishikesh.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {ayushSystems.map((s) => (
              <span key={s.id} className="chip bg-white border border-primary-100 text-slate-700 shadow-soft">
                <img src={s.image} alt="" className="h-5 w-5 rounded object-cover" /> {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Systems detail */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="space-y-8">
          {ayushSystems.map((s, i) => (
            <div
              key={s.id}
              className={`card overflow-hidden animate-fade-up ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="grid lg:grid-cols-[1fr_1.5fr]">
                {/* Visual side */}
                <div className="relative min-h-[280px] overflow-hidden p-8 flex flex-col justify-end text-left">
                  <img src={s.image} alt={`${s.name} wellness practice`} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/55" />
                  <div className="relative">
                  <h2 className="font-display text-2xl font-extrabold text-white">{s.name}</h2>
                  <p className="mt-1 text-2xl font-bold text-white/85">{s.sanskrit}</p>
                  <p className="mt-3 max-w-xs text-xs text-white/75">{s.fullName}</p>
                  <div className="mt-5 flex gap-6">
                    <div className="text-center">
                      <p className="font-display text-xl font-bold text-white">{s.duration}</p>
                      <p className="text-xs text-white/70">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-xl font-bold text-white">${s.startsFrom}</p>
                      <p className="text-xs text-white/70">Starts from</p>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-8">
                  <p className="text-slate-700 leading-relaxed">{s.desc}</p>

                  <div className="mt-5">
                    <p className="text-sm font-bold text-slate-900">Conditions treated</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.treats.map((t) => (
                        <span key={t} className="chip bg-slate-100 text-slate-600">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-bold text-slate-900">Popular treatments</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {s.popularTreatments.map((t) => (
                        <div key={t} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={14} className="shrink-0" style={{ color: s.color }} /> {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to="/inquiry" className="btn-primary mt-6">
                    Get a Quote <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AYUSH packages */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center">
            <span className="chip bg-primary-100 text-primary-700"><Sparkles size={13} /> AYUSH Packages</span>
            <h2 className="section-title mt-3 text-3xl sm:text-4xl">All-inclusive AYUSH retreats</h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">Authentic therapies, accommodation, meals, and yoga — all included in one transparent price.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ayushPackages.map((p, i) => (
              <div key={p.id} className="card group overflow-hidden hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="relative h-24 bg-gradient-to-br from-primary-600 to-primary-400 p-5">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <span className="chip bg-white/20 text-white backdrop-blur"><Leaf size={11} className="mr-0.5" /> {p.category}</span>
                      <p className="mt-1.5 text-lg">🇮🇳 {p.city}</p>
                    </div>
                    {p.tag && <span className="chip bg-white text-primary-700 shadow-soft">{p.tag}</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-slate-900 leading-snug">{p.procedure}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.hospital}</p>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5">
                    <div>
                      <p className="text-xs text-slate-400">From</p>
                      <p className="font-display text-lg font-extrabold text-primary-600">${p.priceFrom.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">US avg</p>
                      <p className="text-sm font-semibold text-slate-400 line-through">${p.usAvg.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Stars value={p.rating} size={12} /> {p.rating}</span>
                    <span className="inline-flex items-center gap-1"><Clock size={11} /> {p.stayDays}-day stay</span>
                    <span className="inline-flex items-center gap-1"><CheckCircle2 size={11} className="text-primary-500" /> {p.successRate}%</span>
                  </div>
                  <Link to="/inquiry" className="btn-primary w-full mt-4">Get Quote <ArrowRight size={15} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AYUSH stories */}
      {ayushStories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center">
            <span className="chip bg-accent-50 text-accent-600"><Quote size={13} /> AYUSH Stories</span>
            <h2 className="section-title mt-3 text-3xl">Healed through AYUSH</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ayushStories.map((s, i) => (
              <div key={s.id} className="card p-6 hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between">
                  <Quote size={28} className="text-primary-200" />
                  <span className="chip bg-primary-50 text-primary-700"><Leaf size={11} /> AYUSH</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">"{s.quote}"</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-100 font-bold text-primary-700">{s.patientName[0]}</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{s.patientName}</p>
                      <p className="text-xs text-slate-500">{s.fromFlag} → 🇮🇳 {s.city}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-slate-500">{s.procedure}</p>
                    <Stars value={s.rating} size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
