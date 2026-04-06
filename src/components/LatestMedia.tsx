"use client";

import { useState } from 'react';
import { Play, ChevronRight, X } from 'lucide-react';

// Icons with TypeScript support
const Facebook = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

export default function LatestMedia() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const youtubeVideoId = "dQw4w9WgXcQ"; 

  const socialPosts = [
    { platform: 'TikTok', title: 'Technical Perfection: Behind the Scenes', icon: <TikTokIcon size={16} />, link: 'https://tiktok.com/@texlube' },
    { platform: 'Facebook', title: 'New OE Approvals for OFFICIALTECH', icon: <Facebook size={16} />, link: 'https://facebook.com/texlube' },
    { platform: 'Instagram', title: 'Supporting the Next Gen of Racers', icon: <Instagram size={16} />, link: 'https://instagram.com/texlube' },
    { platform: 'LinkedIn', title: 'Corporate B2B Growth Case Study', icon: <Linkedin size={16} />, link: 'https://linkedin.com/company/texlube' },
  ];

  return (
    <section 
      className="relative py-16 md:py-32 px-6 bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000')` }}
    >
      <div className="absolute inset-0 bg-white/90 z-0" />

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 relative z-10">
        
        {/* LEFT SIDE: Text Content */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D243F] mb-4">
            TEXLUBE MEDIA HUB
          </h2>
          <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0D243F] leading-tight mb-6 md:mb-8">
            NOW LIVE: 'DRIVE YOUR <br className="hidden md:block" /> PROGRESS" SERIES
          </h3>
          <p className="text-gray-600 mb-8 md:mb-10 leading-relaxed font-medium max-w-md mx-auto lg:mx-0 italic text-sm md:text-base">
            Our new video series takes you on an exhilarating adventure to explore the concept of "progress" from various angles, featuring tales of extraordinary individuals who embody the spirit of relentless pursuit.
          </p>
          
        </div>

        {/* RIGHT SIDE: Media Grid */}
        <div className="flex flex-col gap-6">
          
          {/* VIDEO PLAYER CONTAINER */}
          <div className="relative w-full aspect-[16/9] shadow-2xl bg-[#0b131e] overflow-hidden group border border-gray-100 rounded-sm">
            {!isVideoPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors duration-300"
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="relative w-16 h-16 rounded-full border border-white/50 bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10 shadow-xl">
                  <Play size={24} className="text-white fill-white ml-1" />
                </div>
                <span className="absolute bottom-5 left-6 text-[9px] font-black tracking-[0.2em] text-white/90 uppercase z-10">
                  TEXLUBE FEATURE VIDEO
                </span>
              </div>
            ) : (
              <div className="relative w-full h-full animate-in fade-in duration-500">
                {/* CLOSE VIDEO BUTTON - Fixes the "Navigation Trap" */}
                <button 
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute -top-1 -right-1 md:top-4 md:right-4 z-50 bg-[#E31E24] text-white p-2 md:p-3 shadow-xl hover:bg-[#0D243F] transition-colors rounded-sm flex items-center gap-2 group"
                >
                  <X size={20} />
                  <span className="hidden md:block text-[9px] font-black uppercase tracking-widest">Close Video</span>
                </button>
                
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* SOCIAL GRID - Responsive Stacking */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {socialPosts.map((post, index) => (
              <a 
                key={index}
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-end min-h-[180px] md:min-h-[220px] group"
              >
                <div className="mb-auto">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-100 text-[#2B99D6] group-hover:bg-[#E31E24] group-hover:text-white group-hover:border-[#E31E24] transition-all duration-300">
                    {post.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-[#0D243F] font-black italic text-sm mb-2 md:mb-3 group-hover:text-[#2B99D6] transition-colors leading-snug line-clamp-2 uppercase tracking-tighter">
                    {post.title}
                  </h4>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-300">
                    {post.platform}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
