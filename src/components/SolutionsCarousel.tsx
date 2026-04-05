"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const solutions = [
  {
    title: "OUR SOLUTIONS FOR PASSENGER CARS",
    image: "https://images.unsplash.com/photo-1633767859621-c44623dbf8bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "passenger-car"
  },
  {
    title: "OUR SOLUTIONS FOR TRUCKS & BUSSES",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    slug: "trucks-busses"
  },
  {
    title: "OUR SOLUTIONS FOR MOTOR CYCLES",
    image: "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "motor-cycle"
  },
  {
    title: "OUR SOLUTIONS FOR ATF & GEAR",
    image: "https://images.unsplash.com/photo-1681113376967-1fcd00cf78ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "atf-gear"
  },
  {
    title: "OUR SOLUTIONS FOR INDUSTRIAL",
    image: "https://images.unsplash.com/photo-1717386255767-52643970d483?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "industrial"
  },
  {
    title: "OUR SOLUTIONS FOR HYDRAULIC",
    image: "https://images.unsplash.com/photo-1718004064215-1d28df8fc8c8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "hydraulic"
  },
  {
    title: "OUR SOLUTIONS FOR SPECIALTY OIL",
    image: "https://images.unsplash.com/photo-1760804462141-442810513d4e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "specialty-oil"
  },
  {
    title: "OUR SOLUTIONS FOR GREASES",
    image: "https://images.unsplash.com/photo-1742729251811-3e4026420812?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "greases"
  }
];

export default function SolutionsCarousel() {
  // align: 'start' ensures the first card sticks to the left padding of the centered container
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 bg-[#F5F5F7]">
      {/* Container is centered with mx-auto */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="mb-8 md:mb-0">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E31E24] mb-3">TEXLUBE APPLICATIONS</h2>
            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0D243F] leading-none">
              ENGINEERED <span className="text-[#2B99D6]">SOLUTIONS</span>
            </h3>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-3">
            <button 
              onClick={scrollPrev} 
              className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center text-[#0D243F] hover:bg-[#0D243F] hover:text-white transition-all shadow-sm rounded-sm group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollNext} 
              className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center text-[#0D243F] hover:bg-[#0D243F] hover:text-white transition-all shadow-sm rounded-sm group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 lg:-ml-6">
            {solutions.map((item, index) => (
              <div 
                key={index} 
                // flex-[0_0_25%] forces exactly 4 cards on desktop
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-4 lg:pl-6"
              >
                <Link 
                  href={`/products?category=${item.slug}`}
                  className="bg-white group cursor-pointer border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col no-underline rounded-sm overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D243F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="p-8 text-center flex flex-col items-center flex-grow">
                    <h4 className="font-black italic text-[16px] text-[#0D243F] mb-10 leading-[1.2] uppercase tracking-tighter min-h-[3rem] group-hover:text-[#E31E24] transition-colors">
                      {item.title}
                    </h4>
                    
                    <div className="mt-auto flex items-center gap-3 text-[#2B99D6] text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-[#0D243F] transition-colors">
                      LEARN MORE
                      <span className="w-8 h-8 rounded-full bg-[#2B99D6] text-white flex items-center justify-center group-hover:bg-[#0D243F] transition-all shadow-md group-hover:scale-110">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}