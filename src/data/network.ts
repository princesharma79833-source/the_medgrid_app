import facilityCsv from './facility.csv?raw'
import accreditationCsv from './facility_accreditation.csv?raw'
import treatmentCsv from './treatment.csv?raw'
import packageCsv from './package.csv?raw'
import packageLineItemCsv from './package_line_item.csv?raw'
import availabilityCsv from './doctor_availability.csv?raw'
import sourceCsv from './data_source.csv?raw'

type CsvRow = Record<string, string>

function parseCsv(csv: string): CsvRow[] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index]
    const nextCharacter = csv[index + 1]
    if (character === '"' && quoted && nextCharacter === '"') {
      cell += '"'
      index += 1
    } else if (character === '"') {
      quoted = !quoted
    } else if (character === ',' && !quoted) {
      row.push(cell)
      cell = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && nextCharacter === '\n') index += 1
      row.push(cell)
      if (row.some((value) => value.trim())) rows.push(row)
      row = []
      cell = ''
    } else {
      cell += character
    }
  }

  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }

  const headers = rows[0]?.map((header) => header.replace(/^\uFEFF/, '').trim()) ?? []
  return rows.slice(1).map((values) => headers.reduce<CsvRow>((record, header, index) => {
    record[header] = values[index]?.trim() ?? ''
    return record
  }, {}))
}

function isSimulated(row: CsvRow): boolean {
  return row.is_simulated === '1' || row.data_origin === 'synthetic' || row.source?.includes('synthetic') === true || row.facility_id?.startsWith('SYN_') === true
}

export type NetworkFacility = {
  id: string
  name: string
  type: string
  city: string
  state: string
  sourceId: string
  sourceTitle: string
  isSimulated: boolean
  dataOrigin: string
  source: string
  accreditationStatus: 'not_recorded' | 'pending' | 'verified'
  accreditationLabel: string
}

export type UploadedTreatment = {
  id: string
  name: string
  system: string
  category: string
  description: string
  durationDays: number
  evidenceLabel: string
  citation: string
  citationStatus: string
  riskNote: string
  isSimulated: boolean
}

export type UploadedPackage = {
  id: string
  treatmentId: string
  facilityId: string
  name: string
  inclusions: string
  exclusions: string
  stayDays: number
  priceLow: number
  priceExpected: number
  priceHigh: number
  currency: string
  assumptions: string
  isSimulated: boolean
}

const facilityRows = parseCsv(facilityCsv)
const accreditationRows = parseCsv(accreditationCsv)
const sourceRows = parseCsv(sourceCsv)
const treatmentRows = parseCsv(treatmentCsv)
const packageRows = parseCsv(packageCsv)
const packageLineItemRows = parseCsv(packageLineItemCsv)
const availabilityRows = parseCsv(availabilityCsv)

const sourceById = new Map(sourceRows.map((row) => [row.source_id, row]))
const accreditationByFacility = new Map<string, CsvRow[]>()
for (const row of accreditationRows) {
  const current = accreditationByFacility.get(row.facility_id) ?? []
  current.push(row)
  accreditationByFacility.set(row.facility_id, current)
}

function getAccreditationState(facilityId: string): Pick<NetworkFacility, 'accreditationStatus' | 'accreditationLabel'> {
  const records = accreditationByFacility.get(facilityId) ?? []
  const verified = records.find((record) => !isSimulated(record) && record.status === 'verified')
  if (verified) return { accreditationStatus: 'verified', accreditationLabel: `${verified.body} verified` }
  if (records.length > 0) return { accreditationStatus: 'pending', accreditationLabel: 'Evidence pending' }
  return { accreditationStatus: 'not_recorded', accreditationLabel: 'Not recorded' }
}

export const networkFacilities: NetworkFacility[] = facilityRows.map((row) => {
  const source = sourceById.get(row.source_id)
  return {
    id: row.facility_id,
    name: row.name,
    type: row.type,
    city: row.city,
    state: row.state,
    sourceId: row.source_id,
    sourceTitle: source?.title ?? 'Uploaded facility record',
    isSimulated: isSimulated(row),
    dataOrigin: row.data_origin,
    source: row.source,
    ...getAccreditationState(row.facility_id),
  }
})

export const uploadedTreatments: UploadedTreatment[] = treatmentRows.map((row) => ({
  id: row.treatment_id,
  name: row.name,
  system: row.system,
  category: row.category,
  description: row.description,
  durationDays: Number(row.typical_duration_days),
  evidenceLabel: row.evidence_label,
  citation: row.evidence_citation,
  citationStatus: row.citation_status,
  riskNote: row.risk_note,
  isSimulated: isSimulated(row),
}))

export const uploadedPackages: UploadedPackage[] = packageRows.map((row) => ({
  id: row.package_id,
  treatmentId: row.treatment_id,
  facilityId: row.facility_id,
  name: row.name,
  inclusions: row.inclusions,
  exclusions: row.exclusions,
  stayDays: Number(row.stay_days),
  priceLow: Number(row.price_low),
  priceExpected: Number(row.price_expected),
  priceHigh: Number(row.price_high),
  currency: row.currency,
  assumptions: row.assumptions,
  isSimulated: isSimulated(row),
}))

export const uploadedPackageLineItems = packageLineItemRows.map((row) => ({
  id: row.item_id,
  packageId: row.package_id,
  category: row.category,
  name: row.item_name,
  amount: Number(row.amount),
  isSimulated: isSimulated(row),
}))

export const uploadedAvailability = availabilityRows.map((row) => ({
  id: row.availability_id,
  facilityId: row.facility_id,
  status: row.status,
  nextAvailableAt: row.next_available_at,
  isSimulated: isSimulated(row),
}))

export const uploadedDatasetStats = [
  { value: String(networkFacilities.length), label: 'facility rows loaded' },
  { value: String(uploadedTreatments.length), label: 'treatment rows loaded' },
  { value: String(uploadedPackages.length), label: 'package rows loaded' },
  { value: String(uploadedAvailability.length), label: 'availability rows loaded' },
]

export const datasetNotice = 'Every uploaded row is retained in the directory. Simulated rows are clearly marked, accreditation is only marked verified when the accreditation row itself has verified evidence, and availability rows are never presented as live.'
