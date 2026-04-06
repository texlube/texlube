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

const productCategories = [
  { name: "Passenger Car", slug: "passenger-car" },
  { name: "Trucks & Busses", slug: "truck-and-busses" }, // Updated to match Sanity
  { name: "Motor Cycle", slug: "motor-cycle" },
  { name: "ATF & Gear", slug: "atf-and-gear" },      // Updated to match Sanity
  { name: "Industrial", slug: "industrial" },
  { name: "Hydraulic", slug: "hydraulic" },
  { 
    name: "Speciality Oil", 
    slug: "speciality-oil", // Fixed spelling
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
          <div className="max-w-[1300px] mx-auto flex justify-center items-center gap-4 md:gap-16">
            <a href="tel:+97165295105" className="flex items-center gap-2 hover:text-[#E31E24] transition-all group">
              <Phone size={12} className="text-[#2B99D6]" />
              <span className="text-[9px] md:text-[10px] font-regular tracking-[0.1em]">+971 6 529 5105</span>
            </a>
            <div className="w-[1px] h-3 bg-white/10"></div>
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
              
              {/* PRODUCTS DROPDOWN - Points to all-products by default */}
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
                      <div key={cat.slug} className="relative group/specialty">
                        <Link 
                          href={`/products?category=${cat.slug}`}
                          className="flex items-center justify-between px-8 py-4 text-[10px] font-black text-[#0D243F] hover:bg-[#F9FAFB] hover:text-[#E31E24] transition-all uppercase tracking-widest border-b border-gray-50 last:border-0"
                        >
                          {cat.name}
                          {cat.hasSub && <ChevronRight size={12} className="text-gray-300" />}
                        </Link>
                        {cat.hasSub && (
                          <div className="absolute top-0 left-full w-64 bg-white shadow-2xl opacity-0 invisible group-hover/specialty:opacity-100 group-hover/specialty:visible transition-all duration-300 border-l border-gray-100">
                            <div className="flex flex-col py-2">
                              {cat.subItems?.map((sub) => (
                                <Link key={sub.slug} href={`/products?category=${sub.slug}`} className="px-8 py-4 text-[10px] font-black text-gray-500 hover:bg-[#F9FAFB] hover:text-[#E31E24] transition-all uppercase tracking-widest border-b border-gray-50 last:border-0">
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