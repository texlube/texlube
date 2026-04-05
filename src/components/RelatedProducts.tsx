"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  viscosity: string;
  image: string;
}

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mt-32 pt-16 border-t border-gray-100">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h4 className="text-[10px] font-black text-[#E31E24] uppercase tracking-[0.4em] mb-4">RECOMMENDED SOLUTIONS</h4>
          <h2 className="text-3xl font-black italic text-[#0D243F] uppercase tracking-tighter">TECHNICAL <span className="text-[#2B99D6]">COMPLEMENTS</span></h2>
        </div>
        <Link href="/products" className="text-[10px] font-black text-gray-400 hover:text-[#0D243F] uppercase tracking-widest flex items-center gap-2 transition-all">
          VIEW ALL PRODUCTS <ChevronRight size={14} />
        </Link>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className="min-w-[280px] md:min-w-[320px] bg-white border border-gray-50 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="relative aspect-square bg-[#FBFBFC] flex items-center justify-center p-8 overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                  <span className="text-6xl font-black italic text-[#0D243F]">TEX</span>
               </div>
               <Image src={product.image} alt={product.name} width={150} height={150} className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-sm font-black italic text-[#0D243F] uppercase tracking-tighter mb-4 leading-tight">
                {product.name}
              </h3>
              <div className="bg-[#F8F9FA] px-3 py-2 flex justify-between items-center border-l-2 border-[#E31E24]">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{product.viscosity}</span>
                <span className="text-[8px] font-black text-[#E31E24] uppercase tracking-widest">UAE GRADE</span>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-[9px] font-black text-[#2B99D6] uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  DETAILS <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}