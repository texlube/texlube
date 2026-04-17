"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Zap, Ship, MapPin, X, Phone, Mail } from 'lucide-react';

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-black italic text-white mb-1">
      {count}{suffix}
    </div>
  );
}

const globalOffices = [
  {
    id: 'benin',
    country: 'BENIN',
    city: 'Cotonou',
    title: 'Head Office (West Africa)',
    address: 'Lot 343 Zongo, Rue derriere NSIA Bank Unafrica, Maison VLAVONOU Cotonoe Re du Benin',
    phone: '+229 666 90707, +229 971 74111',
    email: 'west.africa@texlubricant.com',
    // CALIBRATED FOR NO OVERLAP
    coords: { top: '56%', left: '38%' } 
  },
  {
    id: 'uganda',
    country: 'UGANDA',
    city: 'Kampala',
    title: 'Head Office (East Africa)',
    address: 'Kyadondo Block 273, Plot 23127, Kalina - Namasuba P.O. Box 111556, Kampala, Uganda',
    phone: '+256 759 113 402',
    email: 'africa.sales@texlubricant.com',
    // CALIBRATED FOR NO OVERLAP
    coords: { top: '56%', left: '62%' } 
  }
];

export default function GlobalReach() {
  const router = useRouter();
  const [activeOffice, setActiveOffice] = useState<typeof globalOffices[0] | null>(null);

  return (
    <section className="bg-[#0b1b2e] py-32 px-6 relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <img 
          src="/world-map-pin.webp" 
          alt="Tech Background" 
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16 relative z-10 items-center">
        
        {/* Left Side: Stats */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B99D6] mb-4">GLOBAL PRESENCE</h2>
          <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-8">
            FROM DUBAI TO <br />
            <span className="text-[#E31E24]">THE WORLD</span>
          </h3>
          <p className="text-blue-100/80 mb-16 leading-relaxed font-medium max-w-md">
            TEXLUBE's high-performance lubricants are engineered in the UAE to withstand the extreme climates of Africa, South America, and the Middle East.
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <Globe className="text-[#2B99D6] mb-4" size={24} />
              <AnimatedCounter end={40} suffix="+" />
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">EXPORT COUNTRIES</div>
            </div>
            <div>
              <Zap className="text-[#2B99D6] mb-4" size={24} />
              <AnimatedCounter end={15} suffix="k Tons" duration={2500} />
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">ANNUAL PRODUCTION</div>
            </div>
            <div>
              <Ship className="text-[#2B99D6] mb-4" size={24} />
              <AnimatedCounter end={3} suffix=" Regions" duration={1500} />
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">GLOBAL HUBS</div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive UI */}
        <div className="relative w-full aspect-[16/9] bg-[#12223b]/50 border border-white/10 rounded-sm shadow-2xl backdrop-blur-sm flex items-center justify-center overflow-hidden">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <img 
               src="/world-map-pin.webp" 
               alt="Global Network Map" 
               className="w-full h-full object-cover opacity-60"
             />
          </div>

          {/* UAE HEADQUARTERS - IMMEDIATELY ABOVE THE OTHERS */}
          <button 
            onClick={() => router.push('/about')}
            style={{ top: '44%', left: '50%', transform: 'translateX(-50%)' }}
            className="absolute z-20 group cursor-pointer"
          >
            <span className="text-[7px] md:text-[9px] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-white drop-shadow-md group-hover:text-[#E31E24] transition-colors bg-[#0D243F] px-3 md:px-5 py-1.5 md:py-2 border border-[#E31E24] rounded-sm shadow-lg whitespace-nowrap">
              UAE HEADQUARTERS
            </span>
          </button>

          {/* REGIONAL OFFICE LABELS (Benin & Uganda) */}
          {globalOffices.map((office) => (
            <button
              key={office.id}
              onClick={() => setActiveOffice(office)}
              style={{ top: office.coords.top, left: office.coords.left }}
              className="absolute z-30 transition-all hover:scale-105 active:scale-95 group -translate-x-1/2"
            >
              <span className={`text-[6px] md:text-[8px] font-black tracking-widest uppercase text-white drop-shadow-md bg-[#0b1b2e]/95 px-2 md:px-3 py-1.5 border transition-all rounded-sm inline-block min-w-[70px] md:min-w-[120px] text-center whitespace-nowrap ${activeOffice?.id === office.id ? 'border-[#E31E24] text-[#E31E24]' : 'border-white/20 group-hover:border-[#2B99D6] group-hover:text-[#2B99D6]'}`}>
                {office.country}
              </span>
            </button>
          ))}

          {/* OFFICE DETAIL CARD */}
          {activeOffice && (
            <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 z-40 bg-white shadow-2xl rounded-sm p-5 md:p-6 animate-in slide-in-from-bottom-4 duration-500 border-l-4 border-[#E31E24]">
              <button onClick={() => setActiveOffice(null)} className="absolute top-4 right-4 text-gray-300 hover:text-[#E31E24]"><X size={18} /></button>
              <div className="flex flex-col gap-3 md:gap-4">
                <div>
                  <span className="text-[#E31E24] font-black text-[8px] md:text-[9px] tracking-[0.3em] uppercase block mb-1">
                    {activeOffice.title}
                  </span>
                  <h4 className="text-lg md:text-xl font-black italic text-[#0D243F] uppercase tracking-tighter leading-none">
                    {activeOffice.city}, <span className="text-[#2B99D6]">{activeOffice.country}</span>
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-[#2B99D6] mt-0.5 shrink-0" />
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-500 leading-relaxed uppercase">{activeOffice.address}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Phone size={12} className="text-[#2B99D6]" />
                      <p className="text-[9px] md:text-[10px] font-black text-[#0D243F]">{activeOffice.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}