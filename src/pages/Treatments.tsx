import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, CircleAlert, Clock, HeartPulse, Leaf, Search, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { datasetNotice, networkFacilities, uploadedPackageLineItems, uploadedPackages, uploadedTreatments } from '../data/network'
import { ADDITIONAL_TRAVELER_RATE, calculatePackagePrice, INCLUDED_TRAVELERS, MAX_TRAVELERS } from '../lib/packagePricing'

export default function Treatments() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [travellers, setTravellers] = useState(INCLUDED_TRAVELERS)

  const categories = Array.from(new Set(uploadedTreatments.map((treatment) => treatment.category)))
  const filteredPackages = useMemo(() => uploadedPackages.filter((item) => {
    const treatment = uploadedTreatments.find((entry) => entry.id === item.treatmentId)
    const facility = networkFacilities.find((entry) => entry.id === item.facilityId)
    const haystack = `${item.name} ${treatment?.name ?? ''} ${facility?.name ?? ''}`.toLowerCase()
    return (category === 'all' || treatment?.category === category) && (!query.trim() || haystack.includes(query.trim().toLowerCase()))
  }), [category, query])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <span className="chip bg-accent-50 text-accent-600"><HeartPulse size={13} /> Uploaded care catalogue</span>
        <h1 className="section-title mt-3 text-4xl">Treatments and packages from your source data</h1>
        <p className="mt-3 text-slate-600">Every treatment and package row is shown below. The catalogue distinguishes clinical evidence, traditional service listings, and modelled estimates so visitors can understand what still needs provider confirmation.</p>
      </div>

      <div className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <CircleAlert size={17} className="mt-1 shrink-0" />
        <p>{datasetNotice}</p>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Treatment taxonomy</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">{uploadedTreatments.length} uploaded treatment records</h2>
          </div>
          <span className="text-sm text-slate-500">Synthetic rows remain labelled</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {uploadedTreatments.map((treatment) => (
            <article key={treatment.id} className="border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs text-slate-400">{treatment.id}</span>
                <span className={`chip ${treatment.isSimulated ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>{treatment.isSimulated ? 'Synthetic record' : 'Public listing'}</span>
              </div>
              <h3 className="mt-3 font-semibold text-slate-950">{treatment.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-slate-500">{treatment.system} · {treatment.category}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{treatment.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
                <span className="text-slate-500">Typical duration</span><strong className="text-right text-slate-800">{treatment.durationDays} days</strong>
                <span className="text-slate-500">Evidence</span><strong className="text-right text-slate-800">{treatment.evidenceLabel.split('_').join(' ')}</strong>
              </div>
              <p className="mt-3 border-l-2 border-amber-300 pl-3 text-xs leading-5 text-slate-600">{treatment.riskNote}</p>
              {treatment.citation && <a href={treatment.citation} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-semibold text-primary-700 hover:underline">View evidence citation <ArrowRight size={12} className="ml-1" /></a>}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 border-y border-slate-200 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <label className="relative block w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <span className="sr-only">Search uploaded packages</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search packages or facilities" className="field pl-9" />
            </label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="field w-auto">
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">People travelling<select value={travellers} onChange={(event) => setTravellers(Number(event.target.value))} className="field w-auto py-2 text-xs">{Array.from({ length: MAX_TRAVELERS - INCLUDED_TRAVELERS + 1 }, (_, index) => index + INCLUDED_TRAVELERS).map((count) => <option key={count} value={count}>{count}</option>)}</select></label>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-950">Uploaded package records</h2>
          <span className="text-sm text-slate-500">{filteredPackages.length} of {uploadedPackages.length} shown</span>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {filteredPackages.map((item) => {
            const treatment = uploadedTreatments.find((entry) => entry.id === item.treatmentId)
            const facility = networkFacilities.find((entry) => entry.id === item.facilityId)
            const lineItems = uploadedPackageLineItems.filter((lineItem) => lineItem.packageId === item.id)
            return (
              <article key={item.id} className="border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.12em] text-slate-500">{treatment?.category ?? 'Uploaded package'}</span>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{facility?.name ?? item.facilityId}</p>
                  </div>
                  <span className="chip bg-amber-50 text-amber-800">Illustrative</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-100 py-3 text-sm">
                  <div><p className="text-xs text-slate-500">Expected estimate</p><p className="font-semibold text-slate-950">{item.currency} {calculatePackagePrice(item.priceExpected, travellers).toLocaleString()}</p></div>
                  <div><p className="text-xs text-slate-500">Estimate range</p><p className="font-semibold text-slate-950">{item.currency} {item.priceLow.toLocaleString()}–{item.priceHigh.toLocaleString()}</p></div>
                  <div><p className="text-xs text-slate-500">Stay</p><p className="flex items-center gap-1 font-semibold text-slate-800"><Clock size={13} /> {item.stayDays} days</p></div>
                  <div><p className="text-xs text-slate-500">Source status</p><p className="font-semibold text-amber-800">Provider quote required</p></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  {lineItems.map((lineItem) => <span key={lineItem.id} className="inline-flex items-center gap-1 border border-slate-200 px-2 py-1"><CheckCircle2 size={12} className="text-slate-500" /> {lineItem.category}: {lineItem.name}</span>)}
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-600">{item.assumptions}</p>
                <p className="mt-3 flex items-center gap-1 text-[11px] text-slate-500"><ShieldCheck size={13} /> {travellers > INCLUDED_TRAVELERS ? `Includes ${INCLUDED_TRAVELERS} people + ${Math.round(ADDITIONAL_TRAVELER_RATE * 100)}% per additional traveller` : 'Includes patient + 1 companion'}</p>
                <Link to="/inquiry" className="btn-primary mt-4 w-full">Request written quote <ArrowRight size={15} /></Link>
              </article>
            )
          })}
        </div>
      </section>

      <div className="mt-8 flex items-start gap-3 border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        <Users size={17} className="mt-1 shrink-0 text-primary-600" />
        <p>Travel-party pricing is a planning aid only. The selected provider must confirm the final scope, patient suitability, donor requirements, travel arrangements, and total price.</p>
      </div>
    </div>
  )
}
