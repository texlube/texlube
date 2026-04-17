import { MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen pt-[105px]">
      
      {/* 1. Cinematic Hero Section */}
      <section className="bg-[#002e5b] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000" 
            alt="TEXLUBE Global Export" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002e5b] via-[#002e5b]/80 to-transparent"></div>
        </div>
        
        <div className="max-w-[1300px] mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-white mb-6">
            CONNECT WITH <span className="text-[#E31E24]">TEXLUBE</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed font-medium text-blue-100/80 mb-10">
            Global reach, local expertise. Reach out to our technical sales team for B2B inquiries, distribution partnerships, OEM approvals, or technical support.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Section (Form & HQ Details) */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: B2B Inquiry Form */}
          <div className="bg-[#F5F5F7] p-8 md:p-12 shadow-sm">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-4">
              SEND A MESSAGE
            </h2>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#0D243F] mb-8">
              BUSINESS INQUIRY FORM
            </h3>

            <form className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name *</label>
                  <input type="text" id="firstName" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2B99D6] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name *</label>
                  <input type="text" id="lastName" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2B99D6] transition-colors" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Company Name *</label>
                  <input type="text" id="company" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2B99D6] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Business Email *</label>
                  <input type="email" id="email" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2B99D6] transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Inquiry Subject *</label>
                <select id="subject" className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2B99D6] transition-colors text-gray-600">
                  <option>Distribution Partnership</option>
                  <option>Bulk Ordering / Export</option>
                  <option>Technical Support & Specifications</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Message *</label>
                <textarea id="message" rows={5} required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2B99D6] transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="bg-[#E31E24] text-white px-10 py-4 mt-4 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-[#0D243F] transition-colors duration-300 w-full md:w-auto self-start">
                SUBMIT INQUIRY <Send size={14} />
              </button>
            </form>
          </div>

          {/* Right Side: Contact Details (UAE HQ) */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B99D6] mb-4">
              GLOBAL HEADQUARTERS
            </h2>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-[#0D243F] mb-10 leading-tight italic">
             DUBAI BUSINESS HUB
            </h3>

            <div className="flex flex-col gap-10">
              {/* Address */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#E31E24] shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D243F] mb-2 uppercase tracking-wide">Facility Address</h4>
                  <p className="text-sm text-gray-500 leading-relaxed uppercase font-medium">
                    Ajman Industrial Area 1,<br />
                    P.O. Box 4140, Ajman, UAE
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#E31E24] shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D243F] mb-2 uppercase tracking-wide">Direct Lines</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-1">
                    <span className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mr-2">Export Sales:</span> +971 55 471 5123
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    <span className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mr-2">Technical:</span> +971 6 529 5105
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#E31E24] shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D243F] mb-2 uppercase tracking-wide">Email Desks</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-1 lowercase">
                    <span className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mr-2">General:</span> info@texlubricant.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#E31E24] shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D243F] mb-2 uppercase tracking-wide">Operating Hours</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Monday – Saturday: 08:00 AM – 06:00 PM (GST)<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: REGIONAL HUBS SECTION (BENIN & UGANDA) */}
      <section className="py-24 px-6 border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24] mb-4">
              REGIONAL OPERATIONS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0D243F] leading-tight">
              AFRICA <span className="text-[#2B99D6]">NETWORK</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* BENIN OFFICE */}
            <div className="flex flex-col gap-8 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[2px] bg-[#E31E24]"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D243F]">BENIN OFFICE</h4>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#2B99D6] shrink-0 group-hover:bg-[#2B99D6] group-hover:text-white transition-all duration-500">
                   <Globe size={20} />
                </div>
                <div>
                  <h5 className="font-black italic text-lg text-[#0D243F] uppercase tracking-tighter mb-4">Head Office (West Africa)</h5>
                  <p className="text-sm text-gray-500 leading-relaxed uppercase font-medium mb-6 max-w-sm">
                    Lot 343 Zongo, Rue derriere NSIA Bank Unafrica<br />
                    Maison VLAVONOU Cotonoe Re du Benin
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-black text-[#0D243F] flex items-center gap-3">
                       <Phone size={14} className="text-[#2B99D6]" /> +229 666 90707
                    </p>
                    <p className="text-xs font-black text-[#0D243F] flex items-center gap-3 ml-6">
                       +229 971 74111
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* UGANDA OFFICE */}
            <div className="flex flex-col gap-8 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[2px] bg-[#E31E24]"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D243F]">UGANDA OFFICE</h4>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#2B99D6] shrink-0 group-hover:bg-[#2B99D6] group-hover:text-white transition-all duration-500">
                   <Globe size={20} />
                </div>
                <div>
                  <h5 className="font-black italic text-lg text-[#0D243F] uppercase tracking-tighter mb-4">Head Office (East Africa)</h5>
                  <p className="text-sm text-gray-500 leading-relaxed uppercase font-medium mb-6 max-w-sm">
                    Kyadondo Block 273, Plot 23127<br />
                    Kalina - Namasuba P.O. Box 111556<br />
                    Kampala, Uganda
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-black text-[#0D243F] flex items-center gap-3">
                       <Phone size={14} className="text-[#2B99D6]" /> +256 759 113 402
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Global Reach Section (Stats Bar) */}
      <section className="py-24 bg-[#F5F5F7] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h4 className="text-3xl md:text-4xl font-black italic uppercase text-[#0D243F] mb-6 leading-[1.1] tracking-tighter">
              A UAE POWERHOUSE WITH <br /> <span className="text-[#E31E24]">GLOBAL REACH</span>
            </h4>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              From our state-of-the-art facility in Ajman, we engineer lubricants that power industries across the Middle East, Africa, and Asia.
            </p>
          </div>
          <div className="flex gap-16 md:gap-24">
            <div className="text-center md:text-left">
              <span className="block text-5xl font-black italic text-[#2B99D6] tracking-tighter mb-2">40+</span>
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] whitespace-nowrap">Countries Supplied</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-5xl font-black italic text-[#E31E24] tracking-tighter mb-2">24/7</span>
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] whitespace-nowrap">Technical Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Grayscale Map */}
      <section className="w-full h-[500px] relative bg-gray-200 border-t border-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115340.68652203613!2d55.42621431640626!3d25.401569600000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f560e90956557%3A0x9599599599599599!2sAjman%20Industrial%20Area%201%20-%20Ajman!5e0!3m2!1sen!2sae!4v1713532456789!5m2!1sen!2sae" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="TEXLUBE Ajman Headquarters Map"
        ></iframe>
        
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[#E31E24]"></div>
      </section>

    </main>
  );
}