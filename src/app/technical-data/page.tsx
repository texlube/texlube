"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Download, ChevronLeft } from 'lucide-react';

// Define the structure for the documents
interface TDSDocument {
  id: string;
  name: string;
  category: string;
  fileSize: string;
}

// Type the array as TDSDocument[]
const technicalDocuments: TDSDocument[] = [
  {
    id: "tds-01",
    name: "TITANIUM PRO 5W-30 DATA SHEET",
    category: "Passenger Car",
    fileSize: "1.4 MB"
  }
];

export default function TechnicalDataPage() {
  return (
    <main className="bg-white min-h-screen pt-[140px] pb-24 px-6">
      <div className="max-w-[85%] mx-auto">
        <Link href="/products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#E31E24] mb-12 group">
          <ChevronLeft size={14} /> BACK TO CATALOGUE
        </Link>
        <h1 className="text-4xl font-black italic text-[#0D243F] uppercase tracking-tighter mb-12">
          TECHNICAL <span className="text-[#2B99D6]">RESOURCES</span>
        </h1>
        <div className="max-w-4xl border-t-2 border-[#0D243F]">
          {technicalDocuments.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center py-6 border-b border-gray-100 px-4">
              <div className="flex items-center gap-4">
                <FileText className="text-gray-300" />
                <span className="text-xs font-black text-[#0D243F] uppercase">{doc.name}</span>
              </div>
              <button className="bg-[#0D243F] text-white p-3 hover:bg-[#E31E24] transition-all">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}