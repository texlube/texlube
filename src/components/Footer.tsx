"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, MapPin, MessageCircle, 
  Download, X, ChevronUp, Globe
} from 'lucide-react';
// 1. Import the new Modal component
import CatalogDownloadModal from './CatalogDownloadModal';

// Icons with Prop support
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // 2. Add state to manage the Lead Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCatalog, setActiveCatalog] = useState({ label: '', url: '' });
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const footerProducts = [
    { name: "Passenger Car", slug: "passenger-car" },
    { name: "Trucks & Busses", slug: "trucks-busses" },
    { name: "Motor Cycle", slug: "motor-cycle" },
    { name: "ATF & Gear", slug: "atf-gear" },
    { name: "Industrial", slug: "industrial" },
    { name: "Hydraulic", slug: "hydraulic" },
    { name: "Speciality Oil", slug: "speciality-oil" }, 
    { name: "Greases", slug: "greases" },
  ];

  const catalogOptions = [
    { label: "English Version", lang: "EN", url: "/catalogs/texlube-technical-catalog-en.pdf" },
    { label: "Version Française", lang: "FR", url: "/catalogs/texlube-technical-catalog-fr.pdf" },
    { label: "النسخة العربية", lang: "AR", url: "/catalogs/texlube-technical-catalog-ar.pdf" },
  ];

  // 3. Function to trigger the modal
  const handleCatalogClick = (label: string, url: string) => {
    setActiveCatalog({ label, url });
    setIsModalOpen(true);
    setIsDropdownOpen(false); // Close the slide-up menu
  };

  return (
    <footer className="bg-[#0b131e] text-white pt-16 md:pt-24 pb-12 px-6 border-t border-white/5 relative">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">
          
          {/* Column 1: Brand Identity */}
          <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block group">
              <div className="relative w-[160px] md:w-[180px] h-[45px] md:h-[50px]">
                <Image src="/logo.png" alt="TEXLUBE Logo" fill className="object-contain object-center md:object-left" priority />
              </div>
            </Link>
            <p className="text-blue-100/60 text-xs leading-relaxed font-medium max-w-sm">
              A premier manufacturer of high-performance lubricants engineered in the UAE for the world's most demanding environments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"><Linkedin size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"><Instagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"><Facebook size={14} /></a>
              <a href="https://wa.me/971554715123" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-all">
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B99D6] mb-6 md:mb-8">SOLUTIONS</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3">
              {footerProducts.map((item) => (
                <li key={item.slug}>
                  <Link href={`/products?category=${item.slug}`} className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center justify-center md:justify-start gap-2 group transition-colors uppercase tracking-widest">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Multilingual Catalog */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B99D6] mb-6 md:mb-8">COMPANY</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/technology" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Why Texlube</Link></li>
              
              <li className="pt-4 relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`text-[11px] font-black flex items-center justify-center md:justify-start gap-3 uppercase tracking-widest mx-auto md:mx-0 transition-all duration-300 ${isDropdownOpen ? 'text-white' : 'text-[#E31E24] hover:text-white'}`}
                >
                  <Download size={14} /> DOWNLOAD CATALOGUE 
                  <ChevronUp size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute bottom-full left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mb-4 w-56 bg-white shadow-2xl rounded-sm overflow-hidden z-[100] animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-[#0D243F] px-4 py-3 border-b border-white/5">
                       <p className="text-[9px] font-black text-[#2B99D6] uppercase tracking-widest">Select Language</p>
                    </div>
                    <div className="flex flex-col">
                      {catalogOptions.map((cat) => (
                        /* 4. Changed <a> to <button> to trigger the Lead Form */
                        <button 
                          key={cat.lang}
                          onClick={() => handleCatalogClick(cat.label, cat.url)}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-all group border-b border-gray-50 last:border-0 text-left"
                        >
                          <span className="text-[10px] font-black text-[#0D243F] uppercase tracking-widest group-hover:text-[#E31E24] transition-colors">
                            {cat.label}
                          </span>
                          <span className="text-[9px] font-bold text-gray-300 group-hover:text-[#2B99D6]">{cat.lang}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Hub */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B99D6] mb-6 md:mb-8">CONTACT HUB</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
                <MapPin size={16} className="text-[#E31E24]" />
                <span className="text-xs text-gray-400 font-medium">Ajman Industrial Area 1,<br /> United Arab Emirates</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
                <Phone size={16} className="text-[#E31E24]" />
                <span className="text-xs text-gray-400 font-medium">+971 6 529 5105</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center justify-center gap-6 text-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © {currentYear} TEXLUBE LUBRICANTS. ALL RIGHTS RESERVED.
          </p>
          <Link 
            href="https://gro-wize.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-[#E31E24] transition-all duration-300 group"
          >
            DEVELOPED BY <span className="text-white group-hover:text-[#E31E24]">GROWIZE DIGITAL</span>
          </Link>
        </div>
      </div>

      {/* 5. Render the Catalog Modal */}
      <CatalogDownloadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fileUrl={activeCatalog.url}
        langLabel={activeCatalog.label}
      />
    </footer>
  );
}