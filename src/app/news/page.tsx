"use client";

import React from 'react';
import { ChevronRight, Search, ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { newsArticles } from '@/data/news';

export default function NewsPage() {
  const featuredArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1);

  return (
    <main className="bg-white min-h-screen pt-[120px]">
      
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="bg-[#0D243F] py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E31E24] opacity-5 -skew-x-12 translate-x-20" />
        <div className="max-w-[1300px] mx-auto relative z-10">
          <span className="text-[#E31E24] font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Insights & Intelligence</span>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none mb-8">
            THE TEXLUBE <br /><span className="text-[#2B99D6]">JOURNAL</span>
          </h1>
          
          
        </div>
      </section>

      {/* SECTION 2: FEATURED ARTICLE (Split Layout) */}
      <section className="py-20 px-6 -mt-10">
        <div className="max-w-[1300px] mx-auto">
          <Link href={`/news/${featuredArticle.slug}`} className="group flex flex-col lg:flex-row bg-white shadow-2xl overflow-hidden border border-gray-100">
            <div className="lg:w-3/5 aspect-video lg:aspect-auto relative overflow-hidden">
              <Image 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute top-6 left-6 bg-[#E31E24] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">LATEST UPDATE</div>
            </div>
            <div className="lg:w-2/5 p-12 md:p-16 flex flex-col justify-center">
              <span className="text-[10px] font-black text-[#2B99D6] uppercase tracking-[0.3em] mb-6">{featuredArticle.category}</span>
              <h2 className="text-3xl md:text-4xl font-black italic text-[#0D243F] uppercase mb-6 leading-tight group-hover:text-[#E31E24] transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed line-clamp-4">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-[#0D243F]">
                READ FULL STORY <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-[#E31E24]" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 3: ARTICLE GRID */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {remainingArticles.map((article, index) => (
              <Link key={index} href={`/news/${article.slug}`} className="bg-white flex flex-col group border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <span className="text-[9px] font-black text-[#2B99D6] uppercase tracking-widest mb-4">{article.category}</span>
                  <h3 className="font-black italic text-xl text-[#0D243F] mb-4 uppercase leading-tight group-hover:text-[#E31E24] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">{article.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    <span>{article.date}</span>
                    <span className="text-[#E31E24]">READ ARTICLE →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STAY UPDATED CTA */}
      <section className="py-24 px-6 bg-[#0D243F] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="grid grid-cols-6 h-full w-full">
              {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20 h-full"></div>)}
           </div>
        </div>
        <div className="max-w-2xl mx-auto relative z-10">
          <h4 className="text-2xl md:text-3xl font-black italic text-white uppercase mb-6 tracking-tighter">Stay ahead of the <span className="text-[#E31E24]">Friction</span></h4>
          <p className="text-white/60 text-sm mb-10 tracking-wide uppercase font-bold">Join 5,000+ engineers receiving our monthly technical updates.</p>
          <div className="flex flex-col sm:flex-row gap-4">
             <input type="email" placeholder="Work Email Address" className="flex-1 bg-white/5 border border-white/20 px-6 py-4 text-white text-sm outline-none focus:border-[#E31E24]" />
             <button className="bg-[#E31E24] text-white px-10 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-[#2B99D6] transition-all">SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </main>
  );
}