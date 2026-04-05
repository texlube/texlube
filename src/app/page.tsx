import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';

// Import your sub-components (Make sure these files are moved to src/components/)
import OperationalMilestones from "@/components/OperationalMilestones";
import SolutionsCarousel from '@/components/SolutionsCarousel';
import BusinessGrowth from "@/components/BusinessGrowth";
import PartnerNetwork from "@/components/PartnerNetwork";
import LatestMedia from "@/components/LatestMedia";
import GlobalReach from "@/components/GlobalReach";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function HomePage() {
  // Fetch data from Sanity
  const data = await client.fetch(`*[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle,
    "imageUrl": heroImage.asset->url,
    ctaLabel
  }`);

  return (
    <main className="bg-white">
      <Navbar />
      
      {/* HERO SECTION - Exact UI Match */}
      <section className="relative bg-[#002e5b] pt-[140px] pb-56 px-6 overflow-hidden text-white z-10">
        
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 items-center z-10 relative">
          
          {/* LEFT COLUMN */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              {data?.heroTitle || "THE WINNING FORMULA"} <br /> 
              <span className="text-white">FOR YOUR VEHICLE</span>
            </h1>

            <div className="flex items-start gap-4 mb-12 max-w-xl">
              <div className="border-l-[6px] border-[#E31E24] pl-5 mb-12 max-w-xl">
                <h3 className="text-xl font-bold tracking-widest uppercase mb-3 text-blue-100">
                  DESIGNED TO RAISE ENGINE PERFORMANCE.
                </h3>
                <p className="text-sm leading-relaxed font-medium text-blue-100/80 italic">
                  {data?.heroSubtitle || "Precision development vital to improving the life force of engines."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center justify-start">
              <Link 
                href="/products?category=all-products"
                className="bg-[#E31E24] px-10 py-4 font-black uppercase text-[10px] tracking-widest text-white hover:bg-white hover:text-[#0D243F] transition-all duration-300 shadow-lg text-center"
              >
                {data?.ctaLabel || "EXPLORE SOLUTIONS"}
              </Link>

              <Link 
                href="/technology" 
                className="text-white text-[10px] font-black uppercase tracking-widest border-b border-white/30 hover:border-[#E31E24] hover:text-[#E31E24] transition-all py-1"
              >
                OUR TECHNOLOGY
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative aspect-[4/3] overflow-hidden shadow-2xl rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-[#002e5b]/40 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              <Image 
                src={data?.imageUrl || "/hero.png"} 
                alt="High-impact engine lubricant" 
                fill
                className="object-cover object-center opacity-80 mix-blend-overlay"
                priority
              />
          </div>
        </div>
      </section>

      {/* OVERLAP SECTION */}
      <div className="relative z-20 -mt-56 px-6">
        <OperationalMilestones />
      </div>

      {/* REMAINDER OF PAGE */}
      <SolutionsCarousel />
      <BusinessGrowth />
      <PartnerNetwork />
      <LatestMedia />
      <GlobalReach />
      <NewsSection />
      <ContactSection />
      
      <Footer />
    </main>
  );
}