import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReusableTable from '../components/ReusableTable';
import { deleteDoctor } from '../../user/store/productSlice';
import { FiCheckCircle, FiTrash2, FiUserCheck } from 'react-icons/fi';

export default function DoctorManagement() {
  const dispatch = useDispatch();
  const { doctors, doctorSpecialties } = useSelector(state => state.products);

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id));
  };

  // Define ReusableTable Columns
  const columns = [
    { 
      key: 'name', 
      header: 'Consultant Doctor',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=80&q=80'} 
            alt={row.name} 
            className="w-8 h-8 rounded-xl object-cover border border-slate-100 shrink-0 select-none"
          />
          <div>
            <span className="font-extrabold text-slate-800 block text-xs truncate max-w-xs">{row.name}</span>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">{row.hospital || 'Private Clinic'}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'specialty', 
      header: 'Specialty Core',
      render: (row) => (
        <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-black text-slate-650 uppercase tracking-wide">
          {row.specialty}
        </span>
      )
    },
    { 
      key: 'experience', 
      header: 'Experience',
      render: (row) => <span className="font-bold text-slate-600 text-2xs">{row.experience}</span>
    },
    { 
      key: 'fee', 
      header: 'Consultation Fee',
      render: (row) => <span className="font-black text-slate-700">₹{row.fee}</span>
    },
    { 
      key: 'status', 
      header: 'License Auditing',
      render: (row) => {
        const isApproved = row.status === 'approved';
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
            isApproved 
              ? 'bg-teal-light text-teal' 
              : 'bg-gold-light text-gold-dark'
          }`}>
            {isApproved ? 'Verified License' : 'Awaiting Audit'}
          </span>
        );
      }
    }
  ];

  // Actions column trigger
  const tableActions = (row) => (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => handleDelete(row.id)}
        className="p-2 bg-coral-light/40 hover:bg-coral-light text-coral rounded-xl transition-all cursor-pointer tap-scale"
        title="Deregister Practitioner"
      >
        <FiTrash2 className="text-sm shrink-0" />
      </button>
    </div>
  );

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1 pb-4 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 leading-none">Clinical Practitioners Listings</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-2 tracking-wider">
            Review registered doctors directory, specialty profiles, schedules, and active consultation fees.
          </p>
        </div>
      </div>

      {/* Reusable Data Table Grid */}
      <ReusableTable 
        columns={columns}
        data={doctors}
        searchPlaceholder="Search doctor by name or specialty..."
        searchKey="name"
        filterOptions={{ key: 'specialty', label: 'Specialty Core', options: doctorSpecialties }}
        actions={tableActions}
        fileName="emediclub-doctor-partners"
      />

    </div>
  );
}
