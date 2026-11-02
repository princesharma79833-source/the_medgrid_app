export interface TreatmentPackage {
  id: string
  procedure: string
  category: string
  city: string
  hospital: string
  priceFrom: number
  usAvg: number
  stayDays: number
  rating: number
  successRate: number
  includes: string[]
  tag?: string
  isAyush?: boolean
}

export const packages: TreatmentPackage[] = [
  // Modern medicine
  { id: 'p1', procedure: 'Coronary Artery Bypass (CABG)', category: 'Cardiac', city: 'Chennai', hospital: 'Apollo Hospitals', priceFrom: 4500, usAvg: 130000, stayDays: 12, rating: 4.8, successRate: 98, includes: ['Surgery', '7-day hospital stay', 'Cardiac rehab', 'Airport pickup', 'Interpreter'], tag: 'Most booked' },
  { id: 'p2', procedure: 'Total Knee Replacement (Both Knees)', category: 'Orthopedic', city: 'Mumbai', hospital: 'Fortis Hospital', priceFrom: 5200, usAvg: 60000, stayDays: 14, rating: 4.7, successRate: 97, includes: ['Bilateral surgery', 'Implants', 'Physiotherapy', '8-day stay', 'Follow-up'] },
  { id: 'p3', procedure: 'Liver Transplant', category: 'Transplant', city: 'Delhi', hospital: 'Medanta, Gurgaon', priceFrom: 38000, usAvg: 500000, stayDays: 35, rating: 4.8, successRate: 92, includes: ['Transplant', '15-day ICU', 'Donor workup', 'Immunosuppressants', 'Recovery'], tag: 'Complex care' },
  { id: 'p4', procedure: 'IVF Treatment Cycle', category: 'Fertility', city: 'Jaipur', hospital: 'Bourn Hall Fertility Centre', priceFrom: 2800, usAvg: 20000, stayDays: 21, rating: 4.7, successRate: 72, includes: ['Full IVF cycle', 'ICSI', 'Medications', 'Embryo transfer', 'Counseling'], tag: 'Best value' },
  { id: 'p5', procedure: 'Robotic Prostate Surgery', category: 'Oncology', city: 'Mumbai', hospital: 'Tata Memorial', priceFrom: 5500, usAvg: 40000, stayDays: 10, rating: 4.7, successRate: 96, includes: ['Robotic surgery', '5-day stay', 'Pathology', 'Oncology follow-up'] },
  { id: 'p6', procedure: 'Spine Surgery (Minimally Invasive)', category: 'Orthopedic', city: 'Bangalore', hospital: 'Narayana Health', priceFrom: 6800, usAvg: 110000, stayDays: 12, rating: 4.7, successRate: 95, includes: ['MIS surgery', 'Implants', '4-day stay', 'Rehab', 'Follow-up'] },
  { id: 'p7', procedure: 'Bone Marrow Transplant', category: 'Oncology', city: 'Chennai', hospital: 'Apollo Specialty', priceFrom: 25000, usAvg: 400000, stayDays: 45, rating: 4.8, successRate: 90, includes: ['Transplant', '30-day isolation', 'Donor matching', 'Post-transplant care'] },
  { id: 'p8', procedure: 'Cosmetic Surgery — Rhinoplasty', category: 'Cosmetic', city: 'Mumbai', hospital: 'Enhance Clinics', priceFrom: 1800, usAvg: 15000, stayDays: 5, rating: 4.6, successRate: 97, includes: ['Surgery', '2-night stay', 'Post-op care', 'Follow-up'] },

  // AYUSH packages
  { id: 'a1', procedure: 'Panchakarma Detox Retreat (14 Days)', category: 'Ayurveda', city: 'Kochi', hospital: 'Somatheeram Ayurveda Resort', priceFrom: 1200, usAvg: 8000, stayDays: 14, rating: 4.9, successRate: 96, includes: ['Panchakarma therapy', 'Befront sea cottage', 'Ayurvedic meals', 'Daily yoga', 'Herbal medicines', 'Doctor consultation'], tag: 'Signature AYUSH', isAyush: true },
  { id: 'a2', procedure: 'Stress & Anxiety Management (7 Days)', category: 'Yoga & Naturopathy', city: 'Rishikesh', hospital: 'Parmarth Niketan Ashram', priceFrom: 600, usAvg: 5000, stayDays: 7, rating: 4.8, successRate: 94, includes: ['Yoga therapy', 'Pranayama', 'Meditation', 'Satvic meals', 'Ganga aarti', 'Counselling'], isAyush: true },
  { id: 'a3', procedure: 'Arthritis & Joint Pain Program (21 Days)', category: 'Ayurveda', city: 'Varanasi', hospital: 'Kerala Ayurveda Center', priceFrom: 1500, usAvg: 12000, stayDays: 21, rating: 4.8, successRate: 93, includes: ['Panchakarma', 'Kati Basti', 'Abhyanga massage', 'Herbal medicines', 'Diet plan', 'Yoga sessions'], isAyush: true },
  { id: 'a4', procedure: 'Diabetes Reversal Program (28 Days)', category: 'Ayurveda', city: 'Kochi', hospital: 'Nagarjuna Ayurvedic Centre', priceFrom: 2200, usAvg: 15000, stayDays: 28, rating: 4.9, successRate: 91, includes: ['Personalized detox', 'Herbal formulation', 'Diet therapy', 'Yoga & meditation', 'Daily monitoring', 'Lifestyle coaching'], tag: 'Most popular', isAyush: true },
  { id: 'a5', procedure: 'Hijama (Cupping) Therapy Course', category: 'Unani', city: 'Delhi', hospital: 'Aligarh Unani Hospital', priceFrom: 400, usAvg: 3000, stayDays: 3, rating: 4.6, successRate: 95, includes: ['Cupping sessions', 'Herbal support', 'Diet guidance', 'Follow-up'], isAyush: true },
  { id: 'a6', procedure: 'Wellness & Rejuvenation Retreat (10 Days)', category: 'Yoga & Naturopathy', city: 'Rishikesh', hospital: 'Ananda in the Himalayas', priceFrom: 2800, usAvg: 18000, stayDays: 10, rating: 4.9, successRate: 97, includes: ['Luxury accommodation', 'Yoga & meditation', 'Ayurveda therapies', 'Organic meals', 'Nature walks', 'Spa treatments'], tag: 'Luxury retreat', isAyush: true },
  { id: 'a7', procedure: 'Chronic Skin Disorder Treatment (14 Days)', category: 'Siddha', city: 'Chennai', hospital: 'National Institute of Siddha', priceFrom: 900, usAvg: 7000, stayDays: 14, rating: 4.7, successRate: 92, includes: ['Varma therapy', 'Herbal decoctions', 'External applications', 'Diet therapy', 'Follow-up'], isAyush: true },
  { id: 'a8', procedure: 'Homeopathy Constitutional Care (3 Months)', category: 'Homeopathy', city: 'Mumbai', hospital: 'Dr. Batra\'s Clinic', priceFrom: 250, usAvg: 2000, stayDays: 1, rating: 4.6, successRate: 88, includes: ['Detailed consultation', 'Personalized remedy', 'Monthly follow-ups', 'Telemedicine support'], isAyush: true },
]

export const categories = [
  'Cardiac', 'Orthopedic', 'Oncology', 'Transplant', 'Fertility', 'Cosmetic',
  'Ayurveda', 'Yoga & Naturopathy', 'Unani', 'Siddha', 'Homeopathy',
]

export const ayushCategories = ['Ayurveda', 'Yoga & Naturopathy', 'Unani', 'Siddha', 'Homeopathy']
export const modernCategories = ['Cardiac', 'Orthopedic', 'Oncology', 'Transplant', 'Fertility', 'Cosmetic']
