import { ChevronRight } from 'lucide-react';

const solutions = [
  {
    title: "OUR SOLUTIONS FOR PASSENGER CARS",
    // Royalty-free image of a luxury car driving
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
    alt: "Passenger Car on road"
  },
  {
    title: "OUR SOLUTIONS FOR HEAVY-DUTY ON-ROAD",
    // Royalty-free image of a commercial semi-truck
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    alt: "Heavy duty truck on highway"
  },
  {
    title: "OUR SOLUTIONS FOR HEAVY-DUTY OFF-ROAD",
    // Royalty-free image of heavy construction/mining equipment
    image: "https://plus.unsplash.com/premium_photo-1754211702117-037d01638b4e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Industrial excavator off-road"
  }
];

export default function Solutions() {
  return (
    <section className="bg-[#F5F5F7] py-24 px-6">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Responsive Grid: 1 column on mobile, 3 on desktop */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {solutions.map((item, index) => (
            <div 
              key={index} 
              className="bg-white flex flex-col group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="w-full h-[280px] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text & Button Container */}
              <div className="p-10 flex flex-col items-center text-center flex-1">
                
                <h3 className="text-[#0D243F] font-black uppercase text-xl mb-8 leading-snug">
                  {item.title}
                </h3>
                
                {/* Learn More Button */}
                <button className="mt-auto flex items-center gap-3 text-[#2B99D6] text-[11px] font-black uppercase tracking-[0.15em] hover:text-[#0D243F] transition-colors">
                  LEARN MORE
                  <span className="w-6 h-6 rounded-full bg-[#2B99D6] text-white flex items-center justify-center group-hover:bg-[#0D243F] transition-colors">
                    <ChevronRight size={14} strokeWidth={3} />
                  </span>
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}