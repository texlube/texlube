import { Shield, Zap, Thermometer, FlaskConical, Cpu, CheckCircle } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <main className="bg-white min-h-screen pt-[105px]">
      
      {/* 1. Hero / Engineering Philosophy */}
      <section className="bg-[#0D243F] py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto relative z-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-4">THE SCIENCE OF PERFORMANCE</h2>
          <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-6">
            ACTIVE-GUARD <span className="text-[#2B99D6]">MOLECULAR TECHNOLOGY</span>
          </h1>
          <p className="max-w-2xl text-blue-100/60 text-lg leading-relaxed font-medium">
            TEXLUBE lubricants are engineered at the molecular level to provide a protective barrier that thrives under extreme pressure and desert temperatures.
          </p>
        </div>
        {/* Abstract background element */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#E31E24]/5 -skew-x-12 translate-x-32"></div>
      </section>

      {/* 2. Core Technologies Grid */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-3 gap-12">
          
          <div className="p-10 bg-[#F5F5F7] border-l-4 border-[#E31E24]">
            <Zap className="text-[#E31E24] mb-6" size={40} />
            <h3 className="text-xl font-black italic text-[#0D243F] uppercase mb-4">Friction Reduction</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Our advanced friction modifiers create an ultra-slick surface between moving parts, increasing fuel efficiency and power output.
            </p>
          </div>

          <div className="p-10 bg-[#F5F5F7] border-l-4 border-[#2B99D6]">
            <Thermometer className="text-[#2B99D6] mb-6" size={40} />
            <h3 className="text-xl font-black italic text-[#0D243F] uppercase mb-4">Thermal Stability</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Specifically formulated for the UAE climate, TEXLUBE maintains its viscosity index even when engine temperatures exceed 200°C.
            </p>
          </div>

          <div className="p-10 bg-[#F5F5F7] border-l-4 border-[#0D243F]">
            <Shield className="text-[#0D243F] mb-6" size={40} />
            <h3 className="text-xl font-black italic text-[#0D243F] uppercase mb-4">Anti-Wear Protection</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Chemical bonding technology prevents metal-to-metal contact, extending the operational life of heavy-duty industrial machinery.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Laboratory & Quality Control */}
      <section className="bg-[#F5F5F7] py-24 px-6">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative aspect-video overflow-hidden shadow-2xl">
              <img 
                src="/laboratory.webp" 
                alt="TexLube Laboratory" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-4">QUALITY ASSURANCE</h2>
            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#0D243F] mb-8">
              THE AJMAN <span className="text-[#E31E24]">TESTING HUB</span>
            </h3>
            <p className="text-gray-600 mb-8 font-medium leading-relaxed">
              Every batch of TEXLUBE lubricant undergoes a 12-point quality check at our state-of-the-art laboratory in Ajman, UAE. We test for flash point, kinematic viscosity, and cold-cranking simulators to ensure global compliance.
            </p>
            <ul className="space-y-4">
              {['ISO 9001:2015 Certified Production', 'API Standard Formulation', 'Real-world Desert Performance Testing'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[#0D243F] font-black italic uppercase tracking-tight text-sm">
                  <CheckCircle className="text-[#2B99D6]" size={18} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}