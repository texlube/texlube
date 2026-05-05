"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Download, FileText, CheckCircle2, ShieldCheck, ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import TDSDownloadModal from '@/components/TDSDownloadModal';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id; 
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0] {
          title,
          description,
          "image": mainImage.asset->url,
          "categoryName": category->title,
          specifications,
          "tdsUrl": tdsFile.asset->url
        }`;
        
        const data = await client.fetch(query, { id });
        
        if (!data) {
          console.error("Product not found for ID:", id);
          return;
        }
        
        setProduct(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Helper function to handle Sanity's Rich Text (Block Content)
  const renderDescription = () => {
    if (!product?.description) return "Engineered for peak performance and engine longevity.";

    // If description is Sanity Block Content (Array of objects)
    if (Array.isArray(product.description)) {
      return product.description
        .map((block: any) => 
          block.children?.map((child: any) => child.text).join('')
        )
        .join('\n');
    }

    // If it's already a simple string
    return product.description;
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-[#E31E24]" size={40} />
    </div>
  );

  if (!product) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white px-6 text-center">
      <h2 className="text-2xl font-black uppercase text-[#0D243F] mb-4">Product Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">We couldn't find the technical specifications for this item.</p>
      <Link href="/products" className="bg-[#E31E24] text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest">
        Back to Catalogue
      </Link>
    </div>
  );

  return (
    <main className="bg-white min-h-screen pt-[140px] pb-24">
      <div className="max-w-[1300px] mx-auto px-6">
        
        <Link href="/products" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2B99D6] mb-12 hover:text-[#0D243F] transition-colors">
          <ChevronLeft size={14} /> BACK TO CATALOGUE
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* PRODUCT IMAGE */}
          <div className="bg-[#F8F9FA] p-12 relative group overflow-hidden border border-gray-100 rounded-sm">
            <div className="relative aspect-square">
               {product.image ? (
                 <Image 
                   src={product.image} 
                   alt={product.title} 
                   fill 
                   className="object-contain" 
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black text-[10px]">Image Pending</div>
               )}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <span className="text-[#E31E24] font-black text-[10px] tracking-[0.4em] uppercase mb-4">
              {product.categoryName}
            </span>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#0D243F] leading-[0.9] mb-8">
              {product.title}
            </h1>
            
            {/* CORRECTED DESCRIPTION AREA */}
            <p className="text-gray-500 leading-relaxed mb-10 text-base font-medium whitespace-pre-line">
              {renderDescription()}
            </p>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-6 mb-12 border-t border-gray-100 pt-10">
              {product.specifications?.map((spec: any, i: number) => (
                <div key={i}>
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">{spec.label}</p>
                  <p className="text-sm font-black text-[#0D243F] uppercase italic">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* DOWNLOAD CTA */}
            {product.tdsUrl ? (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-between bg-[#0D243F] text-white px-10 py-6 font-black uppercase text-[11px] tracking-widest hover:bg-[#E31E24] transition-all duration-500 shadow-xl group"
              >
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-[#2B99D6]" />
                  DOWNLOAD TECHNICAL DATA SHEET (TDS)
                </div>
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <div className="p-4 bg-gray-50 border border-dashed text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                TDS Document is currently under revision
              </div>
            )}
            
            {/* UPDATED: Changed label to API Service Compliant */}
            <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={12} className="text-[#2B99D6]" /> 
              API SERVICE COMPLIANT
            </p>
          </div>
        </div>
      </div>

      <TDSDownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        fileUrl={product.tdsUrl}
        productName={product.title}
      />
    </main>
  );
}