import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-white py-24 px-6 relative z-10">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Left Side: Technical Support Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B99D6] mb-4">
              Get in Touch
            </h2>
            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0D243F] mb-8">
              Expert Technical <br /> 
              <span className="text-[#E31E24]">Support</span>
            </h3>
            <p className="text-gray-500 mb-12 max-w-md leading-relaxed">
              Our team in Ajman is ready to assist your technical and distributorship inquiries.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#0D243F] group-hover:bg-[#2B99D6] group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Headquarters</h4>
                  <p className="text-[#0D243F] font-bold">Dubai, UAE</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#0D243F] group-hover:bg-[#2B99D6] group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Direct Line</h4>
                  <p className="text-[#0D243F] font-bold">+971 55471 5123</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#F5F5F7] flex items-center justify-center text-[#0D243F] group-hover:bg-[#2B99D6] group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Email Inquiry</h4>
                  <p className="text-[#0D243F] font-bold">info@texlubricant.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Navy Form Panel */}
          <div className="bg-[#043d6c] p-10 md:p-14 shadow-2xl rounded-sm">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/90">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border-none px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B99D6]" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/90">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white border-none px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B99D6]" 
                    placeholder="john@company.com" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/90">Subject</label>
                <select className="w-full bg-white border-none px-4 py-4 text-sm focus:outline-none appearance-none cursor-pointer">
                  <option>Distributorship Inquiry</option>
                  <option>Technical Data Sheet Request</option>
                  <option>General Support</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/90">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white border-none px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B99D6] resize-none" 
                  placeholder="How can we help your business?"
                ></textarea>
              </div>

              {/* Submit Button with subtle white border for visibility */}
              <button className="w-full bg-[#e31e24] text-white py-5 border border-white/20 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-[#2B99D6] hover:border-[#2B99D6] transition-all duration-300">
                Send Message <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}