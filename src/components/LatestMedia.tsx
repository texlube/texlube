"use client";

import { useState } from 'react';
import { Play, X, MonitorPlay, MessageCircle, Share2 } from 'lucide-react'; // Removed 'Youtube'

// Manual Brand Icons to avoid build errors
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);

const Facebook = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

export default function LatestMedia() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  const mainVideoId = "dQw4w9WgXcQ"; 

  const industryVideos = [
    { id: '4Fmmg135QJQ', title: 'Lubricant Blending', desc: 'Technical' },
    { id: '8J9jmY4oH-I', title: 'Extreme Heat Test', desc: 'Performance' },
    { id: 'Yp7p6O-n_7o', title: 'Industrial Solutions', desc: 'B2B Gear' },
    { id: 'L09e-7Gz3mI', title: 'Synthetic Science', desc: 'Lab' },
  ];

  const socialPosts = [
    { platform: 'TikTok', icon: <TikTokIcon />, link: 'https://tiktok.com/@texlube' },
    { platform: 'Facebook', icon: <Facebook />, link: 'https://facebook.com/texlube' },
    { platform: 'Instagram', icon: <Instagram />, link: 'https://instagram.com/texlube' },
    { platform: 'LinkedIn', icon: <Linkedin />, link: 'https://linkedin.com/company/texlube' },
  ];

  return (
    <section 
      className="relative py-16 md:py-32 px-6 bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000')` }}
    >
      <div className="absolute inset-0 bg-white/95 z-0" />

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 relative z-10">
        
        {/* LEFT COLUMN: Narrative & Social Connect */}
        <div className="flex flex-col justify-center">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-4">
              TEXLUBE MEDIA HUB
            </h2>
            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0D243F] leading-tight mb-8">
              ENGINEERING <br className="hidden md:block" /> <span className="text-[#2B99D6]">IN MOTION</span>
            </h3>
            <p className="text-gray-600 mb-10 leading-relaxed font-medium max-w-md mx-auto lg:mx-0 text-sm md:text-base">
              Explore our technical series and social updates. From the science of the lab to the performance on the road, follow the journey of progress.
            </p>
          </div>

          {/* Social Connect Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
            {socialPosts.map((post, index) => (
              <a 
                key={index} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 p-6 flex flex-col items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#F8F9FA] flex items-center justify-center text-[#2B99D6] group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                  {post.icon}
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#0D243F]">
                    {post.platform}
                  </span>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Connect Now</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Video Player & Technical Gallery */}
        <div className="flex flex-col gap-6">
          
          {/* Main Featured Video */}
          <div className="relative w-full aspect-[16/9] shadow-2xl bg-[#0b131e] overflow-hidden group border border-gray-100 rounded-sm">
            {!isVideoPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <img 
                   src={`https://img.youtube.com/vi/${mainVideoId}/maxresdefault.jpg`} 
                   className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700" 
                   alt="Main Feature"
                />
                <div className="relative w-16 h-16 rounded-full border border-white/30 bg-black/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E31E24] transition-all duration-300 z-10 shadow-2xl">
                  <Play size={24} className="text-white fill-white ml-1" />
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <button 
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-4 right-4 z-50 bg-[#E31E24] text-white p-2 shadow-xl hover:bg-[#0D243F] transition-colors rounded-sm"
                >
                  <X size={16} />
                </button>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=1&rel=0`}
                  title="Main Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* Technical Video Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {industryVideos.map((video, index) => (
              <div 
                key={index}
                onClick={() => setActiveModalVideo(video.id)} 
                className="relative aspect-video bg-[#0b131e] group cursor-pointer overflow-hidden rounded-sm shadow-md"
              >
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                  alt={video.title}
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <YoutubeIcon size={12} className="text-[#E31E24]" />
                    <span className="text-[7px] font-black text-[#2B99D6] uppercase tracking-widest">{video.desc}</span>
                  </div>
                  <h4 className="text-white font-black italic text-[10px] md:text-[11px] leading-tight uppercase tracking-tighter">
                    {video.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GLOBAL VIDEO MODAL */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12">
           <div className="absolute inset-0 bg-[#0D243F]/98 backdrop-blur-xl" onClick={() => setActiveModalVideo(null)} />
           <div className="relative w-full max-w-5xl aspect-[16/9] bg-black shadow-2xl rounded-sm overflow-hidden z-10 border border-white/5">
              <button 
                onClick={() => setActiveModalVideo(null)}
                className="absolute top-4 right-4 z-50 bg-[#E31E24] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-white hover:text-[#E31E24] transition-all rounded-sm flex items-center gap-2"
              >
                <X size={18} /> EXIT PLAYER
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeModalVideo}?autoplay=1&rel=0`}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}
    </section>
  );
}