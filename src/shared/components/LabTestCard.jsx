import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiInfo, FiActivity, FiShield } from 'react-icons/fi';

export default function LabTestCard({ test }) {
  const navigate = useNavigate();

  const handleBookingRedirect = (e) => {
    e.stopPropagation();
    navigate(`/lab-tests/${test.id}/book`);
  };

  const handleLabRedirect = (e) => {
    e.stopPropagation();
    if (test.labId) {
      navigate(`/labs/${test.labId}`);
    }
  };

  return (
    <div
      className="bg-white rounded-3xl p-5 border border-slate-100 hover:border-teal/30 shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden transition-all duration-300 group"
    >
      {/* Test Specialty / Lab Certified Tag */}
      {test.tag && (
        <span className="absolute top-0 right-0 bg-teal text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-2xl shadow-sm">
          {test.tag}
        </span>
      )}

      <div>
        {/* Lab Provider Link with Badges */}
        {test.labName && (
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleLabRedirect}
              className="text-[10px] text-teal-dark hover:text-teal hover:underline font-black uppercase tracking-wider bg-transparent border-0 p-0 cursor-pointer text-left"
            >
              🏢 {test.labName}
            </button>
            <div className="flex gap-1.5 shrink-0">
              <span className="text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded" title="NABL Certified Clinic">
                NABL
              </span>
              <span className="text-[8px] font-black uppercase bg-slate-50 text-slate-500 border border-slate-100 px-1.5 py-0.5 rounded" title="ISO 9001:2015 Approved">
                ISO
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h4 className="text-sm font-extrabold text-slate-800 leading-snug line-clamp-2 max-w-[90%] group-hover:text-teal transition-colors">
          {test.name}
        </h4>

        {/* Parameter count */}
        <span className="text-[10.5px] text-teal font-black uppercase tracking-wider block mt-1.5 flex items-center gap-1.5">
          <FiActivity className="text-teal" />
          {test.parameters}
        </span>

        {/* Report Delivery and Fasting Rules */}
        <div className="flex flex-col gap-1.5 mt-3.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-100/50">
          <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
            ⏱️ {test.timeframe}
          </p>
          <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
            🥣 {test.fastingRequired}
          </p>
        </div>
      </div>

      {/* Pricing and Action row */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          {test.discountPrice ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 line-through font-semibold leading-none">
                  ₹{test.price}
                </span>
                <span className="text-[10px] text-coral font-black bg-coral-light px-1.5 py-0.5 rounded">
                  {test.discountPercent}% OFF
                </span>
              </div>
              <span className="text-lg font-black text-slate-900 leading-tight mt-0.5">
                ₹{test.discountPrice}
              </span>
            </>
          ) : (
            <span className="text-lg font-black text-slate-900">
              ₹{test.price}
            </span>
          )}
          {test.homeCollection && (
            <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold mt-1.5 inline-block w-fit uppercase tracking-wider">
              🏠 Home Sample Collection
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Lab Profile shortcut */}
          <button 
            onClick={handleLabRedirect}
            className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-[9px] font-black text-slate-650 hover:text-teal rounded-full shadow-sm cursor-pointer border-0 uppercase tracking-wider flex items-center gap-0.5"
          >
            Info
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBookingRedirect}
            className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1 cursor-pointer border-0"
          >
            <FiCalendar className="w-4 h-4 shrink-0" />
            <span>BOOK NOW</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
