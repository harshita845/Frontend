import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  approveVendor, 
  rejectVendor, 
  deleteVendor, 
  updateCommissionRate 
} from '../store/adminSlice';
import { 
  FiCheckCircle, FiXCircle, FiShield, FiFileText, 
  FiPercent, FiEye, FiTrash2, FiClock, FiDownload, 
  FiSearch, FiFilter, FiDollarSign, FiCreditCard, FiAlertTriangle 
} from 'react-icons/fi';

export default function VendorManagement() {
  const dispatch = useDispatch();
  const { vendors } = useSelector(state => state.admin);

  // Search & Filter local states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Slide-over Details Drawer state
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // Confirmation Modals states
  const [vendorToReject, setVendorToReject] = useState(null);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Loading indicator tracker (key: `vendorId-actionType`)
  const [loadingActions, setLoadingActions] = useState({});

  // Commission editing states
  const [editingCommissionId, setEditingCommissionId] = useState(null);
  const [customRate, setCustomRate] = useState(10);

  // Trigger Accept/Approve action (Simulating loading delay of 800ms)
  const handleApprove = (id) => {
    const key = `${id}-accept`;
    setLoadingActions(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      dispatch(approveVendor(id));
      setLoadingActions(prev => ({ ...prev, [key]: false }));
      
      // Keep details drawer updated if open
      if (selectedVendor && selectedVendor.id === id) {
        setSelectedVendor(prev => ({ ...prev, status: 'approved', kyc: 'verified' }));
      }
    }, 800);
  };

  // Trigger Reject action from Confirm Modal (Simulating loading delay of 800ms)
  const handleRejectConfirm = () => {
    if (!vendorToReject) return;
    const id = vendorToReject.id;
    const key = `${id}-reject`;
    setLoadingActions(prev => ({ ...prev, [key]: true }));
    
    setTimeout(() => {
      dispatch(rejectVendor(id));
      setLoadingActions(prev => ({ ...prev, [key]: false }));
      
      // Close drawer & modals
      if (selectedVendor && selectedVendor.id === id) {
        setSelectedVendor(prev => ({ ...prev, status: 'rejected', kyc: 'rejected' }));
      }
      setVendorToReject(null);
      setRejectReason("");
    }, 800);
  };

  // Trigger Delete action from Confirm Modal (Simulating loading delay of 800ms)
  const handleDeleteConfirm = () => {
    if (!vendorToDelete) return;
    const id = vendorToDelete.id;
    const key = `${id}-delete`;
    setLoadingActions(prev => ({ ...prev, [key]: true }));

    setTimeout(() => {
      dispatch(deleteVendor(id));
      setLoadingActions(prev => ({ ...prev, [key]: false }));
      
      // Close drawer if deleted vendor matches
      if (selectedVendor && selectedVendor.id === id) {
        setShowDrawer(false);
      }
      setVendorToDelete(null);
    }, 800);
  };

  // Save customized Commission Rate
  const handleSaveCommission = (vendorId) => {
    dispatch(updateCommissionRate({ vendorId, rate: Number(customRate) }));
    setEditingCommissionId(null);
    if (selectedVendor && selectedVendor.id === vendorId) {
      setSelectedVendor(prev => ({ ...prev, commissionRate: Number(customRate) }));
    }
  };

  // Export Directory to CSV
  const handleExportCSV = () => {
    if (vendors.length === 0) return;
    const headers = ["Merchant Partner", "Store Identity", "Email", "Phone", "Status", "KYC", "Earnings", "Commission %", "Joined Date"];
    const csvContent = [
      headers.join(','),
      ...vendors.map(v => [
        `"${v.name}"`,
        `"${v.storeName}"`,
        v.email,
        v.phone,
        v.status.toUpperCase(),
        v.kyc.toUpperCase(),
        v.earnings,
        v.commissionRate,
        v.joinedDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `emediclub-vendor-directory-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Process search and status filters
  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.storeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" ? true : v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-3.5 overflow-hidden">
      
      {/* 1. Header Section */}
      <div className="flex flex-row items-center justify-between gap-2 border-b border-slate-100 pb-2 shrink-0">
        <div>
          <h1 className="text-base font-extrabold text-slate-800 leading-none">Vendor Partner Directory</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider leading-tight">
            Verify retail license credentials and margins.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-1 px-3 py-2 bg-teal hover:bg-teal-dark text-white text-[10px] font-black tracking-wider uppercase rounded-xl shadow-sm transition-all cursor-pointer tap-scale shrink-0"
        >
          <FiDownload className="text-xs" />
          <span className="hidden sm:inline">Export</span>
          <span className="sm:hidden">CSV</span>
        </button>
      </div>

      {/* 2. Advanced Filters Top Deck */}
      <div className="flex flex-row items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-100 shadow-premium shrink-0">
        
        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl flex-1 min-w-0">
          <FiSearch className="text-slate-400 text-sm shrink-0" />
          <input 
            type="text" 
            placeholder="Search merchants, email, store..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[11px] font-semibold text-slate-700 w-full placeholder:text-slate-400"
          />
        </div>

        {/* Dropdown Selector close to search bar */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-2 rounded-xl shrink-0">
          <FiFilter className="text-slate-400 text-[10px] shrink-0" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none text-[10px] font-black text-slate-650 uppercase tracking-wide cursor-pointer"
          >
            <option value="all">All Licenses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

      </div>

      {/* 3. Core Listings Panel (Internal scroll for tables on Desktop / Cards on Mobile) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-4">
        
        {filteredVendors.length > 0 ? (
          <>
            {/* Desktop Table View Layout */}
            <div className="hidden md:block bg-white border border-slate-100 rounded-3xl shadow-premium overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4.5 px-6">Merchant Partner</th>
                    <th className="py-4.5 px-6">Store Identity</th>
                    <th className="py-4.5 px-6">License State</th>
                    <th className="py-4.5 px-6">KYC Audit</th>
                    <th className="py-4.5 px-6">Commission</th>
                    <th className="py-4.5 px-6">Earnings</th>
                    <th className="py-4.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-650">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-slate-50/30 transition-colors">
                      {/* Name & Contact */}
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-slate-800">{vendor.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold mt-0.5">{vendor.email}</span>
                        </div>
                      </td>
                      
                      {/* Store Identity */}
                      <td className="py-4.5 px-6 font-bold text-slate-700">{vendor.storeName}</td>
                      
                      {/* License State Badges */}
                      <td className="py-4.5 px-6">
                        {vendor.status === 'approved' && (
                          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Approved</span>
                        )}
                        {vendor.status === 'pending' && (
                          <span className="bg-gold-light text-gold-dark px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Awaiting Audit</span>
                        )}
                        {vendor.status === 'rejected' && (
                          <span className="bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Rejected</span>
                        )}
                      </td>
                      
                      {/* KYC Verification Badges */}
                      <td className="py-4.5 px-6">
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <FiFileText className={vendor.kyc === 'verified' ? 'text-emerald-500' : 'text-slate-400'} />
                          {vendor.kyc.toUpperCase()}
                        </span>
                      </td>

                      {/* Commission Rates */}
                      <td className="py-4.5 px-6">
                        {editingCommissionId === vendor.id ? (
                          <div className="flex items-center gap-1.5">
                            <input 
                              type="number" 
                              value={customRate} 
                              onChange={(e) => setCustomRate(e.target.value)}
                              className="w-14 px-2 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black outline-none focus:border-teal"
                            />
                            <button 
                              onClick={() => handleSaveCommission(vendor.id)}
                              className="text-teal hover:underline text-[10px] font-black uppercase tracking-wide cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-800">{vendor.commissionRate}%</span>
                            {vendor.status === 'approved' && (
                              <button 
                                onClick={() => { setEditingCommissionId(vendor.id); setCustomRate(vendor.commissionRate); }}
                                className="p-1 rounded bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-teal cursor-pointer"
                              >
                                <FiPercent className="text-2xs" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Earnings */}
                      <td className="py-4.5 px-6 font-black text-slate-800">₹{vendor.earnings.toLocaleString()}</td>

                      {/* 4 Color-Coded Inline Action Buttons on Desktop */}
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* 1. View Button (Blue) */}
                          <button
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setShowDrawer(true);
                            }}
                            title="View KYC & Coordinates"
                            className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl transition-all cursor-pointer tap-scale"
                          >
                            <FiEye className="text-sm shrink-0" />
                          </button>

                          {/* 2. Accept Button (Green) */}
                          <button
                            disabled={vendor.status === 'approved' || loadingActions[`${vendor.id}-accept`]}
                            onClick={() => handleApprove(vendor.id)}
                            title="Approve Store Partner"
                            className="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-xl transition-all cursor-pointer tap-scale disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center min-w-[32px] min-h-[32px]"
                          >
                            {loadingActions[`${vendor.id}-accept`] ? (
                              <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <FiCheckCircle className="text-sm shrink-0" />
                            )}
                          </button>

                          {/* 3. Reject Button (Red) */}
                          <button
                            disabled={vendor.status === 'rejected'}
                            onClick={() => setVendorToReject(vendor)}
                            title="Reject Partner Request"
                            className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-xl transition-all cursor-pointer tap-scale disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <FiXCircle className="text-sm shrink-0" />
                          </button>

                          {/* 4. Delete Button (Red) */}
                          <button
                            onClick={() => setVendorToDelete(vendor)}
                            title="Delete Store Registry"
                            className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-xl transition-all cursor-pointer tap-scale"
                          >
                            <FiTrash2 className="text-sm shrink-0" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid View Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {filteredVendors.map((vendor) => (
                <div 
                  key={vendor.id}
                  className="bg-white border border-slate-100 p-4.5 rounded-[24px] shadow-premium flex flex-col justify-between gap-4 hover-lift"
                >
                  {/* Card Header Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{vendor.storeName}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">{vendor.name}</p>
                    </div>
                    {/* Status Badge */}
                    <div>
                      {vendor.status === 'approved' && (
                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">Approved</span>
                      )}
                      {vendor.status === 'pending' && (
                        <span className="bg-gold-light text-gold-dark px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">Pending</span>
                      )}
                      {vendor.status === 'rejected' && (
                        <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider">Rejected</span>
                      )}
                    </div>
                  </div>

                  {/* KYC & financials details */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150/40 grid grid-cols-3 gap-1 text-center items-center text-[10px]">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-slate-400 font-black uppercase text-[8px] tracking-wider truncate">Commission</span>
                      <span className="font-extrabold text-slate-800 leading-tight truncate text-[9.5px]">{vendor.commissionRate}% rate</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-l border-slate-200 pl-1 min-w-0">
                      <span className="text-slate-400 font-black uppercase text-[8px] tracking-wider truncate">Earnings</span>
                      <span className="font-black text-slate-800 leading-tight truncate text-[9.5px]">₹{vendor.earnings.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-l border-slate-200 pl-1 min-w-0 items-center justify-center">
                      <span className="text-slate-400 font-black uppercase text-[8px] tracking-wider truncate">Verification</span>
                      <span className="font-black text-emerald-600 uppercase flex items-center gap-0.5 leading-tight text-[9px] truncate">
                        <FiFileText className="text-2xs shrink-0" /> {vendor.kyc}
                      </span>
                    </div>
                  </div>

                  {/* 2x2 Grid of Touch-Friendly Colored Action Buttons on Mobile */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    
                    {/* View Button */}
                    <button
                      onClick={() => {
                        setSelectedVendor(vendor);
                        setShowDrawer(true);
                      }}
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-600 active:bg-blue-700 text-blue-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer tap-scale"
                    >
                      <FiEye className="text-xs" />
                      <span>View Details</span>
                    </button>

                    {/* Accept Button */}
                    <button
                      disabled={vendor.status === 'approved' || loadingActions[`${vendor.id}-accept`]}
                      onClick={() => handleApprove(vendor.id)}
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 hover:bg-emerald-600 active:bg-emerald-700 text-emerald-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer tap-scale disabled:opacity-30 disabled:pointer-events-none"
                    >
                      {loadingActions[`${vendor.id}-accept`] ? (
                        <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FiCheckCircle className="text-xs" />
                      )}
                      <span>Approve</span>
                    </button>

                    {/* Reject Button */}
                    <button
                      disabled={vendor.status === 'rejected'}
                      onClick={() => setVendorToReject(vendor)}
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-50 hover:bg-rose-600 active:bg-rose-700 text-rose-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer tap-scale disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <FiXCircle className="text-xs" />
                      <span>Reject</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => setVendorToDelete(vendor)}
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-50 hover:bg-rose-600 active:bg-rose-700 text-rose-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer tap-scale"
                    >
                      <FiTrash2 className="text-xs" />
                      <span>Delete</span>
                    </button>

                  </div>

                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl shadow-premium">
            <p className="text-slate-400 font-bold text-sm uppercase">No merchant registry matching that selection.</p>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* 4. HIGH FIDELITY KYC DETAILS SLIDE-OVER DRAWER       */}
      {/* ==================================================== */}
      <AnimatePresence>
        {showDrawer && selectedVendor && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Backdrop cover overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-slate-900 z-40 backdrop-blur-xs"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-premium z-50 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto custom-scrollbar"
            >
              {/* Header section */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4.5 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-teal-light text-teal flex items-center justify-center font-black text-sm">
                      🏪
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-800 leading-none">{selectedVendor.storeName}</h2>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 block tracking-wide">Joined: {selectedVendor.joinedDate}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowDrawer(false)}
                    className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Detail Blocks */}
                <div className="flex flex-col gap-6">
                  
                  {/* Category 1: Contact Coordinates */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">Merchant Profile</h3>
                    <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 flex flex-col gap-2.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Applicant Partner</span>
                        <span className="font-extrabold text-slate-800">{selectedVendor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Registered Email</span>
                        <span className="font-extrabold text-slate-800">{selectedVendor.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Contact Mobile</span>
                        <span className="font-extrabold text-slate-800">+91 {selectedVendor.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Activation Status</span>
                        <span>
                          {selectedVendor.status === 'approved' && (
                            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Approved</span>
                          )}
                          {selectedVendor.status === 'pending' && (
                            <span className="bg-gold-light text-gold-dark px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Awaiting Audit</span>
                          )}
                          {selectedVendor.status === 'rejected' && (
                            <span className="bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Rejected</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Licensing Previews */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">Drug Licensing & GST Compliance</h3>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="border border-slate-100 rounded-2xl p-4 flex flex-col gap-1 items-center justify-center text-center bg-teal-light/5">
                        <FiFileText className="text-xl text-teal" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wide mt-2">Drug License</span>
                        <span className="text-[8px] font-bold text-teal bg-teal-light px-2 py-0.5 rounded-full mt-1.5 uppercase">DL-20831/15</span>
                      </div>
                      <div className="border border-slate-100 rounded-2xl p-4 flex flex-col gap-1 items-center justify-center text-center bg-teal-light/5">
                        <FiFileText className="text-xl text-teal" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wide mt-2">GST Certificate</span>
                        <span className="text-[8px] font-bold text-teal bg-teal-light px-2 py-0.5 rounded-full mt-1.5 uppercase">27AAAAA1111A1Z1</span>
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Financial Settlements Coordinates */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">Settlements Coordinates</h3>
                    <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 flex flex-col gap-2.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-semibold flex items-center gap-1"><FiCreditCard /> Bank Account</span>
                        <span className="font-extrabold text-slate-800">{selectedVendor.bankName} - {selectedVendor.accountNo}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 mt-1">
                        <span className="text-slate-400 font-semibold flex items-center gap-1"><FiDollarSign /> Accumulated Earnings</span>
                        <span className="font-black text-slate-800">₹{selectedVendor.earnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 mt-1">
                        <span className="text-slate-400 font-semibold flex items-center gap-1"><FiPercent /> Custom Commission</span>
                        <div className="flex items-center gap-1.5">
                          <input 
                            type="number"
                            value={customRate}
                            onChange={(e) => setCustomRate(e.target.value)}
                            className="w-12 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center font-black outline-none"
                          />
                          <span className="font-black text-slate-700">%</span>
                          <button 
                            onClick={() => handleSaveCommission(selectedVendor.id)}
                            className="bg-teal text-white px-2 py-1 rounded-lg text-[9px] font-black uppercase"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom drawer controls */}
              <div className="border-t border-slate-50 pt-5 mt-8 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={selectedVendor.status === 'rejected'}
                    onClick={() => setVendorToReject(selectedVendor)}
                    className="flex items-center justify-center gap-1.5 py-3 border border-rose-200 hover:border-rose-500 bg-rose-50/50 hover:bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer tap-scale disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <FiXCircle /> Reject Partner
                  </button>
                  <button
                    disabled={selectedVendor.status === 'approved' || loadingActions[`${selectedVendor.id}-accept`]}
                    onClick={() => handleApprove(selectedVendor.id)}
                    className="flex items-center justify-center gap-1.5 py-3 bg-teal hover:bg-teal-dark text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-sm transition-all cursor-pointer tap-scale disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {loadingActions[`${selectedVendor.id}-accept`] ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiCheckCircle />
                    )}
                    <span>Approve Partner</span>
                  </button>
                </div>
                <button
                  onClick={() => setVendorToDelete(selectedVendor)}
                  className="flex items-center justify-center gap-1.5 py-3 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer tap-scale"
                >
                  <FiTrash2 /> Delete Partner Registry
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* 5. GATED REJECT CONFIRMATION MODAL                   */}
      {/* ==================================================== */}
      <AnimatePresence>
        {vendorToReject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setVendorToReject(null)}
              className="fixed inset-0 bg-slate-900 z-10"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-premium max-w-md w-full p-6 sm:p-8 z-20 text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="text-xl" />
              </div>
              <h3 className="text-base font-black text-slate-800 uppercase tracking-wider mb-2">
                Confirm Registration Rejection
              </h3>
              <p className="text-2xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-50 pb-3.5 mb-5 leading-relaxed">
                You are rejecting the retail drug license request of <strong className="text-slate-600">{vendorToReject.storeName}</strong>. This merchant will be flagged as rejected.
              </p>

              {/* Textarea to supply optional reason */}
              <div className="flex flex-col gap-1 text-left mb-6">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Reason for Rejection (Optional)</label>
                <textarea
                  placeholder="e.g. Drug license certificate blurry or expired. Please re-upload DL-20831/15."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold outline-none focus:border-teal h-20 resize-none placeholder:text-slate-350"
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setVendorToReject(null)}
                  className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer tap-scale"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectConfirm}
                  disabled={loadingActions[`${vendorToReject.id}-reject`]}
                  className="py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-sm transition-all cursor-pointer tap-scale flex items-center justify-center min-h-[44px]"
                >
                  {loadingActions[`${vendorToReject.id}-reject`] ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Confirm Rejection</span>
                  )}
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* 6. GATED DELETE CONFIRMATION MODAL                   */}
      {/* ==================================================== */}
      <AnimatePresence>
        {vendorToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setVendorToDelete(null)}
              className="fixed inset-0 bg-slate-900 z-10"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-premium max-w-sm w-full p-6 sm:p-8 z-20 text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-xl" />
              </div>
              <h3 className="text-base font-black text-slate-800 uppercase tracking-wider mb-2">
                Permanently Delete Partner?
              </h3>
              <p className="text-2xs text-slate-400 font-bold uppercase tracking-wider mb-6 leading-relaxed">
                Are you absolutely sure you want to permanently remove <strong className="text-slate-600">{vendorToDelete.storeName}</strong> from E Mediclub? This action destroys all associated inventory and cannot be undone.
              </p>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setVendorToDelete(null)}
                  className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer tap-scale"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={loadingActions[`${vendorToDelete.id}-delete`]}
                  className="py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-sm transition-all cursor-pointer tap-scale flex items-center justify-center min-h-[44px]"
                >
                  {loadingActions[`${vendorToDelete.id}-delete`] ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Permanently Delete</span>
                  )}
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
