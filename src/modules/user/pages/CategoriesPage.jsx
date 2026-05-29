import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { setSelectedCategory, setPrescriptionFilterActive } from '../store/productSlice';
import ProductCard from '../../../shared/components/ProductCard';
import PrescriptionUpload from '../../../shared/components/PrescriptionUpload';

// Static Mapping of Medicine IDs to Therapeutic Classes
const MEDICINE_SUBCATEGORY_MAP = {
  'Pain Relief': ['med-2', 'med-4', 'med-10', 'med-18', 'med-29', 'med-47'],
  'Cold & Flu': ['med-13', 'med-19', 'med-30', 'med-32', 'med-33'],
  'Vitamins & Supplements': ['med-1', 'med-6', 'med-9', 'med-17', 'med-21', 'med-28', 'med-34', 'med-35', 'med-37', 'med-38'],
  'Diabetes Care': ['med-5', 'med-16', 'med-22', 'med-63', 'med-64', 'med-65'],
  'Heart Care': ['med-12', 'med-53', 'med-54', 'med-55'],
  'Skin Care': ['med-7', 'med-36', 'med-39', 'med-40', 'med-41', 'med-42', 'med-48', 'med-50', 'med-51', 'med-61'],
  'Stomach & Digestion': ['med-8', 'med-23', 'med-25', 'med-26', 'med-31', 'med-46', 'med-49'],
  'Eye Care': ['med-66', 'med-67', 'med-68'],
  'Baby Care': ['med-59', 'med-60', 'med-62'],
  'Ayurveda': [
    'med-3', 'med-8', 'med-11', 'med-15', 'med-20', 'med-23', 'med-43', 'med-44', 'med-45', 'med-46', 'med-47', 'med-48', 'med-49', 'med-50', 'med-51', 'med-52', 'med-57', 'med-58', 'med-60', 'med-65', 'med-66', 'med-68'
  ]
};

// Static Helper to get category icons
const getCategoryIcon = (cat) => {
  switch (cat) {
    case 'All': return '✨';
    case 'Medicines': return '💊';
    case 'Ayurveda': return '🌿';
    case 'Wellness': return '🧘';
    case 'Health Devices': return '🩸';
    case 'Sports Nutrition': return '🏋️‍♂️';
    case 'Respiratory Care': return '🫁';
    case 'Diabetes Care': return '🩸';
    case 'Homeopathy': return '🥛';
    case 'Geriatric Care': return '👵';
    case 'Herbal Extracts': return '🍯';
    case 'Cardiac Care': return '❤️';
    default: return '🩺';
  }
};

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Modal, Prescription Filtering & Sub-Category States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeMedicineSubCategory, setActiveMedicineSubCategory] = useState('All');

  // Selectors
  const { medicines, selectedCategory, selectedLocation, isPrescriptionFilterActive, orders = [] } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth || {});

  // Direct derived route mapping
  const isDirectRoute = 
    location.pathname === '/medicines' || 
    location.pathname === '/wellness' || 
    location.pathname === '/ayurveda';

  const baseActiveCategory = isDirectRoute 
    ? (location.pathname === '/medicines' ? 'Medicines' : location.pathname === '/wellness' ? 'Wellness' : 'Ayurveda')
    : selectedCategory;

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

  // Dynamic Categories based on Location
  const locationCategories = {
    'Mumbai, Maharashtra': ['All', 'Medicines', 'Ayurveda', 'Wellness', 'Health Devices'],
    'Bengaluru, Karnataka': ['All', 'Medicines', 'Ayurveda', 'Wellness', 'Sports Nutrition'],
    'New Delhi, Delhi': ['All', 'Medicines', 'Ayurveda', 'Respiratory Care', 'Wellness'],
    'Hyderabad, Telangana': ['All', 'Medicines', 'Ayurveda', 'Diabetes Care', 'Health Devices'],
    'Pune, Maharashtra': ['All', 'Medicines', 'Ayurveda', 'Wellness', 'Homeopathy'],
    'Chennai, Tamil Nadu': ['All', 'Medicines', 'Ayurveda', 'Geriatric Care', 'Health Devices'],
    'Kolkata, West Bengal': ['All', 'Medicines', 'Ayurveda', 'Wellness', 'Herbal Extracts'],
    'Ahmedabad, Gujarat': ['All', 'Medicines', 'Ayurveda', 'Wellness', 'Cardiac Care']
  };

  const categoriesList = locationCategories[cityKey] || locationCategories['Mumbai, Maharashtra'];

  const activeCategory = categoriesList.includes(baseActiveCategory) ? baseActiveCategory : 'All';

  // Reset medicine sub-category when main category changes
  useEffect(() => {
    setActiveMedicineSubCategory('All');
  }, [activeCategory]);

  // Compile previously bought items from completed orders (User must be logged in)
  const previouslyBoughtMedicines = React.useMemo(() => {
    if (!isAuthenticated) return [];
    const boughtNames = new Set();
    orders.forEach(order => {
      order.items.forEach(item => {
        boughtNames.add(item.name);
      });
    });
    return medicines.filter(med => med.category === 'Medicines' && boughtNames.has(med.name));
  }, [isAuthenticated, orders, medicines]);

  // Filter products by selected category
  const initialFiltered = activeCategory === 'All' 
    ? medicines 
    : medicines.filter(med => {
        if (activeCategory === 'Sports Nutrition') {
          return med.id === 'med-1' || med.id === 'med-9';
        }
        if (activeCategory === 'Respiratory Care') {
          return med.id === 'med-13' || med.id === 'med-3';
        }
        if (activeCategory === 'Diabetes Care') {
          return med.id === 'med-5' || med.id === 'med-12';
        }
        if (activeCategory === 'Homeopathy' || activeCategory === 'Herbal Extracts') {
          return med.id === 'med-3' || med.id === 'med-11';
        }
        if (activeCategory === 'Geriatric Care') {
          return med.id === 'med-12' || med.id === 'med-1' || med.id === 'med-2';
        }
        if (activeCategory === 'Cardiac Care') {
          return med.id === 'med-12' || med.id === 'med-5';
        }
        return med.category === activeCategory;
      });

  // Apply Medicine Therapeutic Sub-Category Filter if active
  const subCategoryFiltered = (activeCategory === 'Medicines' && activeMedicineSubCategory !== 'All')
    ? initialFiltered.filter(med => {
        const allowedIds = MEDICINE_SUBCATEGORY_MAP[activeMedicineSubCategory] || [];
        return allowedIds.includes(med.id);
      })
    : initialFiltered;

  // Filter only items in prescription if prescription uploaded
  const filteredProducts = isPrescriptionFilterActive
    ? subCategoryFiltered.filter(med => {
        if (activeCategory === 'Medicines') {
          return med.id === 'med-2'; // Dolo 650
        } else if (activeCategory === 'Wellness') {
          return med.id === 'med-1'; // Revital H
        } else if (activeCategory === 'Ayurveda') {
          return med.id === 'med-3'; // Chyawanprash Awaleha
        }
        return med.id === 'med-1' || med.id === 'med-2' || med.id === 'med-3';
      })
    : subCategoryFiltered;

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

  const priorityIds = locationPriorities[cityKey] || locationPriorities['Mumbai, Maharashtra'];

  const prioritizedFilteredProducts = [...filteredProducts].sort((a, b) => {
    const idxA = priorityIds.indexOf(a.id);
    const idxB = priorityIds.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });

  const handleUploadSuccess = () => {
    dispatch(setPrescriptionFilterActive(true));
  };

  // Helper checking prescription paths
  const isPrescriptionRoute = () => {
    return (
      location.pathname === '/medicines' || 
      location.pathname === '/wellness' || 
      location.pathname === '/ayurveda'
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 pb-10">
      
      {/* 1. Category Selector Left Sidebar - Desktop (Compact w-52) */}
      <aside className="hidden md:flex flex-col gap-1 w-52 h-fit shrink-0 bg-white py-3 px-4.5 rounded-3xl border border-slate-100 shadow-premium select-none">
        <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-1.5 px-1.5">Health Categories</h3>
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              dispatch(setSelectedCategory(cat));
              if (isDirectRoute) {
                navigate('/categories');
              }
            }}
            className={`text-left text-[11px] font-black px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 border-0 cursor-pointer outline-none ${
              activeCategory === cat
                ? 'bg-forest text-white shadow-sm'
                : 'bg-transparent text-slate-650 hover:text-forest hover:bg-slate-50'
            }`}
          >
            <span className="text-sm">{getCategoryIcon(cat)}</span>
            <span>{cat}</span>
          </button>
        ))}
      </aside>

      {/* 2. Category Selector Top Swipe Scrollbar - Mobile & Tablet with icons and smooth horizontal scrolling */}
      <div className="md:hidden w-full overflow-x-auto no-scrollbar select-none border-y border-slate-100 bg-white -mx-4 px-4 py-2 scroll-smooth">
        <div className="flex gap-2 min-w-max">
          {categoriesList.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => {
                dispatch(setSelectedCategory(cat));
                if (isDirectRoute) {
                  navigate('/categories');
                }
              }}
              className={`whitespace-nowrap px-3.5 py-2 text-[11px] font-black rounded-xl transition-all shrink-0 flex items-center gap-1.5 border-0 cursor-pointer outline-none ${
                activeCategory === cat
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{getCategoryIcon(cat)}</span>
              <span>{cat}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3. Products List View Container */}
      <section className="flex-1 flex flex-col gap-4">
        
        {/* Prescription Quick Upload Banner Strip */}
        {isPrescriptionRoute() && (
          <div className="w-full bg-gradient-to-r from-teal-light/20 to-forest-mint border border-teal/10 rounded-3xl p-5 shadow-premium flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none animate-fade-in mb-2">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal text-white flex items-center justify-center text-xl shrink-0 shadow-sm animate-pulse-subtle">
                📋
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Quick Prescription Order</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Have a prescription? Upload it and we'll find the right products for you.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-teal hover:bg-teal-dark text-white text-xs font-black tracking-wider uppercase rounded-2xl shadow-sm transition-all duration-205 tap-scale cursor-pointer self-start sm:self-auto shrink-0"
            >
              <FiUploadCloud className="text-sm shrink-0" /> Upload Prescription
            </button>
          </div>
        )}

        {/* Prescription filter banner tag alert */}
        {isPrescriptionFilterActive && (
          <div className="w-full bg-teal-light/45 border border-teal/15 p-4 rounded-3xl flex items-center justify-between gap-3 text-xs font-semibold text-teal-dark select-none animate-fade-in">
            <span className="flex items-center gap-2 text-slate-700 font-bold">
              <span>📄</span> Prescribed medicines extracted from your uploaded prescription.
            </span>
            <button
              onClick={() => dispatch(setPrescriptionFilterActive(false))}
              className="px-3.5 py-1.5 bg-teal hover:bg-teal-dark text-white text-[9px] font-black uppercase tracking-wider rounded-xl shadow-sm cursor-pointer transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Medicine Therapeutic Sub-categories Selector */}
        {activeCategory === 'Medicines' && (
          <div className="w-full select-none mb-2 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex gap-2 py-1 min-w-max">
              {[
                'All', 'Pain Relief', 'Cold & Flu', 'Vitamins & Supplements', 'Diabetes Care',
                'Heart Care', 'Skin Care', 'Stomach & Digestion', 'Eye Care', 'Baby Care',
                'Ayurveda'
              ].map((subCat) => {
                // Calculate dynamic counts based on currently loaded initialFiltered array
                const count = subCat === 'All'
                  ? initialFiltered.length
                  : initialFiltered.filter(med => (MEDICINE_SUBCATEGORY_MAP[subCat] || []).includes(med.id)).length;

                const getSubCatIcon = (name) => {
                  switch (name) {
                    case 'All': return '🏥';
                    case 'Pain Relief': return '🩹';
                    case 'Cold & Flu': return '🤧';
                    case 'Vitamins & Supplements': return '💪';
                    case 'Diabetes Care': return '🩺';
                    case 'Heart Care': return '❤️';
                    case 'Skin Care': return '🧴';
                    case 'Stomach & Digestion': return '💊';
                    case 'Eye Care': return '👁️';
                    case 'Baby Care': return '👶';
                    case 'Ayurveda': return '🌿';
                    default: return '💊';
                  }
                };

                const getSubCatLabel = (name) => {
                  if (name === 'All') return 'All Medicines';
                  return name;
                };

                return (
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    key={subCat}
                    onClick={() => setActiveMedicineSubCategory(subCat)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-[10px] md:text-xs font-bold transition-all duration-200 flex items-center gap-1.5 border cursor-pointer outline-none ${
                      activeMedicineSubCategory === subCat
                        ? 'bg-teal border-teal text-white shadow-md'
                        : 'bg-white border-slate-100 text-slate-650 hover:bg-slate-50 hover:text-teal hover:border-teal/20'
                    }`}
                  >
                    <span>{getSubCatIcon(subCat)}</span>
                    <span>{getSubCatLabel(subCat)}</span>
                    <span className={`px-1.5 py-0.5 rounded-lg text-[9px] font-black shrink-0 ${
                      activeMedicineSubCategory === subCat
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Curated scrollable horizontal product rows for Medicines page (when activeMedicineSubCategory === 'All') */}
        {activeCategory === 'Medicines' && activeMedicineSubCategory === 'All' && (
          <div className="flex flex-col gap-6 select-none my-2 animate-fade-in">
            {[
              {
                title: '🔁 Previously Bought',
                items: previouslyBoughtMedicines,
                key: 'Previously Bought'
              },
              {
                title: '💊 Best for Gut Health',
                items: medicines.filter(m => ['med-8', 'med-23', 'med-25', 'med-26', 'med-31', 'med-46', 'med-49'].includes(m.id)),
                key: 'Stomach & Digestion'
              },
              {
                title: '❤️ Heart & BP Care',
                items: medicines.filter(m => ['med-12', 'med-53', 'med-54', 'med-55'].includes(m.id)),
                key: 'Heart Care'
              },
              {
                title: '🌿 Immunity Boosters',
                items: medicines.filter(m => ['med-1', 'med-3', 'med-6', 'med-9', 'med-11', 'med-14', 'med-28', 'med-43', 'med-45'].includes(m.id)),
                key: 'Ayurveda'
              },
              {
                title: '😴 Sleep & Stress Relief',
                items: medicines.filter(m => ['med-11', 'med-45', 'med-56', 'med-57', 'med-58'].includes(m.id)),
                key: 'Ayurveda'
              },
              {
                title: '🧴 Skin & Hair Care',
                items: medicines.filter(m => ['med-7', 'med-36', 'med-39', 'med-40', 'med-41', 'med-42', 'med-48', 'med-50', 'med-51', 'med-61'].includes(m.id)),
                key: 'Skin Care'
              },
              {
                title: '👶 Baby & Mother Care',
                items: medicines.filter(m => ['med-59', 'med-60', 'med-61', 'med-62'].includes(m.id)),
                key: 'Baby Care'
              },
              {
                title: '💪 Vitamins & Nutrition',
                items: medicines.filter(m => ['med-1', 'med-6', 'med-9', 'med-17', 'med-21', 'med-28', 'med-34', 'med-35', 'med-37', 'med-38'].includes(m.id)),
                key: 'Vitamins & Supplements'
              },
              {
                title: '🩺 Diabetes Management',
                items: medicines.filter(m => ['med-5', 'med-16', 'med-22', 'med-63', 'med-64', 'med-65'].includes(m.id)),
                key: 'Diabetes Care'
              }
            ]
              .filter(sec => sec.items.length > 0) // only render rows with items (including Previously Bought if populated)
              .map((section) => (
                <div key={section.title} className="flex flex-col gap-2.5 bg-white p-5 rounded-3xl border border-slate-100 shadow-premium">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">{section.title}</h3>
                    {section.key !== 'Previously Bought' && (
                      <button
                        onClick={() => setActiveMedicineSubCategory(section.key)}
                        className="text-xs font-black text-teal hover:text-teal-dark border-0 bg-transparent cursor-pointer uppercase tracking-wider transition-colors"
                      >
                        See All →
                      </button>
                    )}
                  </div>
                  <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
                    <div className="flex gap-4 min-w-max py-2 pr-4">
                      {section.items.map((prod) => (
                        <div key={prod.id} className="w-[165px] md:w-[195px] shrink-0">
                          <ProductCard product={prod} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Active Title and products count */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-800">
            {activeCategory === 'All' ? 'All Products' : activeCategory} {activeMedicineSubCategory !== 'All' ? `(${activeMedicineSubCategory})` : ''} Products
          </h2>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {filteredProducts.length} items found
          </span>
        </div>

        {/* Dynamic products list grid */}
        {prioritizedFilteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {prioritizedFilteredProducts.map((med) => (
              <ProductCard key={med.id} product={med} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-premium flex flex-col items-center gap-3">
            <span className="text-5xl">📦</span>
            <h4 className="font-extrabold text-slate-800 text-sm">No Products Found</h4>
            <p className="text-xs text-slate-400 font-semibold">We are expanding our apothecary catalog. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Prescription Upload Sheet Modal */}
      <PrescriptionUpload 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
        onUploadSuccess={handleUploadSuccess}
      />

    </div>
  );
}
