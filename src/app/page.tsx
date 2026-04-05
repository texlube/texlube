import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';

// Import sub-components
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
      
      {/* HERO SECTION - Responsive Adjustments */}
      <section className="relative bg-[#002e5b] pt-32 md:pt-[140px] pb-32 md:pb-64 px-6 overflow-hidden text-white z-10">
        
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center z-10 relative">
          
          {/* LEFT COLUMN - Text Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8 italic">
              {data?.heroTitle || "THE WINNING FORMULA"} <br /> 
              <span className="text-white">FOR YOUR VEHICLE</span>
            </h1>

            <div className="flex flex-col items-center md:items-start gap-4 mb-10 md:mb-12 max-w-xl mx-auto md:mx-0">
              <div className="border-l-[6px] border-[#E31E24] pl-5 text-left">
                <h3 className="text-lg md:text-xl font-bold tracking-widest uppercase mb-3 text-blue-100">
                  DESIGNED TO RAISE ENGINE PERFORMANCE.
                </h3>
                <p className="text-xs md:text-sm leading-relaxed font-medium text-blue-100/80 italic">
                  {data?.heroSubtitle || "Precision development vital to improving the life force of engines."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center md:justify-start">
              <Link 
                href="/products?category=all-products"
                className="w-full sm:w-auto bg-[#E31E24] px-10 py-4 font-black uppercase text-[10px] tracking-widest text-white hover:bg-white hover:text-[#0D243F] transition-all duration-300 shadow-lg text-center"
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

          {/* RIGHT COLUMN - Hero Image (Priority Loaded) */}
          <div className="relative aspect-square md:aspect-[4/3] overflow-hidden shadow-2xl rounded-sm order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-[#002e5b]/40 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              <Image 
                src={data?.imageUrl || "/hero.png"} 
                alt="High-impact engine lubricant" 
                fill
                className="object-cover object-center opacity-90 mix-blend-overlay md:mix-blend-normal"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                quality={90}
              />
          </div>
        </div>
      </section>

      {/* OVERLAP SECTION - Responsive Margin */}
      <div className="relative z-20 -mt-16 md:-mt-48 lg:-mt-56 px-4 md:px-6">
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