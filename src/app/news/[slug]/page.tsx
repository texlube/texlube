"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { newsArticles } from '@/data/news';
import { ChevronLeft, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug;
  const [readingProgress, setReadingProgress] = useState(0);

  const article = newsArticles.find((p) => p.slug === slug);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setReadingProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  if (!article) return notFound();

  const getImagePath = (path: string) => path.startsWith('/') ? path : `/${path}`;

  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 relative">
      <Navbar />
      
      {/* PROGRESS BAR */}
      <div className="fixed top-[105px] md:top-[115px] left-0 w-full h-[3px] bg-gray-100 z-[101]">
        <div className="h-full bg-[#E31E24] transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 mb-16">
        <Link href="/news" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#2B99D6] hover:text-[#E31E24] transition-colors mb-12 group">
          <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO JOURNAL
        </Link>

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
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2 hidden sm:block">SHARE THIS REPORT</span>
            {/* Standard Lucide Icons used here for build safety */}
            <button className="text-gray-300 hover:text-[#0077b5] transition-colors"><Linkedin size={18} /></button>
            <button className="text-gray-300 hover:text-[#1DA1F2] transition-colors"><Twitter size={18} /></button>
            <button className="text-gray-300 hover:text-[#4267B2] transition-colors"><Facebook size={18} /></button>
            <button className="text-gray-300 hover:text-[#E31E24] transition-colors"><Share2 size={18} /></button>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-[50vh] md:h-[70vh] relative mb-20 bg-gray-100">
        <Image src={getImagePath(article.image)} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-3 sticky top-40 h-fit hidden lg:block">
           <h5 className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-4">Technical Summary</h5>
           <p className="text-[12px] text-gray-400 leading-relaxed font-medium italic">"{article.excerpt}"</p>
        </div>

        <div className="lg:col-span-7">
          <article 
            className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-[#0D243F]" 
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
