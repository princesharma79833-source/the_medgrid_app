import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  HeartPulse,
  Hospital,
  Landmark,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { packages, type TreatmentPackage } from '../data/packages'
import { ADDITIONAL_TRAVELER_RATE, calculatePackagePrice, INCLUDED_TRAVELERS, MAX_TRAVELERS } from '../lib/packagePricing'

const plannerOptions = {
  specialty: ['Cardiac surgery', 'Orthopedic surgery', 'Oncology', 'Fertility', 'Ayurveda', 'Yoga & naturopathy'],
  procedure: ['Coronary artery bypass', 'Knee replacement', 'Liver transplant', 'IVF treatment cycle', 'Panchakarma retreat', 'Stress management program'],
  region: ['Any city or region', 'Chennai', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Kerala', 'Rishikesh'],
  budget: ['Any budget', 'Under $2,000', '$2,000 – $5,000', '$5,000 – $15,000', '$15,000+'],
  visa: ['I need visa guidance', 'I already have a medical visa', 'Visa not required', 'I am still deciding'],
}

type CareType = 'allopathic' | 'ayush'

type PlannerState = {
  careType: CareType
  specialty: string
  procedure: string
  region: string
  budget: string
  visa: string
}

export default function Home() {
  return (
    <>
      <Hero />
      <TreatmentPlanner />
      <PackageDirectory />
      <HowItWorks />
      <TrustHub />
      <FinalCallToAction />
    </>
  )
}

function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:pb-16 lg:pt-16">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="inline-flex items-center gap-2 text-primary-700"><ShieldCheck size={14} /> Verified care network</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>Serving international patients since 2012</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-6xl">
            A clearer path to trusted care in India.
          </h1>
          <div className="mt-6 flex flex-col gap-6 border-l-2 border-primary-600 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Compare accredited hospitals, specialist-led treatment plans, and AYUSH programs with one dedicated care team coordinating your journey.</p>
            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <a href="#treatment-planner" className="btn-primary rounded-full px-5 py-3 shadow-none">Build a care plan <ArrowRight size={17} /></a>
              <Link to="/hospitals" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-700">View hospitals <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="border-b border-slate-200 px-0 py-6 sm:col-span-2 sm:px-0 lg:col-span-1 lg:border-b-0 lg:border-r lg:pr-8">
            <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Care network snapshot</p><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700"><span className="h-1.5 w-1.5 rounded-full bg-primary-600" /> Live network</span></div>
            <p className="mt-3 max-w-sm font-display text-xl font-semibold tracking-tight text-slate-950">A coordinated route from clinical review to recovery.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500"><span><strong className="text-slate-900">15,000+</strong> patients assisted</span><span><strong className="text-slate-900">98%</strong> satisfaction</span></div>
          </div>
          <MetricBlock value="350+" label="Verified hospitals & centers" icon={Hospital} />
          <MetricBlock value="24/7" label="Care coordination & board oversight" icon={Clock3} />
        </div>
      </div>
    </section>
  )
}

function MetricBlock({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Hospital }) {
  return <div className="border-b border-slate-200 px-0 py-6 sm:border-b-0 sm:px-6 sm:first:border-r lg:border-r lg:px-8"><Icon size={18} className="text-slate-500" /><p className="mt-4 font-display text-2xl font-semibold tracking-tight text-slate-950">{value}</p><p className="mt-1 max-w-[180px] text-xs leading-5 text-slate-500">{label}</p></div>
}

function TreatmentPlanner() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [planner, setPlanner] = useState<PlannerState>({
    careType: 'allopathic',
    specialty: plannerOptions.specialty[0],
    procedure: plannerOptions.procedure[0],
    region: plannerOptions.region[0],
    budget: plannerOptions.budget[0],
    visa: plannerOptions.visa[0],
  })

  const updatePlanner = <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => setPlanner((current) => ({ ...current, [key]: value }))

  return (
    <section id="treatment-planner" className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-9 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary-700">01 / Treatment planner</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Start with the right questions.</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">A focused three-step intake narrows the network to suitable hospitals, doctors, and programs.</p>
          <div className="mt-7 space-y-4 text-sm text-slate-600">
            <p className="flex items-start gap-3"><span className="mt-0.5 font-display text-xs font-bold text-primary-700">01</span><span><strong className="text-slate-900">Choose a pathway.</strong><br />Select hospital-led treatment or AYUSH care.</span></p>
            <p className="flex items-start gap-3"><span className="mt-0.5 font-display text-xs font-bold text-primary-700">02</span><span><strong className="text-slate-900">Add clinical detail.</strong><br />Point us toward the right specialist route.</span></p>
            <p className="flex items-start gap-3"><span className="mt-0.5 font-display text-xs font-bold text-primary-700">03</span><span><strong className="text-slate-900">Plan the logistics.</strong><br />Share budget, destination, and visa needs.</span></p>
          </div>
        </div>

        <div className="border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7"><div><p className="font-display text-base font-semibold text-slate-950">Build your care profile</p><p className="mt-1 text-xs text-slate-500">No account required. Takes less than two minutes.</p></div><span className="text-xs font-semibold text-slate-500">Step {step} of 3</span></div>
          <div className="grid grid-cols-3 border-b border-slate-200">{['Pathway', 'Clinical details', 'Logistics'].map((label, index) => <div key={label} className={`border-b-2 px-3 py-3 text-center text-xs font-bold transition ${step === index + 1 ? 'border-primary-600 text-primary-700' : step > index + 1 ? 'border-slate-300 text-slate-500' : 'border-transparent text-slate-400'}`}><span className="mr-1.5 hidden sm:inline">0{index + 1}</span>{label}</div>)}</div>
          <div className="px-5 py-6 sm:px-7 sm:py-8">
            {step === 1 && <div><p className="text-sm font-semibold text-slate-900">What kind of care are you exploring?</p><p className="mt-1 text-xs text-slate-500">This sets the quality and provider criteria for your recommendations.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><PathwayChoice active={planner.careType === 'allopathic'} onClick={() => updatePlanner('careType', 'allopathic')} title="Allopathic care" detail="JCI / NABH hospitals and specialist pathways" icon={Stethoscope} /><PathwayChoice active={planner.careType === 'ayush'} onClick={() => updatePlanner('careType', 'ayush')} title="AYUSH care" detail="Alternative medicine and wellness programs" icon={HeartPulse} /></div></div>}
            {step === 2 && <div><p className="text-sm font-semibold text-slate-900">Tell us what you want treated.</p><p className="mt-1 text-xs text-slate-500">Use the closest match; your coordinator can refine it later.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><PlannerField label="Medical specialty" value={planner.specialty} onChange={(value) => updatePlanner('specialty', value)} options={plannerOptions.specialty} /><PlannerField label="Procedure or program" value={planner.procedure} onChange={(value) => updatePlanner('procedure', value)} options={plannerOptions.procedure} /></div></div>}
            {step === 3 && <div><p className="text-sm font-semibold text-slate-900">Plan the practical details.</p><p className="mt-1 text-xs text-slate-500">These preferences help us return realistic estimates and travel support.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><PlannerField label="Preferred city / region" value={planner.region} onChange={(value) => updatePlanner('region', value)} options={plannerOptions.region} /><PlannerField label="Estimated budget range" value={planner.budget} onChange={(value) => updatePlanner('budget', value)} options={plannerOptions.budget} /><PlannerField label="Passport / visa status" value={planner.visa} onChange={(value) => updatePlanner('visa', value)} options={plannerOptions.visa} /></div></div>}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7"><button type="button" onClick={() => setStep((current) => Math.max(current - 1, 1))} className={`btn-ghost justify-start px-0 text-sm ${step === 1 ? 'invisible' : ''}`}><ArrowLeft size={16} /> Back</button><div className="flex items-center justify-between gap-4"><span className="text-xs text-slate-500"><ShieldCheck size={14} className="mr-1 inline text-primary-600" /> Private and secure</span><button type="button" onClick={() => step < 3 ? setStep((current) => current + 1) : setSubmitted(true)} className="btn-primary rounded-md px-5 py-2.5 shadow-none">{step < 3 ? 'Continue' : submitted ? 'Request received' : 'Find matching care'} <ArrowRight size={16} /></button></div></div>
          {submitted && <div className="m-5 border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800 sm:mx-7"><strong>Your care profile is ready.</strong> A coordinator will review your preferences and return suitable options.</div>}
        </div>
      </div>
    </section>
  )
}

function PathwayChoice({ active, onClick, title, detail, icon: Icon }: { active: boolean; onClick: () => void; title: string; detail: string; icon: typeof Stethoscope }) {
  return <button type="button" onClick={onClick} className={`flex items-start gap-3 border p-4 text-left transition ${active ? 'border-primary-600 bg-primary-50/50' : 'border-slate-200 hover:border-slate-400'}`}><span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md ${active ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}><Icon size={17} /></span><span><span className="block text-sm font-bold text-slate-900">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{detail}</span></span>{active && <Check size={16} className="ml-auto shrink-0 text-primary-700" />}</button>
}

function PlannerField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="block"><span className="text-xs font-bold text-slate-700">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="input mt-2 rounded-md border-slate-200 py-3"><option value="">Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function PackageDirectory() {
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [travelers, setTravelers] = useState(INCLUDED_TRAVELERS)
  const featured = packages.slice(0, 4)
  const selectedPackages = featured.filter((item) => compareIds.includes(item.id))
  const toggleCompare = (id: string) => setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-3))

  return <section className="border-y border-slate-200 bg-white py-12 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.17em] text-primary-700">02 / Verified pathways</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Popular treatment packages</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Structured starting points with clear inclusions, indicative pricing, and provider credentials.</p></div><Link to="/treatments" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">View full directory <ArrowRight size={16} /></Link></div><div className="mt-7 flex flex-col gap-3 border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-600"><strong className="text-slate-900">Package pricing includes 2 travelers.</strong> Add family members to update the estimate.</p><label className="flex items-center gap-2 text-xs font-bold text-slate-700">People traveling<select value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} className="input w-auto rounded-md py-2 text-xs">{Array.from({ length: MAX_TRAVELERS - INCLUDED_TRAVELERS + 1 }, (_, index) => index + INCLUDED_TRAVELERS).map((count) => <option key={count} value={count}>{count}</option>)}</select></label></div><div className="mt-4 grid gap-4 lg:grid-cols-2">{featured.map((item, index) => <PackageCard key={item.id} item={item} index={index} travelers={travelers} selected={compareIds.includes(item.id)} onToggle={toggleCompare} />)}</div></div>{selectedPackages.length > 0 && <CompareDrawer items={selectedPackages} onRemove={toggleCompare} onClear={() => setCompareIds([])} />}</section>
}

function PackageCard({ item, index, travelers, selected, onToggle }: { item: TreatmentPackage; index: number; travelers: number; selected: boolean; onToggle: (id: string) => void }) {
  const detailLabels = ['Clinical care', 'Stay & recovery', 'Travel support', 'Follow-up', 'Additional care', 'Patient support']
  return <article className="border border-slate-200 bg-white transition hover:border-slate-400" style={{ animationDelay: `${index * 70}ms` }}><div className="flex items-start justify-between border-b border-slate-200 px-4 py-3.5 sm:px-5"><div><div className="flex flex-wrap items-center gap-2"><span className="bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">{item.category}</span>{item.tag && <span className="bg-primary-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-700">{item.tag}</span>}</div><h3 className="mt-2.5 font-display text-base font-semibold leading-snug text-slate-950">{item.procedure}</h3><p className="mt-1 text-xs text-slate-500">{item.hospital} · {item.city}</p></div><button type="button" onClick={() => onToggle(item.id)} aria-label={`Compare ${item.procedure}`} className={`ml-4 flex shrink-0 items-center gap-2 text-xs font-bold ${selected ? 'text-primary-700' : 'text-slate-500 hover:text-primary-700'}`}><span className={`grid h-5 w-5 place-items-center rounded border ${selected ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 bg-white'}`}>{selected && <Check size={13} />}</span><span className="hidden sm:inline">Compare</span></button></div><div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-100 px-4 py-3.5 sm:px-5"><div><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Starting estimate</p><p className="mt-1 font-display text-xl font-semibold text-primary-700">${calculatePackagePrice(item.priceFrom, travelers).toLocaleString()} <span className="text-xs font-medium text-slate-400">USD</span></p><p className="mt-1 text-[10px] text-slate-400">For {travelers} travelers</p></div><div className="text-right"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Typical stay</p><p className="mt-1 text-sm font-bold text-slate-800">{item.stayDays} days</p><p className="mt-1 text-xs text-slate-500">{item.successRate}% reported success</p></div></div><div className="px-4 py-3.5 sm:px-5"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Package detail</p><div className="mt-2 grid divide-y divide-slate-100 sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">{item.includes.slice(0, 6).map((include, includeIndex) => <div key={include} className="flex items-center justify-between gap-3 py-2 text-xs sm:border-b sm:border-slate-100"><span className="text-slate-400">{detailLabels[includeIndex] ?? 'Included'}</span><span className="text-right font-semibold text-slate-700">{include}</span></div>)}</div><div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-[11px] text-slate-400">{travelers > INCLUDED_TRAVELERS ? `+${Math.round(ADDITIONAL_TRAVELER_RATE * 100)}% per added traveler` : 'Patient + 1 companion included'}</span><Link to="/inquiry" className="inline-flex items-center gap-1 text-xs font-bold text-primary-700">Request details <ChevronRight size={14} /></Link></div></div></article>
}

function CompareDrawer({ items, onRemove, onClear }: { items: TreatmentPackage[]; onRemove: (id: string) => void; onClear: () => void }) {
  return <div className="fixed inset-x-3 bottom-3 z-40 border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-2xl sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[min(680px,calc(100%-2rem))] sm:-translate-x-1/2"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-300">Compare packages <span className="ml-2 text-slate-400">{items.length}/3 selected</span></p><div className="mt-2 flex flex-wrap gap-2">{items.map((item) => <button key={item.id} type="button" onClick={() => onRemove(item.id)} className="inline-flex max-w-[190px] items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs text-slate-200 hover:bg-white/20"><span className="truncate">{item.procedure}</span><X size={12} /></button>)}</div></div><div className="flex shrink-0 items-center gap-3"><button type="button" onClick={onClear} className="text-xs font-semibold text-slate-400 hover:text-white">Clear</button><Link to="/treatments" className="btn rounded-md bg-white px-3 py-2 text-xs font-bold text-slate-950 hover:bg-slate-100">Compare now <ArrowRight size={14} /></Link></div></div></div>
}

function HowItWorks() {
  const steps = [{ number: '01', title: 'Share reports', desc: 'Tell us about your needs and upload available medical records securely.', icon: FileText }, { number: '02', title: 'Get cost estimates', desc: 'Receive provider options with transparent inclusions and timelines.', icon: WalletCards }, { number: '03', title: 'Visa & travel assistance', desc: 'Coordinate medical visa letters, travel, and airport transfers.', icon: Plane }, { number: '04', title: 'Treatment & recovery', desc: 'Stay connected from admission through post-op follow-up.', icon: HeartPulse }]
  return <section className="bg-slate-50 py-12 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.17em] text-primary-700">03 / Patient journey</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">How your care journey works</h2><p className="mt-3 text-sm leading-6 text-slate-600">One accountable team across clinical coordination, travel logistics, and recovery support.</p></div><div className="mt-8 grid border-l border-t border-slate-200 md:grid-cols-4 md:border-l-0">{steps.map((step, index) => <div key={step.number} className="relative border-b border-r border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><span className="font-display text-xs font-bold tracking-widest text-primary-700">{step.number}</span><step.icon size={18} className="text-slate-400" /></div><h3 className="mt-8 font-display text-base font-semibold text-slate-950">{step.title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{step.desc}</p>{index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-7 z-10 hidden rounded-full border border-slate-200 bg-white p-1 text-primary-600 md:block" size={24} />}</div>)}</div></div></section>
}

function TrustHub() {
  const badges = [{ code: 'JCI', label: 'International quality standards', metadata: 'ID / registration validation code: JCI-2026-IND', audit: 'Latest audit date: 2026' }, { code: 'NABH', label: 'National hospital accreditation', metadata: 'ID / registration validation code: NABH-2026-IND', audit: 'Latest audit date: 2026' }, { code: 'MoHFW', label: 'Ministry of Health alignment', metadata: 'Registry reference: MoHFW-MT-2026-IND', audit: 'Review cycle: 2026' }]
  return <section className="border-y border-slate-200 bg-white py-12 sm:py-16"><div className="mx-auto grid max-w-7xl gap-9 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.17em] text-primary-700">04 / Accreditation & trust hub</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Evidence before promises.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">Credentials are presented as reviewable records, not decorative badges. Ask your coordinator for provider-level certificates before confirming treatment.</p><Link to="/hospitals" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">See verification standards <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-3">{badges.map((badge) => <div key={badge.code} className="border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between border-b border-slate-200 pb-3"><span className="font-display text-base font-semibold tracking-tight text-slate-950">{badge.code}</span><BadgeCheck size={16} className="text-slate-500" /></div><p className="mt-4 text-xs font-bold leading-5 text-slate-800">{badge.label}</p><p className="mt-4 text-[10px] leading-4 text-slate-500">{badge.metadata}</p><p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{badge.audit}</p></div>)}</div></div></section>
}

function FinalCallToAction() {
  return <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14"><div className="flex flex-col gap-6 border border-primary-800 bg-primary-900 px-6 py-8 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between"><div><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-primary-200"><Landmark size={14} /> Ready when you are</p><h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">Move from uncertainty to a reviewed care plan.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-primary-100">Share your requirements and receive clear next steps from our patient coordination team.</p></div><Link to="/inquiry" className="btn shrink-0 rounded-md bg-white px-5 py-3.5 text-primary-800 shadow-none hover:bg-primary-50">Request a free review <ArrowRight size={17} /></Link></div></section>
}
