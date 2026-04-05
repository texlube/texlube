"use client";

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib/client'; 
import { 
  Loader2, 
  ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = [
  { id: 'all-products', name: 'ALL PRODUCTS' },
  { id: 'passenger-car', name: 'PASSENGER CAR' },
  { id: 'trucks-busses', name: 'TRUCKS & BUSSES' },
  { id: 'motor-cycle', name: 'MOTOR CYCLE' },
  { id: 'atf-gear', name: 'ATF & GEAR' },
  { id: 'industrial', name: 'INDUSTRIAL' },
  { id: 'hydraulic', name: 'HYDRAULIC' },
  { id: 'specialty-oil', name: 'SPECIALITY OIL' },
  { id: 'greases', name: 'GREASES' },
];

function ProductsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category') || 'all-products';
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSanityProducts() {
      setLoading(true);
      try {
        // Query fetches both mainImage and image to ensure we get the file
        const query = `*[_type == "product"]{
          "id": _id,
          "name": title,
          "image_url": coalesce(mainImage.asset->url, image.asset->url),
          "categorySlug": category->slug.current,
          "parentCategorySlug": category->parent->slug.current,
          "viscosity": specifications[0].value,
          "slug": slug.current
        }`;
        
        const data = await client.fetch(query);
        setProducts(data || []);
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSanityProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (categoryParam === 'all-products') return true;
    return p.categorySlug === categoryParam || p.parentCategorySlug === categoryParam;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <Loader2 className="animate-spin text-[#E31E24] mb-4" size={40} />
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Updating Catalogue...</span>
    </div>
  );

  return (
    <>
      {/* 1. MAIN CATEGORY TABS */}
      <div className="border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        <div className="max-w-full flex justify-center gap-10 whitespace-nowrap px-6">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => router.push(`/products?category=${cat.id}`, { scroll: false })} 
              className={`pb-5 text-[10px] font-black tracking-[0.2em] relative transition-all ${
                categoryParam === cat.id || (cat.id === 'specialty-oil' && (categoryParam === 'coolant' || categoryParam === 'brake-fluid'))
                ? 'text-[#0D243F]' 
                : 'text-gray-400 hover:text-[#E31E24]'
              }`}
            >
              {cat.name}
              {(categoryParam === cat.id || (cat.id === 'specialty-oil' && (categoryParam === 'coolant' || categoryParam === 'brake-fluid'))) && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E31E24]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SUB-CATEGORY BAR (Specialty Only) */}
      {(categoryParam === 'speciality-oil' || categoryParam === 'coolant' || categoryParam === 'brake-fluid') && (
        <div className="flex justify-center gap-4 mb-12 animate-in fade-in slide-in-from-top-2 duration-500">
          <button onClick={() => router.push('/products?category=specialty-oil')} className={`px-6 py-2 text-[9px] font-black border transition-all ${categoryParam === 'speciality-oil' ? 'bg-[#0D243F] text-white border-[#0D243F]' : 'bg-white text-gray-400 border-gray-200'}`}>ALL SPECIALITY</button>
          <button onClick={() => router.push('/products?category=coolant')} className={`px-6 py-2 text-[9px] font-black border transition-all ${categoryParam === 'coolant' ? 'bg-[#E31E24] text-white border-[#E31E24]' : 'bg-white text-gray-400 border-gray-200'}`}>COOLANTS</button>
          <button onClick={() => router.push('/products?category=brake-fluid')} className={`px-6 py-2 text-[9px] font-black border transition-all ${categoryParam === 'brake-fluid' ? 'bg-[#E31E24] text-white border-[#E31E24]' : 'bg-white text-gray-400 border-gray-200'}`}>BRAKE FLUIDS</button>
        </div>
      )}

      {/* 3. PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-24 min-h-[400px]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-50 shadow-sm flex flex-col group hover:shadow-2xl transition-all duration-500 rounded-sm">
              
              <Link href={`/product/${product.id}`} className="relative aspect-square bg-[#FBFBFC] flex items-center justify-center overflow-hidden cursor-pointer">
                 {product.image_url ? (
                   <Image 
                     src={product.image_url} 
                     alt={product.name} 
                     width={280} 
                     height={280} 
                     className="object-contain p-8 transition-transform duration-700 group-hover:scale-110" 
                   />
                 ) : (
                   <div className="text-gray-300 text-[9px] uppercase font-black tracking-widest text-center px-4">Image Pending</div>
                 )}
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[15px] font-black italic text-[#0D243F] uppercase mb-4 leading-tight group-hover:text-[#E31E24] transition-colors">
                  {product.name}
                </h3>
                
                <div className="bg-[#F8F9FA] px-3 py-2 flex justify-between items-center mb-6 border-l-2 border-[#E31E24]">
                  <span className="text-[8px] font-bold text-gray-500 uppercase">{product.viscosity || 'TDS AVAILABLE'}</span>
                  <span className="text-[8px] font-black text-[#E31E24]">UAE GRADE</span>
                </div>

                <div className="mt-auto flex justify-between items-center">
                  <Link 
                    href={`/product/${product.id}`} 
                    className="text-[9px] font-black text-[#2B99D6] hover:text-[#E31E24] uppercase tracking-widest transition-colors"
                  >
                    TECHNICAL SPECS
                  </Link>
                  <ChevronRight size={14} className="text-[#2B99D6] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-gray-50 rounded-sm border-2 border-dashed border-gray-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No products found in this category</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      <section className="bg-[#0D243F] pt-40 pb-24 px-6 text-center">
        <div className="max-w-[1300px] mx-auto">
          <h1 className="text-4xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none">
            TECHNICAL <br />
            <span className="text-[#E31E24]">CATALOGUE</span>
          </h1>
          <div className="w-20 h-1 bg-[#E31E24] mx-auto mt-8" />
        </div>
      </section>

      <div className="max-w-[1300px] mx-auto pt-16 px-6">
        <Suspense fallback={<div className="text-center py-20 text-[10px] font-black uppercase">Syncing...</div>}>
          <ProductsList />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}