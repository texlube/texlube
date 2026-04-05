"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { 
  Upload, CheckCircle, Package, Loader2, Plus, Trash2, 
  Lock, Globe, Beaker, RefreshCw, LogOut, 
  LayoutDashboard, Edit3, XCircle, Mail, Key, Search
} from 'lucide-react';

// 1. INITIALIZE SUPABASE
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CATEGORIES = [
  "Passenger Car", 
  "Heavy Duty (Trucks & Busses)", 
  "Motorcycle", 
  "Industrial", 
  "Hydraulic", 
  "Gear Oils", 
  "Marine", 
  "Specialties"
];

export default function AdminPortal() {
  const [session, setSession] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '', 
    category: CATEGORIES[0], 
    viscosity: '', 
    description: '', 
    specs: [{ label: 'API Service', value: '' }]
  });
  const [file, setFile] = useState<File | null>(null);

  // 2. AUTH & INITIAL FETCH
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProducts();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProducts();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      if (data) setProducts(data);
    } catch (err: any) {
      console.error("Fetch Error:", err.message);
    }
  }

  // 3. FIXED: AGGRESSIVE SIGN OUT
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.clear(); 
    sessionStorage.clear();
    window.location.href = '/admin'; // Force hard reload to clear cache
  };

  // 4. ENHANCED SUBMIT LOGIC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus('ERROR: PLEASE SELECT A PRODUCT IMAGE');
      return;
    }

    setLoading(true);
    setStatus('SYNCING TO AJMAN DATABASE...');

    try {
      // Step A: Upload Image to Storage
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw new Error(`Storage Error: ${uploadError.message}`);

      // Step B: Get the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Step C: Insert Record into Database
      const { error: dbError } = await supabase
        .from('products')
        .insert([{ 
          name: formData.name,
          category: formData.category,
          viscosity: formData.viscosity,
          description: formData.description,
          image_url: publicUrl 
        }]);

      if (dbError) throw new Error(`Database Error: ${dbError.message}`);

      // Step D: Reset UI & Refresh
      setStatus('SUCCESS: PRODUCT IS NOW LIVE');
      setFormData({ 
        name: '', category: CATEGORIES[0], viscosity: '', description: '', specs: [{ label: 'API Service', value: '' }] 
      });
      setFile(null);
      await fetchProducts(); // Refresh inventory list immediately

    } catch (err: any) {
      setStatus(`CRITICAL ERROR: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
      // Clear status after 5 seconds
      setTimeout(() => setStatus(''), 5000);
    }
  };

  // 5. DELETE FUNCTIONALITY
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this formulation?")) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setStatus('PRODUCT DELETED');
      fetchProducts();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- LOGIN VIEW ---
  if (!session) return (
    <div className="min-h-screen bg-[#0D243F] flex items-center justify-center p-6">
        <form onSubmit={async (e:any) => { 
          e.preventDefault(); 
          const { error } = await supabase.auth.signInWithPassword({ 
            email: e.target[0].value, 
            password: e.target[1].value 
          });
          if (error) alert(error.message);
        }} className="bg-white p-12 w-full max-w-md shadow-2xl">
            <Lock className="text-[#E31E24] mx-auto mb-6" size={40} />
            <h2 className="text-center font-black italic text-[#0D243F] mb-8 uppercase tracking-tighter">Admin Access</h2>
            <input type="email" placeholder="ADMIN EMAIL" className="w-full bg-gray-50 p-4 mb-4 text-xs font-bold outline-none border border-gray-100" />
            <input type="password" placeholder="PASSWORD" className="w-full bg-gray-50 p-4 mb-8 text-xs font-bold outline-none border border-gray-100" />
            <button className="w-full bg-[#0D243F] text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#E31E24] transition-all">Login to Command Center</button>
        </form>
    </div>
  );

  return (
    <main className="bg-[#FBFBFC] min-h-screen pt-[120px] pb-40 px-6">
      <div className="max-w-[85%] mx-auto">
        
        {/* HEADER BAR */}
        <div className="flex justify-between items-center mb-8 bg-[#0D243F] p-8 text-white rounded-sm shadow-xl">
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter">TEXLUBE <span className="text-[#2B99D6]">DASHBOARD</span></h1>
            <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em]">Live Cloud Sync Active</p>
          </div>
          <button onClick={handleSignOut} className="text-[10px] font-black uppercase flex items-center gap-2 hover:text-[#E31E24] transition-colors">
            SIGN OUT <LogOut size={16}/>
          </button>
        </div>

        {/* FEEDBACK STATUS BAR */}
        {status && (
            <div className={`mb-8 p-6 border-l-4 font-black text-[10px] uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-300 ${status.includes('ERROR') ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
                <div className="flex items-center gap-3">
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                    {status}
                </div>
            </div>
        )}

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* UPLOAD FORM */}
          <form onSubmit={handleSubmit} className="lg:col-span-4 space-y-4 bg-white p-8 border border-gray-100 shadow-sm sticky top-[140px] h-fit">
             <h2 className="text-[10px] font-black uppercase border-b pb-4 mb-4 tracking-widest text-[#0D243F]">Add New Oil Formulation</h2>
             
             <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#2B99D6] transition-colors">
                {file ? (
                  <div className="text-center p-4">
                    <Package className="mx-auto text-[#2B99D6] mb-2" />
                    <p className="text-[9px] font-black uppercase truncate max-w-[150px]">{file.name}</p>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-gray-300 group-hover:text-[#2B99D6] transition-colors" />
                    <p className="text-[8px] font-black text-gray-400 uppercase mt-2">Drop Product PNG</p>
                  </>
                )}
                <input type="file" required onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>

            <input required placeholder="PRODUCT NAME (E.G. TITANIUM PRO)" className="w-full bg-[#FBFBFC] p-4 text-[10px] font-bold uppercase outline-none focus:ring-1 focus:ring-[#2B99D6]" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name} />
            
            <select className="w-full bg-[#FBFBFC] p-4 text-[10px] font-bold uppercase outline-none cursor-pointer" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <input required placeholder="VISCOSITY (E.G. 5W-30)" className="w-full bg-[#FBFBFC] p-4 text-[10px] font-bold uppercase outline-none focus:ring-1 focus:ring-[#2B99D6]" onChange={e => setFormData({...formData, viscosity: e.target.value})} value={formData.viscosity} />
            
            <textarea placeholder="SHORT DESCRIPTION" className="w-full bg-[#FBFBFC] p-4 text-[10px] font-bold uppercase outline-none h-24 resize-none" onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description} />
            
            <button disabled={loading} className="w-full bg-[#0D243F] text-white py-5 font-black uppercase text-[10px] tracking-widest hover:bg-[#E31E24] transition-all flex justify-center items-center gap-3">
                {loading ? <><Loader2 className="animate-spin" size={14} /> Processing...</> : "Publish to Technical Catalogue"}
            </button>
          </form>

          {/* INVENTORY LIST */}
          <div className="lg:col-span-8 bg-white p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-8 gap-4">
                <h2 className="text-xs font-black text-[#0D243F] uppercase tracking-widest">Live Inventory ({products.length})</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                    <input 
                      placeholder="SEARCH PRODUCTS..." 
                      className="w-full bg-[#FBFBFC] p-3 pl-10 text-[9px] font-black uppercase outline-none border border-gray-100 focus:border-[#2B99D6]" 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 no-scrollbar">
                {filteredProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-6 p-4 border border-gray-50 hover:bg-gray-50 group transition-all rounded-sm">
                        <div className="w-16 h-16 relative flex-shrink-0 bg-[#FBFBFC] border border-gray-100 p-2">
                            <Image src={p.image_url} alt="" fill className="object-contain p-1" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-[12px] font-black text-[#0D243F] uppercase italic tracking-tight">{p.name}</h3>
                            <div className="flex gap-4 mt-1">
                                <span className="text-[8px] font-black text-[#E31E24] uppercase tracking-widest">{p.category}</span>
                                <span className="text-[8px] font-bold text-gray-400 uppercase">{p.viscosity}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => handleDelete(p.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                
                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center text-gray-300 font-black uppercase text-[10px] tracking-widest">
                        No matching formulations found
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}