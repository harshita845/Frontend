import React, { useState } from 'react';
import { motion as motionFramer, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiX, FiCheckCircle, FiFileText, FiCamera, FiTrash2 } from 'react-icons/fi';

export default function PrescriptionUpload({ isOpen, onClose, onUploadSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState('idle'); // 'idle', 'uploading', 'success'

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!acceptedTypes.includes(file.type)) {
      alert("Invalid format! Please upload a JPG, PNG, or PDF file.");
      return;
    }
    setSelectedFile(file);
    setUploadState('idle');
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadState('uploading');
    setUploadProgress(0);

    // Simulate upload progress interval
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadState('idle');
    setUploadProgress(0);
  };

  // Simulate snaps using phone camera
  const handleCameraSnap = () => {
    setSelectedFile({
      name: 'prescription-camera-capture.jpg',
      size: 450000,
      type: 'image/jpeg',
      isCameraCapture: true
    });
    setUploadState('idle');
    setUploadProgress(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop screen */}
          <motionFramer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900"
          />

          {/* Modal Container */}
          <motionFramer 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[32px] border border-slate-100 shadow-premium max-w-md w-full p-6 sm:p-8 z-10 relative overflow-hidden"
          >
            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <span>📄</span> Upload Prescription
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                  Select your medical prescription to order immediately.
                </p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated success display */}
            {uploadState === 'success' ? (
              <div className="py-8 flex flex-col items-center gap-3 animate-pulse text-center">
                <FiCheckCircle className="text-5xl text-teal" />
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Upload Completed!</h4>
                <p className="text-[10px] text-slate-500 max-w-[280px]">Our clinical pharmacist will verify your prescription and add medicines to your cart within 15 minutes.</p>
                <button
                  onClick={() => {
                    if (onUploadSuccess) onUploadSuccess();
                    onClose();
                  }}
                  className="mt-4 px-6 py-2 bg-teal hover:bg-teal-dark text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm cursor-pointer tap-scale"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                
                {/* Drag and Drop uploads block */}
                {!selectedFile ? (
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 cursor-pointer transition-all ${
                      dragActive ? 'border-teal bg-teal-light/20' : 'border-slate-200 hover:border-teal'
                    }`}
                  >
                    <FiUploadCloud className="text-4xl text-slate-400" />
                    <div className="text-center">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">Drag and drop file here</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block tracking-wider">Supports: JPG, PNG, PDF</span>
                    </div>

                    <label className="px-4 py-2 bg-forest hover:bg-forest-dark text-white text-[10px] font-black uppercase tracking-wider rounded-xl cursor-pointer shadow-sm mt-1">
                      Browse Files
                      <input 
                        type="file" 
                        accept=".jpg,.jpeg,.png,.pdf" 
                        className="hidden" 
                        onChange={handleFileSelect}
                      />
                    </label>

                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider mt-1.5">— or —</span>

                    {/* Camera upload - Mobile Friendly */}
                    <button 
                      onClick={handleCameraSnap}
                      className="flex items-center gap-1.5 text-xs font-black text-teal hover:underline uppercase tracking-wide mt-1 cursor-pointer"
                    >
                      <FiCamera /> Capture with Camera
                    </button>
                  </div>
                ) : (
                  <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 flex items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center shrink-0">
                        <FiFileText className="text-xl" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-extrabold text-slate-800 truncate block">{selectedFile.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 block tracking-wider">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    {uploadState !== 'uploading' && (
                      <button 
                        onClick={handleRemove}
                        className="p-2 bg-coral-light/40 hover:bg-coral-light text-coral rounded-xl cursor-pointer"
                      >
                        <FiTrash2 className="text-sm shrink-0" />
                      </button>
                    )}
                  </div>
                )}

                {/* Upload progress indicator */}
                {uploadState === 'uploading' && (
                  <div className="flex flex-col gap-1.5 animate-fade-in mt-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-wider">
                      <span>Uploading file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-teal h-full rounded-full transition-all duration-150"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions Button */}
                {selectedFile && uploadState !== 'success' && (
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-5 mt-2">
                    <button
                      onClick={handleRemove}
                      disabled={uploadState === 'uploading'}
                      className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer disabled:opacity-40"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploadState === 'uploading'}
                      className="py-3 bg-teal hover:bg-teal-dark text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-sm transition-all cursor-pointer disabled:opacity-40"
                    >
                      Upload & Order
                    </button>
                  </div>
                )}

              </div>
            )}

          </motionFramer>

        </div>
      )}
    </AnimatePresence>
  );
}
