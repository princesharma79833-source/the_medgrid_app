export type NetworkFacility = {
  id: string
  name: string
  type: 'hospital' | 'ayush_centre'
  city: string
  state: string
  source: string
}

export const networkFacilities: NetworkFacility[] = [
  { id: 'fac_01', name: 'Apollo Hospitals, Greams Road', type: 'hospital', city: 'Chennai', state: 'Tamil Nadu', source: 'Hospital official websites' },
  { id: 'fac_02', name: 'All India Institute of Medical Sciences, New Delhi', type: 'hospital', city: 'New Delhi', state: 'Delhi', source: 'AIIMS New Delhi' },
  { id: 'fac_03', name: 'All India Institute of Ayurveda', type: 'ayush_centre', city: 'New Delhi', state: 'Delhi', source: 'Hospital official websites' },
  { id: 'fac_04', name: 'Arya Vaidya Sala, Kottakkal', type: 'ayush_centre', city: 'Kottakkal', state: 'Kerala', source: 'Hospital official websites' },
  { id: 'fac_05', name: 'National Institute of Homoeopathy', type: 'ayush_centre', city: 'Kolkata', state: 'West Bengal', source: 'Hospital official websites' },
  { id: 'fac_06', name: 'Fortis Memorial Research Institute', type: 'hospital', city: 'Gurugram', state: 'Haryana', source: 'Hospital official websites' },
  { id: 'fac_07', name: 'Manipal Hospital, Old Airport Road', type: 'hospital', city: 'Bengaluru', state: 'Karnataka', source: 'Hospital official websites' },
  { id: 'fac_08', name: 'Medanta - The Medicity', type: 'hospital', city: 'Gurugram', state: 'Haryana', source: 'Hospital official websites' },
  { id: 'fac_09', name: 'Max Super Speciality Hospital, Saket', type: 'hospital', city: 'New Delhi', state: 'Delhi', source: 'Hospital official websites' },
  { id: 'fac_10', name: 'Kokilaben Dhirubhai Ambani Hospital', type: 'hospital', city: 'Mumbai', state: 'Maharashtra', source: 'Hospital official websites' },
  { id: 'fac_11', name: 'Narayana Health City', type: 'hospital', city: 'Bengaluru', state: 'Karnataka', source: 'Hospital official websites' },
  { id: 'fac_12', name: 'CIMS Hospital', type: 'hospital', city: 'Ahmedabad', state: 'Gujarat', source: 'Hospital official websites' },
  { id: 'fac_13', name: 'Sanjay Gandhi Postgraduate Institute of Medical Sciences', type: 'hospital', city: 'Lucknow', state: 'Uttar Pradesh', source: 'Hospital official websites' },
]

export const uploadedDatasetStats = [
  { value: '13', label: 'public facility listings' },
  { value: '31', label: 'facility specialty links' },
  { value: '41', label: 'availability records' },
  { value: '8', label: 'illustrative packages' },
]

export const datasetNotice = 'Records are identity and taxonomy anchors from the uploaded dataset. Accreditation, availability, and price fields require provider confirmation before a patient relies on them.'
