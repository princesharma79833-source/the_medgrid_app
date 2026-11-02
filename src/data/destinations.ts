export interface IndianCity {
  id: string
  city: string
  state: string
  hospitals: number
  topTreatments: string[]
  ayushCenters: number
  avgSavings: string
  blurb: string
  emoji: string
}

export const indianCities: IndianCity[] = [
  { id: 'chennai', city: 'Chennai', state: 'Tamil Nadu', hospitals: 48, ayushCenters: 32, avgSavings: '80–90%', topTreatments: ['Cardiac Surgery', 'Organ Transplant', 'Orthopedic', 'Oncology'], blurb: 'The healthcare capital of India — home to Apollo and world-class transplant centers.', emoji: '🏛️' },
  { id: 'mumbai', city: 'Mumbai', state: 'Maharashtra', hospitals: 55, ayushCenters: 28, avgSavings: '70–85%', topTreatments: ['Cardiac', 'Neuro', 'Cosmetic', 'Fertility'], blurb: 'Premium multi-specialty care with leading research hospitals.', emoji: '🌃' },
  { id: 'delhi', city: 'New Delhi', state: 'Delhi NCR', hospitals: 62, ayushCenters: 40, avgSavings: '75–88%', topTreatments: ['Cardiac', 'Transplant', 'Neuro', 'Orthopedic'], blurb: 'Home to AIIMS, Medanta, and Max — India\'s largest medical hub.', emoji: '🏯' },
  { id: 'bangalore', city: 'Bangalore', state: 'Karnataka', hospitals: 44, ayushCenters: 35, avgSavings: '70–85%', topTreatments: ['Cardiac', 'Oncology', 'Orthopedic', 'Eye'], blurb: 'Tech-forward hospitals with advanced robotic surgery.', emoji: '🌆' },
  { id: 'kerala', city: 'Kochi', state: 'Kerala', hospitals: 38, ayushCenters: 72, avgSavings: '75–90%', topTreatments: ['Ayurveda & Wellness', 'Cardiac', 'Dental', 'Eye'], blurb: 'The birthplace of authentic Ayurveda — ideal for AYUSH retreats.', emoji: '🌴' },
  { id: 'rishikesh', city: 'Rishikesh', state: 'Uttarakhand', hospitals: 18, ayushCenters: 58, avgSavings: '80–92%', topTreatments: ['Yoga & Naturopathy', 'Ayurveda', 'Wellness Detox', 'Meditation'], blurb: 'The yoga capital of the world — spiritual healing by the Ganges.', emoji: '🧘' },
  { id: 'jaipur', city: 'Jaipur', state: 'Rajasthan', hospitals: 26, ayushCenters: 30, avgSavings: '78–88%', topTreatments: ['Orthopedic', 'Cardiac', 'IVF', 'Unani'], blurb: 'Affordable quality care with rich cultural heritage for recovery.', emoji: '🏰' },
  { id: 'varanasi', city: 'Varanasi', state: 'Uttar Pradesh', hospitals: 22, ayushCenters: 45, avgSavings: '80–90%', topTreatments: ['Ayurveda', 'Siddha', 'Panchakarma', 'Wellness'], blurb: 'Ancient city of healing — traditional AYUSH therapies in their purest form.', emoji: '🕉️' },
]
