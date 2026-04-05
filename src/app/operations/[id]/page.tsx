"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, FileText, Download, X, CheckCircle, 
  MapPin, Calendar, Loader2, ShieldCheck, Zap 
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { operations } from '@/data/operations';

export default function OperationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap params using React.use for Client Components
  const resolvedParams = React.use(params);
  
  // 2. Find the item in our operations data
  const item = operations.find((o) => o.id === resolvedParams.id);

  // Modal & Lead-Gen States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // 3. Safety Check: If operation ID is invalid
  if (!item) notFound();

  // 4. Form Submission Handler
  const handleReportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Simulate lead capture and success state
    setTimeout(() => {
      setFormSubmitted(false);
      setShowForm(false);
      setIsModalOpen(false);
      alert("Operational Report Request Sent to Ajman Hub.");
    }, 2000);
  };

  return (
    <main className="bg-white min-h-screen pt-[140px] pb-24 px-6">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#E31E24] transition-colors mb-10 group">
          <ChevronLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HOME
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Section */}
          <div className="bg-[#F5F5F7] aspect-square relative overflow-hidden border border-gray-100 group">
             {/* FIXED: Changed item.image to item.src to match your data file */}
             <img 
               src={item.src} 
               alt={item.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" 
             />
             <div className="absolute top-6 left-6 bg-[#0D243F] text-white px-4 py-2 text-[8px] font-black tracking-widest uppercase flex items-center gap-2">
                <MapPin size={12} className="text-[#E31E24]" /> AJMAN FACILITY
             </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col h-full">
            <h4 className="text-[10px] font-black text-[#E31E24] uppercase tracking-[0.4em] mb-4">
              {item.category}
            </h4>
            <h1 className="text-4xl md:text-6xl font-black italic text-[#0D243F] mb-8 leading-[0.9] tracking-tighter uppercase">
              {item.title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium italic">
              {item.description}
            </p>

            {/* Stats Grid: Added optional chaining to prevent build errors */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-[#FBFBFC] p-8 border-l-4 border-[#2B99D6]">
                <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  {/* @ts-ignore - Handle missing stats gracefully */}
                  {item.stats?.label1 || "Operational Status"}
                </span>
                <span className="block text-2xl font-black italic text-[#0D243F] uppercase">
                  {/* @ts-ignore */}
                  {item.stats?.val1 || "Active"}
                </span>
              </div>
              <div className="bg-[#FBFBFC] p-8 border-l-4 border-[#2B99D6]">
                <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
                   {/* @ts-ignore */}
                  {item.stats?.label2 || "Production Grade"}
                </span>
                <span className="block text-2xl font-black italic text-[#0D243F] uppercase">
                   {/* @ts-ignore */}
                  {item.stats?.val2 || "UAE Standard"}
                </span>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#0D243F] text-white py-6 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-4 hover:bg-[#E31E24] transition-all shadow-xl"
              >
                <FileText size={18} /> DOWNLOAD TECHNICAL OPERATION REPORT
              </button>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-center">
                Strictly for Authorized TEXLUBE Partners & Stakeholders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- GATED MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0b131e]/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl p-12 relative animate-in fade-in zoom-in duration-300 rounded-sm">
            <button 
                onClick={() => {setIsModalOpen(false); setShowForm(false); setFormSubmitted(false);}} 
                className="absolute top-8 right-8 text-gray-300 hover:text-[#0D243F] transition-colors"
            >
                <X size={24}/>
            </button>
            
            <div className="text-center">
                <h4 className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-4">Secure Document Access</h4>
                <h5 className="text-2xl font-black italic uppercase text-[#0D243F] mb-10 leading-none">
                    {item.title} <span className="text-gray-300">/</span> REPORT
                </h5>
                
                {!showForm ? (
                    <div className="space-y-6">
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">To maintain facility security, operational reports are gated. Please confirm your credentials to proceed with the download.</p>
                        <button onClick={() => setShowForm(true)} className="w-full bg-[#E31E24] text-white py-5 font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-4 hover:bg-[#0D243F] transition-all shadow-xl">
                            REQUEST ACCESS <Download size={18} />
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleReportRequest} className="space-y-4 text-left">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input required placeholder="E.G. ABDULLAH BIN AHMED" className="w-full bg-[#F5F5F7] p-4 text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#2B99D6] text-[#0D243F]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Mobile</label>
                        <input required type="tel" placeholder="+971" className="w-full bg-[#F5F5F7] p-4 text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#2B99D6] text-[#0D243F]" />
                      </div>
                      <button className="w-full bg-[#0D243F] text-white py-5 mt-4 font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center justify-center gap-4">
                        {formSubmitted ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                        {formSubmitted ? "SYNCING..." : "CONFIRM & DOWNLOAD"}
                      </button>
                    </form>
                )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}