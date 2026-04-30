"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combine media: 1 Video + 10 Images total
  const albumMedia = useMemo(() => [
    { 
      // Pointing directly to public root
      src: operationsData.featuredVideo?.videoSrc || "/milestone-video.mp4", 
      type: 'video' 
    },
    ...(operationsData.homepageImages?.map(img => ({ src: img.src, type: 'image' })) || []),
    ...(operationsData.extraImages?.map(img => ({ src: img.src, type: 'image' })) || [])
  ], []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, []);

  // Force video to play when the modal opens
  useEffect(() => {
    if (isModalOpen && albumMedia[currentIndex].type === 'video' && videoRef.current) {
      videoRef.current.play().catch(error => console.error("Video play failed:", error));
    }
  }, [isModalOpen, currentIndex, albumMedia]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
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
    if (albumMedia[index]) {
      setCurrentIndex(index);
      setIsModalOpen(true);
    }
  };

  return (
    <section className="bg-white max-w-[1300px] mx-auto shadow-2xl rounded-sm overflow-hidden border-b-4 border-[#E31E24] relative z-20">
      
      {/* HEADER */}
      <div className="px-5 md:px-8 py-5 md:py-6 bg-white border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[9px] font-black text-[#E31E24] uppercase tracking-[0.4em] mb-1">CORPORATE NEWSFEED</h2>
          <h3 className="text-xl md:text-3xl font-black italic uppercase text-[#0D243F] leading-none tracking-tighter">
            LATEST <span className="text-[#2B99D6]">ACTIVITIES</span>
          </h3>
        </div>
        
        <button 
          onClick={() => openModal(1)} 
          className="group flex items-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#0D243F] hover:text-[#E31E24] transition-all"
        >
          VIEW ALL {Math.max(0, albumMedia.length - 1)} PHOTOS <ChevronsRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* REVERTED GRID: Large Video (Left) | 1 Large + 2 Small Imgs (Right) */}
      <div className="bg-[#0b131e] p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Video (Index 0) */}
          <div className="lg:col-span-7 relative aspect-video overflow-hidden group cursor-pointer bg-black rounded-sm" onClick={() => openModal(0)}>
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity">
              <source src={albumMedia[0].src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" />
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Top Image (Index 1) */}
            <div className="relative h-48 md:h-64 lg:h-[60%] overflow-hidden cursor-pointer group bg-[#161e29] rounded-sm" onClick={() => openModal(1)}>
                {albumMedia[1] && <Image src={albumMedia[1].src} alt="" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />}
            </div>

            <div className="h-32 md:h-40 lg:h-[40%] flex gap-4">
                {/* Bottom Left (Index 2) */}
                <div className="flex-1 relative overflow-hidden cursor-pointer group bg-[#161e29] rounded-sm" onClick={() => openModal(2)}>
                    {albumMedia[2] && <Image src={albumMedia[2].src} alt="" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />}
                </div>
                {/* Bottom Right (Index 3 - gallery-6 should be assigned here in your data file) */}
                <div className="flex-1 relative overflow-hidden cursor-pointer group bg-[#161e29] rounded-sm" onClick={() => openModal(3)}>
                    {albumMedia[3] && <Image src={albumMedia[3].src} alt="" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />}
                    
                    {/* Overlay Counter */}
                    {albumMedia.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity">
                        <span className="text-white font-black text-lg md:text-xl">+{albumMedia.length - 4}</span>
                        <span className="text-[7px] text-white/70 font-bold tracking-widest uppercase">More Updates</span>
                      </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX POPUP */}
      {isModalOpen && albumMedia[currentIndex] && (
        <div 
          className="fixed inset-0 w-screen h-screen bg-black/95 z-[9999] flex items-center justify-center overflow-hidden touch-none"
          onClick={closeModal}
        >
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); closeModal(); }} 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/40 hover:text-[#E31E24] z-[10001] p-2 transition-all"
          >
            <X className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-24">
            
            <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + albumMedia.length) % albumMedia.length); }} 
                className="absolute left-2 md:left-8 text-white/10 hover:text-white transition-all z-[10000]"
            >
                <ChevronLeft className="w-10 h-10 md:w-20 md:h-20" strokeWidth={0.5} />
            </button>

            <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % albumMedia.length); }} 
                className="absolute right-2 md:right-8 text-white/10 hover:text-white transition-all z-[10000]"
            >
                <ChevronRight className="w-10 h-10 md:w-20 md:h-20" strokeWidth={0.5} />
            </button>

            <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {albumMedia[currentIndex].type === 'video' ? (
                <video 
                  ref={videoRef}
                  controls 
                  autoPlay 
                  playsInline 
                  className="max-w-full max-h-full shadow-2xl border border-white/5 bg-black"
                >
                  <source src={albumMedia[currentIndex].src} type="video/mp4" />
                </video>
              ) : (
                <div className="relative w-full h-full">
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

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                {currentIndex + 1} / {albumMedia.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}