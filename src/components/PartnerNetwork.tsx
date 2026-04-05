import Link from 'next/link';
export default function PartnerNetwork() {
  return (
    <section className="relative h-[650px] flex items-center overflow-hidden">
      <img src="/solution.png" className="absolute inset-0 w-full h-full object-cover" alt="Workshop background" />
      <div className="absolute inset-0 bg-[#0D243F]/10" />
      <div className="max-w-[1300px] mx-auto w-full px-6 relative z-10 flex justify-end">
        <div className="bg-white p-16 max-w-lg shadow-2xl">
          <h3 className="text-4xl font-light text-[#0D243F] mb-6 leading-tight">
            <span className="font-black italic uppercase tracking-tighter">
              Our International Partner Network
            </span>
          </h3>
          <p className="text-[#0D243F]/80 text-sm leading-relaxed mb-10 font-medium">
            From our strategic UAE hub, TexLube powers industries across 25+ countries. 
            We provide our global partners with the technical edge and logistical 
            reliability needed to dominate their local markets.
          </p>
          <Link 
  href="/contact" 
  className="inline-block border-2 border-[#2B99D6] text-[#2B99D6] px-10 py-3 font-black uppercase text-[11px] tracking-widest hover:bg-[#2B99D6] hover:text-white transition-all duration-300"
>
  Contact Sales Team
</Link>
        </div>
      </div>
    </section>
  );
}