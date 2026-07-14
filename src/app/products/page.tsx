"use client";

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib/client'; 
import { 
  Loader2, 
  ChevronRight,
  Package,
  FileText,
  Download
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = [
  { id: 'all-products', name: 'ALL PRODUCTS' },
  { id: 'petrol-gasoline', name: 'PETROL/GASOLINE VEHICLE' }, 
  { id: 'diesel-vehicle', name: 'DIESEL VEHICLE' },           
  { id: 'motor-cycle', name: 'MOTOR CYCLE' },
  { id: 'atf', name: 'ATF' },               
  { id: 'gear-oil', name: 'GEAR OIL' },     
  { id: 'hydraulic', name: 'HYDRAULIC' },     
  { id: 'industrial', name: 'INDUSTRIAL' },   
  { id: 'speciality-oil', name: 'SPECIALITY OIL' },
  { id: 'greases', name: 'GREASES' },
];

// Helper constants for sub-category filtering
const mainSubs = ['semi-synthetic', 'fully-synthetic', 'mineral']; 
const motoSubs = ['synthetic', 'multigrade']; 
const specialitySubs = ['coolant', 'brake-fluid'];
const atfGearSubs = ['atf-mineral', 'atf-synthetic', 'gear-mineral', 'gear-synthetic']; 

// INDUSTRIAL NESTED TABS CONSTANTS
const industrialTabs = [
  { id: 'circulating-oil', name: 'CIRCULATING OIL' },
  { id: 'spindle-oil', name: 'SPINDLE OIL' },
  { id: 'quenching-oil', name: 'QUENCHING OIL' },
  { id: 'industrial-gear-oil', name: 'INDUSTRIAL GEAR OIL' },
  { id: 'anti-wear-gear-oil', name: 'ANTI WEAR GEAR OIL' },
  { id: 'sugar-mill-bearing-oil', name: 'SUGAR MILL BEARING OIL' },
  { id: 'compressor-oil', name: 'COMPRESSOR OIL' },
  { id: 'cutting-oil', name: 'CUTTING OIL' }
];

const circulatingSubs = [
  { id: 'hlp-circulating', name: 'HLP CIRCULATING', parent: 'circulating-oil' },
  { id: 'antiwear-circulating', name: 'ANTIWEAR CIRCULATING', parent: 'circulating-oil' }
];

const cuttingSubs = [
  { id: 'soluble-cutting', name: 'SOLUBLE CUTTING', parent: 'cutting-oil' },
  { id: 'active-cutting', name: 'ACTIVE CUTTING', parent: 'cutting-oil' },
  { id: 'active-cutting-st', name: 'ACTIVE CUTTING ST', parent: 'cutting-oil' }
];

const allIndustrialSubs = [
  ...industrialTabs.map(t => t.id),
  ...circulatingSubs.map(t => t.id),
  ...cuttingSubs.map(t => t.id)
];

function ProductsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get('category') || 'all-products';
  const parentParam = searchParams.get('parent');
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSanityProducts() {
      setLoading(true);
      try {
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
    const currentFilter = categoryParam.toLowerCase().trim();
    if (currentFilter === 'all-products') return true;

    const pCat = p.categorySlug?.toLowerCase().trim() || '';
    const pParent = p.parentCategorySlug?.toLowerCase().trim() || '';
    const pName = p.name?.toLowerCase().trim() || '';

    // --- ACCURATE FIXED FILTER FOR ATF ---
    if (currentFilter === 'atf' || parentParam === 'atf') {
      if (pParent === 'atf' || pCat === 'atf' || pCat === 'atf-synthetic' || pCat === 'atf-mineral') {
        if (currentFilter === 'atf-synthetic') return pCat === 'atf-synthetic';
        if (currentFilter === 'atf-mineral') return pCat === 'atf-mineral';
        return true;
      }
      if (pCat.includes('atf') || pParent.includes('atf') || pName.includes('atf')) {
        if (currentFilter === 'atf-synthetic') return pCat.includes('synthetic');
        if (currentFilter === 'atf-mineral') return pCat.includes('mineral');
        return !pCat.includes('gear') && !pName.includes('gear'); 
      }
      return false;
    }

    // --- ACCURATE FIXED FILTER FOR GEAR OIL ---
    if (currentFilter === 'gear-oil' || parentParam === 'gear-oil') {
      if (pParent === 'gear-oil' || pCat === 'gear-oil' || pCat === 'gear-synthetic' || pCat === 'gear-mineral') {
        if (currentFilter === 'gear-synthetic') return pCat === 'gear-synthetic';
        if (currentFilter === 'gear-mineral') return pCat === 'gear-mineral';
        return true;
      }
      if (pCat.includes('gear') || pParent.includes('gear') || pName.includes('gear')) {
        if (currentFilter === 'gear-synthetic') return pCat.includes('synthetic');
        if (currentFilter === 'gear-mineral') return pCat.includes('mineral');
        return true;
      }
      return false;
    }

    // Context-aware filtering for all shared sub-categories (Petrol, Diesel, Moto, Industrial)
    const isSharedSub = mainSubs.includes(currentFilter) || 
                        motoSubs.includes(currentFilter) || 
                        allIndustrialSubs.includes(currentFilter);

    if (isSharedSub && parentParam) {
        return pCat === currentFilter && (pParent === parentParam || pParent === 'industrial');
    }

    return pCat === currentFilter || pParent === currentFilter;
  });

  // Smooth scroll handler targeting footer catalog anchor ID
  const handleScrollToFooterCatalog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footerElement = document.getElementById('catalog-download-section') || document.querySelector('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <Loader2 className="animate-spin text-[#E31E24] mb-4" size={40} />
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing Catalogue...</span>
    </div>
  );

  // Check if we are inside the Industrial section context
  const isIndustrialActiveSection = categoryParam === 'industrial' || parentParam === 'industrial' || allIndustrialSubs.includes(categoryParam);

  return (
    <>
      {/* 1. MAIN CATEGORY NAVIGATION */}
      <div className="border-b border-gray-100 mb-12 overflow-x-auto no-scrollbar">
        <div className="flex justify-start lg:justify-center items-center gap-8 md:gap-10 whitespace-nowrap px-6 min-w-max">
          {categories.map((cat) => {
            const isPetrolActive = (cat.id === 'petrol-gasoline') && (categoryParam === 'petrol-gasoline' || parentParam === 'petrol-gasoline');
            const isDieselActive = (cat.id === 'diesel-vehicle') && (categoryParam === 'diesel-vehicle' || parentParam === 'diesel-vehicle');
            const isMotoActive = (cat.id === 'motor-cycle') && (categoryParam === 'motor-cycle' || parentParam === 'motor-cycle');
            const isIndActive = (cat.id === 'industrial') && isIndustrialActiveSection;
            const isSpecialityActive = cat.id === 'speciality-oil' && (categoryParam === 'speciality-oil' || specialitySubs.includes(categoryParam));
            
            const isAtfActive = (cat.id === 'atf') && (categoryParam === 'atf' || parentParam === 'atf' || categoryParam.startsWith('atf-'));
            const isGearActive = (cat.id === 'gear-oil') && (categoryParam === 'gear-oil' || parentParam === 'gear-oil' || categoryParam.startsWith('gear-'));

            const isDirectActive = categoryParam === cat.id && !parentParam;
            
            const isActive = isDirectActive || isPetrolActive || isDieselActive || isMotoActive || isIndActive || isSpecialityActive || isAtfActive || isGearActive;

            return (
              <button 
                key={cat.id} 
                onClick={() => router.push(`/products?category=${cat.id}`, { scroll: false })} 
                className={`pb-5 text-[10px] font-black tracking-[0.2em] relative transition-all ${
                  isActive ? 'text-[#0D243F]' : 'text-gray-400 hover:text-[#E31E24]'
                }`}
              >
                {cat.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E31E24] animate-in fade-in zoom-in duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PETROL/GASOLINE TAB SWITCHER */}
      {(categoryParam === 'petrol-gasoline' || parentParam === 'petrol-gasoline') && (
        <div className="flex flex-col items-center mb-16 px-4">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-sm border border-gray-200 shadow-inner">
            {[
              { id: 'petrol-gasoline', name: 'SHOW ALL', parent: null },
              { id: 'fully-synthetic', name: 'FULLY SYNTHETIC', parent: 'petrol-gasoline' },
              { id: 'semi-synthetic', name: 'SEMI SYNTHETIC', parent: 'petrol-gasoline' },
              { id: 'mineral', name: 'MINERAL', parent: 'petrol-gasoline' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.parent ? `/products?category=${tab.id}&parent=${tab.parent}` : `/products?category=${tab.id}`, { scroll: false })}
                className={`px-4 md:px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm ${
                  categoryParam === tab.id ? 'bg-[#0D243F] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#0D243F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">PETROL VEHICLE RANGE</p>
          </div>
        </div>
      )}

      {/* 3. DIESEL VEHICLE TAB SWITCHER */}
      {(categoryParam === 'diesel-vehicle' || parentParam === 'diesel-vehicle') && (
        <div className="flex flex-col items-center mb-16 px-4">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-sm border border-gray-200 shadow-inner">
            {[
              { id: 'diesel-vehicle', name: 'SHOW ALL', parent: null },
              { id: 'fully-synthetic', name: 'FULLY SYNTHETIC', parent: 'diesel-vehicle' },
              { id: 'semi-synthetic', name: 'SEMI SYNTHETIC', parent: 'diesel-vehicle' },
              { id: 'mineral', name: 'MINERAL', parent: 'diesel-vehicle' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.parent ? `/products?category=${tab.id}&parent=${tab.parent}` : `/products?category=${tab.id}`, { scroll: false })}
                className={`px-4 md:px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm ${
                  categoryParam === tab.id ? 'bg-[#E31E24] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#E31E24]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">HEAVY DUTY DIESEL RANGE</p>
          </div>
        </div>
      )}

      {/* 4. MOTORCYCLE TAB SWITCHER */}
      {(categoryParam === 'motor-cycle' || parentParam === 'motor-cycle') && (
        <div className="flex flex-col items-center mb-16 px-4">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-sm border border-gray-200 shadow-inner">
            {[
              { id: 'motor-cycle', name: 'SHOW ALL', parent: null },
              { id: 'synthetic', name: 'SYNTHETIC', parent: 'motor-cycle' },
              { id: 'multigrade', name: 'MULTIGRADE', parent: 'motor-cycle' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.parent ? `/products?category=${tab.id}&parent=${tab.parent}` : `/products?category=${tab.id}`, { scroll: false })}
                className={`px-4 md:px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm ${
                  categoryParam === tab.id ? 'bg-[#0D243F] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#0D243F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">2T & 4T ENGINE OILS</p>
          </div>
        </div>
      )}

      {/* 4.1 ATF TAB SWITCHER */}
      {(categoryParam === 'atf' || parentParam === 'atf' || categoryParam.startsWith('atf-')) && (
        <div className="flex flex-col items-center mb-16 px-4">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-sm border border-gray-200 shadow-inner">
            {[
              { id: 'atf', name: 'SHOW ALL', parent: null },
              { id: 'atf-synthetic', name: 'SYNTHETIC', parent: 'atf' },
              { id: 'atf-mineral', name: 'MINERAL', parent: 'atf' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.parent ? `/products?category=${tab.id}&parent=${tab.parent}` : `/products?category=${tab.id}`, { scroll: false })}
                className={`px-4 md:px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm ${
                  categoryParam === tab.id ? 'bg-[#0D243F] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#0D243F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">AUTOMATIC TRANSMISSION FLUIDS</p>
          </div>
        </div>
      )}

      {/* 4.2 GEAR OIL TAB SWITCHER */}
      {(categoryParam === 'gear-oil' || parentParam === 'gear-oil' || categoryParam.startsWith('gear-')) && (
        <div className="flex flex-col items-center mb-16 px-4">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-sm border border-gray-200 shadow-inner">
            {[
              { id: 'gear-oil', name: 'SHOW ALL', parent: null },
              { id: 'gear-synthetic', name: 'SYNTHETIC', parent: 'gear-oil' },
              { id: 'gear-mineral', name: 'MINERAL', parent: 'gear-oil' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.parent ? `/products?category=${tab.id}&parent=${tab.parent}` : `/products?category=${tab.id}`, { scroll: false })}
                className={`px-4 md:px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm ${
                  categoryParam === tab.id ? 'bg-[#0D243F] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#0D243F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">HIGH PERFORMANCE GEAR OILS</p>
          </div>
        </div>
      )}

      {/* 5. INDUSTRIAL CATEGORY TAB SWITCHER (Level 1) */}
      {isIndustrialActiveSection && (
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 px-4 animate-in fade-in slide-in-from-top-2 duration-500">
          <button onClick={() => router.push('/products?category=industrial')} className={`px-4 md:px-6 py-2.5 text-[9px] font-black border transition-all ${categoryParam === 'industrial' ? 'bg-[#0D243F] text-white border-[#0D243F] shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:border-[#0D243F]'}`}>ALL INDUSTRIAL</button>
          
          {industrialTabs.map(tab => {
            const isTabActive = categoryParam === tab.id || parentParam === tab.id || (tab.id === 'circulating-oil' && circulatingSubs.map(s => s.id).includes(categoryParam)) || (tab.id === 'cutting-oil' && cuttingSubs.map(s => s.id).includes(categoryParam));
            
            return (
              <button 
                key={tab.id} 
                onClick={() => router.push(`/products?category=${tab.id}&parent=industrial`, { scroll: false })} 
                className={`px-4 md:px-6 py-2.5 text-[9px] font-black border transition-all ${isTabActive ? 'bg-[#0D243F] text-white border-[#0D243F] shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:border-[#0D243F]'}`}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
      )}

      {/* 5.1 INDUSTRIAL NESTED LEVEL 2: CIRCULATING SUBS */}
      {(categoryParam === 'circulating-oil' || circulatingSubs.map(s => s.id).includes(categoryParam)) && (
         <div className="flex justify-center gap-4 mb-12 animate-in fade-in zoom-in duration-300">
            <button onClick={() => router.push(`/products?category=circulating-oil&parent=industrial`, { scroll: false })} className={`px-4 py-2 text-[9px] font-black border-b-2 transition-all ${categoryParam === 'circulating-oil' ? 'border-[#E31E24] text-[#0D243F]' : 'border-transparent text-gray-400 hover:text-[#0D243F]'}`}>SHOW ALL</button>
            {circulatingSubs.map(sub => (
              <button key={sub.id} onClick={() => router.push(`/products?category=${sub.id}&parent=${sub.parent}`, { scroll: false })} className={`px-4 py-2 text-[9px] font-black border-b-2 transition-all ${categoryParam === sub.id ? 'border-[#E31E24] text-[#0D243F]' : 'border-transparent text-gray-400 hover:text-[#0D243F]'}`}>
                {sub.name}
              </button>
            ))}
         </div>
      )}

      {/* 5.2 INDUSTRIAL NESTED LEVEL 2: CUTTING SUBS */}
      {(categoryParam === 'cutting-oil' || cuttingSubs.map(s => s.id).includes(categoryParam)) && (
         <div className="flex justify-center gap-4 mb-12 animate-in fade-in zoom-in duration-300">
            <button onClick={() => router.push(`/products?category=cutting-oil&parent=industrial`, { scroll: false })} className={`px-4 py-2 text-[9px] font-black border-b-2 transition-all ${categoryParam === 'cutting-oil' ? 'border-[#E31E24] text-[#0D243F]' : 'border-transparent text-gray-400 hover:text-[#0D243F]'}`}>SHOW ALL</button>
            {cuttingSubs.map(sub => (
              <button key={sub.id} onClick={() => router.push(`/products?category=${sub.id}&parent=${sub.parent}`, { scroll: false })} className={`px-4 py-2 text-[9px] font-black border-b-2 transition-all ${categoryParam === sub.id ? 'border-[#E31E24] text-[#0D243F]' : 'border-transparent text-gray-400 hover:text-[#0D243F]'}`}>
                {sub.name}
              </button>
            ))}
         </div>
      )}

      {/* 6. SPECIALITY OIL SUB-CATEGORIES */}
      {(categoryParam === 'speciality-oil' || specialitySubs.includes(categoryParam)) && (
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 animate-in fade-in slide-in-from-top-2 duration-500 px-4">
          <button onClick={() => router.push('/products?category=speciality-oil')} className={`px-4 md:px-6 py-2 text-[9px] font-black border transition-all ${categoryParam === 'speciality-oil' ? 'bg-[#0D243F] text-white border-[#0D243F]' : 'bg-white text-gray-400 border-gray-200'}`}>ALL SPECIALITY</button>
          <button onClick={() => router.push('/products?category=coolant')} className={`px-4 md:px-6 py-2 text-[9px] font-black border transition-all ${categoryParam === 'coolant' ? 'bg-[#E31E24] text-white border-[#E31E24]' : 'bg-white text-gray-400 border-gray-200'}`}>COOLANTS</button>
          <button onClick={() => router.push('/products?category=brake-fluid')} className={`px-4 md:px-6 py-2 text-[9px] font-black border transition-all ${categoryParam === 'brake-fluid' ? 'bg-[#E31E24] text-white border-[#E31E24]' : 'bg-white text-gray-400 border-gray-200'}`}>BRAKE FLUIDS</button>
        </div>
      )}

      {/* 7. CONDITIONAL RENDER ENGINE */}
      {isIndustrialActiveSection ? (
        
        /* --- HIGH END REDIRECT CTA TO LEAD FORM IN FOOTER --- */
        <div className="w-full max-w-4xl mx-auto bg-[#FBFBFC] border border-gray-200 p-8 md:p-16 text-center rounded-sm shadow-sm mb-24 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-[#0D243F]/5 text-[#0D243F] flex items-center justify-center rounded-full mx-auto mb-6">
            <FileText size={28} className="text-[#2B99D6]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black italic text-[#0D243F] uppercase tracking-tight mb-4">
            Industrial Range Catalog
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10 font-medium">
            Our full suite of industrial bulk formulations, processing lubricants, and machine oils are currently being finalized in the database. Download our updated digital product manual below for instant technical specifications.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* UPDATED: Links smoothly to the footer download catalog widget wrapper */}
            <a 
              href="#catalog-download-section" 
              onClick={handleScrollToFooterCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E31E24] text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#0D243F] transition-all duration-300 rounded-sm shadow-md cursor-pointer"
            >
              Open Download Form <Download size={14} />
            </a>
            <Link 
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#0D243F] border border-gray-300 px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all duration-300 rounded-sm"
            >
              Request Custom Quote
            </Link>
          </div>
          
          {/* Background anchors keeping sub-definitions compiled correctly inside tree */}
          <div className="hidden">
            {industrialTabs.map(t => <span key={t.id}>{t.name}</span>)}
            {circulatingSubs.map(t => <span key={t.id}>{t.name}</span>)}
            {cuttingSubs.map(t => <span key={t.id}>{t.name}</span>)}
          </div>
        </div>

      ) : (

        /* --- STANDARD RETAIL CARD GRID LAYOUT --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 mb-24 min-h-[400px]">
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
                  <h3 className="text-[14px] md:text-[15px] font-black italic text-[#0D243F] uppercase mb-4 leading-tight group-hover:text-[#E31E24] transition-colors">
                    {product.name}
                  </h3>
                  <div className="bg-[#F8F9FA] px-3 py-2 flex justify-between items-center mb-6 border-l-2 border-[#E31E24]">
                    <span className="text-[8px] font-bold text-gray-500 uppercase">{product.viscosity || 'TDS AVAILABLE'}</span>
                    <span className="text-[8px] font-black text-[#E31E24]">API GRADE</span>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <Link href={`/product/${product.id}`} className="text-[9px] font-black text-[#2B99D6] hover:text-[#E31E24] uppercase tracking-widest transition-colors">
                      TECHNICAL SPECS
                    </Link>
                    <ChevronRight size={14} className="text-[#2B99D6] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-gray-50 rounded-sm border-2 border-dashed border-gray-200 mx-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No products found in this category</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <section className="bg-[#0D243F] pt-32 md:pt-40 pb-16 md:pb-24 px-6 text-center">
        <div className="max-w-[1300px] mx-auto">
          <h1 className="text-3xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none">
            TECHNICAL <br />
            <span className="text-[#E31E24]">CATALOGUE</span>
          </h1>
          <div className="w-16 md:w-20 h-1 bg-[#E31E24] mx-auto mt-6 md:mt-8" />
        </div>
      </section>
      <div className="max-w-[1300px] mx-auto pt-10 md:pt-16 px-4 md:px-6">
        <Suspense fallback={<div className="text-center py-20 text-[10px] font-black uppercase">Syncing...</div>}>
          <ProductsList />
        </Suspense>
      </div>
    </main>
  );
}