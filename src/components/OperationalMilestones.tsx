"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsRight 
} from 'lucide-react';
import { operationsData } from '@/data/operations'; 

export default function OperationalMilestones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Stable Media List: Combines Video + Grid Images + Hidden Extra Images
  const albumMedia = useMemo(() => [
    { 
      src: operationsData.featuredVideo.videoSrc || operationsData.featuredVideo.src, 
      type: 'video' 
    },
    ...operationsData.homepageImages.map(img => ({ src: img.src, type: 'image' })),
    ...operationsData.extraImages.map(img => ({ src: img.src, type: 'image' }))
  ], []);

  // 2. Stable Close Function
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, []);

  // 3. Robust Escape Key Listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-white max-w-[1300px] mx-auto shadow-2xl rounded-sm overflow-hidden border-b-4 border-[#E31E24] relative z-20">
      
      {/* HEADER */}
      <div className="px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-[8px] font-black text-[#E31E24] uppercase tracking-[0.4em] mb-1">CORPORATE NEWSFEED</h2>
          <h3 className="text-xl md:text-3xl font-black italic uppercase text-[#0D243F] leading-none tracking-tighter">
            LATEST <span className="text-[#2B99D6]">ACTIVITIES</span>
          </h3>
        </div>
        
        <button 
          onClick={() => openModal(1)} 
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#0D243F] hover:text-[#E31E24] transition-all"
        >
          VIEW ALL {albumMedia.length - 1} PHOTOS <ChevronsRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* THE 1-OVER-2 GRID (Shows only the first 3 images) */}
      <div className="bg-[#0b131e] p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* VIDEO (Index 0) */}
          <div className="lg:col-span-7 relative aspect-video overflow-hidden group cursor-pointer bg-black rounded-sm" onClick={() => openModal(0)}>
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity">
              <source src={operationsData.featuredVideo.videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Play size={24} fill="currentColor" className="ml-1" />
                </div>
            </div>
          </div>

          {/* RIGHT GALLERY (Static 3-Image Layout) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Top Large (Index 1) */}
            <div className="relative h-[60%] overflow-hidden cursor-pointer group bg-[#161e29] rounded-sm min-h-[180px]" onClick={() => openModal(1)}>
                <Image src={operationsData.homepageImages[0].src} alt="Activity" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>

            {/* Bottom 2 (Indices 2 & 3) */}
            <div className="h-[40%] flex gap-4 min-h-[120px]">
                <div className="flex-1 relative overflow-hidden cursor-pointer group bg-[#161e29] rounded-sm" onClick={() => openModal(2)}>
                    <Image src={operationsData.homepageImages[1].src} alt="" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="flex-1 relative overflow-hidden cursor-pointer group bg-[#161e29] rounded-sm" onClick={() => openModal(3)}>
                    <Image src={operationsData.homepageImages[2].src} alt="" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    
                    {/* Visual "More" Overlay */}
                    {operationsData.extraImages.length > 0 && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-black text-xl">+{operationsData.extraImages.length}</span>
                        <span className="text-[7px] text-white/70 font-bold tracking-widest uppercase">More Updates</span>
                      </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX POPUP (Accesses ALL images) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 w-screen h-screen bg-[#0b131e]/98 backdrop-blur-3xl z-[9999] flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); closeModal(); }} 
            className="absolute top-8 right-8 text-white/20 hover:text-[#E31E24] z-[10000] p-4 transition-all"
          >
            <X size={48} strokeWidth={1} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center px-6 md:px-24">
            
            {/* Arrows */}
            <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + albumMedia.length) % albumMedia.length); }} 
                className="absolute left-4 md:left-8 text-white/10 hover:text-white transition-all z-[10000]"
            >
                <ChevronLeft size={80} strokeWidth={0.5} />
            </button>

            <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % albumMedia.length); }} 
                className="absolute right-4 md:right-8 text-white/10 hover:text-white transition-all z-[10000]"
            >
                <ChevronRight size={80} strokeWidth={0.5} />
            </button>

            {/* Media Content */}
            <div className="relative w-full h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {albumMedia[currentIndex].type === 'video' ? (
                <video controls autoPlay className="max-w-full max-h-full shadow-2xl border border-white/5">
                  <source src={albumMedia[currentIndex].src} type="video/mp4" />
                </video>
              ) : (
                <div className="relative w-full h-full shadow-2xl">
                  <Image 
                    src={albumMedia[currentIndex].src} 
                    alt="Gallery View" 
                    fill 
                    className="object-contain" 
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}