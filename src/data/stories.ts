export interface PatientStory {
  id: string
  patientName: string
  fromCountry: string
  fromFlag: string
  city: string
  procedure: string
  quote: string
  savings: string
  rating: number
  isAyush?: boolean
}

export const stories: PatientStory[] = [
  { id: 's1', patientName: 'James M.', fromCountry: 'USA', fromFlag: '🇺🇸', city: 'Chennai', procedure: 'Coronary Bypass Surgery', quote: 'From first quote to landing in Chennai in under three weeks. The surgical team at Apollo was world-class and I paid a fraction of what it would have cost back home.', savings: '$125,000 saved', rating: 5 },
  { id: 's2', patientName: 'Sophie L.', fromCountry: 'France', fromFlag: '🇫🇷', city: 'Kochi', procedure: 'Panchakarma Detox Retreat', quote: 'Fourteen days of authentic Ayurveda by the Kerala backwaters. I arrived exhausted and left feeling ten years younger. The herbal treatments and daily yoga transformed me.', savings: '$6,800 saved', rating: 5, isAyush: true },
  { id: 's3', patientName: 'Ahmed K.', fromCountry: 'Nigeria', fromFlag: '🇳🇬', city: 'Mumbai', procedure: 'Knee Replacement (Both Knees)', quote: 'After two years on a waiting list at home, I was walking pain-free within a month of my surgery in Mumbai. The physiotherapy team was outstanding.', savings: '$48,000 saved', rating: 5 },
  { id: 's4', patientName: 'Maria R.', fromCountry: 'Canada', fromFlag: '🇨🇦', city: 'Rishikesh', procedure: 'Stress & Anxiety Management', quote: 'Rishikesh gave me what years of therapy couldn\'t — inner peace. The yoga, pranayama, and meditation by the Ganges changed my life. I\'ve never slept better.', savings: '$4,400 saved', rating: 5, isAyush: true },
  { id: 's5', patientName: 'Layla H.', fromCountry: 'UK', fromFlag: '🇬🇧', city: 'Jaipur', procedure: 'IVF Treatment', quote: 'Jaipur gave us hope when NHS waiting times were crushing us. Our daughter is now eight months old. The care was compassionate and the cultural experience was beautiful.', savings: '$14,000 saved', rating: 5 },
  { id: 's6', patientName: 'David T.', fromCountry: 'Australia', fromFlag: '🇦🇺', city: 'Kochi', procedure: 'Diabetes Reversal Program', quote: 'My HbA1c dropped from 9.2 to 5.8 in 28 days. The Ayurvedic doctors at Nagarjuna addressed the root cause, not just symptoms. I\'m off metformin for the first time in 12 years.', savings: '$12,800 saved', rating: 5, isAyush: true },
  { id: 's7', patientName: 'Fatima Z.', fromCountry: 'UAE', fromFlag: '🇦🇪', city: 'Delhi', procedure: 'Liver Transplant', quote: 'Medanta gave my father a second chance at life. The transplant team was extraordinary and the coordinator made everything seamless for our family.', savings: '$420,000 saved', rating: 5 },
  { id: 's8', patientName: 'Robert P.', fromCountry: 'USA', fromFlag: '🇺🇸', city: 'Rishikesh', procedure: 'Wellness & Rejuvenation Retreat', quote: 'Ananda in the Himalayas was beyond anything I imagined. Ayurveda, yoga, and luxury in the foothills of the Himalayas. I returned a completely renewed person.', savings: '$15,200 saved', rating: 5, isAyush: true },
]
