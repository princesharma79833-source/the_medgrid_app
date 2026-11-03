import { useMemo, useState } from 'react'
import { Ambulance, BadgeCheck, CircleAlert, Database, Languages, Search, ShieldCheck, Stethoscope } from 'lucide-react'
import { uploadedAmbulances, uploadedAvailabilityLanguages, uploadedCapacity, uploadedFacilityLanguages, uploadedPractitioners, uploadedTableInventory, uploadedVerificationCases } from '../data/operations'

function SimulationBadge({ isSimulated }: { isSimulated: boolean }) {
  return <span className={`chip ${isSimulated ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>{isSimulated ? 'Synthetic test record' : 'Public record'}</span>
}

export default function Operations() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const practitioners = useMemo(() => uploadedPractitioners.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.system}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery])
  const ambulances = useMemo(() => uploadedAmbulances.filter((ambulance) => `${ambulance.id} ${ambulance.className} ${ambulance.status}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <span className="chip bg-primary-100 text-primary-700"><Database size={13} /> Network operations</span>
        <h1 className="section-title mt-3 text-4xl">Doctors, transport, and operational records</h1>
        <p className="mt-3 text-slate-600">This page exposes the remaining uploaded datasets so they are not hidden. Records marked synthetic are shown for completeness but are not presented as real doctors, live ambulances, current capacity, or confirmed verification.</p>
      </div>

      <div className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <CircleAlert size={17} className="mt-1 shrink-0" />
        <p>Do not use the doctor, ambulance, capacity, language, or verification rows as live operational information. Submit a quote request for a current provider confirmation.</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[['Doctors', uploadedPractitioners.length], ['Ambulances', uploadedAmbulances.length], ['Capacity rows', uploadedCapacity.length], ['Verification cases', uploadedVerificationCases.length]].map(([label, count]) => (
          <div key={label} className="border border-slate-200 bg-white p-4"><p className="text-2xl font-semibold text-slate-950">{count}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{label} loaded</p></div>
        ))}
      </div>

      <div className="mt-8 border-y border-slate-200 py-4">
        <label className="relative block max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <span className="sr-only">Search operational records</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctors or ambulances" className="field pl-9" />
        </label>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Practitioner CSV</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Doctor records</h2></div><Stethoscope size={22} className="text-slate-400" /></div>
        <div className="mt-4 overflow-x-auto border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.1em] text-slate-500"><tr><th className="px-4 py-3">Record</th><th className="px-4 py-3">Practitioner</th><th className="px-4 py-3">Specialty</th><th className="px-4 py-3">Registry</th><th className="px-4 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{practitioners.map((doctor) => <tr key={`${doctor.id}-${doctor.registration}`}><td className="px-4 py-3 font-mono text-xs text-slate-400">{doctor.id}</td><td className="px-4 py-3 font-medium text-slate-900">{doctor.name}</td><td className="px-4 py-3 text-slate-600">{doctor.specialty}<span className="block text-xs text-slate-400">{doctor.system}</span></td><td className="px-4 py-3 text-slate-600">{doctor.registry}<span className="block text-xs text-slate-400">{doctor.registration}</span></td><td className="px-4 py-3"><SimulationBadge isSimulated={doctor.isSimulated} /></td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-end justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Ambulance CSV</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Transport records</h2></div><Ambulance size={22} className="text-slate-400" /></div>
          <div className="mt-4 space-y-3">{ambulances.map((ambulance) => <article key={ambulance.id} className="border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-950">{ambulance.className} ambulance</h3><p className="mt-1 font-mono text-xs text-slate-500">{ambulance.id} · {ambulance.plate}</p></div><SimulationBadge isSimulated={ambulance.isSimulated} /></div><p className="mt-3 text-sm text-slate-600">Dataset status: <strong>{ambulance.status}</strong>. Operator: {ambulance.operator}.</p></article>)}</div>
        </div>

        <div>
          <div className="flex items-end justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Verification CSV</p><h2 className="mt-1 text-xl font-semibold text-slate-950">Review cases</h2></div><BadgeCheck size={22} className="text-slate-400" /></div>
          <div className="mt-4 space-y-3">{uploadedVerificationCases.map((item) => <article key={item.id} className="flex items-center justify-between gap-3 border border-slate-200 bg-white p-4"><div><p className="font-mono text-xs text-slate-400">{item.id}</p><p className="mt-1 text-sm font-medium text-slate-900">{item.subjectType} · {item.practitionerId || item.facilityId}</p><p className="mt-1 text-xs text-slate-500">Level {item.levelRequested} · {item.status}</p></div><SimulationBadge isSimulated={item.isSimulated} /></article>)}</div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><Languages size={18} className="text-primary-600" /><h2 className="font-semibold text-slate-950">Language records</h2></div><p className="mt-2 text-sm text-slate-600">{uploadedFacilityLanguages.length} facility-language rows and {uploadedAvailabilityLanguages.length} availability-language rows loaded. These entries are dataset references, not a guarantee of interpreter availability.</p><div className="mt-4 flex flex-wrap gap-2">{Array.from(new Set([...uploadedFacilityLanguages.map((item) => item.language), ...uploadedAvailabilityLanguages.map((item) => item.language)])).map((language) => <span key={language} className="chip bg-slate-100 text-slate-700">{language}</span>)}</div></div>
        <div className="border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-primary-600" /><h2 className="font-semibold text-slate-950">Capacity records</h2></div><p className="mt-2 text-sm text-slate-600">{uploadedCapacity.length} capacity rows loaded. The uploaded values are synthetic and confidence-scored, so they are not displayed as current bed availability.</p><div className="mt-4 grid grid-cols-2 gap-2 text-sm">{Array.from(new Set(uploadedCapacity.map((item) => item.bedType))).map((bedType) => <div key={bedType} className="border border-slate-100 bg-slate-50 p-3"><p className="font-medium text-slate-800">{bedType}</p><p className="mt-1 text-xs text-slate-500">{uploadedCapacity.filter((item) => item.bedType === bedType).length} rows</p></div>)}</div></div>
      </section>

      <section className="mt-10"><div className="flex items-end justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Uploaded file inventory</p><h2 className="mt-1 text-xl font-semibold text-slate-950">All dataset tables</h2></div></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{uploadedTableInventory.map((table) => <div key={table.name} className="flex items-center justify-between border border-slate-200 bg-white px-3 py-2 text-sm"><span className="text-slate-600">{table.name.split('_').join(' ')}</span><strong className="text-slate-950">{table.count}</strong></div>)}</div></section>
    </div>
  )
}
