"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { newsArticles } from '@/data/news';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NewsPage() {
  // Safety: ensure we have articles
  if (!newsArticles || newsArticles.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[10px] font-black uppercase tracking-widest">No articles found.</p>
      </main>
    );
  }

  const featuredArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1);

  // Helper to ensure paths work on nested routes
  const getImagePath = (path: string) => path.startsWith('/') ? path : `/${path}`;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* HERO */}
      <section className="bg-[#0D243F] pt-40 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E31E24] opacity-5 -skew-x-12 translate-x-20" />
        <div className="max-w-[1300px] mx-auto relative z-10">
          <span className="text-[#E31E24] font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Insights & Intelligence</span>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none mb-8">
            THE TEXLUBE <br /><span className="text-[#2B99D6]">JOURNAL</span>
          </h1>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 px-6 -mt-10">
        <div className="max-w-[1300px] mx-auto">
          <Link href={`/news/${featuredArticle.slug}`} className="group flex flex-col lg:flex-row bg-white shadow-2xl overflow-hidden border border-gray-100">
            <div className="lg:w-3/5 aspect-video relative overflow-hidden bg-gray-100">
              <Image 
                src={getImagePath(featuredArticle.image)} 
                alt={featuredArticle.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute top-6 left-6 bg-[#E31E24] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">LATEST</div>
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

      {/* GRID */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingArticles.map((article, index) => (
            <Link key={index} href={`/news/${article.slug}`} className="bg-white flex flex-col group border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <Image 
                  src={getImagePath(article.image)} 
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
      </section>

      <Footer />
    </main>
  );
}
