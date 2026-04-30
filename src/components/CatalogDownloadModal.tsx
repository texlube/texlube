"use client";

import React, { useState } from 'react';
import { X, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { countries } from '@/data/countries';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  langLabel: string;
}

export default function CatalogDownloadModal({ isOpen, onClose, fileUrl, langLabel }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', country: '', mobile: '', company: '', email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send Email via API
      await fetch('/api/catalog-lead', {
        method: 'POST',
        body: JSON.stringify({ ...formData, catalogLang: langLabel }),
      });

      // 2. Trigger Download
      window.open(fileUrl, '_blank');
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ fullName: '', country: '', mobile: '', company: '', email: '' });
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0D243F]/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl shadow-2xl rounded-sm overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#0D243F] transition-colors z-10"><X size={24} /></button>
        <div className="p-8 md:p-12">
          {!isSuccess ? (
            <>
              <div className="mb-8">
                <span className="text-[#E31E24] font-black text-[10px] tracking-[0.3em] uppercase block mb-2">Access Request</span>
                <h2 className="text-3xl font-black italic text-[#0D243F] leading-none uppercase tracking-tighter">
                  DOWNLOAD <span className="text-[#2B99D6]">CATALOGUE</span>
                </h2>
                <p className="text-gray-400 text-[11px] font-bold mt-4 uppercase tracking-widest">Language: {langLabel}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input required placeholder="Full Name *" type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-[#F8F9FA] p-4 text-sm font-bold outline-none border-b-2 border-transparent focus:border-[#2B99D6]" />
                <div className="grid grid-cols-2 gap-5">
                  <select required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="bg-[#F8F9FA] p-4 text-sm font-bold outline-none">
                    <option value="">Country *</option>
                    {countries.map(c => <option key={c.iso} value={c.name}>{c.name}</option>)}
                  </select>
                  <input required placeholder="Mobile *" type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="bg-[#F8F9FA] p-4 text-sm font-bold outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <input placeholder="Company" type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="bg-[#F8F9FA] p-4 text-sm font-bold outline-none" />
                  <input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-[#F8F9FA] p-4 text-sm font-bold outline-none" />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-[#0D243F] text-white py-6 font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#E31E24] transition-all">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>SUBMIT & DOWNLOAD <Download size={18} /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center animate-in zoom-in">
              <CheckCircle2 size={60} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-black italic text-[#0D243F] uppercase mb-4 tracking-tighter">SUCCESS</h2>
              <p className="text-gray-500 font-medium">Your catalog is downloading.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}