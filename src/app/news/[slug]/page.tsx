import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { newsArticles } from '@/data/news';
import { ChevronLeft, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Local Icons
const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const LinkedinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const TwitterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;

export async function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = newsArticles.find((p) => p.slug === resolvedParams.slug);

  if (!article) return notFound();

  // THE ULTIMATE PATH FIXER
  const getImagePath = (path: any) => {
    if (!path) return '/logo.png';
    
    // 1. Handle Unsplash/External Links
    if (typeof path === 'string' && path.includes('http')) {
      return path.trim();
    }
    
    // 2. Handle local paths (ensure they start with / and don't double-up)
    const cleanPath = path.toString().trim();
    const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    
    // DEBUG: This will show up in your terminal during build
    console.log(`TexLube Image Debug: ${finalPath}`);
    
    return finalPath;
  };

  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24">
      <Navbar />
      <div className="max-w-[1000px] mx-auto px-6 mb-16">
        <Link href="/news" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#2B99D6] hover:text-[#E31E24] mb-12">
          <ChevronLeft size={16} /> BACK TO JOURNAL
        </Link>
        <h1 className="text-4xl md:text-6xl font-black italic text-[#0D243F] mb-10 leading-[0.95] uppercase tracking-tighter">{article.title}</h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 py-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center font-black text-[#0D243F] italic">TX</div>
             <div>
                <p className="text-[10px] font-black text-[#0D243F] uppercase mb-1">PUBLISHED BY</p>
                <p className="text-sm font-bold text-gray-500 uppercase">{article.author}</p>
             </div>
          </div>
          <div className="flex items-center gap-5">
            <LinkedinIcon />
            <TwitterIcon />
            <FacebookIcon />
            <Share2 size={18} className="text-gray-300" />
          </div>
        </div>
      </div>

      <div className="w-full h-[50vh] md:h-[70vh] relative mb-20 bg-gray-50">
        <Image 
          src={getImagePath(article.image)} 
          alt={article.title} 
          fill 
          className="object-cover" 
          priority 
          unoptimized // Forces browser to load directly, bypassing Vercel's strict image optimization
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-3 sticky top-40 h-fit hidden lg:block">
           <h5 className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-4">Summary</h5>
           <p className="text-[12px] text-gray-400 leading-relaxed font-medium italic">"{article.excerpt}"</p>
        </div>
        <div className="lg:col-span-7">
          <article className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-[#0D243F]" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </main>
  );
}