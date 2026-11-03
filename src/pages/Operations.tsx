import { useMemo, useState } from 'react'
import { Ambulance, BadgeCheck, BedDouble, ChevronRight, CircleAlert, Database, Languages, Search, ShieldCheck, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { uploadedAmbulances, uploadedAvailabilityLanguages, uploadedCapacity, uploadedFacilityLanguages, uploadedPractitioners, uploadedTableInventory, uploadedVerificationCases } from '../data/operations'

type Section = 'doctors' | 'ambulances' | 'capacity' | 'verification' | 'coverage'

const sections: { id: Section; label: string; description: string }[] = [
  { id: 'doctors', label: 'Doctors', description: 'Practitioner records' },
  { id: 'ambulances', label: 'Transport', description: 'Ambulance records' },
  { id: 'capacity', label: 'Capacity', description: 'Beds and facilities' },
  { id: 'verification', label: 'Verification', description: 'Review cases' },
  { id: 'coverage', label: 'Data coverage', description: 'Uploaded tables' },
]

function SimulationBadge({ isSimulated }: { isSimulated: boolean }) {
  return <span className={`chip ${isSimulated ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>{isSimulated ? 'Synthetic record' : 'Public record'}</span>
}

function EmptyState({ label }: { label: string }) {
  return <div className="border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">No {label.toLowerCase()} match your search.</div>
}

export default function Operations() {
  const [activeSection, setActiveSection] = useState<Section>('doctors')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const summaryCards: { label: string; count: number; Icon: LucideIcon; section: Section }[] = [
    { label: 'Doctors', count: uploadedPractitioners.length, Icon: Stethoscope, section: 'doctors' },
    { label: 'Ambulances', count: uploadedAmbulances.length, Icon: Ambulance, section: 'ambulances' },
    { label: 'Capacity rows', count: uploadedCapacity.length, Icon: BedDouble, section: 'capacity' },
    { label: 'Review cases', count: uploadedVerificationCases.length, Icon: BadgeCheck, section: 'verification' },
  ]
  const practitioners = useMemo(() => uploadedPractitioners.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.system}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery])
  const ambulances = useMemo(() => uploadedAmbulances.filter((ambulance) => `${ambulance.id} ${ambulance.className} ${ambulance.status}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <span className="chip bg-primary-100 text-primary-700"><Database size={13} /> Network operations</span>
        <h1 className="section-title mt-3 text-4xl">A clearer view of your uploaded network</h1>
        <p className="mt-3 text-slate-600">Explore doctors, transport, capacity, verification, and source coverage in one calm workspace. Each record keeps its original status so visitors know what is confirmed and what still needs review.</p>
      </div>

      <div className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <CircleAlert size={17} className="mt-1 shrink-0" />
        <p>These uploaded records are reference data, not live operations. Synthetic rows are labelled and capacity, ambulance status, and availability must be confirmed with the provider.</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(({ label, count, Icon, section }) => (
          <button key={label} onClick={() => setActiveSection(section)} className="group flex items-center justify-between border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg">
            <span><strong className="block text-2xl text-slate-950">{count}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-slate-500">{label} loaded</span></span>
            <span className="grid h-10 w-10 place-items-center bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white"><Icon size={19} /></span>
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {sections.map((section) => <button key={section.id} onClick={() => { setActiveSection(section.id); setQuery('') }} className={`min-w-max rounded-xl px-4 py-2.5 text-left transition ${activeSection === section.id ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}><span className="block text-sm font-semibold">{section.label}</span><span className={`mt-0.5 block text-[11px] ${activeSection === section.id ? 'text-primary-100' : 'text-slate-400'}`}>{section.description}</span></button>)}
          </div>
          {activeSection !== 'coverage' && <label className="relative block sm:w-64"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><span className="sr-only">Search records</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this section" className="field pl-9" /></label>}
        </div>

        <div className="p-4 sm:p-6">
          {activeSection === 'doctors' && <section><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Practitioner records</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Find a care professional</h2></div><Stethoscope className="text-primary-500" /></div>{practitioners.length === 0 ? <EmptyState label="doctors" /> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{practitioners.map((doctor) => <article key={`${doctor.id}-${doctor.registration}`} className="group border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"><div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary-600"><Stethoscope size={18} /></span><SimulationBadge isSimulated={doctor.isSimulated} /></div><h3 className="mt-4 font-semibold text-slate-950">{doctor.name}</h3><p className="mt-1 text-sm text-primary-700">{doctor.specialty}</p><div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600"><p className="flex justify-between gap-3"><span>System</span><strong className="text-slate-800">{doctor.system}</strong></p><p className="flex justify-between gap-3"><span>Registry</span><strong className="text-slate-800">{doctor.registry}</strong></p><p className="flex justify-between gap-3"><span>Verification level</span><strong className="text-slate-800">{doctor.verificationLevel}</strong></p></div><button className="mt-4 inline-flex items-center text-xs font-semibold text-primary-700 transition group-hover:gap-2">View record <ChevronRight size={14} /></button></article>)}</div>}</section>}

          {activeSection === 'ambulances' && <section><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Transport records</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Ambulance network</h2></div><Ambulance className="text-primary-500" /></div>{ambulances.length === 0 ? <EmptyState label="ambulances" /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ambulances.map((ambulance) => <article key={ambulance.id} className="border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"><div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent-600"><Ambulance size={18} /></span><SimulationBadge isSimulated={ambulance.isSimulated} /></div><h3 className="mt-4 font-semibold text-slate-950">{ambulance.className} ambulance</h3><p className="mt-1 font-mono text-xs text-slate-500">{ambulance.id} · {ambulance.plate}</p><div className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-600">Dataset status: <strong className="text-slate-900">{ambulance.status}</strong><p className="mt-1 text-xs">Operator: {ambulance.operator}</p></div></article>)}</div>}</section>}

          {activeSection === 'capacity' && <section><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Facility capacity</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Beds and capacity signals</h2></div><BedDouble className="text-primary-500" /></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{uploadedCapacity.map((item) => <article key={item.id} className="border border-slate-200 p-4 transition hover:border-primary-300 hover:shadow-md"><div className="flex items-center justify-between"><span className="font-mono text-xs text-slate-400">{item.facilityId}</span><SimulationBadge isSimulated={item.isSimulated} /></div><h3 className="mt-3 font-semibold capitalize text-slate-950">{item.bedType} beds</h3><div className="mt-2 flex items-end justify-between"><span className="text-sm text-slate-500">{item.band}</span><strong className="text-xl text-primary-700">{item.exactCount || '—'}</strong></div><p className="mt-2 text-xs text-slate-500">Confidence score: {item.confidence}</p></article>)}</div></section>}

          {activeSection === 'verification' && <section><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Verification workflow</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Review cases</h2></div><BadgeCheck className="text-primary-500" /></div><div className="grid gap-3 md:grid-cols-2">{uploadedVerificationCases.map((item) => <article key={item.id} className="flex items-center justify-between gap-4 border border-slate-200 p-4 transition hover:border-primary-300 hover:shadow-md"><div><p className="font-mono text-xs text-slate-400">{item.id}</p><h3 className="mt-1 font-medium capitalize text-slate-900">{item.subjectType} review</h3><p className="mt-1 text-xs text-slate-500">{item.practitionerId || item.facilityId} · Level {item.levelRequested} · {item.status}</p></div><SimulationBadge isSimulated={item.isSimulated} /></article>)}</div></section>}

          {activeSection === 'coverage' && <section><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Source coverage</p><h2 className="mt-1 text-xl font-semibold text-slate-950">What has been loaded</h2></div><Database className="text-primary-500" /></div><p className="mb-5 max-w-2xl text-sm leading-6 text-slate-600">The raw table names are kept here for traceability, while the rest of the app presents them as readable care-network sections.</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{uploadedTableInventory.map((table) => <div key={table.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-primary-300 hover:bg-primary-50"><span className="text-sm capitalize text-slate-600">{table.name.split('_').join(' ')}</span><strong className="text-slate-950">{table.count}</strong></div>)}</div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="border border-slate-200 p-4"><div className="flex items-center gap-2"><Languages size={17} className="text-primary-600" /><h3 className="font-semibold text-slate-900">Language support</h3></div><p className="mt-2 text-sm text-slate-600">{uploadedFacilityLanguages.length} facility rows and {uploadedAvailabilityLanguages.length} availability-language rows loaded.</p></div><div className="border border-slate-200 p-4"><div className="flex items-center gap-2"><ShieldCheck size={17} className="text-primary-600" /><h3 className="font-semibold text-slate-900">Trust signals</h3></div><p className="mt-2 text-sm text-slate-600">Verification, accreditation, and source fields stay separate so a listing is never mistaken for a confirmed provider.</p></div></div></section>}
        </div>
      </div>
    </div>
  )
}
