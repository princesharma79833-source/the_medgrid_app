import { useMemo, useState } from 'react'
import { ArrowRight, Building2, CheckCircle2, CircleAlert, Leaf, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { datasetNotice, networkFacilities, uploadedDatasetStats } from '../data/network'

export default function Hospitals() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'all' | 'hospital' | 'ayush_centre'>('all')

  const filteredFacilities = useMemo(() => {
    const query = search.trim().toLowerCase()
    return networkFacilities.filter((facility) => {
      const matchesView = view === 'all' || facility.type === view
      const matchesSearch = !query || `${facility.name} ${facility.city} ${facility.state}`.toLowerCase().includes(query)
      return matchesView && matchesSearch
    })
  }, [search, view])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <span className="chip bg-primary-100 text-primary-700"><Building2 size={13} /> Care network</span>
        <h1 className="section-title mt-3 text-4xl">Facilities mapped from public source records</h1>
        <p className="mt-3 text-slate-600">Browse every facility row from the uploaded dataset. Public listings and simulated test records remain visibly separated, while accreditation badges only activate when the uploaded evidence is explicitly verified.</p>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
        {uploadedDatasetStats.map((stat) => (
          <div key={stat.label} className="bg-white p-4">
            <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <CircleAlert size={17} className="mt-1 shrink-0" />
        <p>{datasetNotice}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-y border-slate-200 py-4 md:flex-row md:items-center md:justify-between">
        <label className="relative block md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <span className="sr-only">Search facilities</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by facility or city" className="field pl-9" />
        </label>
        <div className="flex gap-2">
          {([['all', 'All facilities'], ['hospital', 'Hospitals'], ['ayush_centre', 'AYUSH centres']] as const).map(([value, label]) => (
            <button key={value} onClick={() => setView(value)} className={`border px-3 py-2 text-sm transition-colors ${view === value ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFacilities.map((facility) => {
          const isAyush = facility.type === 'ayush_centre'
          return (
            <article key={facility.id} className="border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center border ${isAyush ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    {isAyush ? <Leaf size={19} /> : <Building2 size={19} />}
                  </span>
                  <div>
                    <h2 className="font-semibold leading-5 text-slate-950">{facility.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{facility.city}, {facility.state}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-400">{facility.id}</span>
              </div>

              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-slate-500"><ShieldCheck size={14} /> Listing status</span>
                  <span className={`flex items-center gap-1 ${facility.isSimulated ? 'text-amber-800' : 'text-slate-700'}`}><CheckCircle2 size={14} className={facility.isSimulated ? 'text-amber-600' : 'text-emerald-600'} /> {facility.isSimulated ? 'Synthetic test record' : 'Public listing'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Accreditation badge</span>
                  <span className={`text-right ${facility.accreditationStatus === 'verified' ? 'font-semibold text-emerald-700' : 'text-slate-700'}`}>{facility.accreditationLabel}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Source</span>
                  <span className="text-right text-slate-700">{facility.sourceTitle}</span>
                </div>
                {facility.isSimulated && <p className="border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs leading-5 text-amber-900">Shown because it is present in the uploaded CSV. This record is not a real-world verification.</p>}
              </div>

              <Link to="/inquiry" className="btn-secondary mt-5 w-full justify-between">
                Request facility review <ArrowRight size={15} />
              </Link>
            </article>
          )
        })}
      </div>

      {filteredFacilities.length === 0 && <p className="border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">No facilities match that search.</p>}
    </div>
  )
}
