"use client";

import React, { useState } from 'react';
import { X, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { countries } from '@/data/countries'; // IMPORT THE LIST HERE

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  productName: string;
}

export default function TDSDownloadModal({ isOpen, onClose, fileUrl, productName }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    mobile: '',
    company: '',
    email: ''
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find(c => c.name === e.target.value);
    setFormData({
      ...formData,
      country: e.target.value,
      mobile: selectedCountry ? `${selectedCountry.code} ` : ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation of data capture
    console.log("Lead Captured:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(fileUrl, '_blank');

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ fullName: '', country: '', mobile: '', company: '', email: '' });
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0D243F]/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 rounded-sm">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#0D243F] transition-colors z-10">
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {!isSuccess ? (
            <>
              <div className="mb-8">
                <span className="text-[#E31E24] font-black text-[10px] tracking-[0.3em] uppercase block mb-2">Technical Access</span>
                <h2 className="text-3xl font-black italic text-[#0D243F] leading-none uppercase tracking-tighter">
                  DOWNLOAD <span className="text-[#2B99D6]">TDS</span>
                </h2>
                <p className="text-gray-400 text-[11px] font-bold mt-4 uppercase tracking-widest">FOR: {productName}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name *</label>
                  <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-[#F8F9FA] border-b-2 border-transparent focus:border-[#2B99D6] p-4 text-sm font-bold outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Country *</label>
                    <select required value={formData.country} onChange={handleCountryChange} className="w-full bg-[#F8F9FA] border-b-2 border-transparent focus:border-[#2B99D6] p-4 text-sm font-bold outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Select Country</option>
                      {countries.map(c => (
                        <option key={c.iso} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Mobile Number *</label>
                    <input required type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full bg-[#F8F9FA] border-b-2 border-transparent focus:border-[#2B99D6] p-4 text-sm font-bold outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" placeholder="Company Name (Optional)" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-[#F8F9FA] p-4 text-sm font-bold outline-none transition-all" />
                  <input type="email" placeholder="Business Email (Optional)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F8F9FA] p-4 text-sm font-bold outline-none transition-all" />
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-[#0D243F] text-white py-6 font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#E31E24] transition-all shadow-xl">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>VERIFY & DOWNLOAD <Download size={18} /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center animate-in fade-in zoom-in">
              <CheckCircle2 size={60} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-black italic text-[#0D243F] uppercase mb-4 tracking-tighter">SUCCESS</h2>
              <p className="text-gray-500 font-medium">Your document is downloading.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}