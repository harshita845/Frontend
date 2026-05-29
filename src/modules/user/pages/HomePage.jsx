import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft, FiChevronRight, FiCheckCircle, FiActivity, 
  FiClock, FiTrendingUp, FiBookmark, FiDownload, FiPhoneCall, FiAward 
} from 'react-icons/fi';
import ProductCard from '../../../shared/components/ProductCard';
import LabTestCard from '../../../shared/components/LabTestCard';
import DoctorCard from '../../../shared/components/DoctorCard';
import { setSelectedCategory, setSearchTerm } from '../store/productSlice';
import { FiUploadCloud } from 'react-icons/fi';

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors from products store
  const { medicines, labTests, doctors, selectedLocation } = useSelector(state => state.products);

  // States
  const [currentBanner, setCurrentBanner] = useState(0);

  // Mock Banner Carousel items
  const banners = [
    {
      id: 1,
      title: 'Flat 20% OFF on Medicines',
      subtitle: 'Plus extra 5% cashback on Ayurveda items.',
      code: 'MEDICLUB20',
      bg: 'linear-gradient(135deg, #0A5C36 0%, #0D9488 100%)',
      badge: 'MONSOON SALE'
    },
    {
      id: 2,
      title: 'Full Body Diagnostic Checkups',
      subtitle: 'Complete blood checks with Free Home Sample Collection.',
      code: 'GOLDTEST',
      bg: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
      badge: 'LAB PROMO'
    },
    {
      id: 3,
      title: 'Online Video Consultations',
      subtitle: 'Connect with certified specialists inside 15 minutes.',
      code: 'CONSULT100',
      bg: 'linear-gradient(135deg, #1E293B 0%, #0F766E 100%)',
      badge: 'DOCTOR CARE'
    }
  ];

  const getCityKey = (loc) => {
    if (!loc) return 'Mumbai, Maharashtra';
    const normalized = loc.toLowerCase();
    if (normalized.includes('mumbai')) return 'Mumbai, Maharashtra';
    if (normalized.includes('bengaluru') || normalized.includes('bangalore')) return 'Bengaluru, Karnataka';
    if (normalized.includes('delhi')) return 'New Delhi, Delhi';
    if (normalized.includes('hyderabad')) return 'Hyderabad, Telangana';
    if (normalized.includes('pune')) return 'Pune, Maharashtra';
    if (normalized.includes('chennai')) return 'Chennai, Tamil Nadu';
    if (normalized.includes('kolkata')) return 'Kolkata, West Bengal';
    if (normalized.includes('ahmedabad')) return 'Ahmedabad, Gujarat';
    return 'Mumbai, Maharashtra'; // Default fallback
  };

  const cityKey = getCityKey(selectedLocation);

  const getDynamicCategoryObj = (key) => {
    switch (key) {
      case 'Bengaluru, Karnataka':
        return { name: 'Sports Nutrition', icon: '🏋️‍♂️', desc: 'Sports Nutrition', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      case 'New Delhi, Delhi':
        return { name: 'Respiratory Care', icon: '🫁', desc: 'Breathing Care', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      case 'Hyderabad, Telangana':
        return { name: 'Diabetes Care', icon: '🩸', desc: 'Diabetes Care', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      case 'Pune, Maharashtra':
        return { name: 'Homeopathy', icon: '🥛', desc: 'Natural Tonics', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      case 'Chennai, Tamil Nadu':
        return { name: 'Geriatric Care', icon: '👵', desc: 'Geriatric Care', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      case 'Kolkata, West Bengal':
        return { name: 'Herbal Extracts', icon: '🍯', desc: 'Herbal Extracts', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      case 'Ahmedabad, Gujarat':
        return { name: 'Cardiac Care', icon: '❤️', desc: 'Cardiac Care', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
      default:
        return { name: 'Devices', icon: '🩸', desc: 'Health Monitors', route: '/categories', color: 'bg-indigo-50 text-indigo-600' };
    }
  };

  const dynamicCategory = getDynamicCategoryObj(cityKey);

  // Quick categories configuration
  const quickCategories = [
    { name: 'Medicines', icon: '💊', desc: 'Prescription Drugs', route: '/medicines', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Lab Tests', icon: '🧪', desc: 'Diagnostic Kits', route: '/lab-tests', color: 'bg-teal-50 text-teal-600' },
    { name: 'Doctors', icon: '👨‍⚕️', desc: 'Expert Doctors', route: '/doctor-appointments', color: 'bg-blue-50 text-blue-600' },
    { name: 'Ayurveda', icon: '🌿', desc: 'Natural Herbs', route: '/ayurveda', color: 'bg-amber-50 text-amber-600' },
    { name: 'Wellness', icon: '🧘', desc: 'Fitness & Care', route: '/wellness', color: 'bg-rose-50 text-rose-600' },
    dynamicCategory
  ];

  // Dynamic products priorities by location
  const locationPriorities = {
    'Mumbai, Maharashtra': ['med-4', 'med-1', 'med-10', 'med-2', 'med-6', 'med-9'],
    'Bengaluru, Karnataka': ['med-3', 'med-6', 'med-11', 'med-1', 'med-9', 'med-2'],
    'New Delhi, Delhi': ['med-13', 'med-3', 'med-12', 'med-6', 'med-2', 'med-11'],
    'Hyderabad, Telangana': ['med-5', 'med-2', 'med-9', 'med-12', 'med-1', 'med-10'],
    'Pune, Maharashtra': ['med-8', 'med-1', 'med-4', 'med-3', 'med-6', 'med-11'],
    'Chennai, Tamil Nadu': ['med-6', 'med-9', 'med-12', 'med-2', 'med-1', 'med-10'],
    'Kolkata, West Bengal': ['med-3', 'med-8', 'med-11', 'med-6', 'med-1', 'med-2'],
    'Ahmedabad, Gujarat': ['med-2', 'med-4', 'med-5', 'med-12', 'med-9', 'med-6']
  };

  const getPrioritizedMedicines = (list, loc) => {
    if (!list || list.length === 0) return [];
    const normalized = (loc || '').toLowerCase();
    let key = 'Mumbai, Maharashtra';
    if (normalized.includes('mumbai')) key = 'Mumbai, Maharashtra';
    else if (normalized.includes('bengaluru') || normalized.includes('bangalore')) key = 'Bengaluru, Karnataka';
    else if (normalized.includes('delhi')) key = 'New Delhi, Delhi';
    else if (normalized.includes('hyderabad')) key = 'Hyderabad, Telangana';
    else if (normalized.includes('pune')) key = 'Pune, Maharashtra';
    else if (normalized.includes('chennai')) key = 'Chennai, Tamil Nadu';
    else if (normalized.includes('kolkata')) key = 'Kolkata, West Bengal';
    else if (normalized.includes('ahmedabad')) key = 'Ahmedabad, Gujarat';
    
    const priorityIds = locationPriorities[key] || locationPriorities['Mumbai, Maharashtra'];
    return [...list].sort((a, b) => {
      const idxA = priorityIds.indexOf(a.id);
      const idxB = priorityIds.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  };

  const prioritizedMedicines = getPrioritizedMedicines(medicines, selectedLocation);

  // Promo Coupons
  const coupons = [
    { code: 'MEDICLUB20', desc: 'Flat 20% discount on order above ₹499' },
    { code: 'FREECOLLECT', desc: 'Free diagnostic home sample collection' },
    { code: 'WELCOME100', desc: 'Flat ₹100 OFF on your first purchase' }
  ];

  // Blog articles
  const articles = [
    {
      id: 1,
      title: '5 Herbs to Natural Immunity Strengthening',
      tag: 'AYURVEDA',
      readTime: '4 Min Read',
      summary: 'Explore time-tested wellness practices utilizing Neem, Giloy, Ashwagandha, and Turmeric for immune vigor.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 2,
      title: 'Managing Blood Sugar Levels: Tips & Diet',
      tag: 'DIABETES',
      readTime: '6 Min Read',
      summary: 'A clinical checklist detailing low-glycemic meals, timing guidelines, and activity levels for glucose balance.',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];

  // Auto sliding carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickCategoryClick = (cat) => {
    if (cat.route) {
      if (cat.name !== 'Doctors' && cat.name !== 'Lab Tests') {
        dispatch(setSelectedCategory(cat.name));
      }
      navigate(cat.route);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-10">
      
      {/* 1. Hero Promo Carousel (Banner) */}
      <section className="relative w-full h-44 sm:h-56 md:h-64 rounded-3xl overflow-hidden shadow-premium">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 text-white"
            style={{ background: banners[currentBanner].bg }}
          >
            {/* Overlay Grid mimicry */}
            <div className="absolute right-8 bottom-0 top-0 opacity-15 hidden sm:flex items-center text-[120px] font-black pointer-events-none select-none">
              CARE
            </div>

            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase w-fit shadow-sm">
              {banners[currentBanner].badge}
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold mt-3 max-w-lg leading-tight">
              {banners[currentBanner].title}
            </h1>
            <p className="text-[11px] sm:text-sm font-semibold opacity-90 mt-1 max-w-md">
              {banners[currentBanner].subtitle}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-yellow-400 text-slate-900 px-3.5 py-1.5 rounded-lg">
                CODE: {banners[currentBanner].code}
              </span>
              <button 
                onClick={() => navigate('/categories')} 
                className="bg-white hover:bg-slate-100 text-forest text-[10px] sm:text-xs font-black px-4.5 py-1.5 rounded-lg shadow-sm"
              >
                ORDER NOW
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentBanner === index ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Categories Section Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FiActivity className="text-teal" /> Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickCategories.map((cat, idx) => (
            <motion.div
              whileTap={{ scale: 0.96 }}
              key={idx}
              onClick={() => handleQuickCategoryClick(cat)}
              className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-forest/25 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 hover:scale-[1.03] flex flex-col items-center text-center cursor-pointer select-none group transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-inner ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h3 className="text-xs font-extrabold text-slate-800 leading-tight group-hover:text-forest transition-colors duration-300">
                {cat.name}
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-wide">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* 3. Promo Banner Section (Coupon Banner Strip) */}
      <section className="bg-forest-light/60 border border-forest/10 p-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎟️</div>
          <div>
            <h4 className="text-sm font-black text-forest-dark">Flat ₹100 Off on Lab Tests</h4>
            <p className="text-xs text-slate-500 font-semibold">Book any premium full body checkup package above ₹999.</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="border-2 border-dashed border-forest/30 bg-white text-forest text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl">
            WELCOME100
          </span>
          <button 
            onClick={() => navigate('/lab-tests')} 
            className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            Apply Code
          </button>
        </div>
      </section>

      {/* 4. Popular Medicines Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
              <FiTrendingUp className="text-teal" /> Trending Medicines
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">Most bought daily healthcare essentials</p>
          </div>
          <button 
            onClick={() => { dispatch(setSelectedCategory('Medicines')); navigate('/categories'); }} 
            className="text-[11px] font-black text-teal hover:text-teal-dark bg-transparent border-0 cursor-pointer outline-none uppercase tracking-wider"
          >
            See All Medicines
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {prioritizedMedicines.filter(m => m.category === 'Medicines').slice(0, 4).map((med) => (
            <ProductCard key={med.id} product={med} />
          ))}
        </div>
      </section>

      {/* 5. Ayurveda Essentials Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
              🌿 Ayurveda & Natural Herbs
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">Time-tested natural remedies and daily immunity tonics</p>
          </div>
          <button 
            onClick={() => { dispatch(setSelectedCategory('Ayurveda')); navigate('/categories'); }} 
            className="text-[11px] font-black text-teal hover:text-teal-dark bg-transparent border-0 cursor-pointer outline-none uppercase tracking-wider"
          >
            See All Ayurveda
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {prioritizedMedicines.filter(m => m.category === 'Ayurveda').slice(0, 4).map((med) => (
            <ProductCard key={med.id} product={med} />
          ))}
        </div>
      </section>

      {/* 6. Wellness & Fitness Care Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
              🧘 Wellness & Nutritional Care
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">Protein supplements, vitamins, and clinical skin care</p>
          </div>
          <button 
            onClick={() => { dispatch(setSelectedCategory('Wellness')); navigate('/categories'); }} 
            className="text-[11px] font-black text-teal hover:text-teal-dark bg-transparent border-0 cursor-pointer outline-none uppercase tracking-wider"
          >
            See All Wellness
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {prioritizedMedicines.filter(m => m.category === 'Wellness').slice(0, 4).map((med) => (
            <ProductCard key={med.id} product={med} />
          ))}
        </div>
      </section>

      {/* 7. Health Devices Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
              🩸 Diagnostic Devices & Monitors
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">Clinical glucometers and automated blood pressure cuffs</p>
          </div>
          <button 
            onClick={() => { dispatch(setSelectedCategory('Health Devices')); navigate('/categories'); }} 
            className="text-[11px] font-black text-teal hover:text-teal-dark bg-transparent border-0 cursor-pointer outline-none uppercase tracking-wider"
          >
            See All Devices
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {prioritizedMedicines.filter(m => m.category === 'Health Devices').slice(0, 4).map((med) => (
            <ProductCard key={med.id} product={med} />
          ))}
        </div>
      </section>

      {/* 8. Diagnostic Lab Packages Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
              🧪 Diagnostic Health Packages
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">Accurate reports compiled by experienced path labs</p>
          </div>
          <button 
            onClick={() => navigate('/lab-tests')} 
            className="text-[11px] font-black text-teal hover:text-teal-dark bg-transparent border-0 cursor-pointer outline-none uppercase tracking-wider"
          >
            See All Lab Tests
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {labTests.slice(0, 4).map((test) => (
            <LabTestCard key={test.id} test={test} />
          ))}
        </div>
      </section>

      {/* 9. Doctor Consultation Cards Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
              👨‍⚕️ Verified Doctor Consultations
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">Connect with certified specialists via secure HD video calls</p>
          </div>
          <button 
            onClick={() => navigate('/doctor-appointments')} 
            className="text-[11px] font-black text-teal hover:text-teal-dark bg-transparent border-0 cursor-pointer outline-none uppercase tracking-wider"
          >
            See All Doctors
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {doctors.slice(0, 4).map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* 7. Health Tips / Blogs Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <FiBookmark className="text-teal" /> Health Tips & Wellness Articles
            </h2>
            <p className="text-xs text-slate-400 font-semibold">Read medical advice curated by senior clinical doctors</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((art) => (
            <div key={art.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-premium flex items-center gap-4 select-none">
              <img
                src={art.image}
                alt={art.title}
                className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-slate-50"
              />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[9px] font-black text-teal">
                  <span>{art.tag}</span>
                  <span className="text-slate-400">{art.readTime}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-800 line-clamp-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {art.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
