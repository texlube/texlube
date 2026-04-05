"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, ChevronDown, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Adds a shadow and blur effect when the user scrolls for a premium feel
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      {/* TOP UTILITY BAR: Dark Navy */}
      <div className="bg-[#0D243F] text-white py-1.5 px-6">
        <div className="max-w-[1440px] mx-auto flex justify-end items-center gap-5 text-[10px] font-black uppercase tracking-widest">
          <button className="bg-[#2B99D6] hover:bg-[#1f7db3] px-4 py-1.5 rounded-sm transition-colors">
            Find your lubricant
          </button>
          <div className="hidden sm:flex items-center gap-1.5 cursor-pointer border-l border-white/10 pl-5 ml-1">
            <Globe size={12} />
            <span>English</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION: White */}
      <div className="bg-white/95 backdrop-blur-md py-3 px-6 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-12">
            {/* BRAND LOGO */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image 
                src="/logo.png" 
                alt="TEXLUBE" 
                width={140} 
                height={35} 
                priority 
                className="object-contain" 
              />
            </Link>

            {/* DESKTOP LINKS */}
            <nav className="hidden lg:flex gap-8 text-[12px] font-black uppercase tracking-[0.15em] text-[#0D243F]">
              <Link href="/products" className="hover:text-[#2B99D6] flex items-center gap-0.5 transition-colors group">
                Products <ChevronDown size={12} className="text-gray-400 group-hover:text-[#2B99D6]" />
              </Link>
              <Link href="/about" className="hover:text-[#2B99D6] flex items-center gap-0.5 transition-colors group">
                Why TEXLUBE <ChevronDown size={12} className="text-gray-400 group-hover:text-[#2B99D6]" />
              </Link>
              <Link href="/media" className="hover:text-[#2B99D6] transition-colors">
                News
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-6 text-[#0D243F]">
            <Search size={18} className="cursor-pointer hover:text-[#2B99D6] transition-colors" />
            <Menu size={22} className="lg:hidden cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}