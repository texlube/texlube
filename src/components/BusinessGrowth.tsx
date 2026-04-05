"use client";

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Briefcase, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

const businessCards = [
  {
    title: "GLOBAL DISTRIBUTION",
    desc: "Leverage our strategic UAE location to streamline your logistics and dominate international export markets.",
    icon: <Briefcase size={32} />,
  },
  {
    title: "OEM PARTNERSHIPS",
    desc: "Align your brand with engineering excellence. Our lubricants meet the strictest global OEM and API standards.",
    icon: <ShieldCheck size={32} />,
  },
  {
    title: "SCALABLE LOGISTICS",
    desc: "From bulk industrial supply to retail-ready packaging, our Ajman facility is built to power your growth.",
    icon: <Zap size={32} />,
  }
];

export default function BusinessGrowthSection() {
  return (
    <section className="relative py-16 bg-[#E31E24] overflow-hidden">
      
      {/* Background Image with Low Opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000" 
          alt="Industrial Engineering" 
          className="w-full h-full object-cover opacity-15 mix-blend-overlay"
        />
        {/* Subtle Gradient Overlay to keep text sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E31E24]/50 via-transparent to-[#E31E24]/80"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-3">
            STRATEGIC EXPANSION
          </h2>
          <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
            GROW YOUR BUSINESS <br className="md:hidden" /> WITH <span className="text-[#0D243F]">TEXLUBE</span>
          </h3>
        </div>

        {/* Glassmorphism 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {businessCards.map((card, index) => (
            <div 
              key={index}
              className="group relative p-10 transition-all duration-500 hover:-translate-y-3
                         bg-white/10 backdrop-blur-md border border-white/20 rounded-sm
                         hover:bg-white/20 hover:border-white/40 overflow-hidden"
            >
              {/* Animated Glow Effect on Hover */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

              <div className="mb-8 text-white group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>

              <h4 className="text-xl font-black italic uppercase text-white mb-4 tracking-tighter">
                {card.title}
              </h4>
              
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="flex flex-col items-center text-center pt-10 border-t border-white/20">
          <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em] mb-8">
            WANT TO BECOME AN EXCLUSIVE DISTRIBUTOR?
          </p>
          <Link 
            href="/contact" 
            className="group flex items-center gap-8 bg-white text-[#E31E24] px-12 py-5 font-black uppercase text-[11px] tracking-widest hover:bg-[#0D243F] hover:text-white transition-all duration-500 shadow-2xl"
          >
            PARTNER WITH TEXLUBE
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}