"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database, ShieldCheck, HardDrive, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default function TestConnectionPage() {
  const [checks, setChecks] = useState({
    env: { status: 'loading', msg: '' },
    table: { status: 'loading', msg: '' },
    storage: { status: 'loading', msg: '' }
  });

  useEffect(() => {
    async function runDiagnostics() {
      // Check 1: Environment Variables
      if (!supabaseUrl || !supabaseKey) {
        setChecks(prev => ({ ...prev, env: { status: 'fail', msg: 'Missing keys in .env.local' } }));
      } else {
        setChecks(prev => ({ ...prev, env: { status: 'pass', msg: 'Keys detected successfully' } }));
      }

      if (!supabase) return;

      // Check 2: Table Access (SELECT)
      try {
        const { error } = await supabase.from('products').select('*').limit(1);
        if (error) throw error;
        setChecks(prev => ({ ...prev, table: { status: 'pass', msg: 'Database connection established' } }));
      } catch (err: any) {
        setChecks(prev => ({ ...prev, table: { status: 'fail', msg: err.message || 'Check RLS Policies' } }));
      }

      // Check 3: Storage Access
      try {
        const { error } = await supabase.storage.getBucket('product-images');
        if (error) throw error;
        setChecks(prev => ({ ...prev, storage: { status: 'pass', msg: 'Storage bucket is accessible' } }));
      } catch (err: any) {
        setChecks(prev => ({ ...prev, storage: { status: 'fail', msg: 'Bucket "product-images" not found or private' } }));
      }
    }

    runDiagnostics();
  }, []);

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'loading') return <Loader2 className="animate-spin text-gray-300" size={20} />;
    if (status === 'pass') return <CheckCircle2 className="text-green-500" size={20} />;
    return <AlertTriangle className="text-[#E31E24]" size={20} />;
  };

  return (
    <main className="min-h-screen bg-[#FBFBFC] pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-10 shadow-2xl border-t-4 border-[#0D243F]">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black italic text-[#0D243F] uppercase tracking-tighter">SUPABASE <span className="text-[#2B99D6]">DIAGNOSTICS</span></h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Growize Digital Internal Audit</p>
        </div>

        <div className="space-y-6">
          {/* ENV CHECK */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-4">
              <ShieldCheck size={18} className="text-gray-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0D243F]">Environment Keys</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold text-gray-400 uppercase">{checks.env.msg}</span>
              <StatusIcon status={checks.env.status} />
            </div>
          </div>

          {/* TABLE CHECK */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-4">
              <Database size={18} className="text-gray-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0D243F]">Product Table</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold text-gray-400 uppercase">{checks.table.msg}</span>
              <StatusIcon status={checks.table.status} />
            </div>
          </div>

          {/* STORAGE CHECK */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-4">
              <HardDrive size={18} className="text-gray-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0D243F]">Storage Bucket</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold text-gray-400 uppercase">{checks.storage.msg}</span>
              <StatusIcon status={checks.storage.status} />
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full mt-10 bg-[#0D243F] text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#E31E24] transition-all"
        >
          RERUN DIAGNOSTICS
        </button>
      </div>
    </main>
  );
}