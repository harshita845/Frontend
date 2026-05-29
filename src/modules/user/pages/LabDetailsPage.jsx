import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FiArrowLeft, FiMapPin, FiClock, FiPhone, FiCheckCircle, FiShield, 
  FiStar, FiActivity, FiImage, FiAward, FiMessageSquare, FiCalendar 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function LabDetailsPage() {
  const { labId } = useParams();
  const navigate = useNavigate();

  // Redux Selectors
  const { labs = [], labTests = [] } = useSelector(state => state.products);
  const lab = labs.find(l => l.id === labId);

  // Active gallery slide index
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto sliding facility gallery carousel timer
  useEffect(() => {
    if (!lab || !lab.gallery || lab.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % lab.gallery.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [lab]);

  if (!lab) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <FiActivity className="text-coral text-5xl mb-4 animate-pulse" />
        <h2 className="text-base font-extrabold text-slate-800">Laboratory Center Not Found</h2>
        <p className="text-xs text-slate-400 font-semibold mt-2">The requested laboratory details could not be retrieved.</p>
        <button 
          onClick={() => navigate('/lab-tests')}
          className="mt-5 px-6 py-2.5 bg-forest hover:bg-forest-dark text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm cursor-pointer border-0"
        >
          Return to Lab Directory
        </button>
      </div>
    );
  }

  // Get all packages offered by this lab
  const offeredTests = labTests.filter(t => t.labId === lab.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-8 font-sans select-none">
      
      {/* Back button */}
      <button 
        onClick={() => navigate('/lab-tests')}
        className="flex items-center gap-1.5 text-xs font-extrabold text-slate-450 hover:text-teal transition-colors mb-6 uppercase tracking-wider bg-transparent border-0 cursor-pointer"
      >
        <FiArrowLeft /> Back to Lab Tests
      </button>

      {/* Main Container */}
      <div className="flex flex-col gap-6 md:gap-8">
        
        {/* 1. Lab Cover / Header Block */}
        <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-light/20 rounded-full filter blur-3xl opacity-60" />
          
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-light/30 text-teal flex items-center justify-center text-3xl shrink-0 shadow-inner">
              {lab.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg md:text-xl font-black text-slate-800 leading-snug">{lab.name}</h1>
                <span className="flex items-center gap-0.5 text-[8.5px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  <FiCheckCircle className="text-[10px]" /> NABL Accredited
                </span>
              </div>
              <p className="text-xs text-slate-450 font-bold mt-1">Registration No: <strong className="text-slate-650 font-extrabold">{lab.regNumber}</strong></p>
              
              <div className="flex items-center gap-3 mt-3 flex-wrap text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <FiAward className="text-teal" />
                  {lab.experience} in Service
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <FiClock className="text-teal" />
                  {lab.timings}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl md:self-auto self-start">
            <div className="flex items-center gap-1 text-sm font-black text-slate-850">
              <FiStar className="fill-amber-500 text-amber-500 stroke-0" />
              <span>{lab.rating}</span>
              <span className="text-slate-350 text-[10px] font-bold">/ 5</span>
            </div>
            <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">{lab.reviewsCount} Patient Reviews</span>
          </div>
        </div>

        {/* 2. Side-by-Side: Lab Details & Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Details & Accreditations (2/3 width on desktop) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Lab Gallery Carousel */}
            <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-premium flex flex-col gap-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <FiImage className="text-teal" /> Lab Facility Gallery
              </h3>
              
              <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-inner bg-slate-150">
                <img 
                  src={lab.gallery[activeSlide]} 
                  alt={`${lab.name} slide`} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {lab.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all border-0 p-0 cursor-pointer ${
                        activeSlide === idx ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Safety, Timings and Collection details */}
            <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-premium flex flex-col gap-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <FiShield className="text-teal" /> Safety & Clinical Quality Badges
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-xl">🧫</span>
                  <h4 className="text-[10px] text-slate-800 font-extrabold uppercase mt-1">100% Sterile</h4>
                  <p className="text-[9px] text-slate-450 font-semibold mt-0.5 leading-snug">Strict FDA-approved collection vacuum tubes.</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-xl">❄️</span>
                  <h4 className="text-[10px] text-slate-800 font-extrabold uppercase mt-1">Cold Chain Transfer</h4>
                  <p className="text-[9px] text-slate-450 font-semibold mt-0.5 leading-snug">Samples transported at 2-8°C constant temperature.</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-xl">✍️</span>
                  <h4 className="text-[10px] text-slate-800 font-extrabold uppercase mt-1">MD Verified</h4>
                  <p className="text-[9px] text-slate-450 font-semibold mt-0.5 leading-snug">Every report is approved by clinical pathologists.</p>
                </div>
              </div>

              {/* Home Collection Information */}
              <div className="bg-teal-light/25 border border-teal/15 p-4 rounded-2xl flex items-start gap-3 mt-1">
                <span className="text-2xl">🏠</span>
                <div>
                  <h4 className="text-xs font-black text-teal-dark uppercase tracking-wide">Express Home Sample Collection Protocols</h4>
                  <p className="text-[11px] text-slate-600 font-bold mt-1">
                    Free home sample drawing is fully active for all packages under this lab. A certified clinical technician is dispatched immediately at your selected time slot in sterile protective kit.
                  </p>
                </div>
              </div>
            </div>

            {/* Test Packages Offered by Lab */}
            <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-premium flex flex-col gap-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <FiActivity className="text-teal" /> Available Diagnostic Packages ({offeredTests.length})
              </h3>
              
              <div className="flex flex-col gap-3.5">
                {offeredTests.map(test => (
                  <div 
                    key={test.id}
                    className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 transition-all"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-snug">{test.name}</h4>
                      <p className="text-[10px] text-teal font-black uppercase tracking-wider mt-1">{test.parameters} Checked • {test.timeframe}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 sm:self-auto self-end">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 line-through font-semibold block leading-none">₹{test.price}</span>
                        <strong className="text-sm font-black text-slate-900 block mt-0.5">₹{test.discountPrice || test.price}</strong>
                      </div>
                      <button 
                        onClick={() => navigate(`/lab-tests/${test.id}/book`)}
                        className="py-2.5 px-4 bg-forest hover:bg-forest-dark text-white text-[10px] font-black uppercase tracking-wider rounded-xl cursor-pointer border-0 shadow-sm transition-colors"
                      >
                        BOOK TEST
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contacts, Map & Reviews (1/3 width) */}
          <div className="flex flex-col gap-6">
            
            {/* Contact details Card */}
            <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-premium flex flex-col gap-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                🏢 Lab Coordinates
              </h3>
              
              <div className="flex flex-col gap-3 text-xs font-semibold text-slate-600 pt-1">
                <div className="flex items-start gap-2.5">
                  <FiMapPin className="text-teal mt-0.5 shrink-0" />
                  <span className="text-slate-800 leading-normal font-bold">{lab.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiPhone className="text-teal shrink-0" />
                  <span className="text-slate-800 font-bold">+91 22 8937 1928</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiClock className="text-teal shrink-0" />
                  <span className="text-slate-800 font-bold">{lab.timings}</span>
                </div>
              </div>

              {/* Google Map Placeholder - Interactive Map click redirection */}
              <div 
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(lab.name + " " + lab.address)}`, "_blank")}
                className="relative w-full h-32 rounded-2xl overflow-hidden border border-slate-200 mt-2 bg-sky-50 shadow-inner flex flex-col items-center justify-center text-center cursor-pointer hover:border-teal/50 hover:shadow-premium transition-all duration-300 group"
              >
                {/* Map grid lines simulation */}
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="w-8 h-8 rounded-full bg-teal/20 text-teal flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-bounce z-10">
                  📍
                </div>
                <span className="text-[10px] text-slate-500 font-black uppercase mt-1 z-10 group-hover:text-teal transition-colors">Open in Google Maps</span>
                <span className="text-[8px] text-slate-400 font-bold z-10 truncate max-w-[90%]">{lab.address}</span>
              </div>
            </div>

            {/* Customer Reviews Feed */}
            <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-premium flex flex-col gap-3.5">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <FiMessageSquare className="text-teal" /> Customer Feedback
              </h3>
              
              <div className="flex flex-col gap-3.5 max-h-80 overflow-y-auto no-scrollbar">
                {lab.reviews.map((rev, idx) => (
                  <div key={idx} className="bg-slate-50/40 p-3.5 border border-slate-100 rounded-2xl flex flex-col gap-1.5 transition-all hover:bg-slate-50">
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-450">
                      <span className="text-slate-700 font-black">{rev.patientName}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-extrabold leading-none">
                      ★ {rev.rating}.0 Verified Experience
                    </div>
                    <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed italic">"{rev.reviewText}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
