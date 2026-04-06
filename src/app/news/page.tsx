import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { newsArticles } from '@/data/news';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NewsPage() {
  const featuredArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1);

  // FIXED HELPER: Checks if it's already a full web link before adding a slash
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http')) return path; // Returns Unsplash links as they are
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <main className="bg-white min-h-screen pt-[120px]">
      <Navbar />
      <section className="bg-[#0D243F] py-20 px-6 overflow-hidden relative">
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
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
            </div>
            <div className="lg:w-2/5 p-12 md:p-16 flex flex-col justify-center">
              <span className="text-[10px] font-black text-[#2B99D6] uppercase mb-6">{featuredArticle.category}</span>
              <h2 className="text-3xl md:text-4xl font-black italic text-[#0D243F] uppercase mb-6 group-hover:text-[#E31E24] transition-colors">{featuredArticle.title}</h2>
              <p className="text-gray-500 mb-10 line-clamp-4">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-[#0D243F]">READ FULL STORY <ArrowRight size={18} /></div>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingArticles.map((article, index) => (
            <Link key={index} href={`/news/${article.slug}`} className="bg-white flex flex-col group border border-gray-100 hover:shadow-2xl transition-all">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <Image 
                  src={getImagePath(article.image)} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <span className="text-[9px] font-black text-[#2B99D6] uppercase mb-4">{article.category}</span>
                <h3 className="font-black italic text-xl text-[#0D243F] mb-4 uppercase group-hover:text-[#E31E24]">{article.title}</h3>
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-300">
                  <span>{article.date}</span>
                  <span className="text-[#E31E24]">READ MORE →</span>
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