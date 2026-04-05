"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Download, Send, Mail, User, Building2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  productName: string;
}

export default function TDSDownloadModal({ isOpen, onClose, fileUrl, productName }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Simulate lead storage (You will connect this to your API later)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Trigger the automatic download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `${productName}-TDS.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSubmitting(false);
    setIsSuccess(true);

    // 3. Close after success message
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0D243F]/90 backdrop-blur-md"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white shadow-2xl rounded-sm overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#E31E24]"><X size={24} /></button>

            {isSuccess ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download size={40} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0D243F] italic tracking-tighter">Download Started</h3>
                <p className="text-gray-400 text-sm mt-2">Thank you. Your technical data sheet is downloading now.</p>
              </div>
            ) : (
              <div className="p-10">
                <div className="mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-2">Technical Documents</h4>
                  <h3 className="text-2xl font-black italic uppercase text-[#0D243F] tracking-tighter leading-none">
                    Unlock TDS for <br /> <span className="text-[#2B99D6]">{productName}</span>
                  </h3>
                </div>

                <form onSubmit={handleLeadCapture} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-gray-300" size={18} />
                    <input required type="text" placeholder="Full Name" className="w-full bg-[#F8F9FA] pl-12 pr-4 py-4 text-sm outline-none focus:ring-1 focus:ring-[#E31E24]" />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-4 text-gray-300" size={18} />
                    <input required type="text" placeholder="Company Name" className="w-full bg-[#F8F9FA] pl-12 pr-4 py-4 text-sm outline-none focus:ring-1 focus:ring-[#E31E24]" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-gray-300" size={18} />
                    <input required type="email" placeholder="Business Email" className="w-full bg-[#F8F9FA] pl-12 pr-4 py-4 text-sm outline-none focus:ring-1 focus:ring-[#E31E24]" />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-[#E31E24] text-white py-5 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-[#0D243F] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>ACCESS DOCUMENT <Send size={14} /></>}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}