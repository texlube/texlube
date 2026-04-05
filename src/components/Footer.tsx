"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, MapPin, ChevronRight, MessageCircle, 
  Download, X, CheckCircle, User, Building2 
} from 'lucide-react';

// FIXED: Added prop support ({ size }) to satisfy TypeScript
const Facebook = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const footerProducts = [
    { name: "Passenger Car", slug: "passenger-car" },
    { name: "Trucks & Busses", slug: "trucks-busses" },
    { name: "Motor Cycle", slug: "motor-cycle" },
    { name: "ATF & Gear", slug: "atf-gear" },
    { name: "Industrial", slug: "industrial" },
    { name: "Hydraulic", slug: "hydraulic" },
    { name: "Specialty Oil", slug: "specialty-oil" },
    { name: "Greases", slug: "greases" },
  ];

  const handleCatalogDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/texlube-full-catalog.pdf'; 
      link.download = 'TEXLUBE_Full_Product_Catalog.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setFormSubmitted(false);
      setShowForm(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <footer className="bg-[#0b131e] text-white pt-24 pb-12 px-6 border-t border-white/5 relative">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand Identity */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="inline-block group">
              <div className="relative w-[180px] h-[50px]">
                <Image src="/logo.png" alt="TEXLUBE Logo" fill className="object-contain object-left transition-opacity group-hover:opacity-80" priority />
              </div>
            </Link>
            <p className="text-blue-100/60 text-xs leading-relaxed font-medium">
              A premier manufacturer of high-performance lubricants engineered in the UAE for the world's most demanding environments.
            </p>
            <div className="flex gap-4">
              {/* FIXED: Components now correctly handle size={14} */}
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"><Linkedin size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"><Instagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"><Facebook size={14} /></a>
              <a href="https://wa.me/97161234567" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-all"><MessageCircle size={14} /></a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B99D6] mb-8">SOLUTIONS</h4>
            <ul className="flex flex-col gap-3">
              {footerProducts.map((item) => (
                <li key={item.slug}>
                  <Link href={`/products?category=${item.slug}`} className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                    <ChevronRight size={10} className="text-[#E31E24] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> 
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B99D6] mb-8">COMPANY</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"><ChevronRight size={12} className="text-[#E31E24] opacity-0 group-hover:opacity-100 transition-opacity" /> About</Link></li>
              <li><Link href="/contact" className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"><ChevronRight size={12} className="text-[#E31E24] opacity-0 group-hover:opacity-100 transition-opacity" /> Contact</Link></li>
              <li><Link href="/technology" className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"><ChevronRight size={12} className="text-[#E31E24] opacity-0 group-hover:opacity-100 transition-opacity" /> Why Texlube</Link></li>
              
              <li className="pt-4 mt-2 border-t border-white/5">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[11px] font-black text-[#E31E24] hover:text-white flex items-center gap-3 group transition-colors uppercase tracking-widest"
                >
                  <Download size={14} className="group-hover:translate-y-1 transition-transform" />
                  DOWNLOAD CATALOG
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Hub */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B99D6] mb-8">CONTACT HUB</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin size={16} className="text-[#E31E24] shrink-0" />
                <span className="text-xs text-gray-400 leading-relaxed font-medium">Ajman Industrial Area 1,<br />United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={16} className="text-[#E31E24] shrink-0" />
                <span className="text-xs text-gray-400 font-medium">+971 6 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © {currentYear} TEXLUBE LUBRICANTS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* --- GATED CATALOG MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0b131e]/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl relative shadow-2xl rounded-sm p-10 md:p-14 animate-in fade-in zoom-in duration-300">
            <button onClick={() => {setIsModalOpen(false); setShowForm(false);}} className="absolute top-8 right-8 text-gray-300 hover:text-[#0D243F] transition-colors"><X size={24}/></button>
            <div className="text-center">
              <h4 className="text-[10px] font-black text-[#E31E24] uppercase tracking-[0.4em] mb-4 text-center">BUSINESS INTELLIGENCE</h4>
              <h5 className="text-3xl font-black italic uppercase text-[#0D243F] mb-10 leading-none text-center">ACCESS FULL CATALOG</h5>
              {!showForm ? (
                <div className="space-y-8">
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">Please provide your professional contact details to download the complete **TEXLUBE High-Performance Catalog**.</p>
                  <button onClick={() => setShowForm(true)} className="w-full bg-[#E31E24] text-white py-5 font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-4 hover:bg-[#0D243F] transition-all shadow-xl">GET THE CATALOG <Download size={18} /></button>
                </div>
              ) : (
                <form onSubmit={handleCatalogDownload} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input required type="text" className="w-full bg-[#F5F5F7] p-4 text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#2B99D6] text-[#0D243F]" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Email</label>
                      <input required type="email" className="w-full bg-[#F5F5F7] p-4 text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#2B99D6] text-[#0D243F]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input required type="tel" placeholder="+971" className="w-full bg-[#F5F5F7] p-4 text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#2B99D6] text-[#0D243F]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Company / Organization</label>
                    <input required type="text" className="w-full bg-[#F5F5F7] p-4 text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#2B99D6] text-[#0D243F]" />
                  </div>
                  <button disabled={formSubmitted} className="w-full bg-[#0D243F] text-white py-5 mt-4 font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-4 hover:bg-[#E31E24] transition-all disabled:opacity-50 shadow-xl">
                    {formSubmitted ? <CheckCircle size={18} /> : <Download size={18} />}
                    {formSubmitted ? "LOGGING LEAD..." : "CONFIRM & DOWNLOAD"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}