"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Building2, User, Mail, Phone } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to send to info@texlubricant.com
    // In a real scenario, you'd use a service like Formspree, Resend, or a Next.js API Route
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0D243F]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white shadow-2xl rounded-sm overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#E31E24] transition-colors z-10"
            >
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-black italic uppercase text-[#0D243F] mb-2">Request Sent!</h3>
                <p className="text-gray-500 text-sm">Our technical team will contact you shortly at info@texlubricant.com.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {/* Header */}
                <div className="bg-[#0D243F] p-8 text-white">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-2">Lead Generation</h2>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Request a <span className="text-[#2B99D6]">Technical Quote</span></h3>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-300" size={18} />
                      <input required type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:border-[#E31E24] outline-none transition-all" />
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 text-gray-300" size={18} />
                      <input required type="text" placeholder="Company Name" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:border-[#E31E24] outline-none transition-all" />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-300" size={18} />
                    <input required type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:border-[#E31E24] outline-none transition-all" />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-300" size={18} />
                    <input required type="tel" placeholder="Phone Number (WhatsApp Preferred)" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:border-[#E31E24] outline-none transition-all" />
                  </div>

                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your lubricant requirements (Volume, Grade, Destination)..." 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 text-sm focus:border-[#E31E24] outline-none transition-all resize-none"
                  ></textarea>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-[#E31E24] text-white font-black uppercase text-[11px] tracking-widest py-4 flex items-center justify-center gap-3 hover:bg-[#0D243F] transition-all disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <>Processing <Loader2 size={16} className="animate-spin" /></>
                    ) : (
                      <>Submit Request <Send size={16} /></>
                    )}
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