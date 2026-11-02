import { useState } from 'react'
import { Quote, TrendingDown, Leaf } from 'lucide-react'
import { stories } from '../data/stories'
import Stars from '../components/Stars'

export default function Stories() {
  const [ayushOnly, setAyushOnly] = useState(false)
  const shown = ayushOnly ? stories.filter((s) => s.isAyush) : stories

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <span className="chip bg-accent-50 text-accent-600"><Quote size={13} /> Patient Stories</span>
        <h1 className="section-title mt-3 text-4xl">Real journeys, healed in India</h1>
        <p className="mt-3 text-slate-600">Thousands of patients from 50+ countries have traveled to India for affordable, world-class care and authentic AYUSH wellness. Here are their stories.</p>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button onClick={() => setAyushOnly(false)} className={`chip border transition ${!ayushOnly ? 'bg-primary-50 text-primary-700 border-primary-300' : 'bg-white text-slate-600 border-slate-200'}`}>
          All stories
        </button>
        <button onClick={() => setAyushOnly(true)} className={`chip border transition ${ayushOnly ? 'bg-primary-50 text-primary-700 border-primary-300' : 'bg-white text-slate-600 border-slate-200'}`}>
          <Leaf size={12} /> AYUSH stories
        </button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((s, i) => (
          <div key={s.id} className="card p-6 hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between">
              <Quote size={28} className="text-primary-200" />
              <div className="flex items-center gap-2">
                {s.isAyush && <span className="chip bg-primary-50 text-primary-700"><Leaf size={11} /> AYUSH</span>}
                <Stars value={s.rating} size={14} />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">"{s.quote}"</p>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary-400 to-accent-400 font-bold text-white text-lg">
                  {s.patientName[0]}
                </span>
                <div>
                  <p className="font-display font-bold text-slate-900">{s.patientName}</p>
                  <p className="text-xs text-slate-500">{s.fromFlag} {s.fromCountry} → 🇮🇳 {s.city}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Procedure</p>
                  <p className="text-sm font-semibold text-slate-700">{s.procedure}</p>
                </div>
                <span className="chip bg-primary-50 text-primary-700"><TrendingDown size={12} /> {s.savings}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
