"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Catalogue', href: '/products?category=all-products' },
  { name: 'Speciality', href: '/products?category=speciality-oil' },
  { name: 'Technology', href: '/technology' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0D243F]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-[1300px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* LOGO - Adjusted size for mobile */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="text-xl md:text-2xl font-black italic tracking-tighter text-white">
            TEX<span className="text-[#E31E24]">LUBE</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 hover:text-[#E31E24] transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E31E24] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          aria-label="Toggle Menu"
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[#0D243F] z-[101] flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-6 h-16">
           <span className="text-xl font-black italic tracking-tighter text-white">
            TEX<span className="text-[#E31E24]">LUBE</span>
          </span>
          <button onClick={() => setIsOpen(false)} className="text-white p-2">
            <X size={28} />
          </button>
        </div>
        
        <div className="flex flex-col px-10 pt-10 gap-6">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black uppercase italic tracking-tighter text-white flex items-center justify-between group hover:text-[#E31E24] transition-all duration-300 border-b border-white/5 pb-4"
              style={{ transitionDelay: `${index * 50}ms` }} // Staggered entrance effect
            >
              {link.name}
              <ChevronRight className="text-[#E31E24] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" size={24} />
            </Link>
          ))}
        </div>

        {/* Bottom Contact Detail in Mobile Menu */}
        <div className="mt-auto p-10 bg-white/5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">UAE Headquarters</p>
            <p className="text-sm text-white/70 italic">Premium Engine Performance</p>
        </div>
      </div>
    </nav>
  );
}