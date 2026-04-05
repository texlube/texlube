import { BarChart3, Settings, Zap, Users, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function EngineerSuccessPage() {
  return (
    <main className="bg-white min-h-screen pt-[105px]">
      
      {/* 1. Hero: The Mission */}
      <section className="bg-[#0D243F] py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto relative z-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-4">PARTNERSHIP FOR GROWTH</h2>
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-6 leading-[0.9]">
            WE ENGINEER <br /> <span className="text">YOUR SUCCESS</span>
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed font-medium">
            Beyond manufacturing, we provide the technical expertise and data-driven insights needed to maximize your fleet's uptime and industrial efficiency.
          </p>
        </div>
        {/* Decorative branding */}
        <div className="absolute right-[-10%] bottom-[-20%] text-white/5 text-[300px] font-black italic select-none">TEX</div>
      </section>

      {/* 2. Success Framework */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="text-[#E31E24]" />,
              title: "Performance Audits",
              desc: "Custom lubricant analysis to identify wear patterns and optimize drain intervals."
            },
            {
              icon: <Settings className="text-[#E31E24]" />,
              title: "OEM Compliance",
              desc: "Ensuring every TexLube formulation meets or exceeds international manufacturer standards."
            },
            {
              icon: <Zap className="text-[#E31E24]" />,
              title: "Operational Speed",
              desc: "Rapid logistics and technical support from our UAE-based manufacturing hub in Ajman."
            }
          ].map((item, i) => (
            <div key={i} className="p-12 border border-gray-100 hover:border-[#E31E24] transition-all group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-black italic text-[#0D243F] uppercase mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA: Contact for Consultation */}
      <section className="bg-[#0D243F] py-20 px-6">
        <div className="max-w-[1300px] mx-auto text-center">
          <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8">READY TO OPTIMIZE YOUR OPERATIONS?</h3>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-4 bg-[#E31E24] text-white px-12 py-5 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#0D243F] transition-all"
          >
            <MessageSquare size={16} />
            GET A TECHNICAL CONSULTATION
          </Link>
        </div>
      </section>

    </main>
  );
}