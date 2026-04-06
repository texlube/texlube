import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function NewsPage() {
  // ATTEMPT 1: Try fetching type "news". If that's empty, try "post".
  let newsArticles = await client.fetch(`*[_type == "news" || _type == "post"] | order(publishedAt desc){
    title,
    "slug": slug.current,
    "image": coalesce(mainImage.asset->url, image.asset->url),
    "category": categories[0]->title,
    "date": publishedAt,
    excerpt
  }`);

  if (!newsArticles || newsArticles.length === 0) {
    return (
      <main>
        <Navbar />
        <div className="py-60 text-center uppercase font-black text-gray-400 tracking-widest">
          Journal Sync Pending... <br />
          <span className="text-[10px] font-medium mt-4 block">Check if Sanity type matches "news" or "post"</span>
        </div>
        <Footer />
      </main>
    );
  }

  const featuredArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <section className="bg-[#0D243F] pt-40 pb-20 px-6 overflow-hidden relative">
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
            <div className="lg:w-3/5 aspect-video relative overflow-hidden bg-gray-50">
              {featuredArticle.image && (
                <Image src={featuredArticle.image} alt={featuredArticle.title} fill className="object-cover transition-transform group-hover:scale-105" />
              )}
            </div>
            <div className="lg:w-2/5 p-12 flex flex-col justify-center">
              <span className="text-[10px] font-black text-[#2B99D6] uppercase mb-6">{featuredArticle.category || 'Industry News'}</span>
              <h2 className="text-3xl font-black italic text-[#0D243F] uppercase mb-6 leading-tight group-hover:text-[#E31E24]">{featuredArticle.title}</h2>
              <p className="text-gray-500 mb-10 line-clamp-3">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-[11px] font-black uppercase text-[#0D243F]">
                READ FULL STORY <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-[#E31E24]" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingArticles.map((article: any, index: number) => (
            <Link key={index} href={`/news/${article.slug}`} className="bg-white group border border-gray-100 hover:shadow-2xl transition-all flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                {article.image && <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />}
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <span className="text-[9px] font-black text-[#2B99D6] uppercase mb-4">{article.category || 'Report'}</span>
                <h3 className="font-black italic text-xl text-[#0D243F] mb-4 uppercase group-hover:text-[#E31E24]">{article.title}</h3>
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-300">
                  <span>{article.date ? new Date(article.date).toLocaleDateString() : 'LATEST'}</span>
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
