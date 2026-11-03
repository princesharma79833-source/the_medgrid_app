import ambulanceCsv from './ambulance.csv?raw'
import practitionerCsv from './practitioner.csv?raw'
import capacityCsv from './capacity_record.csv?raw'
import facilityLanguageCsv from './facility_language.csv?raw'
import availabilityLanguageCsv from './availability_language.csv?raw'
import verificationCsv from './verification_case.csv?raw'
import inventoryCsv from './TABLE_INVENTORY.csv?raw'
import { isSimulated, parseCsv } from './network'

export const uploadedPractitioners = parseCsv(practitionerCsv).map((row) => ({
  id: row.practitioner_id,
  name: row.name,
  system: row.system,
  specialty: row.specialty,
  registry: row.registry,
  registration: row.registration_no,
  verificationLevel: row.verification_level,
  volumeBand: row.volume_band,
  isSimulated: isSimulated(row),
}))

export const uploadedAmbulances = parseCsv(ambulanceCsv).map((row) => ({
  id: row.ambulance_id,
  className: row.class,
  plate: row.plate,
  status: row.status,
  operator: row.operator,
  isSimulated: isSimulated(row),
}))

export const uploadedCapacity = parseCsv(capacityCsv).map((row) => ({
  id: row.capacity_id,
  facilityId: row.facility_id,
  bedType: row.bed_type,
  band: row.band,
  exactCount: row.exact_count,
  confidence: row.confidence,
  isSimulated: isSimulated(row),
}))

export const uploadedFacilityLanguages = parseCsv(facilityLanguageCsv).map((row) => ({
  facilityId: row.facility_id,
  language: row.language,
  isSimulated: isSimulated(row),
}))

export const uploadedAvailabilityLanguages = parseCsv(availabilityLanguageCsv).map((row) => ({
  availabilityId: row.availability_id,
  language: row.language,
  isSimulated: isSimulated(row),
}))

export const uploadedVerificationCases = parseCsv(verificationCsv).map((row) => ({
  id: row.case_id,
  subjectType: row.subject_type,
  practitionerId: row.practitioner_id,
  facilityId: row.facility_id,
  levelRequested: row.level_requested,
  status: row.status,
  isSimulated: isSimulated(row),
}))

export const uploadedTableInventory = parseCsv(inventoryCsv).map((row) => ({
  name: row.table_name,
  count: Number(row.record_count),
}))
