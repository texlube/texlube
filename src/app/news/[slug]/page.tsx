"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { client } from '@/sanity/client';
import { ChevronLeft, Share2, Clock, ChevronRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Icons
const Facebook = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Linkedin = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const Twitter = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
          title,
          "image": mainImage.asset->url,
          "category": categories[0]->title,
          "date": publishedAt,
          author->{name},
          excerpt,
          body
        }`, { slug });
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setReadingProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#E31E24]" size={40} />
    </div>
  );

  if (!article) return <div className="py-40 text-center uppercase font-black text-gray-400">Report Not Found</div>;

  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 relative">
      <Navbar />
      
      {/* READING PROGRESS BAR */}
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
                <p className="text-sm font-bold text-gray-500 uppercase">{article.author?.name || "TexLube Editorial"}</p>
             </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-300 hover:text-[#0077b5] transition-colors"><Linkedin size={18} /></button>
            <button className="text-gray-300 hover:text-[#E31E24] transition-colors"><Twitter size={18} /></button>
            <button className="text-gray-300 hover:text-[#E31E24] transition-colors"><Share2 size={18} /></button>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-[50vh] md:h-[70vh] relative mb-20 bg-gray-100">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-3 sticky top-40 h-fit hidden lg:block">
           <h5 className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-4">Technical Summary</h5>
           <p className="text-[12px] text-gray-400 leading-relaxed font-medium italic">"{article.excerpt}"</p>
        </div>

        <div className="lg:col-span-7">
          <article className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-[#0D243F] prose-headings:uppercase">
             {/* Note: Use @portabletext/react here if your body is a Sanity Portable Text block */}
             <div className="whitespace-pre-line text-lg text-gray-600 leading-relaxed">
               {article.body ? "Article content loaded from Sanity" : "Content pending..."}
             </div>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}
