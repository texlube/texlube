"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { newsArticles } from '@/data/news';
import { ChevronLeft, Share2, Clock, ChevronRight } from 'lucide-react'; // Standard icons only

// CUSTOM BRAND ICONS (Since Lucide-React doesn't export these)
const Facebook = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Twitter = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export default function ArticlePage() {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);

  const article = newsArticles.find((p) => p.slug === slug);

  // READING PROGRESS LOGIC
  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setReadingProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  if (!article) return notFound();
  
  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 relative">
      
      {/* READING PROGRESS BAR */}
      <div className="fixed top-[105px] md:top-[115px] left-0 w-full h-[3px] bg-gray-100 z-[101]">
        <div 
          className="h-full bg-[#E31E24] transition-all duration-150" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* HEADER CONTENT */}
      <div className="max-w-[1000px] mx-auto px-6 mb-16">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#2B99D6] hover:text-[#E31E24] transition-colors mb-12 group"
        >
          <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO JOURNAL
        </Link>

        <div className="flex flex-wrap items-center gap-6 mb-8">
          <span className="bg-[#0D243F] text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest">{article.category}</span>
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            <Clock size={12} /> 5 MIN READ
          </div>
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black italic text-[#0D243F] mb-10 leading-[0.95] uppercase tracking-tighter">
          {article.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 py-6 gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center font-black text-[#0D243F] italic">TX</div>
             <div>
                <p className="text-[10px] font-black text-[#0D243F] uppercase tracking-widest mb-1">PUBLISHED BY</p>
                <p className="text-sm font-bold text-gray-500 uppercase">{article.author}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-5">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">SHARE THIS REPORT</span>
            <button className="text-gray-300 hover:text-[#0077b5] transition-colors"><Linkedin size={18} /></button>
            <button className="text-gray-300 hover:text-[#E31E24] transition-colors"><Twitter size={18} /></button>
            <button className="text-gray-300 hover:text-[#E31E24] transition-colors"><Share2 size={18} /></button>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-[50vh] md:h-[70vh] relative mb-20">
        <Image 
          src={article.image} 
          alt={article.title} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sidebar Info */}
        <div className="hidden lg:block lg:col-span-3 sticky top-40 h-fit space-y-12">
           <div>
              <h5 className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-4">Technical Summary</h5>
              <p className="text-[12px] text-gray-400 leading-relaxed font-medium italic">
                "{article.excerpt}"
              </p>
           </div>
           <div className="p-6 bg-[#F8F9FA] border-l-4 border-[#2B99D6]">
              <p className="text-[10px] font-black text-[#0D243F] uppercase mb-2">Need advice?</p>
              <Link href="/contact" className="text-[10px] font-bold text-[#2B99D6] hover:text-[#E31E24] uppercase underline underline-offset-4 transition-colors">
                Consult an Engineer
              </Link>
           </div>
        </div>

        {/* Article Body */}
        <div className="lg:col-span-7">
          <article 
            className="prose prose-lg max-w-none 
              prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg
              prose-headings:font-black prose-headings:italic prose-headings:text-[#0D243F] prose-headings:uppercase prose-headings:tracking-tighter
              prose-blockquote:border-l-4 prose-blockquote:border-[#E31E24] prose-blockquote:bg-[#F8F9FA] prose-blockquote:p-8 prose-blockquote:text-2xl prose-blockquote:font-black prose-blockquote:italic
              prose-strong:text-[#0D243F] prose-strong:font-black"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>

      {/* NEXT STORY NAVIGATION */}
      <div className="max-w-[1000px] mx-auto px-6 mt-32">
         <Link href="/news" className="bg-[#0D243F] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer no-underline block">
            <div className="relative z-10 max-w-md">
               <span className="text-[#E31E24] font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">Up Next</span>
               <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-tight group-hover:text-[#2B99D6] transition-colors">
                  The Future of Synthetic Lubricants in Desert Environments
               </h4>
            </div>
            <div className="relative z-10 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#E31E24] group-hover:border-[#E31E24] transition-all">
               <ChevronRight size={24} />
            </div>
         </Link>
      </div>

    </main>
  );
}