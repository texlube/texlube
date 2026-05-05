"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  Phone, 
  Mail, 
  ChevronRight,
  Menu,
  X 
} from 'lucide-react';
import QuoteModal from './QuoteModal';

// UPDATED: Category names and slugs to match the new Petrol/Gasoline and Diesel structure
const productCategories = [
  { 
    name: "Petrol/Gasoline Vehicle", 
    slug: "petrol-gasoline",
    hasSub: true,
    subItems: [
      { name: "Fully Synthetic", slug: "fully-synthetic" },
      { name: "Semi Synthetic", slug: "semi-synthetic" },
      { name: "Mineral", slug: "mineral" }
    ]
  },
  { name: "Diesel Vehicle", slug: "diesel-vehicle" },
  { name: "Motor Cycle", slug: "motor-cycle" },
  { name: "ATF & Gear", slug: "atf-and-gear" },
  { name: "Industrial", slug: "industrial" },
  { name: "Hydraulic", slug: "hydraulic" },
  { 
    name: "Speciality Oil", 
    slug: "speciality-oil",
    hasSub: true,
    subItems: [
      { name: "Coolant", slug: "coolant" },
      { name: "Brake Fluid", slug: "brake-fluid" }
    ]
  },
  { name: "Greases", slug: "greases" },
];

export default function Navbar() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100]">
        
        {/* 1. TOP UTILITY BAR */}
        <div className="w-full bg-[#12223b] text-white py-2.5 px-6 border-b border-white/5">
          <div className="max-w-[1300px] mx-auto flex justify-center items-center gap-4 md:gap-12">
            {/* PHONE */}
            <a href="tel:+97165295105" className="flex items-center gap-2 hover:text-[#E31E24] transition-all group">
              <Phone size={12} className="text-[#2B99D6]" />
              <span className="text-[9px] md:text-[10px] font-regular tracking-[0.1em]">+971 6 529 5105</span>
            </a>

            <div className="w-[1px] h-3 bg-white/10 hidden sm:block"></div>

            {/* WHATSAPP */}
            <a 
              href="https://wa.me/971554715123" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-[#25D366] transition-all group"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#2B99D6] group-hover:text-[#25D366] transition-colors">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-[9px] md:text-[10px] font-regular tracking-[0.1em]">+971 55 471 5123</span>
            </a>

            <div className="w-[1px] h-3 bg-white/10 hidden sm:block"></div>

            {/* EMAIL */}
            <a href="mailto:info@texlubricant.com" className="flex items-center gap-2 hover:text-[#E31E24] transition-all group">
              <Mail size={12} className="text-[#2B99D6]" />
              <span className="text-[9px] md:text-[10px] font-regular tracking-[0.1em] lowercase">info@texlubricant.com</span>
            </a>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION BAR */}
        <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
          <div className="max-w-[1300px] mx-auto px-6 flex items-center justify-between h-[70px] md:h-[80px]">
            
            {/* LOGO */}
            <Link href="/" className="relative flex items-center h-full" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative w-[150px] md:w-[220px] h-[40px] md:h-[50px] transition-transform duration-300 hover:scale-105">
                <Image src="/logo.png" alt="TEXLUBE" fill className="object-contain" priority />
              </div>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-10 h-full">
              
              {/* PRODUCTS DROPDOWN */}
              <div className="relative group flex items-center h-full">
                <Link 
                  href="/products?category=all-products" 
                  className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.1em] text-[#0D243F] hover:text-[#E31E24] transition-colors h-full"
                >
                  PRODUCTS
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />
                </Link>

                <div className="absolute top-full left-0 w-72 bg-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-[#E31E24]">
                  <div className="flex flex-col py-2">
                    {productCategories.map((cat) => (
                      <div key={cat.slug} className="relative group/sub">
                        <Link 
                          href={`/products?category=${cat.slug}`}
                          className="flex items-center justify-between px-8 py-4 text-[10px] font-black text-[#0D243F] hover:bg-[#F9FAFB] hover:text-[#E31E24] transition-all uppercase tracking-widest border-b border-gray-50 last:border-0"
                        >
                          {cat.name}
                          {cat.hasSub && <ChevronRight size={12} className="text-gray-300" />}
                        </Link>
                        
                        {/* SECONDARY FLYOUT MENU (For Petrol/Gasoline Vehicle & Speciality Oil) */}
                        {cat.hasSub && (
                          <div className="absolute top-0 left-full w-64 bg-white shadow-2xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 border-l border-gray-100">
                            <div className="flex flex-col py-2">
                              {cat.subItems?.map((sub) => (
                                <Link 
                                  key={sub.slug} 
                                  href={`/products?category=${sub.slug}`} 
                                  className="px-8 py-4 text-[10px] font-black text-gray-500 hover:bg-[#F9FAFB] hover:text-[#E31E24] transition-all uppercase tracking-widest border-b border-gray-50 last:border-0"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative group flex items-center h-full">
                <Link href="/technology" className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.1em] text-[#0D243F] hover:text-[#E31E24] transition-colors h-full">
                  WHY TEXLUBE
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-[#E31E24]">
                  <div className="flex flex-col py-2">
                    <Link href="/about" className="px-8 py-4 text-[11px] font-black text-[#0D243F] hover:bg-[#F9FAFB] hover:text-[#E31E24] transition-all uppercase tracking-widest border-b border-gray-50">ABOUT US</Link>
                    <Link href="/contact" className="px-8 py-4 text-[11px] font-black text-[#0D243F] hover:bg-[#F9FAFB] hover:text-[#E31E24] transition-all uppercase tracking-widest">CONTACT</Link>
                  </div>
                </div>
              </div>

              <Link href="/news" className="text-[12px] font-black uppercase tracking-[0.1em] text-[#0D243F] hover:text-[#E31E24] transition-colors">
                NEWS
              </Link>
            </div>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="bg-[#0D243F] text-white px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-[#E31E24] transition-all rounded-sm shadow-md active:scale-95 hidden sm:block"
              >
                REQUEST A QUOTE
              </button>

              <button 
                className="lg:hidden text-[#0D243F] p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU DRAWER */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-xl animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[80vh]">
              <div className="flex flex-col p-6 gap-4">
                <Link href="/products?category=all-products" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-black uppercase text-[#0D243F] border-b border-gray-50 pb-3">Products</Link>
                <Link href="/technology" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-black uppercase text-[#0D243F] border-b border-gray-50 pb-3">Why Texlube</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-black uppercase text-[#0D243F] border-b border-gray-100 pb-3">About Us</Link>
                <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-black uppercase text-[#0D243F] border-b border-gray-100 pb-3">News</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-black uppercase text-[#0D243F] border-b border-gray-100 pb-3">Contact</Link>
                <button 
                   onClick={() => {setIsQuoteOpen(true); setIsMobileMenuOpen(false);}}
                   className="w-full bg-[#E31E24] text-white py-4 text-[10px] font-black uppercase tracking-widest rounded-sm mt-2"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}