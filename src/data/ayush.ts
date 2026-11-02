export interface AyushSystem {
  id: string
  name: string
  fullName: string
  sanskrit: string
  image: string
  color: string
  desc: string
  treats: string[]
  duration: string
  startsFrom: number
  popularTreatments: string[]
}

export const ayushSystems: AyushSystem[] = [
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    fullName: 'Ayurveda — The Science of Life',
    sanskrit: 'आयुर्वेद',
    image: 'https://images.pexels.com/photos/20689437/pexels-photo-20689437.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#1ea887',
    desc: 'India\'s 5,000-year-old holistic healing system that balances body, mind, and spirit through natural remedies, diet, and lifestyle.',
    treats: ['Chronic pain', 'Digestive disorders', 'Stress & anxiety', 'Skin conditions', 'Arthritis', 'Diabetes management'],
    duration: '7–28 days',
    startsFrom: 800,
    popularTreatments: ['Panchakarma Detox', 'Abhyanga Massage', 'Shirodhara', 'Kati Basti', 'Herbal Medicine', 'Diet & Lifestyle Counselling'],
  },
  {
    id: 'yoga',
    name: 'Yoga & Naturopathy',
    fullName: 'Yoga & Naturopathy — Natural Healing',
    sanskrit: 'योग',
    image: 'https://images.pexels.com/photos/36941720/pexels-photo-36941720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#02abf0',
    desc: 'Union of body, breath, and mind through postures, breathing techniques, and meditation — combined with natural diet and hydrotherapy.',
    treats: ['Hypertension', 'Back pain', 'Depression', 'Insomnia', 'Obesity', 'Respiratory disorders'],
    duration: '3–21 days',
    startsFrom: 500,
    popularTreatments: ['Yoga Therapy', 'Pranayama', 'Meditation Retreat', 'Hydrotherapy', 'Mud Therapy', 'Fasting Therapy'],
  },
  {
    id: 'unani',
    name: 'Unani',
    fullName: 'Unani — Greco-Arab Medicine',
    sanskrit: 'यूनानी',
    image: 'https://images.pexels.com/photos/37633062/pexels-photo-37633062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#f59e0b',
    desc: 'A traditional system rooted in Greek and Arab wisdom, treating the body\'s temperament (Mizaj) through herbal and holistic remedies.',
    treats: ['Skin diseases', 'Digestive issues', 'Respiratory conditions', 'Joint disorders', 'Lifestyle diseases'],
    duration: '7–21 days',
    startsFrom: 600,
    popularTreatments: ['Hijama (Cupping)', 'Regimental Therapy', 'Diet Therapy (Ilaj-bil-Ghiza)', 'Herbal Formulations', 'Massage (Dalak)', 'Pharmacotherapy'],
  },
  {
    id: 'siddha',
    name: 'Siddha',
    fullName: 'Siddha — Ancient Tamil Medicine',
    sanskrit: 'सिद्ध',
    image: 'https://images.pexels.com/photos/5480036/pexels-photo-5480036.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#12876d',
    desc: 'One of India\'s oldest medical systems from Tamil tradition, using minerals, metals, and herbs to restore elemental balance.',
    treats: ['Chronic diseases', 'Skin disorders', 'Joint pain', 'Respiratory issues', 'Digestive problems'],
    duration: '7–28 days',
    startsFrom: 700,
    popularTreatments: ['Varma Therapy', 'Herbal Decoctions', 'Mineral Medicines', 'Diet Therapy', 'External Applications', 'Purification Therapy'],
  },
  {
    id: 'homeopathy',
    name: 'Homeopathy',
    fullName: 'Homeopathy — Like Cures Like',
    sanskrit: 'होम्योपैथी',
    image: 'https://images.pexels.com/photos/7526051/pexels-photo-7526051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#016da5',
    desc: 'A gentle system of medicine using highly diluted natural substances to stimulate the body\'s self-healing response.',
    treats: ['Allergies', 'Migraine', 'Anxiety', 'Childhood disorders', 'Chronic sinusitis', 'Skin conditions'],
    duration: 'Consultation + follow-ups',
    startsFrom: 200,
    popularTreatments: ['Constitutional Remedy', 'Acute Care', 'Allergy Treatment', 'Pediatric Care', 'Chronic Disease Management', 'Lifestyle Counselling'],
  },
]
