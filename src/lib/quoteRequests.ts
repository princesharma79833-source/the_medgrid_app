export type QuoteRequestInput = {
  full_name: string
  email: string
  phone: string
  country: string
  care_type: 'allopathic' | 'ayush'
  treatment: string
  preferred_city: string
  timeline: string
  condition_summary: string
  donor_required: boolean
  donor_relationship: string
  donor_blood_group: string
  donor_age: number | null
  donor_health_notes: string
  travel_party_size: number
}

export type QuoteRequestResult = {
  reference_code: string
  status: string
  created_at: string
  updated_at?: string
}

const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quote-requests`
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  'Content-Type': 'application/json',
}

async function requestQuote(payload: Record<string, unknown>): Promise<QuoteRequestResult> {
  const response = await fetch(apiUrl, { method: 'POST', headers, body: JSON.stringify(payload) })
  const body: unknown = await response.json().catch(() => null)
  if (!response.ok || !body || typeof body !== 'object' || !('request' in body)) {
    const message = body && typeof body === 'object' && 'error' in body && typeof body.error === 'string' ? body.error : 'We could not complete this request.'
    throw new Error(message)
  }
  const result = body.request
  if (!result || typeof result !== 'object' || !('reference_code' in result) || !('status' in result) || !('created_at' in result)) throw new Error('We could not complete this request.')
  return result as QuoteRequestResult
}

export function createQuoteRequest(input: QuoteRequestInput): Promise<QuoteRequestResult> {
  return requestQuote({ action: 'create', ...input })
}

export function trackQuoteRequest(referenceCode: string, email: string): Promise<QuoteRequestResult> {
  return requestQuote({ action: 'track', reference_code: referenceCode, email })
}
