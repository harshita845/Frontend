import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReusableTable from '../components/ReusableTable';
import { deleteLabTest } from '../../user/store/productSlice';
import { FiTrash2, FiActivity } from 'react-icons/fi';

export default function LabTestsManagement() {
  const dispatch = useDispatch();
  const { labTests, labCategories } = useSelector(state => state.products);

  const handleDelete = (id) => {
    dispatch(deleteLabTest(id));
  };

  // Define Columns
  const columns = [
    { 
      key: 'name', 
      header: 'Diagnostic Package',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-light text-teal flex items-center justify-center font-black text-xs shrink-0 select-none">
            🧪
          </div>
          <div>
            <span className="font-extrabold text-slate-800 block text-xs truncate max-w-xs">{row.name}</span>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">{row.requirements || 'Home Collection Available'}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'category', 
      header: 'Diagnostic Class',
      render: (row) => (
        <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-black text-slate-650 uppercase tracking-wide">
          {row.category}
        </span>
      )
    },
    { 
      key: 'testsCount', 
      header: 'Covered Parameters',
      render: (row) => <span className="font-extrabold text-slate-700 text-2xs">{row.testsCount || row.parameters || 12} Parameters</span>
    },
    { 
      key: 'price', 
      header: 'Listing Price',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-black text-slate-800 text-xs">₹{row.discountPrice || row.price}</span>
          {row.discountPercent > 0 && (
            <span className="text-[9px] text-teal font-extrabold">{row.discountPercent}% OFF</span>
          )}
        </div>
      )
    }
  ];

  // Actions column trigger
  const tableActions = (row) => (
    <button 
      onClick={() => handleDelete(row.id)}
      className="p-2 bg-coral-light/40 hover:bg-coral-light text-coral rounded-xl transition-all cursor-pointer tap-scale"
      title="Delete Lab Package"
    >
      <FiTrash2 className="text-sm shrink-0" />
    </button>
  );

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1 pb-4 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 leading-none">Diagnostic Catalog Directory</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-2 tracking-wider">
            Browse and manage diagnostic checkup panels, parameter counts, pricing structures, and test preps.
          </p>
        </div>
      </div>

      {/* Reusable Data Table Grid */}
      <ReusableTable 
        columns={columns}
        data={labTests}
        searchPlaceholder="Search diagnostic test panels..."
        searchKey="name"
        filterOptions={{ key: 'category', label: 'Diagnostic Class', options: labCategories }}
        actions={tableActions}
        fileName="emediclub-labtests-catalog"
      />

    </div>
  );
}
