"use client";

import { useEffect, useState, useRef } from 'react';
import { Globe, Zap, Ship } from 'lucide-react';

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

export default function GlobalReach() {
  return (
    <section className="bg-[#0b1b2e] py-32 px-6 relative overflow-hidden">
      
      {/* 1. Gray Background Map */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center mix-blend-screen">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
          alt="World Map Background" 
          /* invert turns black to white, brightness-50 pulls it down to a perfect gray */
          className="w-[120%] h-auto invert brightness-50"
        />
      </div>

      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16 relative z-10 items-center">
        
        {/* Left Side: Content & Animated Counters */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B99D6] mb-4">
            GLOBAL PRESENCE
          </h2>
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
              <AnimatedCounter end={40} suffix="+" duration={2000} />
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                EXPORT COUNTRIES
              </div>
            </div>

            <div>
              <Zap className="text-[#2B99D6] mb-4" size={24} />
              <AnimatedCounter end={15} suffix="k Tons" duration={2500} />
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                ANNUAL PRODUCTION
              </div>
            </div>

            <div>
              <Ship className="text-[#2B99D6] mb-4" size={24} />
              <AnimatedCounter end={3} suffix=" Regions" duration={1500} />
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                GLOBAL HUBS
              </div>
            </div>
          </div>
        </div>

        {/* 2. Gray Right Side Map UI */}
        <div className="relative w-full aspect-[4/3] bg-white/5 border border-white/10 rounded-sm p-8 shadow-2xl backdrop-blur-sm flex items-center justify-center">
          
          <div className="absolute inset-0 opacity-80 flex items-center justify-center pointer-events-none">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
               alt="Map" 
               /* Applied the same gray filter here with a drop shadow */
               className="w-full invert brightness-50 p-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
             />
          </div>

          <div className="absolute top-[45%] left-[25%] flex flex-col items-center gap-2 group cursor-pointer z-20">
            <div className="w-3 h-3 bg-[#E31E24] rounded-full shadow-[0_0_15px_rgba(227,30,36,0.8)] group-hover:scale-150 transition-transform"></div>
            <span className="text-[8px] font-black tracking-widest uppercase text-white drop-shadow-md">South America</span>
          </div>

          <div className="absolute top-[50%] left-[55%] flex flex-col items-center gap-2 group cursor-pointer z-20">
            <div className="w-3 h-3 bg-[#2B99D6] rounded-full shadow-[0_0_15px_rgba(43,153,214,0.8)] group-hover:scale-150 transition-transform"></div>
            <span className="text-[8px] font-black tracking-widest uppercase text-white drop-shadow-md">Africa</span>
          </div>

          <div className="absolute top-[40%] left-[75%] flex flex-col items-center gap-2 group cursor-pointer z-20">
            <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] group-hover:scale-150 transition-transform"></div>
            <span className="text-[8px] font-black tracking-widest uppercase text-white drop-shadow-md">UAE Hub</span>
          </div>
          
          <div className="absolute bottom-8 text-[10px] font-black tracking-[0.3em] uppercase text-white/40 drop-shadow-sm">
            STRATEGIC EXPORT NETWORK
          </div>
        </div>

      </div>
    </section>
  );
}