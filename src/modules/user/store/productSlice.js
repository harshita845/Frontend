import { createSlice } from '@reduxjs/toolkit';

// Realistic dummy data representing premium healthcare catalogs
const initialMedicines = [
  {
    id: 'med-1',
    name: 'Revital H Capsule',
    category: 'Wellness',
    brand: 'Sun Pharmaceutical Industries Ltd',
    price: 310,
    discountPrice: 263,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 30 capsules',
    composition: 'Ginseng, 10 Vitamins, 9 Minerals & Amino Acids',
    benefits: 'Improves physical strength, mental alertness, boosts immunity, and fights fatigue.',
    warnings: 'Keep out of reach of children. Do not exceed the recommended daily dose.',
    dosage: 'One capsule daily with a glass of water after meals.',
    inStock: true
  },
  {
    id: 'med-2',
    name: 'Dolo 650 Tablet',
    category: 'Medicines',
    brand: 'Micro Labs Ltd',
    price: 34,
    discountPrice: 28,
    discountPercent: 18,
    rating: 4.8,
    reviewsCount: 1582,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Paracetamol 650mg',
    benefits: 'Used to relieve pain and reduce fever. Highly prescribed for head, joint, and body aches.',
    warnings: 'Consuming more than 4g paracetamol daily can lead to severe liver damage or allergic reactions.',
    dosage: '1 tablet 3-4 times a day or as directed by a healthcare professional.',
    inStock: true
  },
  {
    id: 'med-3',
    name: 'Chyawanprash Awaleha',
    category: 'Ayurveda',
    brand: 'Dabur India Ltd',
    price: 495,
    discountPrice: 420,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Tub of 1 kg',
    composition: 'Amla, Giloy, Ashwagandha, Pippali, Honey, and 40+ Herbs',
    benefits: 'Boosts respiratory wellness, strengthens overall immunity, and stimulates digestive system vigor.',
    warnings: 'Diabetic patients should consult a physician prior to intake.',
    dosage: '1-2 teaspoons twice a day with warm milk or water.',
    inStock: true
  },
  {
    id: 'med-4',
    name: 'Volini Pain Relief Spray',
    category: 'Medicines',
    brand: 'Sun Pharmaceutical Industries Ltd',
    price: 160,
    discountPrice: 136,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Can of 55 g',
    composition: 'Diclofenac Diethylamine, Methyl Salicylate, Menthol, and Linseed Oil',
    benefits: 'Instant relief from back pain, joint stiffness, neck strain, and athletic muscle pulls.',
    warnings: 'Do not spray on open cuts. Avoid contact with eyes.',
    dosage: 'Shake well. Spray from 5-8cm distance 3-4 times daily on affected muscles.',
    inStock: true
  },
  {
    id: 'med-5',
    name: 'Accu-Chek Active Test Strips',
    category: 'Health Devices',
    brand: 'Roche Diabetes Care',
    price: 975,
    discountPrice: 875,
    discountPercent: 10,
    rating: 4.6,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=400&q=80',
    packSize: 'Box of 50 strips',
    composition: 'Glucose Dehydrogenase biosensor technology',
    benefits: 'Enables quick, precise, and user-friendly monitoring of blood glucose levels from home.',
    warnings: 'Store in dry vial. Do not use expired strips.',
    dosage: 'Apply drop of blood to testing zone as illustrated on monitor manual.',
    inStock: true
  },
  {
    id: 'med-6',
    name: 'Celin 500 Vitamin C Tablet',
    category: 'Wellness',
    brand: 'Koye Pharmaceuticals Pvt Ltd',
    price: 45,
    discountPrice: 38,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 2310,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a792747f14?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Ascorbic Acid (Vitamin C) 500mg',
    benefits: 'Supplements Vitamin C deficiency, heals tissues, enhances collagen, and protects body cells.',
    warnings: 'Avoid high dosages if prone to kidney stones.',
    dosage: '1 chewable tablet daily or as advised by your GP.',
    inStock: true
  },
  {
    id: 'med-7',
    name: 'Purifying Neem Face Wash',
    category: 'Wellness',
    brand: 'The Himalaya Drug Company',
    price: 198,
    discountPrice: 168,
    discountPercent: 15,
    rating: 4.4,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Squeeze tube of 150 ml',
    composition: 'Neem Extract and Turmeric',
    benefits: 'Removes excessive oils, clears impurities, and naturally fights acne and skin infections.',
    warnings: 'For external use only. Discontinue if redness occurs.',
    dosage: 'Apply gently on wet skin. Foam up, rinse clean, and pat dry twice daily.',
    inStock: true
  },
  {
    id: 'med-8',
    name: 'Zandu Pancharishta Digestive Tonic',
    category: 'Ayurveda',
    brand: 'Emami Ltd',
    price: 240,
    discountPrice: 199,
    discountPercent: 17,
    rating: 4.5,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 450 ml',
    composition: 'Draksha, Kumari, Dashmoola, Ashwagandha, and Shatavari',
    benefits: 'Cures recurring indigestion, improves appetite, relieves flatulence, and strengthens digestion roots.',
    warnings: 'Shake bottle before use.',
    dosage: 'Mix 30ml with equal volume of water, take after meals twice daily.',
    inStock: true
  },
  {
    id: 'med-9',
    name: 'Becosules B-Complex Capsules',
    category: 'Wellness',
    brand: 'Pfizer Limited India',
    price: 52,
    discountPrice: 44,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 3120,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 20 capsules',
    composition: 'Vitamin B-Complex (B1, B2, B3, B5, B6, B9, B12) & Vitamin C',
    benefits: 'Supplements nutritional losses, treats mouth ulcers, cures fatigue, and promotes healthy skin and hair.',
    warnings: 'Keep in dry dark storage. Discontinue if gastrointestinal distress occurs.',
    dosage: 'One capsule daily with water after breakfast.',
    inStock: true
  },
  {
    id: 'med-10',
    name: 'Crocin Pain Relief Extra',
    category: 'Medicines',
    brand: 'GSK Consumer Healthcare',
    price: 68,
    discountPrice: 58,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Paracetamol 650mg & Caffeine 50mg',
    benefits: 'Double action extra pain reliever for chronic migraines, tension headaches, and severe muscular aches.',
    warnings: 'Avoid coffee/tea intake during dosage. Not for cardiac patients without prescription.',
    dosage: '1 tablet 3 times a day or as recommended by clinical staff.',
    inStock: true
  },
  {
    id: 'med-11',
    name: 'Organic Ashvagandha Tablets',
    category: 'Ayurveda',
    brand: 'The Himalaya Drug Company',
    price: 185,
    discountPrice: 157,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 760,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 60 tablets',
    composition: 'Pure Ashvagandha (Withania somnifera) root extract 250mg',
    benefits: 'Relieves stress and anxiety, boosts memory focus, improves physical stamina, and supports immune vigor.',
    warnings: 'Consult a Vaidya if pregnant or planning to conceive.',
    dosage: 'One tablet twice daily with warm milk or water.',
    inStock: true
  },
  {
    id: 'med-12',
    name: 'BP Monitor HEM-7120 Auto',
    category: 'Health Devices',
    brand: 'Omron Healthcare India',
    price: 2440,
    discountPrice: 1980,
    discountPercent: 18,
    rating: 4.7,
    reviewsCount: 1460,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=400&q=80',
    packSize: 'Box of 1 unit monitor',
    composition: 'Oscillometric digital blood pressure measurement tech',
    benefits: 'Comfortable, automated, and extremely precise blood pressure checks at home. Detects irregular heartbeats.',
    warnings: 'Ensure arm is steady and cuff is tied at level with heart during check.',
    dosage: 'Wear cuff above elbow crease, rest arm on table, and trigger Start button.',
    inStock: true
  },
  {
    id: 'med-13',
    name: 'Otrivin Oxy Fast Relief Spray',
    category: 'Medicines',
    brand: 'GlaxoSmithKline Healthcare',
    price: 112,
    discountPrice: 95,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Nasal spray of 10 ml',
    composition: 'Xylometazoline Hydrochloride 0.1%',
    benefits: 'Clears nose blocks, reduces nasal swelling, and opens airway congestion in under 25 seconds.',
    warnings: 'Do not use for more than 5 consecutive days to avoid rebound congestion.',
    dosage: '1 spray in each nostril up to 3 times a day.',
    inStock: true
  },
  {
    id: 'med-14',
    name: 'Dabur Honey 100% Pure',
    category: 'Wellness',
    brand: 'Dabur India Limited',
    price: 215,
    discountPrice: 182,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 1250,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Squeeze bottle of 400 g',
    composition: '100% pure multifloral forest honey',
    benefits: 'Rich in active antioxidants, supports daily weight management, treats throat tickles, and sweetens naturally.',
    warnings: 'Not safe for children under 1 year of age.',
    dosage: '1 tablespoon with warm lemon water every morning.',
    inStock: true
  },
  {
    id: 'med-15',
    name: 'Koflet Ayurvedic Cough Syrup',
    category: 'Ayurveda',
    brand: 'The Himalaya Drug Company',
    price: 120,
    discountPrice: 102,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 100 ml',
    composition: 'Madhu (Honey), Tulasi, and Yashtimadhu',
    benefits: 'Soothes throat inflammation, loosens chest congestion, and treats both dry and productive bronchial cough.',
    warnings: 'Store in a cool dry cabinet away from direct sunlight.',
    dosage: '1-2 teaspoons three times daily after meals.',
    inStock: true
  },
  {
    id: 'med-16',
    name: 'OneTouch Verio Sugar Strips',
    category: 'Health Devices',
    brand: 'LifeScan Inc',
    price: 1145,
    discountPrice: 999,
    discountPercent: 12,
    rating: 4.6,
    reviewsCount: 880,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=400&q=80',
    packSize: 'Box of 50 test strips',
    composition: 'Verio biosensor electrochemical biosensing technology',
    benefits: 'Requires only 0.4µl of blood sample to deliver extremely accurate sugar metrics inside 5 seconds.',
    warnings: 'Close vial immediately after picking a strip. Do not refrigerate.',
    dosage: 'Insert strip in OneTouch Verio monitor, touch blood drop to edge of strip.',
    inStock: true
  },
  {
    id: 'med-17',
    name: 'Shelcal 500 Calcium Tablet',
    category: 'Wellness',
    brand: 'Torrent Pharmaceuticals Ltd',
    price: 130,
    discountPrice: 110,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1980,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Calcium 500mg & Vitamin D3 250 IU',
    benefits: 'Strengthens bones, supports joint health, and supplements daily calcium deficiency.',
    warnings: 'Consult a physician if you have a history of kidney stones.',
    dosage: 'One tablet daily after a major meal or as directed.',
    inStock: true
  },
  {
    id: 'med-18',
    name: 'Saridon Headache Relief',
    category: 'Medicines',
    brand: 'Bayer India Limited',
    price: 42,
    discountPrice: 35,
    discountPercent: 16,
    rating: 4.7,
    reviewsCount: 3120,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 tablets',
    composition: 'Paracetamol 250mg, Propyphenazone 150mg & Caffeine 50mg',
    benefits: 'Triple action formula for fast relief from severe tension headaches and toothaches.',
    warnings: 'Do not consume more than 3 tablets daily. Keep out of reach of children.',
    dosage: '1 tablet on onset of pain. Repeat after 4 hours if necessary.',
    inStock: true
  },
  {
    id: 'med-19',
    name: 'Vicks Vaporub Cold Relief',
    category: 'Medicines',
    brand: 'Procter & Gamble India',
    price: 155,
    discountPrice: 131,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 880,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 50 g',
    composition: 'Menthol, Camphor, and Eucalyptus Oil',
    benefits: 'Provides 8 hours of multi-symptom relief from nasal block, chest cough, and muscle aches.',
    warnings: 'For external applications only. Do not swallow or apply inside nostrils.',
    dosage: 'Apply gently on chest, throat, and back up to 3 times daily.',
    inStock: true
  },
  {
    id: 'med-20',
    name: 'Himalaya Liv 52 DS Protect',
    category: 'Ayurveda',
    brand: 'The Himalaya Drug Company',
    price: 175,
    discountPrice: 148,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 60 tablets',
    composition: 'Himsra and Kasani natural clinical extracts',
    benefits: 'Double-strength hepatoprotective formula that detoxifies liver cells and stimulates overall appetite.',
    warnings: 'Store in dry place away from moisture.',
    dosage: '1-2 tablets twice daily after meals.',
    inStock: true
  },
  {
    id: 'med-21',
    name: 'Centrum Adult Multivitamin',
    category: 'Wellness',
    brand: 'GSK Consumer Healthcare',
    price: 450,
    discountPrice: 382,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a792747f14?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 30 tablets',
    composition: '24 essential vitamins and mineral nutrients with Zinc',
    benefits: 'Complete daily nutritional backup that boosts cellular energy, muscle function, and ocular health.',
    warnings: 'Do not exceed the recommended daily allowance.',
    dosage: 'One tablet daily with water after breakfast.',
    inStock: true
  },
  {
    id: 'med-22',
    name: 'Accu-Chek Instant Monitor',
    category: 'Health Devices',
    brand: 'Roche Diabetes Care',
    price: 1599,
    discountPrice: 1299,
    discountPercent: 18,
    rating: 4.7,
    reviewsCount: 2130,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=400&q=80',
    packSize: 'Box of 1 unit monitor',
    composition: 'Instant bluetooth-enabled blood sugar biosensing tech',
    benefits: 'Provides effortless, highly accurate, and wireless glucose tracking inside 4 seconds.',
    warnings: 'Store blood glucose meter in the protective carry case provided.',
    dosage: 'Insert test strip, touch blood drop to the yellow edge.',
    inStock: true
  },
  {
    id: 'med-23',
    name: 'Pure Psyllium Isabgol Husk',
    category: 'Ayurveda',
    brand: 'Telephone Brand Isabgol',
    price: 220,
    discountPrice: 187,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 640,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Tub of 200 g',
    composition: '100% pure Psyllium (Plantago ovata) husk',
    benefits: 'Natural soluble dietary fiber that regulates bowel movements, relieves constipation, and supports gut wellness.',
    warnings: 'Always mix well with fluid before drinking to avoid throat blocking.',
    dosage: '1-2 tablespoons mixed with warm water or milk at bedtime.',
    inStock: true
  },
  {
    id: 'med-24',
    name: 'Dettol Liquid Antiseptic',
    category: 'Wellness',
    brand: 'Reckitt Benckiser India',
    price: 236,
    discountPrice: 198,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 4320,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 500 ml',
    composition: 'Chloroxylenol clinical antiseptic formula',
    benefits: 'Antiseptic first-aid liquid that sanitizes cuts, prevents wound infections, and disinfection for household hygiene.',
    warnings: 'For external use only. Keep away from eyes. Dilute strictly before skin contact.',
    dosage: 'Mix 1 tablespoon in 250ml water for clinical cleaning.',
    inStock: true
  },
  {
    id: 'med-25',
    name: 'Pantocid 40mg Tablet',
    category: 'Medicines',
    brand: 'Alkem Laboratories Ltd',
    price: 150,
    discountPrice: 127,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Pantoprazole 40mg',
    benefits: 'Relieves acid reflux, heartburn, GERD, and peptic ulcer clinical symptoms.',
    warnings: 'Consult a physician. Swallow as whole, do not chew.',
    dosage: '1 tablet daily on an empty stomach in the morning.',
    inStock: true
  },
  {
    id: 'med-26',
    name: 'Gelusil MPS Liquid Mint',
    category: 'Medicines',
    brand: 'Pfizer Limited India',
    price: 180,
    discountPrice: 153,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 200 ml',
    composition: 'Activated Dimethicone, Magnesium Hydroxide, Aluminium Hydroxide',
    benefits: 'Fast relief from acidity, gas, flatulence, and stomach bloating.',
    warnings: 'Shake well. Do not exceed 8 teaspoons daily.',
    dosage: '2 teaspoons after meals or as recommended.',
    inStock: true
  },
  {
    id: 'med-27',
    name: 'Allegra 120mg Tablet',
    category: 'Medicines',
    brand: 'Sanofi India Ltd',
    price: 220,
    discountPrice: 187,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 tablets',
    composition: 'Fexofenadine Hydrochloride 120mg',
    benefits: 'Provides non-drowsy 24-hour relief from seasonal allergic rhinitis, sneezing, and runny nose.',
    warnings: 'Do not take with fruit juices. Consult doctor if pregnant.',
    dosage: 'One tablet daily with water.',
    inStock: true
  },
  {
    id: 'med-28',
    name: 'Limcee chewable Vitamin C',
    category: 'Medicines',
    brand: 'Abbott Healthcare',
    price: 30,
    discountPrice: 25,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 1540,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a792747f14?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Vitamin C (Ascorbic Acid) 500mg',
    benefits: 'Boosts natural immunity, collagen synthesis, and antioxidant defenses.',
    warnings: 'Chew fully before swallowing. Keep in cool storage.',
    dosage: '1 tablet daily or as advised.',
    inStock: true
  },
  {
    id: 'med-29',
    name: 'Combiflam Pain Relief Tablet',
    category: 'Medicines',
    brand: 'Sanofi India Ltd',
    price: 50,
    discountPrice: 42,
    discountPercent: 16,
    rating: 4.7,
    reviewsCount: 2200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 20 tablets',
    composition: 'Ibuprofen 400mg & Paracetamol 325mg',
    benefits: 'Powerful dual action formula for muscular pain, dental ache, and reducing fever.',
    warnings: 'Take after meals. Not for patients with gastric ulcers.',
    dosage: '1 tablet twice daily after meals.',
    inStock: true
  },
  {
    id: 'med-30',
    name: 'Otrivin Adult Nasal Drops',
    category: 'Medicines',
    brand: 'GSK Consumer Healthcare',
    price: 95,
    discountPrice: 80,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 10 ml',
    composition: 'Xylometazoline Hydrochloride 0.1%',
    benefits: 'Fast and long-lasting nasal decongestion, clears nasal blocks inside 2 minutes.',
    warnings: 'For adults only. Limit usage to maximum 5 days.',
    dosage: '2-3 drops in each nostril, 3 times daily.',
    inStock: true
  },
  {
    id: 'med-31',
    name: 'Digene Gel Mint flavor',
    category: 'Medicines',
    brand: 'Abbott Healthcare',
    price: 140,
    discountPrice: 119,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 840,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 200 ml',
    composition: 'Magnesium Hydroxide, Aluminium Hydroxide, Simethicone',
    benefits: 'High-efficacy antacid that relieves acidity, sour stomach, and flatulence.',
    warnings: 'Store away from children. Consult doctor if renal disease exists.',
    dosage: '2 teaspoons after meals as needed.',
    inStock: true
  },
  {
    id: 'med-32',
    name: 'Strepsils Sore Throat Lozenges',
    category: 'Medicines',
    brand: 'Reckitt Benckiser India',
    price: 40,
    discountPrice: 34,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 2900,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 8 lozenges',
    composition: 'Dichlorobenzyl Alcohol, Amylmetacresol',
    benefits: 'Antibacterial throat lozenges that relieve sore throat, throat tickle, and oral irritation.',
    warnings: 'Do not consume more than 8 lozenges per day.',
    dosage: 'Dissolve one lozenge slowly in the mouth every 2-3 hours.',
    inStock: true
  },
  {
    id: 'med-33',
    name: 'Orofar Throat Decongestant Spray',
    category: 'Medicines',
    brand: 'Novartis India',
    price: 280,
    discountPrice: 238,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Can of 30 ml',
    composition: 'Benzoxonium Chloride & Lidocaine Hydrochloride',
    benefits: 'Double action local anesthetic and antiseptic spray for instant throat relief.',
    warnings: 'Avoid spraying near eyes. Not for kids under 4 years.',
    dosage: '3 sprays directed to the throat, 3-4 times daily.',
    inStock: true
  },
  {
    id: 'med-34',
    name: 'Evion 400 Vitamin E Capsule',
    category: 'Medicines',
    brand: 'Merck Limited India',
    price: 90,
    discountPrice: 76,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 3800,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 capsules',
    composition: 'Tocopheryl Acetate (Vitamin E) 400mg',
    benefits: 'Supports cellular health, nourishes hair & skin, and acts as a powerful antioxidant.',
    warnings: 'Consult a physician. Do not take on empty stomach.',
    dosage: '1 capsule daily with water after meals.',
    inStock: true
  },
  {
    id: 'med-35',
    name: 'ON Gold Standard 100% Whey',
    category: 'Wellness',
    brand: 'Optimum Nutrition Inc',
    price: 3800,
    discountPrice: 3230,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1950,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80',
    packSize: 'Tub of 1 kg (2.2 lbs)',
    composition: 'Whey Protein Isolates, Glutamine & BCAAs',
    benefits: 'Premium quality post-workout protein that supports lean muscle building and rapid recovery.',
    warnings: 'Contains milk derivatives. Not for medicinal use.',
    dosage: 'Mix 1 scoop in 200ml cold water, shake well and drink after workout.',
    inStock: true
  },
  {
    id: 'med-36',
    name: 'Olay Regenerist Revitalizing Cream',
    category: 'Wellness',
    brand: 'Procter & Gamble India',
    price: 1699,
    discountPrice: 1444,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 50 g',
    composition: 'Niacinamide, Amino-Peptides, Hyaluronic Acid',
    benefits: 'Advanced anti-aging moisturizer that firms skin cells, reduces wrinkles, and hydrates.',
    warnings: 'For external applications only. Avoid direct eye contact.',
    dosage: 'Apply evenly on clean face and neck daily morning and evening.',
    inStock: true
  },
  {
    id: 'med-37',
    name: 'Horlicks Clinical Plus Drink',
    category: 'Wellness',
    brand: 'Hindustan Unilever Ltd',
    price: 550,
    discountPrice: 467,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 1100,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 500 g',
    composition: 'Malted Barley, Wheat Flour, Milk Solids, Vitamins, Minerals',
    benefits: 'Specialized clinical health drink clinically proven to make children taller, stronger, and sharper.',
    warnings: 'Store in dry airtight container.',
    dosage: 'Mix 2 heaped spoonfuls in warm milk, stir well twice daily.',
    inStock: true
  },
  {
    id: 'med-38',
    name: 'MuscleBlaze Biozyme Whey Protein',
    category: 'Wellness',
    brand: 'MuscleBlaze India',
    price: 3200,
    discountPrice: 2720,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 880,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80',
    packSize: 'Tub of 1 kg',
    composition: 'Whey Protein Concentrate with Enhanced Absorption Formula (EAF)',
    benefits: 'Clinically tested whey that reduces stomach bloating and maximizes protein absorption.',
    warnings: 'Keep in dry, cool cabinets.',
    dosage: 'Shake 1 scoop with 200ml cold water, consume immediately after workouts.',
    inStock: true
  },
  {
    id: 'med-39',
    name: 'Himalaya Herbal Lip Balm Care',
    category: 'Wellness',
    brand: 'The Himalaya Drug Company',
    price: 45,
    discountPrice: 38,
    discountPercent: 15,
    rating: 4.4,
    reviewsCount: 1200,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Tube of 10 g',
    composition: 'Wheatgerm Oil & Carrot Seed Oil',
    benefits: 'Prevents chapping, hydrates, and protects lips from seasonal cold winds.',
    warnings: 'Keep away from extreme heat.',
    dosage: 'Apply evenly on lips as often as needed.',
    inStock: true
  },
  {
    id: 'med-40',
    name: 'Revlon Flex Professional Shampoo',
    category: 'Wellness',
    brand: 'Revlon India',
    price: 450,
    discountPrice: 382,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 590 ml',
    composition: 'Hydrolyzed Silk, Keratin Protein, Panthenol',
    benefits: 'Cleanses hair roots, builds active volume, and restores shiny texture.',
    warnings: 'Rinse with clean water immediately if contact in eyes.',
    dosage: 'Apply to wet hair, lather gently, and rinse clean twice weekly.',
    inStock: true
  },
  {
    id: 'med-41',
    name: 'Nivea Men Active Clean Body Wash',
    category: 'Wellness',
    brand: 'Nivea India Pvt Ltd',
    price: 250,
    discountPrice: 212,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 960,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 250 ml',
    composition: 'Natural Charcoal clay formula',
    benefits: 'Deep cleansing shower gel that draws out dirt, impurities, and smells fresh.',
    warnings: 'For body washes only. Avoid sensitive areas.',
    dosage: 'Pour on a wet loofah, foam up and apply on body, rinse well.',
    inStock: true
  },
  {
    id: 'med-42',
    name: 'Cetaphil Gentle Skin Cleanser',
    category: 'Wellness',
    brand: 'Galderma Laboratories',
    price: 395,
    discountPrice: 335,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 2200,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 250 ml',
    composition: 'Niacinamide, Panthenol, Hydrating Glycerin',
    benefits: 'Hypoallergenic cleanser that nourishes sensitive skin cells and retains vital moisture.',
    warnings: 'Store below 30°C.',
    dosage: 'Apply on face, rub gently, rinse clean with warm water.',
    inStock: true
  },
  {
    id: 'med-43',
    name: 'Dabur Chyawanprash Immunity',
    category: 'Ayurveda',
    brand: 'Dabur India Ltd',
    price: 395,
    discountPrice: 335,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 1500,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Tub of 500 g',
    composition: 'Amla, Giloy, Ashwagandha, Pippali, Honey',
    benefits: 'Time-tested immunity booster that strengthens body defenses, fights infections.',
    warnings: 'Diabetic patients should consult a physician.',
    dosage: '1 teaspoon twice daily with warm milk or water.',
    inStock: true
  },
  {
    id: 'med-44',
    name: 'Patanjali Aloe Vera Juice Pure',
    category: 'Ayurveda',
    brand: 'Patanjali Ayurved Ltd',
    price: 220,
    discountPrice: 187,
    discountPercent: 15,
    rating: 4.4,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 1 L',
    composition: 'Pure Aloe Vera (Aloe barbadensis) inner leaf pulp juice',
    benefits: 'Cleanses stomach systems, treats constipation, reduces joint pain, and improves skin glow.',
    warnings: 'Do not consume during pregnancy.',
    dosage: 'Mix 15-20ml with equal warm water and drink on empty stomach morning/evening.',
    inStock: true
  },
  {
    id: 'med-45',
    name: 'Organic India Tulsi Green Tea',
    category: 'Ayurveda',
    brand: 'Organic India Pvt Ltd',
    price: 250,
    discountPrice: 212,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 840,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Box of 25 infusion bags',
    composition: 'Rama Tulsi, Krishna Tulsi, Vana Tulsi, Organic Green Tea',
    benefits: 'Rich in antioxidants, relieves daily stress, boosts metabolism, and supports weight management.',
    warnings: 'Store in dry cupboards.',
    dosage: 'Infuse 1 tea bag in 150ml boiling water for 3-5 minutes, sip hot.',
    inStock: true
  },
  {
    id: 'med-46',
    name: 'Baidyanath Triphala Churna Digestive',
    category: 'Ayurveda',
    brand: 'Shree Baidyanath Ayurved Bhawan',
    price: 130,
    discountPrice: 110,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 120 g',
    composition: 'Amla, Haritaki, and Bibhitaki powder',
    benefits: 'Cleanses colon systems, regulates digestion, cures flatulence, and detoxifies naturally.',
    warnings: 'Ensure bottle is tightly capped after use.',
    dosage: '1 teaspoon (5-6g) with warm water at bedtime.',
    inStock: true
  },
  {
    id: 'med-47',
    name: 'Zandu Balm Active Pain Relief',
    category: 'Ayurveda',
    brand: 'Emami Ltd',
    price: 90,
    discountPrice: 76,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 1100,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 25 g',
    composition: 'Menthasatva (Menthol), Gaultheria Oil, Cajeput Oil',
    benefits: 'Number 1 ayurvedic headache and body ache relief balm. Highly effective.',
    warnings: 'For external applications only. Keep away from nose and eyes.',
    dosage: 'Rub gently on affected muscles and forehead 3-4 times daily.',
    inStock: true
  },
  {
    id: 'med-48',
    name: 'Hamdard Safi Blood Purifier',
    category: 'Ayurveda',
    brand: 'Hamdard Laboratories India',
    price: 200,
    discountPrice: 170,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 980,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 500 ml',
    composition: 'Sana, Revand Chini, Neem, Chiraita, and Tulsi',
    benefits: 'Natural blood purifier syrup that treats acne, improves skin glow, and cleanses toxins.',
    warnings: 'Take with warm water. Not for diabetic patients.',
    dosage: '2 teaspoons (10ml) once daily in morning with water.',
    inStock: true
  },
  {
    id: 'med-49',
    name: 'Dabur Pudin Hara Pearls Acidity',
    category: 'Ayurveda',
    brand: 'Dabur India Ltd',
    price: 30,
    discountPrice: 25,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 1800,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 pearls',
    composition: 'Pudina Satva (Mentha piperita) essential clinical oil extract',
    benefits: 'Provides instant cooling relief from stomach ache, acidity, gas, and indigestion.',
    warnings: 'Do not chew. Swallow as whole with water.',
    dosage: '1 pearl for adults, twice daily with water.',
    inStock: true
  },
  {
    id: 'med-50',
    name: 'Patanjali Divya Kanti Lep Skin',
    category: 'Ayurveda',
    brand: 'Patanjali Ayurved Ltd',
    price: 90,
    discountPrice: 76,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 50 g',
    composition: 'Chandan, Haldi, Manjistha, and Aloevera extracts',
    benefits: 'Treats skin pimples, black spots, and improves overall skin fairness.',
    warnings: 'For external paste application only.',
    dosage: 'Mix with rose water to make paste, apply on face, rinse after 20 minutes.',
    inStock: true
  },
  {
    id: 'med-51',
    name: 'Himalaya Neem Purifying Tablets',
    category: 'Ayurveda',
    brand: 'The Himalaya Drug Company',
    price: 165,
    discountPrice: 140,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 60 tablets',
    composition: 'Pure Neem (Azadirachta indica) leaf extract 250mg',
    benefits: 'Cleanses skin systems, fights acne-causing bacteria, and purifies systemic toxins.',
    warnings: 'Not advised for children under 5 years.',
    dosage: '1 tablet twice daily with water after meals.',
    inStock: true
  },
  {
    id: 'med-52',
    name: 'Sri Sri Tattva Ojasvita Drink',
    category: 'Ayurveda',
    brand: 'Sri Sri Tattva India',
    price: 350,
    discountPrice: 297,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 200 g',
    composition: 'Ashwagandha, Brahmi, Shankhapushpi, Jyotishmati, Shatavari',
    benefits: 'Premium herbal drink that boosts brain power, daily memory focus, and physical energy.',
    warnings: 'Store in dry airtight container.',
    dosage: 'Mix 2 teaspoons in hot milk twice daily, stir well.',
    inStock: true
  },
  {
    id: 'med-53',
    name: 'Lipitor Atorvastatin 10mg',
    category: 'Medicines',
    brand: 'Pfizer Limited India',
    price: 180,
    discountPrice: 153,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 tablets',
    composition: 'Atorvastatin 10mg',
    benefits: 'Used to lower cholesterol, reduce the risk of heart disease, and prevent heart attacks and strokes.',
    warnings: 'Avoid grapefruit juice. Do not use during pregnancy.',
    dosage: 'One tablet daily at bedtime or as advised by your cardiologist.',
    inStock: true
  },
  {
    id: 'med-54',
    name: 'Amlokind Amlodipine 5mg',
    category: 'Medicines',
    brand: 'Mankind Pharma Ltd',
    price: 25,
    discountPrice: 21,
    discountPercent: 16,
    rating: 4.6,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Amlodipine Besylate 5mg',
    benefits: 'Prescribed for treating high blood pressure (hypertension) and chest pain (angina).',
    warnings: 'May cause dizziness or ankle swelling. Do not stop abruptly.',
    dosage: '1 tablet once daily in the morning or as directed.',
    inStock: true
  },
  {
    id: 'med-55',
    name: 'Metocard XL Metoprolol 25',
    category: 'Medicines',
    brand: 'Torrent Pharmaceuticals Ltd',
    price: 85,
    discountPrice: 72,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 tablets',
    composition: 'Metoprolol Succinate 25mg',
    benefits: 'Helps control high blood pressure, irregular heartbeat (arrhythmia), and prevents future heart attacks.',
    warnings: 'Monitor heart rate. Take regularly as prescribed.',
    dosage: 'One tablet daily with or after breakfast.',
    inStock: true
  },
  {
    id: 'med-56',
    name: 'SleepWell Melatonin 5mg',
    category: 'Wellness',
    brand: 'Inlife Healthcare India',
    price: 450,
    discountPrice: 382,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 60 capsules',
    composition: 'Melatonin 5mg & L-Theanine',
    benefits: 'Supports natural sleep cycles, treats jet lag, and helps relax the mind before bedtime.',
    warnings: 'Do not drive or operate machinery after consumption.',
    dosage: '1 capsule 30-60 minutes before scheduled bedtime with water.',
    inStock: true
  },
  {
    id: 'med-57',
    name: 'Himalaya Tagara Sleep Support',
    category: 'Ayurveda',
    brand: 'The Himalaya Drug Company',
    price: 180,
    discountPrice: 153,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 60 tablets',
    composition: 'Tagara (Valeriana wallichii) root extract 250mg',
    benefits: 'Herbal sleep aid that calms the mind, relieves anxiety, and promotes undisturbed sleep.',
    warnings: 'Safe for long term use under expert medical advice.',
    dosage: '1 tablet twice daily or as advised.',
    inStock: true
  },
  {
    id: 'med-58',
    name: 'Divya Brahmi Vati Extra',
    category: 'Ayurveda',
    brand: 'Patanjali Ayurved Ltd',
    price: 120,
    discountPrice: 102,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Jar of 40 tablets',
    composition: 'Brahmi, Shankhapushpi, and Ayurvedic Minerals',
    benefits: 'Excellent brain tonic that reduces mental exhaustion, fights stress, and boosts retention.',
    warnings: 'Close container tightly. Avoid humidity.',
    dosage: '1-2 tablets twice daily with warm milk or water.',
    inStock: true
  },
  {
    id: 'med-59',
    name: 'Himalaya Baby Powder Care',
    category: 'Wellness',
    brand: 'The Himalaya Drug Company',
    price: 160,
    discountPrice: 136,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 950,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 200 g',
    composition: 'Olive Oil, Almond Oil, Khus Grass, and Natural Zinc',
    benefits: 'Keeps baby skin cool and fresh, prevents diaper rash, and absorbs excessive sweat.',
    warnings: 'Keep powder away from baby nose and mouth to prevent inhalation.',
    dosage: 'Sprinkle powder onto your hands and apply gently on babys body after bath.',
    inStock: true
  },
  {
    id: 'med-60',
    name: 'Dabur Lal Tail Massage Oil',
    category: 'Ayurveda',
    brand: 'Dabur India Ltd',
    price: 240,
    discountPrice: 204,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 200 ml',
    composition: 'Til Tail, Shankhapushpi, Masha, and Ratanjot',
    benefits: 'Ayurvedic baby massage oil clinically proven to accelerate baby physical growth and bone strength.',
    warnings: 'Discontinue if any skin hypersensitivity or redness is noticed.',
    dosage: 'Warm slightly. Massage gently all over baby body daily prior to bathing.',
    inStock: true
  },
  {
    id: 'med-61',
    name: 'Bio-Oil Skin Care Treatment',
    category: 'Wellness',
    brand: 'Union-Swiss Pvt Ltd',
    price: 495,
    discountPrice: 420,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 580,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 60 ml',
    composition: 'PurCellin Oil, Vitamin A, Vitamin E, Calendula and Lavender oils',
    benefits: 'Specialist skin care oil for fading stretch marks, scars, dry skin patches, and uneven skin tone.',
    warnings: 'For external skin care application only. Do not use on broken skin.',
    dosage: 'Apply twice daily in circular motions until fully absorbed.',
    inStock: true
  },
  {
    id: 'med-62',
    name: 'Mother Sparsh Water Wipes',
    category: 'Wellness',
    brand: 'Mother Sparsh Baby Care',
    price: 299,
    discountPrice: 254,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    packSize: 'Pack of 72 wipes',
    composition: '99% Pure Water & Aloe Vera extracts',
    benefits: 'Super soft, 100% biodegradable medical-grade wipes for baby sensitive skin. Alcohol-free.',
    warnings: 'Reseal the pack firmly after each use to keep wipes moist.',
    dosage: 'Gently wipe baby skin during diaper changes or generic face cleaning.',
    inStock: true
  },
  {
    id: 'med-63',
    name: 'Glycomet Metformin 500mg',
    category: 'Medicines',
    brand: 'USV Private Limited',
    price: 60,
    discountPrice: 51,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 880,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 15 tablets',
    composition: 'Metformin Hydrochloride 500mg',
    benefits: 'Highly effective oral anti-diabetic drug that regulates blood glucose levels in Type 2 diabetes.',
    warnings: 'Take with meals to avoid stomach upset. Monitor kidney function regularly.',
    dosage: '1 tablet twice daily with breakfast and dinner, or as prescribed.',
    inStock: true
  },
  {
    id: 'med-64',
    name: 'Amaryl Glimepiride 1mg',
    category: 'Medicines',
    brand: 'Sanofi India Ltd',
    price: 75,
    discountPrice: 63,
    discountPercent: 16,
    rating: 4.6,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80',
    packSize: 'Strip of 10 tablets',
    composition: 'Glimepiride 1mg',
    benefits: 'Stimulates pancreas to release more insulin, reducing blood sugar spikes after meals.',
    warnings: 'Can cause hypoglycemia (low blood sugar). Keep sugar candy handy.',
    dosage: 'One tablet daily immediately before major morning meal.',
    inStock: true
  },
  {
    id: 'med-65',
    name: 'Baidyanath Karela Jamun Juice',
    category: 'Ayurveda',
    brand: 'Shree Baidyanath Ayurved Bhawan',
    price: 310,
    discountPrice: 263,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 1 L',
    composition: 'Pure Karela (Bitter Gourd) & Jamun (Black Plum) juice',
    benefits: 'Ayurvedic blood sugar regulator that boosts insulin activity and supports pancreas health.',
    warnings: 'Avoid intake if pregnant. Shake well before drinking.',
    dosage: '30ml juice mixed with 30ml warm water, empty stomach in morning.',
    inStock: true
  },
  {
    id: 'med-66',
    name: 'Itone Sterile Eye Drops',
    category: 'Medicines',
    brand: 'Dey\'s Medical India',
    price: 65,
    discountPrice: 55,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 10 ml',
    composition: 'Neem, Tulsi, Honey, and Ayurvedic Distillates',
    benefits: 'Sterile ayurvedic eye drops that soothe eye strain, redness, dry eye, and allergy irritation.',
    warnings: 'Do not touch tip of container. Keep bottle tightly closed.',
    dosage: '2 drops in each eye twice daily or as required.',
    inStock: true
  },
  {
    id: 'med-67',
    name: 'Refresh Tears Eye Drops',
    category: 'Medicines',
    brand: 'Allergan India Pvt Ltd',
    price: 150,
    discountPrice: 127,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1450,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 10 ml',
    composition: 'Carboxymethylcellulose Sodium 0.5%',
    benefits: 'Provides temporary clinical relief from burning, irritation, and dryness due to screen exposure.',
    warnings: 'Discard bottle 1 month after opening. Safe for contact lens wearers.',
    dosage: 'Instill 1 or 2 drops in the affected eye(s) as needed.',
    inStock: true
  },
  {
    id: 'med-68',
    name: 'Divya Drishti Eye Drops',
    category: 'Ayurveda',
    brand: 'Patanjali Ayurved Ltd',
    price: 45,
    discountPrice: 38,
    discountPercent: 15,
    rating: 4.5,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=400&q=80',
    packSize: 'Bottle of 15 ml',
    composition: 'Allium Cepa juice, Zingiber officinale juice, Citrus limon juice, Honey',
    benefits: 'Helps maintain ocular strength, clears cataracts early, and improves visual clarity.',
    warnings: 'Slight burning sensation is normal and temporary. Keep in cool storage.',
    dosage: '1-2 drops twice daily or under medical advice.',
    inStock: true
  }
];

const initialLabTests = [
  {
    id: 'lab-1',
    name: 'Comprehensive Gold Full Body Checkup',
    tag: 'Popular',
    parameters: '82 Parameters Checked',
    timeframe: 'Report in 12 Hrs',
    price: 2999,
    discountPrice: 1299,
    discountPercent: 57,
    homeCollection: true,
    fastingRequired: '10-12 hours fasting required',
    testsIncluded: 'Thyroid Profile, Complete Blood Count, Liver Function, Kidney Function, Lipid Profile (Cholesterol), Blood Sugar Fasting, Vitamin D, Vitamin B12',
    labId: 'em-lab-1',
    labName: 'E Mediclub Clinical Laboratories'
  },
  {
    id: 'lab-2',
    name: 'Active Joint & Bone Health Package',
    tag: 'Senior Special',
    parameters: '12 Parameters Checked',
    timeframe: 'Report in 24 Hrs',
    price: 1800,
    discountPrice: 899,
    discountPercent: 50,
    homeCollection: true,
    fastingRequired: 'Fasting not strictly required',
    testsIncluded: 'Calcium, Vitamin D3, Rheumatoid Factor (RA), Uric Acid, Phosphorus, Alkaline Phosphatase',
    labId: 'em-lab-2',
    labName: 'Metropolis Diagnostics Center'
  },
  {
    id: 'lab-3',
    name: 'Diabetes Screening Core Panel',
    tag: 'Top Booking',
    parameters: '4 Parameters Checked',
    timeframe: 'Report in 8 Hrs',
    price: 799,
    discountPrice: 399,
    discountPercent: 50,
    homeCollection: true,
    fastingRequired: '12 hours fasting mandatory',
    testsIncluded: 'HbA1c (Average Blood Sugar), Blood Sugar Fasting, Blood Sugar Post-Prandial, Urine Glucose',
    labId: 'em-lab-3',
    labName: 'Thyrocare Wellness Center'
  },
  {
    id: 'lab-4',
    name: 'Vitamin D & B12 Advanced Combo',
    tag: 'Fatique Relief',
    parameters: '2 Parameters Checked',
    timeframe: 'Report in 12 Hrs',
    price: 1400,
    discountPrice: 699,
    discountPercent: 50,
    homeCollection: true,
    fastingRequired: 'No fasting required',
    testsIncluded: 'Vitamin D (25-Hydroxy), Vitamin B12 (Active)',
    labId: 'em-lab-1',
    labName: 'E Mediclub Clinical Laboratories'
  },
  {
    id: 'lab-5',
    name: 'Complete Thyroid Care Profile (T3, T4, TSH)',
    tag: 'Hormone Check',
    parameters: '3 Parameters Checked',
    timeframe: 'Report in 8 Hrs',
    price: 800,
    discountPrice: 449,
    discountPercent: 43,
    homeCollection: true,
    fastingRequired: 'Morning fasting sample recommended',
    testsIncluded: 'Total Triiodothyronine (T3), Total Thyroxine (T4), Thyroid Stimulating Hormone (TSH)',
    labId: 'em-lab-2',
    labName: 'Metropolis Diagnostics Center'
  },
  {
    id: 'lab-6',
    name: 'Healthy Heart Advanced Core Profile',
    tag: 'Cardiac Special',
    parameters: '16 Parameters Checked',
    timeframe: 'Report in 12 Hrs',
    price: 2200,
    discountPrice: 1199,
    discountPercent: 45,
    homeCollection: true,
    fastingRequired: '12 hours fasting mandatory',
    testsIncluded: 'Lipid Profile (Cholesterol, HDL, LDL, VLDL, Triglycerides), Apolipoproteins A1 & B, High-Sensitivity CRP, Homocysteine',
    labId: 'em-lab-3',
    labName: 'Thyrocare Wellness Center'
  },
  {
    id: 'lab-7',
    name: 'Complete Allergy Screening (Food & Dust Panel)',
    tag: 'Specialized',
    parameters: '36 Parameters Checked',
    timeframe: 'Report in 48 Hrs',
    price: 3500,
    discountPrice: 1999,
    discountPercent: 42,
    homeCollection: true,
    fastingRequired: 'Fasting not required',
    testsIncluded: 'Food Allergens Panel, Inhalant (Dust, Pollen) Allergens Panel, Total IgE Antibodies',
    labId: 'em-lab-1',
    labName: 'E Mediclub Clinical Laboratories'
  },
  {
    id: 'lab-8',
    name: 'Fever Profile (Malaria, Dengue, CBC)',
    tag: 'Acute Care',
    parameters: '18 Parameters Checked',
    timeframe: 'Report in 6 Hrs',
    price: 1500,
    discountPrice: 799,
    discountPercent: 46,
    homeCollection: true,
    fastingRequired: 'Fasting not required',
    testsIncluded: 'Typhidot IgM/IgG, Dengue NS1 Antigen, Malaria Smear, Complete Blood Count (CBC), ESR',
    labId: 'em-lab-2',
    labName: 'Metropolis Diagnostics Center'
  },
  {
    id: 'lab-9',
    name: 'Kidney Function Advanced Panel (KFT)',
    tag: 'Organ Care',
    parameters: '8 Parameters Checked',
    timeframe: 'Report in 8 Hrs',
    price: 900,
    discountPrice: 449,
    discountPercent: 50,
    homeCollection: true,
    fastingRequired: '10 hours fasting recommended',
    testsIncluded: 'Urea, Creatinine, Uric Acid, Calcium, Phosphorus, Bun/Creatinine Ratio, Total Proteins',
    labId: 'em-lab-3',
    labName: 'Thyrocare Wellness Center'
  },
  {
    id: 'lab-10',
    name: 'Liver Function Advanced Profile (LFT)',
    tag: 'Organ Care',
    parameters: '11 Parameters Checked',
    timeframe: 'Report in 8 Hrs',
    price: 990,
    discountPrice: 499,
    discountPercent: 49,
    homeCollection: true,
    fastingRequired: '12 hours fasting mandatory',
    testsIncluded: 'Bilirubin Total/Direct/Indirect, SGOT (AST), SGPT (ALT), Alkaline Phosphatase, Albumin, Globulin',
    labId: 'em-lab-1',
    labName: 'E Mediclub Clinical Laboratories'
  },
  {
    id: 'lab-11',
    name: 'Women Health Advanced Hormonal Checkup',
    tag: 'Hormone Check',
    parameters: '7 Parameters Checked',
    timeframe: 'Report in 24 Hrs',
    price: 3200,
    discountPrice: 1599,
    discountPercent: 50,
    homeCollection: true,
    fastingRequired: 'Morning fasting sample recommended',
    testsIncluded: 'Thyroid Stimulating Hormone (TSH), Estrogen, Progesterone, LH, FSH, Prolactin, Complete Blood Count',
    labId: 'em-lab-2',
    labName: 'Metropolis Diagnostics Center'
  },
  {
    id: 'lab-12',
    name: 'Advanced Allergy Food Panel',
    tag: 'Specialized Check',
    parameters: '36 Parameters Checked',
    timeframe: 'Report in 48 Hrs',
    price: 4500,
    discountPrice: 2499,
    discountPercent: 44,
    homeCollection: true,
    fastingRequired: 'Fasting not strictly required',
    testsIncluded: 'Egg White/Yolk, Milk, Wheat, Peanut, Soy, Seafood, Dust Mites, Pollens Panel',
    labId: 'em-lab-3',
    labName: 'Thyrocare Wellness Center'
  },
  {
    id: 'lab-13',
    name: 'Full Body Fit & Strong Gym Package',
    tag: 'Fitness Special',
    parameters: '56 Parameters Checked',
    timeframe: 'Report in 12 Hrs',
    price: 1999,
    discountPrice: 999,
    discountPercent: 50,
    homeCollection: true,
    fastingRequired: '12 hours fasting mandatory',
    testsIncluded: 'Lipid Profile, Kidney & Liver Panels, Complete Blood Count, Calcium, Vitamin D3, Uric Acid',
    labId: 'em-lab-1',
    labName: 'E Mediclub Clinical Laboratories'
  },
  {
    id: 'lab-14',
    name: 'Covid RT-PCR Swab Test',
    tag: 'Express Swab',
    parameters: '1 Parameter Checked',
    timeframe: 'Report in 6 Hrs',
    price: 700,
    discountPrice: 399,
    discountPercent: 43,
    homeCollection: true,
    fastingRequired: 'Fasting not required',
    testsIncluded: 'Severe Acute Respiratory Syndrome Coronavirus 2 RT-PCR Swab Detection',
    labId: 'em-lab-2',
    labName: 'Metropolis Diagnostics Center'
  }
];

const initialLabs = [
  {
    id: 'em-lab-1',
    name: 'E Mediclub Clinical Laboratories',
    logo: '🧪',
    regNumber: 'REG-LAB-892719',
    nablCertified: true,
    isoCertified: true,
    experience: '12 Years',
    address: 'Plot 42, Health City, Sector 15, Andheri East, Mumbai',
    homeCollection: true,
    timings: '06:00 AM - 09:00 PM',
    rating: 4.8,
    reviewsCount: 1420,
    testsCount: 120,
    gallery: [
      'https://images.unsplash.com/photo-1579154261294-88752594e687?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { patientName: 'Rajesh K.', rating: 5, reviewText: 'Extremely professional home collector. The technician was gentle and followed all sterile guidelines. Received my report in under 8 hours!', date: 'April 2026' },
      { patientName: 'Sneha M.', rating: 4, reviewText: 'Very clean lab facilities and quick walk-in experience. Highly recommended for full body screenings.', date: 'March 2026' },
      { patientName: 'Amit G.', rating: 5, reviewText: 'The best pricing for comprehensive gold package. Authentic digital reports easily accessible.', date: 'February 2026' }
    ]
  },
  {
    id: 'em-lab-2',
    name: 'Metropolis Diagnostics Center',
    logo: '🔬',
    regNumber: 'REG-LAB-471289',
    nablCertified: true,
    isoCertified: true,
    experience: '18 Years',
    address: 'Fortis Chambers, Gr Floor, Nariman Point, Mumbai',
    homeCollection: true,
    timings: '06:30 AM - 08:30 PM',
    rating: 4.7,
    reviewsCount: 2180,
    testsCount: 150,
    gallery: [
      'https://images.unsplash.com/photo-1579154261294-88752594e687?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { patientName: 'Sunita D.', rating: 5, reviewText: 'Highly reliable. I have been doing my monthly diabetic panels here for years. Reports are highly consistent.', date: 'May 2026' },
      { patientName: 'Vikram R.', rating: 4, reviewText: 'Courteous staff, digital queue management system, very little waiting time.', date: 'April 2026' },
      { patientName: 'Priya P.', rating: 5, reviewText: 'Great discount through E Mediclub app. Walk-in was seamless and report delivery was super fast.', date: 'March 2026' }
    ]
  },
  {
    id: 'em-lab-3',
    name: 'Thyrocare Wellness Center',
    logo: '🧬',
    regNumber: 'REG-LAB-312984',
    nablCertified: true,
    isoCertified: true,
    experience: '15 Years',
    address: 'Apollo Wellness Center, Chembur, Mumbai',
    homeCollection: true,
    timings: '06:00 AM - 08:00 PM',
    rating: 4.6,
    reviewsCount: 1890,
    testsCount: 180,
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1579154261294-88752594e687?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { patientName: 'Arjun S.', rating: 4, reviewText: 'Very affordable diagnostic pricing. The home collector came right on time at 6:30 AM.', date: 'May 2026' },
      { patientName: 'Meera N.', rating: 5, reviewText: 'ISO certified lab. Clean collection tubes and professional technician. Highly satisfied.', date: 'April 2026' },
      { patientName: 'Karan J.', rating: 4.5, reviewText: 'Smooth booking and sample drawing. Online reports available within 12 hours.', date: 'May 2026' }
    ]
  }
];

const specialtiesData = {
  'Dermatology': [
    { name: 'Dr. Priya Sharma', subSpecialty: 'Cosmetic Dermatology & Trichology', qualification: 'MBBS, MD Dermatology, DNB', experience: 14, hospital: 'Kokilaben Dhirubhai Ambani Hospital, Mumbai', fee: 499, offlineFee: 800, rating: 4.8, reviewsCount: 312, consultationMode: 'Both', registrationNumber: 'MCI-2008-84721', gender: 'female', bio: 'Expert in clinical and aesthetic dermatology with 14+ years of practice. Focuses on safe acne treatments, pigmentation correction, and modern hair therapies.' },
    { name: 'Dr. Rohit Malhotra', subSpecialty: 'Clinical Dermatology & Vitiligo Care', qualification: 'MBBS, DVD', experience: 9, hospital: 'Fortis Hospital, Mulund, Mumbai', fee: 399, offlineFee: 700, rating: 4.6, reviewsCount: 184, consultationMode: 'Both', registrationNumber: 'MCI-2015-39281', gender: 'male', bio: 'Specialist in chronic skin disorders including vitiligo, psoriasis, and eczema. Integrates systemic therapies and lifestyle modifications.' },
    { name: 'Dr. Sneha Iyer', subSpecialty: 'Pediatric Dermatology & Skin Infections', qualification: 'MBBS, MD, DNB', experience: 17, hospital: 'Lilavati Hospital & Research Centre, Mumbai', fee: 599, offlineFee: 1000, rating: 4.9, reviewsCount: 520, consultationMode: 'Both', registrationNumber: 'MCI-2005-29831', gender: 'female', bio: 'Renowned pediatric dermatologist focused on atopic dermatitis, infantile eczema, and viral/fungal skin infections in children.' }
  ],
  'Gynaecology & Obstetrics': [
    { name: 'Dr. Meena Kulkarni', subSpecialty: 'High-Risk Obstetrics, PCOS & Fertility', qualification: 'MBBS, MS Gynaecology', experience: 20, hospital: 'Hinduja Hospital, Mahim, Mumbai', fee: 599, offlineFee: 1200, rating: 4.9, reviewsCount: 654, consultationMode: 'Both', registrationNumber: 'MCI-1999-23841', gender: 'female', bio: 'Senior OB-GYN with 20 years of core clinical expertise. Specializes in advanced maternal-fetal medicine, high-risk birth plans, and laparoscopic pelvic surgery.' },
    { name: 'Dr. Anita Desai', subSpecialty: 'Normal Deliveries, Laparoscopic Surgeries', qualification: 'MBBS, DGO', experience: 12, hospital: 'Wockhardt Hospital, Mumbai Central', fee: 449, offlineFee: 900, rating: 4.7, reviewsCount: 290, consultationMode: 'Both', registrationNumber: 'MCI-2010-84920', gender: 'female', bio: 'Compassionate specialist in natural painless deliveries, C-sections, and minimally invasive diagnostic hysteroscopy.' },
    { name: 'Dr. Pooja Bhatia', subSpecialty: 'Adolescent Gynecology & Menopause Care', qualification: 'MBBS, MD OBG', experience: 8, hospital: 'Breach Candy Hospital, Mumbai', fee: 399, offlineFee: 750, rating: 4.5, reviewsCount: 140, consultationMode: 'Both', registrationNumber: 'MCI-2016-39108', gender: 'female', bio: 'Dedicated practitioner specializing in hormone replacement therapy, teenage menstrual irregularities, and wellness plans.' }
  ],
  'Orthopaedics': [
    { name: 'Dr. Arjun Patel', subSpecialty: 'Joint Replacements & Sports Medicine', qualification: 'MBBS, MS Ortho, DNB', experience: 18, hospital: 'Nanavati Max Super Speciality Hospital, Mumbai', fee: 549, offlineFee: 1100, rating: 4.8, reviewsCount: 420, consultationMode: 'Both', registrationNumber: 'MCI-2004-98432', gender: 'male', bio: 'Expert orthopedic surgeon specializing in robotic knee/hip replacements, complex trauma reconstructions, and arthroscopic ACL repairs.' },
    { name: 'Dr. Vikram Sinha', subSpecialty: 'Fracture Care & Geriatric Arthritis', qualification: 'MBBS, MS', experience: 11, hospital: 'Jupiter Hospital, Thane, Mumbai', fee: 449, offlineFee: 850, rating: 4.6, reviewsCount: 215, consultationMode: 'Both', registrationNumber: 'MCI-2012-39284', gender: 'male', bio: 'Dedicated to non-surgical and surgical management of osteoarthritic joint degeneration, lower back pain, and osteoporosis care.' },
    { name: 'Dr. Kiran Reddy', subSpecialty: 'Pediatric Orthopaedics & Deformities', qualification: 'MBBS, DNB Ortho', experience: 7, hospital: 'KEM Hospital, Parel, Mumbai', fee: 349, offlineFee: 650, rating: 4.4, reviewsCount: 98, consultationMode: 'Both', registrationNumber: 'MCI-2017-94321', gender: 'male', bio: 'Specialized in childhood bone growth anomalies, clubfoot corrections, pediatric trauma, and tailored rehabilitation programs.' }
  ],
  'Cardiology': [
    { name: 'Dr. Suresh Menon', subSpecialty: 'Interventional Cardiology & Coronary Angioplasty', qualification: 'MBBS, MD, DM Cardiology', experience: 22, hospital: 'Bombay Hospital & Medical Research Centre, Mumbai', fee: 699, offlineFee: 1500, rating: 4.9, reviewsCount: 820, consultationMode: 'Both', registrationNumber: 'MCI-1998-38291', gender: 'male', bio: 'Preeminent interventional cardiologist with 22 years experience. Expert in stenting, transcatheter aortic valve replacement, and cardiac failures.' },
    { name: 'Dr. Nandita Roy', subSpecialty: 'Preventive Cardiology & Clinical Hypertension', qualification: 'MBBS, MD Cardiology', experience: 15, hospital: 'Jaslok Hospital & Research Centre, Mumbai', fee: 599, offlineFee: 1200, rating: 4.8, reviewsCount: 410, consultationMode: 'Both', registrationNumber: 'MCI-2006-29184', gender: 'female', bio: 'Pioneer in preventative heart wellness, metabolic vascular profiling, refractory hypertension, and cardiovascular risk assessments.' },
    { name: 'Dr. Ramesh Agarwal', subSpecialty: 'Heart Failure & Cardiac Rehabilitation', qualification: 'MBBS, DM', experience: 10, hospital: 'S.L. Raheja Hospital, Mahim, Mumbai', fee: 499, offlineFee: 950, rating: 4.6, reviewsCount: 198, consultationMode: 'Both', registrationNumber: 'MCI-2014-93821', gender: 'male', bio: 'Specialist in 3D echocardiography, chronic heart rhythm management, pacemakers, and post-bypass surgical clinical rehabilitation.' }
  ],
  'General Physician': [
    { name: 'Dr. Kavita Joshi', subSpecialty: 'Internal Medicine & Diabetes Control', qualification: 'MBBS, MD General Medicine', experience: 13, hospital: 'Saifee Hospital, Charni Road, Mumbai', fee: 299, offlineFee: 600, rating: 4.7, reviewsCount: 540, consultationMode: 'Both', registrationNumber: 'MCI-2009-84732', gender: 'female', bio: 'Comprehensive physician specializing in chronic lifestyle disease management, persistent infectious fevers, and multi-system medical diagnosis.' },
    { name: 'Dr. Anil Sharma', subSpecialty: 'Primary Care & General Wellness', qualification: 'MBBS', experience: 8, hospital: 'Private Clinic, Andheri West, Mumbai', fee: 199, offlineFee: 400, rating: 4.5, reviewsCount: 320, consultationMode: 'Both', registrationNumber: 'MCI-2015-89421', gender: 'male', bio: 'Empathetic family doctor providing comprehensive preventative checkups, seasonal viral management, and medical fitness approvals.' },
    { name: 'Dr. Deepa Nair', subSpecialty: 'Chronic Care & Geriatric Health', qualification: 'MBBS, DNB', experience: 16, hospital: 'Cumballa Hill Hospital, Mumbai', fee: 349, offlineFee: 700, rating: 4.8, reviewsCount: 460, consultationMode: 'Both', registrationNumber: 'MCI-2007-89104', gender: 'female', bio: 'Dedicated clinical consultant specializing in eldercare medicine, metabolic diseases, and integrated medical management.' }
  ],
  'Paediatrics': [
    { name: 'Dr. Sunita Rao', subSpecialty: 'Neonatal Intensive Care & Infant Nutrition', qualification: 'MD (Pediatrics), DCH', experience: 12, hospital: 'Wadia Children Hospital, Parel, Mumbai', fee: 499, offlineFee: 800, rating: 4.8, reviewsCount: 380, consultationMode: 'Both', registrationNumber: 'MCI-2011-89304', gender: 'female', bio: 'Expert child care physician focusing on newborn development, vaccine schedules, childhood asthmas, and dietary health.' },
    { name: 'Dr. Vinod Sharma', subSpecialty: 'Child Development & Pediatric Asthma', qualification: 'MBBS, MD Pediatrics', experience: 15, hospital: 'Apollo Hospitals, Navi Mumbai', fee: 449, offlineFee: 900, rating: 4.7, reviewsCount: 220, consultationMode: 'Both', registrationNumber: 'MCI-2008-39281', gender: 'male', bio: 'Trusted pediatrician with vast clinical experience. Expert in behavioral health, juvenile allergies, and acute child illnesses.' },
    { name: 'Dr. Anjali Gupta', subSpecialty: 'Pediatric Endocrinology & Growth', qualification: 'MBBS, DCH, DNB', experience: 9, hospital: 'Fortis Hiranandani Hospital, Vashi', fee: 399, offlineFee: 700, rating: 4.6, reviewsCount: 160, consultationMode: 'Both', registrationNumber: 'MCI-2014-89320', gender: 'female', bio: 'Dedicated pediatrician focused on developmental milestones, growth hormone evaluations, and juvenile diabetes monitoring.' }
  ],
  'Neurology': [
    { name: 'Dr. Shalini Kapoor', subSpecialty: 'Stroke, Epilepsy & Chronic Migraines', qualification: 'DM (Neurology) - NIMHANS, MD', experience: 16, hospital: 'Kokilaben Dhirubhai Ambani Hospital, Mumbai', fee: 599, offlineFee: 1200, rating: 4.9, reviewsCount: 480, consultationMode: 'Both', registrationNumber: 'MCI-2006-89102', gender: 'female', bio: 'NIMHANS alumnus specializing in stroke thrombolysis, neuro-critical care, drug-resistant epilepsy, and complex chronic headaches.' },
    { name: 'Dr. Vikram Kumar', subSpecialty: 'Parkinsons & Movement Disorders', qualification: 'MD, DM Neurology', experience: 12, hospital: 'H.N. Reliance Foundation Hospital, Mumbai', fee: 549, offlineFee: 1000, rating: 4.7, reviewsCount: 310, consultationMode: 'Both', registrationNumber: 'MCI-2011-94821', gender: 'male', bio: 'Neurologist with focused clinical interest in deep brain stimulation mapping, tremors, Alzheimers, and degenerative nerve profiles.' },
    { name: 'Dr. Anand Shah', subSpecialty: 'Neuropathies & Muscle Disorders', qualification: 'MBBS, MD, DNB Neurology', experience: 8, hospital: 'S.L. Raheja Hospital, Mahim, Mumbai', fee: 499, offlineFee: 900, rating: 4.5, reviewsCount: 130, consultationMode: 'Both', registrationNumber: 'MCI-2016-89271', gender: 'male', bio: 'Dedicated nerve specialist focused on demyelinating diseases, muscular dystrophies, and EMG diagnostics.' }
  ],
  'Psychiatry & Mental Health': [
    { name: 'Dr. Rohan Sen', subSpecialty: 'Clinical Depression, OCD & CBT Therapy', qualification: 'MD (Psychiatry) - NIMHANS', experience: 13, hospital: 'Bombay Hospital & Medical Research Centre, Mumbai', fee: 599, offlineFee: 1100, rating: 4.8, reviewsCount: 390, consultationMode: 'Both', registrationNumber: 'MCI-2010-89142', gender: 'male', bio: 'Compassionate psychiatrist expert in cognitive behavioral therapies, panic disorders, obsessive-compulsive distresses, and depressive profiles.' },
    { name: 'Dr. Smita Patil', subSpecialty: 'Child & Adolescent Psychiatry, Counseling', qualification: 'MBBS, DPM Psychiatry', experience: 10, hospital: 'Breach Candy Hospital, Mumbai', fee: 499, offlineFee: 900, rating: 4.7, reviewsCount: 220, consultationMode: 'Both', registrationNumber: 'MCI-2013-94820', gender: 'female', bio: 'Specialist in student mental health, family counselor, ADHD, autism spectrum counseling, and stress relief frameworks.' },
    { name: 'Dr. Vijay Verma', subSpecialty: 'Addiction Psychiatry & De-addiction', qualification: 'MBBS, MD Psychiatry', experience: 7, hospital: 'Saifee Hospital, Charni Road, Mumbai', fee: 399, offlineFee: 800, rating: 4.5, reviewsCount: 110, consultationMode: 'Both', registrationNumber: 'MCI-2017-89124', gender: 'male', bio: 'Dedicated practitioner specializing in substance abuse therapy, neuro-chemical balances, and wellness counseling.' }
  ],
  'ENT': [
    { name: 'Dr. Manoj Gupta', subSpecialty: 'Sinusitis, Snoring & Sleep Apnea', qualification: 'MBBS, MS ENT, DNB', experience: 15, hospital: 'Fortis Hospital, Mulund, Mumbai', fee: 399, offlineFee: 800, rating: 4.8, reviewsCount: 340, consultationMode: 'Both', registrationNumber: 'MCI-2007-89104', gender: 'male', bio: 'Expert ENT surgeon specializing in functional endoscopic sinus surgery (FESS), sleep apnea diagnostics, and coblation tonsillectomies.' },
    { name: 'Dr. Aarti Shah', subSpecialty: 'Micro-Ear Surgery & Hearing Loss', qualification: 'MBBS, MS ENT', experience: 11, hospital: 'Nanavati Max Super Speciality Hospital, Mumbai', fee: 349, offlineFee: 700, rating: 4.6, reviewsCount: 198, consultationMode: 'Both', registrationNumber: 'MCI-2012-98421', gender: 'female', bio: 'Focused specialist in tympanoplasty, cochlear implants, management of vertigo, tinnitus, and pediatric ENT profiles.' },
    { name: 'Dr. Kishore Kumar', subSpecialty: 'Voice & Throat Disorders, Laryngology', qualification: 'MBBS, DLO ENT', experience: 8, hospital: 'Saifee Hospital, Charni Road, Mumbai', fee: 299, offlineFee: 600, rating: 4.5, reviewsCount: 115, consultationMode: 'Both', registrationNumber: 'MCI-2016-89410', gender: 'male', bio: 'Dedicated ENT professional dealing with professional voice coaching, vocal cord nodules, and structural airway checks.' }
  ],
  'Ophthalmology': [
    { name: 'Dr. Anjali Mehta', subSpecialty: 'Robotic Cataract & Advanced Lasik', qualification: 'MS (Ophthalmology) - M&J Eye Institute', experience: 11, hospital: 'Apollo Hospitals, Navi Mumbai', fee: 499, offlineFee: 900, rating: 4.8, reviewsCount: 520, consultationMode: 'Both', registrationNumber: 'MCI-2011-89304', gender: 'female', bio: 'Pioneering eye surgeon specializing in blade-free LASIK, premium multi-focal cataract lenses, and dry eye syndromes.' },
    { name: 'Dr. Sneha Nair', subSpecialty: 'Glaucoma & Pediatric Ophthalmology', qualification: 'MS (Ophthalmology) - GMC Trivandrum', experience: 12, hospital: 'Hinduja Hospital, Mahim, Mumbai', fee: 449, offlineFee: 800, rating: 4.7, reviewsCount: 310, consultationMode: 'Both', registrationNumber: 'MCI-2010-89124', gender: 'female', bio: 'Dedicated pediatric eye care consultant and glaucoma specialist. Focuses on early squint corrections and optic nerve care.' },
    { name: 'Dr. Rajesh K. V.', subSpecialty: 'Retina & Diabetic Retinopathy', qualification: 'MBBS, MS, Fellowship Retina', experience: 16, hospital: 'Bombay Hospital & Medical Research Centre, Mumbai', fee: 599, offlineFee: 1100, rating: 4.9, reviewsCount: 460, consultationMode: 'Both', registrationNumber: 'MCI-2006-29184', gender: 'male', bio: 'Vitreoretinal surgeon dealing with diabetic macular edema, retinal detachments, laser photocoagulation, and clinical eye trauma.' }
  ],
  'Gastroenterology': [
    { name: 'Dr. Vikram Kumar', subSpecialty: 'Acid Reflux, IBS & Endoscopy', qualification: 'MD, DM (Gastroenterology) - AIIMS', experience: 15, hospital: 'Fortis Hospital, Mulund, Mumbai', fee: 549, offlineFee: 1000, rating: 4.9, reviewsCount: 610, consultationMode: 'Both', registrationNumber: 'MCI-2007-89124', gender: 'male', bio: 'Top AIIMS clinical graduate. Expert in diagnostic/therapeutic endoscopy, colonoscopy, inflammatory bowel disease (IBD), and reflux solutions.' },
    { name: 'Dr. Preeti Sen', subSpecialty: 'Hepatology & Liver Wellness', qualification: 'MBBS, MD, DM Gastroenterology', experience: 11, hospital: 'Kokilaben Dhirubhai Ambani Hospital, Mumbai', fee: 499, offlineFee: 900, rating: 4.7, reviewsCount: 280, consultationMode: 'Both', registrationNumber: 'MCI-2012-39281', gender: 'female', bio: 'Specialist in fatty liver diagnostics, chronic hepatitis management, cirrhosis protocols, and functional gall bladder disorders.' },
    { name: 'Dr. Ashok Roy', subSpecialty: 'Peptic Ulcers & Pancreatic Disorders', qualification: 'MBBS, MD General Med, DNB', experience: 14, hospital: 'Lilavati Hospital & Research Centre, Mumbai', fee: 449, offlineFee: 800, rating: 4.6, reviewsCount: 190, consultationMode: 'Both', registrationNumber: 'MCI-2008-84210', gender: 'male', bio: 'Consultant gastroenterologist focusing on chronic gastritis, H. Pylori eradication, metabolic guts, and pancreatic therapies.' }
  ],
  'Endocrinology': [
    { name: 'Dr. Meera Nair', subSpecialty: 'Diabetes Management & Thyroid Disorders', qualification: 'MD, DM (Endocrinology) - CMC Vellore', experience: 14, hospital: 'Jaslok Hospital & Research Centre, Mumbai', fee: 599, offlineFee: 1100, rating: 4.9, reviewsCount: 740, consultationMode: 'Both', registrationNumber: 'MCI-2008-39281', gender: 'female', bio: 'Renowned clinical endocrinologist focusing on insulin resistance, gestational diabetes, thyroid nodules, and hormonal imbalances.' },
    { name: 'Dr. Suresh Gowda', subSpecialty: 'PCOS & Reproductive Endocrinology', qualification: 'MBBS, MD, DM Endocrinology', experience: 10, hospital: 'Apollo Hospitals, Navi Mumbai', fee: 499, offlineFee: 900, rating: 4.7, reviewsCount: 310, consultationMode: 'Both', registrationNumber: 'MCI-2013-89421', gender: 'male', bio: 'Vast clinical research in metabolic obesity, clinical PCOS profiles, pediatric short statures, and osteoporosis care.' },
    { name: 'Dr. Nitin Patel', subSpecialty: 'Adrenal & Pituitary Disorders', qualification: 'MBBS, MD, DNB Endocrinology', experience: 8, hospital: 'Breach Candy Hospital, Mumbai', fee: 449, offlineFee: 800, rating: 4.5, reviewsCount: 150, consultationMode: 'Both', registrationNumber: 'MCI-2016-98432', gender: 'male', bio: 'Dedicated practitioner specializing in growth hormone delays, hyperthyroidism, and adrenal clinical therapies.' }
  ],
  'Pulmonology (Lungs & Chest)': [
    { name: 'Dr. Sameer Sethi', subSpecialty: 'Asthma, COPD & Sleep Apnea', qualification: 'MBBS, MD Pulmonology, FCCP', experience: 16, hospital: 'Nanavati Max Super Speciality Hospital, Mumbai', fee: 499, offlineFee: 950, rating: 4.8, reviewsCount: 420, consultationMode: 'Both', registrationNumber: 'MCI-2006-89104', gender: 'male', bio: 'Senior pulmonologist expert in persistent allergic asthmas, chronic bronchitis (COPD), diagnostic bronchoscopies, and sleep study designs.' },
    { name: 'Dr. Radhika Nair', subSpecialty: 'Interventional Pulmonology & Allergy', qualification: 'MBBS, MD Respiratory Med', experience: 11, hospital: 'Hinduja Hospital, Mahim, Mumbai', fee: 449, offlineFee: 800, rating: 4.6, reviewsCount: 230, consultationMode: 'Both', registrationNumber: 'MCI-2012-98421', gender: 'female', bio: 'Specialist in pulmonary lung fibrosis, dry chronic coughs, respiratory rehabilitation, and comprehensive allergy tests.' },
    { name: 'Dr. Tarun Gupta', subSpecialty: 'Tuberculosis & Critical Care Med', qualification: 'MBBS, DNB Pulmonology', experience: 8, hospital: 'Jupiter Hospital, Thane, Mumbai', fee: 399, offlineFee: 700, rating: 4.5, reviewsCount: 115, consultationMode: 'Both', registrationNumber: 'MCI-2016-89410', gender: 'male', bio: 'Dedicated physician focused on infectious lung disorders, lung tissue checks, and pulmonary critical care.' }
  ],
  'Urology': [
    { name: 'Dr. Sanjay Deshmukh', subSpecialty: 'Kidney Stones & Laser Endourology', qualification: 'MBBS, MS, M.Ch Urology', experience: 18, hospital: 'Bombay Hospital & Medical Research Centre, Mumbai', fee: 599, offlineFee: 1200, rating: 4.9, reviewsCount: 560, consultationMode: 'Both', registrationNumber: 'MCI-2004-98412', gender: 'male', bio: 'Expert urologist specializing in laser lithotripsy for kidney stones, urethral stricture repairs, and robotic prostatectomies.' },
    { name: 'Dr. Alok Verma', subSpecialty: 'Prostate Health & Laparoscopic Urology', qualification: 'MBBS, DNB Urology', experience: 12, hospital: 'Lilavati Hospital & Research Centre, Mumbai', fee: 499, offlineFee: 900, rating: 4.7, reviewsCount: 290, consultationMode: 'Both', registrationNumber: 'MCI-2010-84321', gender: 'male', bio: 'Specialist in benign prostatic hyperplasia (BPH) management, clinical UTIs, and male sexual wellness protocols.' },
    { name: 'Dr. Nilesh Shah', subSpecialty: 'Male Infertility & Reconstructive Urology', qualification: 'MBBS, MS, Fellowship Urology', experience: 9, hospital: 'Saifee Hospital, Charni Road, Mumbai', fee: 449, offlineFee: 800, rating: 4.5, reviewsCount: 140, consultationMode: 'Both', registrationNumber: 'MCI-2015-89104', gender: 'male', bio: 'Focused urologist dealing with male fertility pathways, microscopic varicocelectomy, and reconstructive bladder therapies.' }
  ],
  'Oncology (Cancer Care)': [
    { name: 'Dr. Anita Sen', subSpecialty: 'Breast & Gynecological Oncology', qualification: 'MBBS, MD Radiotherapy, DM Oncology', experience: 17, hospital: 'Tata Memorial Hospital, Parel, Mumbai', fee: 699, offlineFee: 1400, rating: 4.9, reviewsCount: 680, consultationMode: 'Both', registrationNumber: 'MCI-2005-29184', gender: 'female', bio: 'Tata Memorial alumnus specializing in early breast cancer detection, personalized immunotherapies, and radiation oncology grids.' },
    { name: 'Dr. Devendra Patel', subSpecialty: 'Gastrointestinal & Lung Oncology', qualification: 'MBBS, MS Surgery, M.Ch Surgical Onc', experience: 13, hospital: 'Kokilaben Dhirubhai Ambani Hospital, Mumbai', fee: 599, offlineFee: 1200, rating: 4.8, reviewsCount: 310, consultationMode: 'Both', registrationNumber: 'MCI-2009-84721', gender: 'male', bio: 'Expert surgical oncologist specializing in minimally invasive gastrointestinal resections and thoracic lung surgeries.' },
    { name: 'Dr. Vinay Rao', subSpecialty: 'Hematological Oncology & Lymphomas', qualification: 'MBBS, MD, Fellowship Hematology', experience: 8, hospital: 'Fortis Hospital, Mulund, Mumbai', fee: 499, offlineFee: 1000, rating: 4.6, reviewsCount: 160, consultationMode: 'Both', registrationNumber: 'MCI-2016-39108', gender: 'male', bio: 'Specialist in clinical management of leukemias, myelomas, lymphomas, and bone marrow transplants.' }
  ],
  'Nephrology (Kidney)': [
    { name: 'Dr. Sandeep Patil', subSpecialty: 'Chronic Kidney Disease & Kidney Transplants', qualification: 'MBBS, MD, DM Nephrology', experience: 16, hospital: 'H.N. Reliance Foundation Hospital, Mumbai', fee: 599, offlineFee: 1100, rating: 4.9, reviewsCount: 450, consultationMode: 'Both', registrationNumber: 'MCI-2006-89102', gender: 'male', bio: 'Expert clinical nephrologist with 16 years experience. Specializes in advanced hemodialysis, diabetic nephropathy, and pre/post kidney transplant care.' },
    { name: 'Dr. Rajiv Mehta', subSpecialty: 'Clinical Hypertension & Glomerulonephritis', qualification: 'MBBS, MD Medicine, DNB Nephro', experience: 11, hospital: 'Lilavati Hospital & Research Centre, Mumbai', fee: 499, offlineFee: 900, rating: 4.7, reviewsCount: 220, consultationMode: 'Both', registrationNumber: 'MCI-2011-94821', gender: 'male', bio: 'Focused specialist in metabolic kidney stones prevention, clinical autoimmune kidney profiles, and specialized dialysis protocols.' },
    { name: 'Dr. Shruti Iyer', subSpecialty: 'Pediatric Nephrology & Acute Renal Failure', qualification: 'MBBS, MD, Fellowship Nephrology', experience: 7, hospital: 'Wadia Children Hospital, Parel, Mumbai', fee: 399, offlineFee: 750, rating: 4.5, reviewsCount: 95, consultationMode: 'Both', registrationNumber: 'MCI-2017-89271', gender: 'female', bio: 'Dedicated nephrology consultant dealing with pediatric urinary infections, childhood nephrotic syndromes, and acute dialysis.' }
  ],
  'Dentistry': [
    { name: 'Dr. Sanjay Gupta', subSpecialty: 'Prosthodontics & Robotic Implantology', qualification: 'BDS, MDS (Prosthodontics) - KGMU', experience: 14, hospital: 'Apollo White Dental, Navi Mumbai', fee: 299, offlineFee: 500, rating: 4.8, reviewsCount: 620, consultationMode: 'Both', registrationNumber: 'MCI-2008-89304', gender: 'male', bio: 'KGMU Lucknow gold medalist. Expert in computer-guided painless dental implants, complete oral rehabilitations, and aesthetic crowns.' },
    { name: 'Dr. Neha Kulkarni', subSpecialty: 'Endodontics & Painless Root Canals (RCT)', qualification: 'BDS, MDS (Endodontics)', experience: 10, hospital: 'Private Clinic, Bandra West, Mumbai', fee: 249, offlineFee: 450, rating: 4.6, reviewsCount: 310, consultationMode: 'Both', registrationNumber: 'MCI-2012-98421', gender: 'female', bio: 'Specialist in single-sitting painless root canals, laser microscopic endodontics, and deep tooth restorations.' },
    { name: 'Dr. Rahul Joshi', subSpecialty: 'Orthodontics & Invisible Aligners', qualification: 'BDS, MDS Orthodontics', experience: 8, hospital: 'Fortis Hospital, Mulund, Mumbai', fee: 199, offlineFee: 400, rating: 4.5, reviewsCount: 160, consultationMode: 'Both', registrationNumber: 'MCI-2015-89410', gender: 'male', bio: 'Certified invisalign provider specialized in dental braces, clear aligners, structural bite corrections, and childhood jaw alignments.' }
  ]
};

const reviewTexts = [
  'Absolutely brilliant doctor! Explained the root cause with so much patience and prescribed minimal medicine. Visible recovery inside 10 days.',
  'Great clinical experience. The consultation was on time, and the staff followed absolute hygiene standards. highly recommended!',
  'Very professional and kind-hearted specialist. Spent ample time understanding my medical history. Her diagnosis was 100% spot-on!',
  'Had a video call and it was seamless. The prescription note was detailed, and she explained the diet rules perfectly.',
  'Extremely satisfied. Best physician I have met. Very down-to-earth and explained everything in clear layman terms.',
  'Excellent treatment. The joint pain treatment worked wonders for my mother after trying other clinics for months.'
];

const generateTestimonials = (specialty, docName, index) => {
  const patientNames = [
    ['Anjali M.', 'Rahul S.', 'Sneha K.'],
    ['Vikram G.', 'Pooja R.', 'Karan J.'],
    ['Sunita D.', 'Arjun B.', 'Meera N.']
  ][index % 3];

  const dates = ['March 2025', 'February 2025', 'January 2025'];
  const modes = ['In-Person', 'Online', 'In-Person'];

  return patientNames.map((pName, i) => {
    const seed = (specialty.charCodeAt(0) + docName.charCodeAt(0) + i) % reviewTexts.length;
    return {
      patientName: pName,
      rating: 4 + (seed % 2),
      reviewText: reviewTexts[seed],
      date: dates[i],
      mode: modes[i]
    };
  });
};

const initialDoctors = [];
let docIdCounter = 1;
Object.entries(specialtiesData).forEach(([specialty, docs]) => {
  docs.forEach((doc, idx) => {
    initialDoctors.push({
      id: `doc-${docIdCounter}`,
      name: doc.name,
      specialty: specialty,
      subSpecialty: doc.subSpecialty,
      avatar: `https://images.unsplash.com/photo-${doc.gender === 'female' ? '1559839734-2b71ea197ec2' : '1622253692010-333f2da6031d'}?auto=format&fit=crop&w=150&h=150&q=80`,
      qualification: doc.qualification,
      experience: `${doc.experience} Years Experience`,
      hospital: doc.hospital,
      fee: doc.fee,
      offlineFee: doc.offlineFee,
      languages: doc.languages || ["English", "Hindi"],
      availableDays: doc.availableDays || ["Mon", "Wed", "Fri"],
      timeSlots: doc.timeSlots || ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      rating: doc.rating,
      reviewsCount: doc.reviewsCount,
      consultationMode: doc.consultationMode,
      registrationNumber: doc.registrationNumber,
      bio: doc.bio,
      testimonials: generateTestimonials(specialty, doc.name, idx),
      online: doc.consultationMode === 'Online' || doc.consultationMode === 'Both',
      availability: `Available ${(doc.availableDays || ["Mon", "Wed", "Fri"])[0]} & ${(doc.availableDays || ["Mon", "Wed", "Fri"])[1] || 'Wed'} (${(doc.timeSlots || ["10:00 AM"])[0]} - ${(doc.timeSlots || ["04:00 PM"])[(doc.timeSlots || ["04:00 PM"]).length - 1]})`
    });
    docIdCounter++;
  });
});

const storedOrders = localStorage.getItem('em_orders') 
  ? JSON.parse(localStorage.getItem('em_orders')) 
  : [
      {
        id: 'ORD-89472',
        date: '2026-05-20',
        items: [
          { name: 'Revital H Capsule', qty: 1, price: 263, type: 'medicine' },
          { name: 'Dolo 650 Tablet', qty: 2, price: 28, type: 'medicine' }
        ],
        total: 319,
        status: 'Delivered',
        deliveryAddress: 'Home (Mumbai)'
      }
    ];

const storedAppointments = localStorage.getItem('em_appointments')
  ? JSON.parse(localStorage.getItem('em_appointments'))
  : [
      {
        id: 'APT-10492',
        doctorName: 'Dr. Rajesh Sharma',
        specialty: 'Cardiologist',
        date: '2026-05-28',
        timeSlot: '05:30 PM - 06:00 PM',
        type: 'Online Consultation',
        status: 'Confirmed'
      }
    ];

const storedLabBookings = localStorage.getItem('em_lab_bookings')
  ? JSON.parse(localStorage.getItem('em_lab_bookings'))
  : [
      {
        id: 'LBB-29381',
        packageName: 'Diabetes Screening Core Panel',
        date: '2026-05-29',
        timeSlot: '08:00 AM - 10:00 AM',
        status: 'Scheduled',
        address: 'Home (Mumbai)'
      }
    ];

const initialState = {
  medicines: initialMedicines,
  labTests: initialLabTests,
  doctors: initialDoctors,
  labs: initialLabs,
  orders: storedOrders,
  appointments: storedAppointments,
  labBookings: storedLabBookings,
  searchTerm: '',
  selectedCategory: 'All',
  selectedLocation: 'Mumbai, Maharashtra',
  isPrescriptionFilterActive: false,
  medicineCategories: ['Allopathy', 'Ayurveda', 'Homeopathy', 'Wellness', 'Surgical', 'Devices', 'Supplements', 'OTC'],
  doctorSpecialties: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'Neurologist', 'General Physician'],
  labCategories: ['Blood Test', 'Thyroid', 'Diabetes', 'Full Body Checkup', 'Vitamin Tests', 'Urine Test']
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setPrescriptionFilterActive: (state, action) => {
      state.isPrescriptionFilterActive = action.payload;
    },
    placeOrder: (state, action) => {
      state.orders.unshift(action.payload);
      localStorage.setItem('em_orders', JSON.stringify(state.orders));
    },
    bookDoctorAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
      localStorage.setItem('em_appointments', JSON.stringify(state.appointments));
    },
    bookLabPackage: (state, action) => {
      state.labBookings.unshift(action.payload);
      localStorage.setItem('em_lab_bookings', JSON.stringify(state.labBookings));
    },
    completeDoctorAppointment: (state, action) => {
      const apt = state.appointments.find(a => a.id === action.payload);
      if (apt) {
        apt.status = 'Completed';
        localStorage.setItem('em_appointments', JSON.stringify(state.appointments));
      }
    },
    completeLabBooking: (state, action) => {
      const booking = state.labBookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'Completed';
        localStorage.setItem('em_lab_bookings', JSON.stringify(state.labBookings));
      }
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        localStorage.setItem('em_orders', JSON.stringify(state.orders));
      }
    },
    addMedicineCategory: (state, action) => {
      if (!state.medicineCategories.includes(action.payload)) {
        state.medicineCategories.push(action.payload);
      }
    },
    addDoctorSpecialty: (state, action) => {
      if (!state.doctorSpecialties.includes(action.payload)) {
        state.doctorSpecialties.push(action.payload);
      }
    },
    addLabCategory: (state, action) => {
      if (!state.labCategories.includes(action.payload)) {
        state.labCategories.push(action.payload);
      }
    },
    addNewMedicine: (state, action) => {
      const newMed = {
        id: `med-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 0,
        inStock: true,
        ...action.payload
      };
      state.medicines.unshift(newMed);
    },
    deleteMedicine: (state, action) => {
      state.medicines = state.medicines.filter(m => m.id !== action.payload);
    },
    addNewDoctor: (state, action) => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 0,
        offlineFee: action.payload.fee + 100,
        languages: ["English", "Hindi"],
        availableDays: ["Mon", "Wed", "Fri"],
        timeSlots: ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
        consultationMode: "Both",
        bio: action.payload.bio || "Certified medical professional dedicated to clinical care.",
        online: true,
        status: "approved",
        qualification: action.payload.qualification || "MBBS, MD",
        ...action.payload
      };
      state.doctors.unshift(newDoc);
    },
    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter(d => d.id !== action.payload);
    },
    addNewLabTest: (state, action) => {
      const newTest = {
        id: `test-${Date.now()}`,
        duration: "24 Hours",
        homeCollection: "Yes",
        ...action.payload
      };
      state.labTests.unshift(newTest);
    },
    deleteLabTest: (state, action) => {
      state.labTests = state.labTests.filter(l => l.id !== action.payload);
    },
    submitAppointmentFeedback: (state, action) => {
      const { id, rating, feedback } = action.payload;
      const apt = state.appointments.find(a => a.id === id);
      if (apt) {
        apt.rating = rating;
        apt.feedback = feedback;
        apt.isRated = true;
        localStorage.setItem('em_appointments', JSON.stringify(state.appointments));
      }
    },
    submitLabFeedback: (state, action) => {
      const { id, rating, feedback } = action.payload;
      const bk = state.labBookings.find(b => b.id === id);
      if (bk) {
        bk.rating = rating;
        bk.feedback = feedback;
        bk.isRated = true;
        localStorage.setItem('em_lab_bookings', JSON.stringify(state.labBookings));
      }
    }
  }
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSelectedLocation,
  setPrescriptionFilterActive,
  placeOrder,
  bookDoctorAppointment,
  bookLabPackage,
  completeDoctorAppointment,
  completeLabBooking,
  updateOrderStatus,
  addMedicineCategory,
  addDoctorSpecialty,
  addLabCategory,
  addNewMedicine,
  deleteMedicine,
  addNewDoctor,
  deleteDoctor,
  addNewLabTest,
  deleteLabTest,
  submitAppointmentFeedback,
  submitLabFeedback
} = productSlice.actions;

export default productSlice.reducer;
export { initialMedicines, initialLabTests, initialDoctors, initialLabs };
