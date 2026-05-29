import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar, FiClock, FiShield, FiFileText, FiSearch,
  FiFilter, FiX, FiCheckCircle, FiChevronRight, FiMapPin, FiActivity, FiUploadCloud, FiPhoneCall
} from 'react-icons/fi';
import LabTestCard from '../../../shared/components/LabTestCard';
import PrescriptionUpload from '../../../shared/components/PrescriptionUpload';

export default function LabTestsPage() {
  const navigate = useNavigate();
  // Redux Selectors
  const { labTests, labBookings, labs = [] } = useSelector(state => state.products);
  const { user, isAuthenticated } = useSelector(state => state.auth || {});

  // Modal & Detail States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [isCallingCollector, setIsCallingCollector] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [callStatus, setCallStatus] = useState('Calling...');

  const getTodayStr = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isLabBookingActive = (bk) => {
    if (!bk.date) return false;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    if (bk.date < todayStr) return false;
    if (bk.date > todayStr) return true;

    const parts = bk.timeSlot.split(' - ');
    if (parts.length < 2) return true;
    const endTimeStr = parts[1].trim();

    const timeMatch = endTimeStr.match(/^(\d{2}):(\d{2})\s*(AM|PM)$/i);
    if (!timeMatch) return true;

    let hour = parseInt(timeMatch[1]);
    const min = parseInt(timeMatch[2]);
    const ampm = timeMatch[3].toUpperCase();

    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    if (currentHour > hour || (currentHour === hour && currentMin >= min)) {
      return false;
    }
    return true;
  };

  const todayStr = getTodayStr();
  const activeLabBookings = labBookings.filter(isLabBookingActive);

  // Live Calling Simulation Timer Hook
  useEffect(() => {
    let interval;
    if (isCallingCollector) {
      const timeout = setTimeout(() => {
        setCallStatus('Connected');
      }, 2000);

      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [isCallingCollector]);

  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHomeCollection, setFilterHomeCollection] = useState(false);
  const [filterFastReport, setFilterFastReport] = useState(false); // Reports within 12 Hrs
  const [filterPriceLimit, setFilterPriceLimit] = useState(3000);
  const [filterLab, setFilterLab] = useState('All');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger loading skeleton on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, filterHomeCollection, filterFastReport, filterPriceLimit, filterLab]);

  // Filter tests list
  const filteredTests = labTests.filter(test => {
    // Search Query
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testsIncluded.toLowerCase().includes(searchQuery.toLowerCase());

    // Home Collection
    const matchesHomeCollection = !filterHomeCollection || test.homeCollection;

    // Fast Report (Report in 6 Hrs, 8 Hrs, 12 Hrs)
    const matchesFastReport = !filterFastReport ||
      test.timeframe.includes('6 Hrs') ||
      test.timeframe.includes('8 Hrs') ||
      test.timeframe.includes('12 Hrs');

    // Price
    const currentPrice = test.discountPrice || test.price;
    const matchesPrice = currentPrice <= filterPriceLimit;

    // Specific Lab
    const matchesLab = filterLab === 'All' || test.labName.includes(filterLab);

    return matchesSearch && matchesHomeCollection && matchesFastReport && matchesPrice && matchesLab;
  });

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-10 select-none relative font-sans">

      {/* 1. Page Header */}
      <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Diagnostic Lab Tests</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-wider">
            Accurate clinical analysis and home collection certified under NABL & ISO 9001 guidelines.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-teal hover:bg-teal-dark text-white font-black text-xs px-5 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-sm self-start md:self-auto cursor-pointer border-0 uppercase tracking-wider transition-colors shrink-0"
        >
          <FiUploadCloud className="text-sm shrink-0" />
          <span>Upload Prescription</span>
        </button>
      </div>

      {/* 2. Upcoming Diagnostic Collections in short in round circles */}
      {/* new changes on developerment  */}
      {activeLabBookings.length > 0 && (
        <section className="flex flex-col gap-3 bg-white border border-slate-100 p-5 rounded-3xl shadow-premium">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-slate-805 uppercase tracking-wider flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              Upcoming Diagnostics
            </h3>
            <span className="text-[9px] text-teal font-black uppercase tracking-wider bg-teal-light/20 px-2 py-0.5 rounded-md">
              {activeLabBookings.length} Collections
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-2 px-2 select-none">
            {activeLabBookings.map((bk) => {
              const isToday = bk.date === todayStr;
              return (
                <div
                  key={bk.id}
                  onClick={() => {
                    if (isAuthenticated) {
                      setSelectedBookingDetails(bk);
                    } else {
                      navigate('/login');
                    }
                  }}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group transition-all"
                >
                  {/* Circle Pathology Vials Container with Glowing Ring */}
                  <div className="relative w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-teal via-emerald-400 to-forest shadow-md group-hover:scale-105 transition-all duration-300">
                    <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-teal-light/20 flex items-center justify-center text-2xl shadow-inner">
                      🧪
                    </div>
                    {/* Active assigned collector dot indicator */}
                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                  </div>

                  {/* Truncated Package Name */}
                  <span className="text-[10px] font-black text-slate-700 max-w-[80px] truncate text-center leading-none mt-1 group-hover:text-teal transition-colors">
                    {bk.packageName.replace('Checkup', '').replace('Profile', '')}
                  </span>

                  {/* Short Time Badge */}
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${isToday ? 'bg-teal-light/25 text-teal border border-teal/10 animate-pulse' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {isToday ? 'Today' : bk.date.split('-').slice(1).reverse().join('/')}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Scrollable Clinical Laboratories Browsing Panel */}
      {labs.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest px-1">Certified Partner Laboratories</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
            {labs.map((lab) => (
              <div
                key={lab.id}
                onClick={() => navigate(`/labs/${lab.id}`)}
                className="bg-white p-4 rounded-3xl border border-slate-100 hover:border-teal/30 shadow-premium hover:shadow-premium-hover shrink-0 w-64 cursor-pointer transition-all duration-300 flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-light/20 text-teal flex items-center justify-center text-lg font-black shrink-0 shadow-inner">
                      {lab.logo}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11.5px] font-black text-slate-800 leading-tight group-hover:text-teal transition-colors truncate w-36">
                        {lab.name}
                      </h4>
                      <span className="text-[8.5px] text-slate-400 font-bold block mt-0.5">Reg: {lab.regNumber}</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-amber-500 font-black flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">
                    ★ {lab.rating}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-450 font-extrabold uppercase border-t border-slate-50 pt-2.5">
                  <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">NABL & ISO</span>
                  <span className="text-slate-500">{lab.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Filtering Panel & Search Input */}
      <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-premium flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {/* Main search bar */}
          <div className="relative w-full md:flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search diagnostic packages (e.g. sugar, thyroid, lipid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-teal rounded-2xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Filter Toggle Mobile */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="flex-1 md:flex-none py-3 px-4 border border-slate-150 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <FiFilter className="text-teal" />
              <span>DIAGNOSTIC FILTERS</span>
              {showFiltersMobile ? <FiX className="text-[10px] shrink-0" /> : null}
            </button>
          </div>
        </div>

        {/* Expandable Lab Filters Deck */}
        <AnimatePresence>
          {(showFiltersMobile || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-50 overflow-hidden"
            >
              {/* Filter: Home Collection */}
              <div className="flex flex-col justify-center h-full pt-2">
                <label className="relative flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-650">
                  <input
                    type="checkbox"
                    checked={filterHomeCollection}
                    onChange={(e) => setFilterHomeCollection(e.target.checked)}
                    className="w-4 h-4 rounded text-teal accent-teal border-slate-300 focus:ring-teal-light cursor-pointer"
                  />
                  <span>🏠 FREE HOME COLLECTION</span>
                </label>
              </div>

              {/* Filter: Express Timing */}
              <div className="flex flex-col justify-center h-full pt-2">
                <label className="relative flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-650">
                  <input
                    type="checkbox"
                    checked={filterFastReport}
                    onChange={(e) => setFilterFastReport(e.target.checked)}
                    className="w-4 h-4 rounded text-teal accent-teal border-slate-300 focus:ring-teal-light cursor-pointer"
                  />
                  <span>⏱️ FAST REPORT (≤12 Hrs)</span>
                </label>
              </div>

              {/* Filter: Lab Provider */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Lab Provider</label>
                <select
                  value={filterLab}
                  onChange={(e) => setFilterLab(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold text-slate-650 cursor-pointer outline-none focus:border-teal/30 focus:bg-white"
                >
                  <option value="All">All Laboratories</option>
                  <option value="E Mediclub">E Mediclub Labs</option>
                  <option value="Metropolis">Metropolis Diagnostics</option>
                  <option value="Thyrocare">Thyrocare Wellness</option>
                </select>
              </div>

              {/* Filter: Price range */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-450 tracking-wider">
                  <span>Maximum Package Price</span>
                  <span className="text-teal font-black">₹{filterPriceLimit}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="3000"
                  step="100"
                  value={filterPriceLimit}
                  onChange={(e) => setFilterPriceLimit(parseInt(e.target.value))}
                  className="w-full accent-teal mt-2 cursor-pointer"
                />
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Health diagnostics instructions block banner */}
      <section className="bg-forest-light/60 p-4 rounded-[28px] border border-forest/10 flex items-center gap-3.5 text-xs text-forest-dark font-semibold">
        <span className="text-2xl animate-pulse-subtle">🩸</span>
        <div>
          <h4 className="font-extrabold text-sm text-forest-dark">E Mediclub Safe Lab Guarantee</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mt-1">
            Sterile single-use vacuum vials. Temperature-controlled shipping. MD pathologist verified digital reports.
          </p>
        </div>
      </section>

      {/* 6. Diagnostic Packages Display Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
          <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest">Available Diagnostic Packages</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{filteredTests.length} tests found</span>
        </div>

        {isLoading ? (
          /* Shimmer skeletons loader grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex flex-col gap-4 animate-pulse-subtle">
                <div className="flex justify-between items-center">
                  <div className="w-1/3 h-3 bg-slate-200 rounded" />
                  <div className="w-1/4 h-3 bg-slate-150 rounded" />
                </div>
                <div className="w-3/4 h-4 bg-slate-200 rounded mt-1" />
                <div className="w-1/2 h-3.5 bg-slate-150 rounded mt-1" />
                <div className="h-10 bg-slate-50 border border-slate-100 rounded-2xl mt-2" />
                <div className="flex justify-between items-center mt-3 border-t border-slate-50 pt-3">
                  <div className="w-1/4 h-5 bg-slate-200 rounded" />
                  <div className="w-1/3 h-8 bg-slate-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTests.map((test) => (
              <LabTestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-premium flex flex-col items-center gap-3">
            <span className="text-5xl">🧪</span>
            <h4 className="font-extrabold text-slate-800 text-sm">No Diagnostic Packages Match Filters</h4>
            <p className="text-xs text-slate-400 font-semibold max-w-xs mx-auto leading-relaxed">
              We offer comprehensive blood panels and specialist testing. Try adjusting your price limits or search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterHomeCollection(false);
                setFilterFastReport(false);
                setFilterPriceLimit(3000);
                setFilterLab('All');
              }}
              className="mt-2 py-2 px-6 bg-forest hover:bg-forest-dark text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer shadow-sm border-0"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Prescription Upload Sheet Modal */}
      <PrescriptionUpload
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

      {/* Lab Test Booking Details Modal */}
      <AnimatePresence>
        {selectedBookingDetails && (
          <motion.div
            key="lab-booking-details-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] overflow-hidden max-w-md w-full shadow-premium border border-slate-100 relative"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal to-teal-dark p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧪</span>
                  <div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">Booking Details</h3>
                    <p className="text-[9px] text-teal-light/80 font-black uppercase mt-0.5">
                      Ref No: {selectedBookingDetails.id} • SCHEDULED
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBookingDetails(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border-0 cursor-pointer transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-5 max-h-[75vh] overflow-y-auto no-scrollbar">

                {/* Package Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2.5">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Diagnostic Package</span>
                  <h4 className="text-sm font-extrabold text-slate-800 leading-snug">{selectedBookingDetails.packageName}</h4>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold mt-1 pt-2 border-t border-slate-150">
                    <span>Lab Partner:</span>
                    <span className="text-teal font-black">E Mediclub Labs (NABL)</span>
                  </div>
                </div>

                {/* Patient & Address Details */}
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Patient Info</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Patient Name</span>
                      <span className="font-extrabold text-slate-800">{user?.name || user?.firstName || 'Rishi'}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Contact</span>
                      <span className="font-extrabold text-slate-800">{user?.phone || '+91 9892989898'}</span>
                    </div>
                    <div className="col-span-2 flex flex-col gap-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Sample Collection Address</span>
                      <span className="font-semibold text-slate-750">{selectedBookingDetails.address || 'Home (Mumbai)'}</span>
                    </div>
                  </div>
                </div>

                {/* Collector & OTP */}
                <div className="bg-teal-light/20 p-4.5 rounded-2xl border border-teal/10 flex flex-col gap-3">
                  <span className="text-[9px] font-black uppercase text-teal-dark tracking-wider">Home Collector Assigned</span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg">
                      👨‍🔬
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-850">Vikram Singh</h5>
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        NABL Phlebotomist • Active
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-teal/5 mt-1">
                    <span className="text-[10px] text-slate-500 font-bold">Verification OTP:</span>
                    <span className="text-sm text-teal font-black tracking-wider">5829</span>
                  </div>
                </div>

                {/* Pre-Test Instructions */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Fasting & Pre-Test Instructions</span>
                  <ul className="text-[10px] text-slate-500 font-semibold list-disc pl-4 flex flex-col gap-1">
                    <li>10-12 hours mandatory fasting required before blood draw.</li>
                    <li>Avoid morning caffeinated drinks (coffee, tea, etc.) prior to test.</li>
                    <li>Drink plenty of water to maintain vascular hydration.</li>
                    <li>Phlebotomist will verify your verification OTP before sample drawing.</li>
                  </ul>
                </div>

              </div>

              {/* Action Footer */}
              <div className="p-5 border-t border-slate-50 bg-slate-50/50 flex gap-3">
                <button
                  onClick={() => setSelectedBookingDetails(null)}
                  className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
                >
                  Close details
                </button>
                <button
                  onClick={() => {
                    setIsCallingCollector(true);
                    setCallStatus('Calling...');
                    setCallTimer(0);
                  }}
                  className="flex-1 py-3 bg-teal hover:bg-teal-dark text-white text-xs font-black text-center uppercase tracking-wider rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-0"
                >
                  <FiPhoneCall /> Contact Collector
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulated Live Calling Phlebotomist Modal */}
      <AnimatePresence>
        {isCallingCollector && (
          <motion.div
            key="phlebotomist-call-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[60] flex flex-col items-center justify-between p-8 text-white select-none"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                SECURE VOIP CALL
              </span>
              <span>E MEDICLUB COMPLIANT</span>
            </div>

            {/* Profile & Pulse Ring */}
            <div className="flex flex-col items-center gap-6 mt-10">
              <div className="relative flex items-center justify-center">
                {/* Expanding Pulse Rings */}
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute w-24 h-24 rounded-full bg-teal/30"
                />
                <motion.div
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeOut" }}
                  className="absolute w-24 h-24 rounded-full bg-teal/20"
                />

                <div className="w-28 h-28 rounded-full bg-teal text-white flex items-center justify-center text-5xl font-bold border-4 border-white/10 shadow-premium z-10">
                  👨‍🔬
                </div>
              </div>

              <div className="text-center flex flex-col gap-1 mt-2">
                <h3 className="text-xl font-extrabold tracking-wide">Vikram Singh</h3>
                <span className="text-[10px] text-teal font-black uppercase tracking-widest">NABL Phlebotomist Assigned</span>
                <p className="text-sm font-semibold text-slate-300 mt-2">
                  {callStatus === 'Calling...' ? 'Calling...' : `Connected • ${formatCallTime(callTimer)}`}
                </p>
              </div>
            </div>

            {/* Subtitles & Collector Voice Simulation */}
            <div className="max-w-xs w-full text-center px-4 py-3 bg-white/5 border border-white/10 rounded-2xl min-h-[70px] flex items-center justify-center text-xs font-semibold text-slate-200 leading-relaxed">
              {callStatus === 'Calling...' ? (
                <span className="text-slate-400 italic">Initiating secure clinical connection...</span>
              ) : callTimer < 5 ? (
                <span className="text-teal-400 font-extrabold">
                  "Hello, E Mediclub Diagnostics here. Vikram Singh speaking. Am I speaking with Rishi?"
                </span>
              ) : callTimer < 10 ? (
                <span>
                  "Great! I have received your blood collection request. I will arrive at your Mumbai address at 9:00 AM."
                </span>
              ) : callTimer < 16 ? (
                <span>
                  "Please ensure you maintain 10-12 hours fasting before my arrival. I will call you once I reach your gate."
                </span>
              ) : (
                <span className="text-teal-400">
                  "Thank you for choosing E Mediclub. Have a great day!"
                </span>
              )}
            </div>

            {/* Calling Controls */}
            <div className="flex flex-col items-center gap-8 w-full max-w-xs mb-10">
              <div className="flex justify-around w-full">
                <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border-0 cursor-pointer text-lg text-white">
                  🔇
                </button>
                <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border-0 cursor-pointer text-lg text-white">
                  🔢
                </button>
                <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border-0 cursor-pointer text-lg text-white">
                  🔊
                </button>
              </div>

              {/* End Call Button */}
              <button
                onClick={() => setIsCallingCollector(false)}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center border-0 cursor-pointer shadow-lg transform active:scale-95 transition-all text-xl"
              >
                📞
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
