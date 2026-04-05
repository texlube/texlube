import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { newsArticles } from '@/data/news'; // Pulling from our new central database

export default function NewsSection() {
  // Only show the first 5 articles on the homepage
  const homepageArticles = newsArticles.slice(0, 5);

  return (
    <section className="bg-[#F5F5F7] py-24 px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {homepageArticles.map((article, index) => (
            <Link 
              href={`/news/${article.slug}`} // Dynamically routes to the article
              key={index} 
              className={`bg-white flex flex-col group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 ${
                article.isFeatured ? 'lg:col-span-1 lg:row-span-2' : 'col-span-1'
              }`}
            >
              <div className={`w-full overflow-hidden relative ${article.isFeatured ? 'aspect-[4/3] lg:aspect-auto lg:h-[45%]' : 'aspect-video'}`}>
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <span className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-3">{article.category}</span>
                <h3 className={`font-bold italic text-[#0D243F] mb-4 leading-tight group-hover:text-[#E31E24] transition-colors ${article.isFeatured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">{article.excerpt}</p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.date}</span>
                  <div className="flex items-center gap-2 text-[#E31E24] text-[10px] font-black uppercase tracking-widest">
                    READ MORE
                    <span className="w-4 h-4 rounded-full bg-[#E31E24] text-white flex items-center justify-center"><ChevronRight size={10} strokeWidth={4} /></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/news" className="border-2 border-[#E31E24] text-[#E31E24] px-10 py-3 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-[#E31E24] hover:text-white transition-all duration-300">
            GO TO NEWS PAGE
          </Link>
        </div>
      </div>
    </section>
  );
}