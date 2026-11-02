import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Plane, CheckCircle2, User, Mail, Phone, Globe, HeartPulse, Calendar, ChevronDown, Leaf, Search, ShieldCheck, Users, ArrowRight } from 'lucide-react'
import { packages, categories, ayushCategories } from '../data/packages'
import { indianCities } from '../data/destinations'
import { ayushSystems } from '../data/ayush'
import { createQuoteRequest, trackQuoteRequest, type QuoteRequestResult } from '../lib/quoteRequests'

type CareType = 'allopathic' | 'ayush'

type FormState = {
  fullName: string
  email: string
  phone: string
  country: string
  careType: CareType
  treatment: string
  preferredCity: string
  timeline: string
  conditionSummary: string
  donorRequired: boolean
  donorRelationship: string
  donorBloodGroup: string
  donorAge: string
  donorHealthNotes: string
  travelPartySize: number
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  careType: 'allopathic',
  treatment: '',
  preferredCity: '',
  timeline: 'Flexible',
  conditionSummary: '',
  donorRequired: false,
  donorRelationship: '',
  donorBloodGroup: '',
  donorAge: '',
  donorHealthNotes: '',
  travelPartySize: 2,
}

export default function Inquiry() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submittedRequest, setSubmittedRequest] = useState<QuoteRequestResult | null>(null)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [trackOpen, setTrackOpen] = useState(false)
  const [trackReference, setTrackReference] = useState('')
  const [trackEmail, setTrackEmail] = useState('')
  const [trackingResult, setTrackingResult] = useState<QuoteRequestResult | null>(null)
  const [trackingError, setTrackingError] = useState('')
  const [tracking, setTracking] = useState(false)

  const requiresDonor = useMemo(() => form.treatment.toLowerCase().includes('transplant'), [form.treatment])
  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }))

  const submitQuote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const result = await createQuoteRequest({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        care_type: form.careType,
        treatment: form.treatment,
        preferred_city: form.preferredCity,
        timeline: form.timeline,
        condition_summary: form.conditionSummary,
        donor_required: requiresDonor && form.donorRequired,
        donor_relationship: form.donorRelationship,
        donor_blood_group: form.donorBloodGroup,
        donor_age: form.donorAge ? Number(form.donorAge) : null,
        donor_health_notes: form.donorHealthNotes,
        travel_party_size: form.travelPartySize,
      })
      setSubmittedRequest(result)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not submit your request right now.')
    } finally {
      setSubmitting(false)
    }
  }

  const submitTracking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTracking(true)
    setTrackingError('')
    setTrackingResult(null)
    try {
      setTrackingResult(await trackQuoteRequest(trackReference, trackEmail))
    } catch (error) {
      setTrackingError(error instanceof Error ? error.message : 'We could not check this request right now.')
    } finally {
      setTracking(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="chip bg-primary-100 text-primary-700"><Plane size={13} /> Free Quote</span>
        <h1 className="section-title mt-3 text-4xl">Get your personalized treatment quote for India</h1>
        <p className="mt-3 text-slate-600">Tell us about your needs. A dedicated coordinator will prepare an all-inclusive quote and reach out within 24 hours — no obligation, no cost.</p>
      </div>

      {submittedRequest ? <Confirmation request={submittedRequest} onNewRequest={() => { setSubmittedRequest(null); setForm(initialForm) }} /> : <form className="card mt-10 space-y-5 p-6 sm:p-8" onSubmit={submitQuote}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field icon={User} label="Full name"><input required value={form.fullName} onChange={(event) => updateForm('fullName', event.target.value)} className="input pl-10" placeholder="Jane Doe" /></Field>
          <Field icon={Mail} label="Email"><input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} className="input pl-10" placeholder="jane@email.com" /></Field>
          <Field icon={Phone} label="Phone (with country code)"><input required type="tel" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} className="input pl-10" placeholder="+1 555 000 1234" /></Field>
          <Field icon={Globe} label="Country of residence"><input required value={form.country} onChange={(event) => updateForm('country', event.target.value)} className="input pl-10" placeholder="United States" /></Field>
        </div>

        <div className="flex flex-wrap gap-2 border-y border-slate-100 py-4">
          <button type="button" onClick={() => updateForm('careType', 'allopathic')} className={`chip border transition ${form.careType === 'allopathic' ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-slate-200 bg-white text-slate-600'}`}>Modern Medicine</button>
          <button type="button" onClick={() => updateForm('careType', 'ayush')} className={`chip border transition ${form.careType === 'ayush' ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-slate-200 bg-white text-slate-600'}`}><Leaf size={12} /> AYUSH Wellness</button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField label={form.careType === 'ayush' ? 'AYUSH system' : 'Treatment needed'} icon={form.careType === 'ayush' ? Leaf : HeartPulse} value={form.treatment} onChange={(value) => updateForm('treatment', value)} options={form.careType === 'ayush' ? ayushSystems.map((system) => system.name) : [...categories.filter((category) => !ayushCategories.includes(category)), ...packages.filter((item) => !item.isAyush).slice(0, 8).map((item) => item.procedure)]} groupedLabel="Specific packages" />
          <SelectField label="Preferred city in India" icon={Globe} value={form.preferredCity} onChange={(value) => updateForm('preferredCity', value)} options={indianCities.map((city) => `${city.city}, ${city.state}`)} />
        </div>

        <TravelPartyField value={form.travelPartySize} onChange={(value) => updateForm('travelPartySize', value)} />

        {requiresDonor && <DonorSection enabled={form.donorRequired} onEnabledChange={(value) => updateForm('donorRequired', value)} relationship={form.donorRelationship} bloodGroup={form.donorBloodGroup} age={form.donorAge} notes={form.donorHealthNotes} onChange={updateForm} />}

        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Calendar size={15} className="text-primary-600" /> Preferred timeline</label>
          <div className="mt-2 flex flex-wrap gap-2">{['ASAP', 'Within 1 month', 'Within 3 months', 'Flexible'].map((timeline) => <label key={timeline} className="cursor-pointer"><input type="radio" name="timeline" value={timeline} checked={form.timeline === timeline} onChange={(event) => updateForm('timeline', event.target.value)} className="peer sr-only" /><span className="chip border border-slate-200 text-slate-600 peer-checked:border-primary-300 peer-checked:bg-primary-50 peer-checked:text-primary-700 transition">{timeline}</span></label>)}</div>
        </div>

        <div><label className="text-sm font-semibold text-slate-700">Describe your condition (optional)</label><textarea value={form.conditionSummary} onChange={(event) => updateForm('conditionSummary', event.target.value)} rows={4} className="input mt-1.5 resize-none" placeholder="Briefly describe your diagnosis, symptoms, or any prior treatment…" /></div>
        {submitError && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-base"><Plane size={18} /> {submitting ? 'Submitting request…' : 'Request My Free Quote'}</button>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400"><ShieldCheck size={14} /> Your request is reviewed privately by our care coordination team.</p>
      </form>}

      <div id="track-request" className="mt-6 border border-slate-200 bg-white">
        <button type="button" aria-label="Open request tracker" onClick={() => setTrackOpen((current) => !current)} className="flex w-full items-center justify-between px-5 py-4 text-left"><span className="flex items-center gap-3"><Search size={17} className="text-primary-600" /><span><span className="block text-sm font-bold text-slate-900">Track an existing quote request</span><span className="mt-1 block text-xs text-slate-500">Use your reference code and email to see the latest status.</span></span></span><ChevronDown size={18} className={`text-slate-400 transition ${trackOpen ? 'rotate-180' : ''}`} /></button>
        {trackOpen && <form onSubmit={submitTracking} className="border-t border-slate-200 px-5 py-5"><div className="grid gap-4 sm:grid-cols-2"><label className="block"><span className="text-xs font-bold text-slate-700">Request reference</span><input required value={trackReference} onChange={(event) => setTrackReference(event.target.value)} className="input mt-2" placeholder="MG-XXXXXXXX" /></label><label className="block"><span className="text-xs font-bold text-slate-700">Email address</span><input required type="email" value={trackEmail} onChange={(event) => setTrackEmail(event.target.value)} className="input mt-2" placeholder="jane@email.com" /></label></div><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type="submit" disabled={tracking} className="btn-secondary px-4 py-2.5">{tracking ? 'Checking…' : 'Check request status'} <ArrowRight size={15} /></button>{trackingError && <p className="text-sm text-red-700">{trackingError}</p>}</div>{trackingResult && <StatusResult request={trackingResult} />}</form>}
      </div>
    </div>
  )
}

function TravelPartyField({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="border border-slate-200 bg-slate-50 p-4"><div className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-primary-700"><Users size={16} /></span><div className="flex-1"><label className="text-sm font-bold text-slate-900">How many people are traveling?</label><p className="mt-1 text-xs leading-5 text-slate-500">Every treatment package includes the patient and one accompanying person. Additional family members increase the accommodation and logistics estimate.</p><select value={value} onChange={(event) => onChange(Number(event.target.value))} className="input mt-3 max-w-xs rounded-md"><option value={2}>2 people — included</option>{Array.from({ length: 8 }, (_, index) => index + 3).map((count) => <option key={count} value={count}>{count} people — adjusted estimate</option>)}</select></div></div></div>
}

function Confirmation({ request, onNewRequest }: { request: QuoteRequestResult; onNewRequest: () => void }) {
  return <div className="card mt-10 p-8 text-center sm:p-10"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-100 text-primary-700"><CheckCircle2 size={34} /></span><h2 className="section-title mt-5 text-3xl">Quote request received.</h2><p className="mt-3 text-slate-600">Our care coordinators will review your needs and send a personalized response within 24 hours.</p><div className="mx-auto mt-6 max-w-sm border border-primary-200 bg-primary-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary-700">Your tracking reference</p><p className="mt-2 font-display text-2xl font-semibold tracking-wider text-slate-950">{request.reference_code}</p><p className="mt-2 text-xs text-slate-600">Save this code with the email address you submitted to check your request status.</p></div><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={onNewRequest} className="btn-secondary">Submit another request</button><a href="#track-request" className="btn-primary" onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Open request tracker"]')?.click()}>Track this request <ArrowRight size={15} /></a></div></div>
}

function StatusResult({ request }: { request: QuoteRequestResult }) {
  const labels: Record<string, string> = { submitted: 'Request submitted', under_review: 'Under coordinator review', options_ready: 'Care options ready', coordination: 'Travel coordination in progress', completed: 'Request completed' }
  return <div className="mt-5 border border-primary-200 bg-primary-50 px-4 py-4"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wide text-primary-700">Current status</span><span className="text-xs font-semibold text-slate-500">{new Date(request.updated_at ?? request.created_at).toLocaleDateString()}</span></div><p className="mt-2 font-display text-lg font-semibold text-slate-950">{labels[request.status] ?? 'Request received'}</p><p className="mt-1 text-xs text-slate-600">Reference {request.reference_code}</p></div>
}

function DonorSection({ enabled, onEnabledChange, relationship, bloodGroup, age, notes, onChange }: { enabled: boolean; onEnabledChange: (value: boolean) => void; relationship: string; bloodGroup: string; age: string; notes: string; onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void }) {
  return <div className="border border-slate-200 bg-slate-50 p-5"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-primary-700"><Users size={18} /></span><div className="flex-1"><p className="text-sm font-bold text-slate-900">Living or deceased donor information</p><p className="mt-1 text-xs leading-5 text-slate-600">Transplant pathways need additional information so the clinical team can assess the right next step.</p><label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-800"><input type="checkbox" checked={enabled} onChange={(event) => onEnabledChange(event.target.checked)} className="h-4 w-4 accent-primary-600" /> This request involves a donor</label></div></div>{enabled && <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3"><label className="block"><span className="text-xs font-bold text-slate-700">Donor relationship</span><select required value={relationship} onChange={(event) => onChange('donorRelationship', event.target.value)} className="input mt-2"><option value="">Select…</option><option>Family member</option><option>Spouse or partner</option><option>Deceased donor pathway</option><option>Other</option></select></label><label className="block"><span className="text-xs font-bold text-slate-700">Blood group</span><select required value={bloodGroup} onChange={(event) => onChange('donorBloodGroup', event.target.value)} className="input mt-2"><option value="">Select…</option>{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map((group) => <option key={group}>{group}</option>)}</select></label><label className="block"><span className="text-xs font-bold text-slate-700">Donor age</span><input required type="number" min="0" max="120" value={age} onChange={(event) => onChange('donorAge', event.target.value)} className="input mt-2" placeholder="Age" /></label><label className="block sm:col-span-3"><span className="text-xs font-bold text-slate-700">Known donor health notes</span><textarea value={notes} onChange={(event) => onChange('donorHealthNotes', event.target.value)} rows={3} className="input mt-2 resize-none" placeholder="Relevant conditions, prior surgeries, or compatibility information…" /></label></div>}</div>
}

function SelectField({ label, icon: Icon, value, onChange, options, groupedLabel }: { label: string; icon: typeof HeartPulse; value: string; onChange: (value: string) => void; options: string[]; groupedLabel?: string }) {
  return <div><label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Icon size={15} className="text-primary-600" /> {label}</label><div className="relative mt-1.5"><select required value={value} onChange={(event) => onChange(event.target.value)} className="input appearance-none pr-10"><option value="">Select…</option>{groupedLabel ? <><optgroup label="Categories">{options.slice(0, 6).map((option) => <option key={option}>{option}</option>)}</optgroup><optgroup label={groupedLabel}>{options.slice(6).map((option) => <option key={option}>{option}</option>)}</optgroup></> : options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" /></div></div>
}

function Field({ icon: Icon, label, children }: { icon: typeof User; label: string; children: ReactNode }) {
  return <div><label className="text-sm font-semibold text-slate-700">{label}</label><div className="relative mt-1.5"><Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />{children}</div></div>
}
