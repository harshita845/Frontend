import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSearch, FiBell, FiChevronDown, FiUser, FiActivity } from 'react-icons/fi';
import { adminLogout } from '../../auth/admin/store/adminAuthSlice';

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { recentActivities } = useSelector(state => state.admin);
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 h-20 glass-navbar px-4 sm:px-6 flex items-center justify-between shadow-sm">
      {/* Left side trigger & page descriptor */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <FiMenu className="text-xl" />
        </button>
        <div>
          <h2 className="text-sm font-black text-slate-800 tracking-wide uppercase leading-none">
            Control Console
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            Super Administrator Workspace
          </p>
        </div>
      </div>

      {/* Right side utilities */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search tool */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl w-48 lg:w-64 focus-within:w-72 focus-within:border-teal transition-all duration-300">
          <FiSearch className="text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search console..." 
            className="bg-transparent border-none outline-none text-xs font-semibold text-slate-700 w-full placeholder:text-slate-400"
          />
        </div>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors relative tap-scale"
          >
            <FiBell className="text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral animate-pulse" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                {/* Overlay backdrop to close */}
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-3xl shadow-premium z-20 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Live System Logs</span>
                    <span className="text-[10px] bg-teal-light text-teal px-2 py-0.5 rounded-full font-bold uppercase">Recent</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto no-scrollbar">
                    {recentActivities.length > 0 ? (
                      recentActivities.map((act) => (
                        <div key={act.id} className="p-3.5 border-b border-slate-50 hover:bg-slate-50/50 transition-colors flex gap-3">
                          <div className="w-8 h-8 rounded-xl bg-teal-light text-teal flex items-center justify-center shrink-0 mt-0.5">
                            <FiActivity className="text-sm" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-700 leading-normal">{act.text}</p>
                            <span className="text-[10px] text-slate-400 font-bold mt-1 block">{act.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-slate-400 text-xs font-bold">No active logs.</div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Avatars header */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100/50 transition-colors tap-scale text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-forest to-teal text-white flex items-center justify-center text-xs font-black">
              SA
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-slate-800 leading-none">Super Admin</h4>
              <span className="text-[9px] text-teal font-extrabold uppercase mt-0.5 block tracking-wide">Platform Root</span>
            </div>
            <FiChevronDown className="text-slate-405 text-xs hidden sm:block shrink-0" />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <>
                {/* Backdrop overlay */}
                <div className="fixed inset-0 z-10" onClick={() => setShowProfileDropdown(false)} />
                
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-3xl shadow-premium z-20 overflow-hidden p-3 flex flex-col gap-2"
                >
                  <div className="px-3 py-2 border-b border-slate-50 text-left">
                    <h4 className="text-xs font-black text-slate-800">Super Admin</h4>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Platform Root role</span>
                  </div>

                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/admin/settings'); }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-650 text-left w-full transition-colors"
                  >
                    <FiUser className="text-sm text-teal shrink-0" />
                    <span>Account Settings</span>
                  </button>

                  <button 
                    onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-coral-light/20 hover:bg-coral-light/50 text-xs font-black uppercase text-coral text-left w-full transition-colors shrink-0"
                  >
                    <span>🚪</span>
                    <span>Log Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
