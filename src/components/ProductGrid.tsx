import Image from 'next/image';

const products = [
  { id: 1, name: "OFFICIALTECH 5W30 C3", desc: "Fully synthetic high-performance motor oil.", spec: "ACEA C3 / API SN/CF" },
  { id: 2, name: "ECOTECH 0W20 FE", desc: "Ultra-low viscosity for modern fuel economy.", spec: "API SP / ILSAC GF-6A" },
  { id: 3, name: "VITALTECH 10W40", desc: "Advanced protection for heavy-duty engines.", spec: "ACEA A3/B4" },
];

export default function ProductGrid() {
  return (
    <section className="bg-[#F5F5F7] py-20 px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="border-l-4 border-[#E31E24] pl-6 mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#E31E24] mb-2">Portfolio</h2>
          <h3 className="text-4xl font-black uppercase tracking-tighter text-[#0D243F]">Featured Products</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((oil) => (
            <div key={oil.id} className="bg-white p-8 group hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="aspect-[3/4] bg-gray-50 mb-8 relative overflow-hidden flex items-center justify-center">
                {/* Logo Placeholder inside the product area */}
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest opacity-40">
                  NEWLUBE Product Image
                </div>
              </div>
              <h4 className="text-xl font-bold text-[#0D243F] mb-2 uppercase tracking-tight">{oil.name}</h4>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{oil.desc}</p>
              <div className="text-[10px] font-black text-[#2B99D6] mb-6 uppercase tracking-wider">{oil.spec}</div>
              <button className="w-full border border-gray-200 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24] transition-all">
                Technical Data Sheet
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}