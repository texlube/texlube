import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <main className="bg-[#F5F5F7] min-h-screen pt-[140px] pb-24 px-6">
      <div className="max-w-[1300px] mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#E31E24] transition-colors mb-12">
          <ChevronLeft size={14} /> BACK TO HOME
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-black italic uppercase text-[#0D243F] tracking-tighter mb-16">
          TEXLUBE <span className="text-[#E31E24]">IN ACTION</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Reusable Gallery Card Logic */}
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white p-4 shadow-sm group">
              <div className="relative aspect-video overflow-hidden mb-6">
                <Image 
                  src={`https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800&sig=${i}`} 
                  alt="Company Activity" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h4 className="font-black italic text-[#0D243F] uppercase tracking-tighter">Operations Milestone 0{i}</h4>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 block">MARCH 2026</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}