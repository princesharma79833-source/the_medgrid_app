import { Leaf, ShieldCheck, Users, Heart, Target, Eye, Award, TrendingDown } from 'lucide-react'

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="max-w-3xl">
        <span className="chip bg-primary-100 text-primary-700"><Leaf size={13} /> About Medgrid India</span>
        <h1 className="section-title mt-3 text-4xl sm:text-5xl">Bringing India's healing heritage to the world</h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          Medgrid India connects patients from across the globe with India's finest accredited hospitals and authentic AYUSH wellness centers — combining advanced medicine with 5,000-year-old healing traditions, transparent pricing, and end-to-end travel support.
        </p>
      </div>

      {/* Mission / Vision */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="card p-8">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-100 text-primary-600"><Target size={26} /></span>
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900">Our mission</h2>
          <p className="mt-2 text-slate-600 leading-relaxed">To make India's world-class medical care and ancient AYUSH wellness traditions accessible to everyone — removing barriers of cost, geography, and complexity so patients can focus on healing.</p>
        </div>
        <div className="card p-8">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-100 text-accent-600"><Eye size={26} /></span>
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900">Our vision</h2>
          <p className="mt-2 text-slate-600 leading-relaxed">A world where India is the first choice for healing — where advanced surgery and holistic AYUSH therapies coexist, and medical travel is as simple as it is transformative.</p>
        </div>
      </div>

      {/* AYUSH highlight */}
      <div className="mt-8 card overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-primary-600 to-primary-400 text-white">
            <span className="text-5xl">🌿</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold">Our signature: AYUSH</h2>
            <p className="mt-2 text-white/90 leading-relaxed">
              India is the birthplace of five ancient medical systems — Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy. Recognized by the Government of India's AYUSH Ministry, these systems offer holistic healing for chronic conditions, stress, lifestyle diseases, and wellness rejuvenation.
            </p>
            <p className="mt-4 text-white/80 text-sm">
              We partner only with government-certified AYUSH centers in their authentic settings — from Ayurveda retreats in Kerala to yoga ashrams in Rishikesh.
            </p>
          </div>
          <div className="p-8">
            <h3 className="font-display font-bold text-slate-900">Why patients choose India</h3>
            <div className="mt-4 space-y-3">
              {[
                { icon: Award, t: 'World-class accreditation', d: 'NABH & JCI accredited hospitals on par with global standards' },
                { icon: TrendingDown, t: 'Up to 90% cost savings', d: 'Same quality, fraction of the cost vs. US, UK, or Europe' },
                { icon: Leaf, t: 'Authentic AYUSH', d: 'Traditional medicine at its source, government-certified' },
                { icon: Users, t: 'English-speaking care', d: 'No language barriers — India\'s medical professionals speak English fluently' },
              ].map((r) => (
                <div key={r.t} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-600">
                    <r.icon size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{r.t}</p>
                    <p className="text-sm text-slate-600">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mt-16">
        <h2 className="section-title text-3xl text-center">What we stand for</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Transparency', desc: 'No hidden fees, no surprise bills. Every quote is all-inclusive and itemized.' },
            { icon: Award, title: 'Quality', desc: 'We only partner with NABH/JCI accredited hospitals and certified AYUSH centers.' },
            { icon: Users, title: 'Compassion', desc: 'A dedicated coordinator supports you through every step, in your language.' },
            { icon: Heart, title: 'Safety', desc: 'Your health and safety come first — from pre-travel screening to post-treatment follow-up.' },
          ].map((v, i) => (
            <div key={v.title} className="card p-6 text-center animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                <v.icon size={24} />
              </span>
              <h3 className="mt-4 font-display font-bold text-slate-900">{v.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact stats */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 p-10 sm:p-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: '50K+', l: 'Patients treated' },
            { v: '500+', l: 'Hospital partners' },
            { v: '5', l: 'AYUSH systems' },
            { v: '8+', l: 'Indian cities' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">{s.v}</p>
              <p className="mt-1 text-sm text-white/80">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
