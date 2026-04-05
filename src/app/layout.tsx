import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TexLube | Premium Lubricants & Engineering Excellence",
  description: "High-performance lubricants engineered for extreme UAE conditions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-[#0D243F]">
        {/* Navbar is now global - shows on every page */}
        <Navbar />
        
        {/* The "children" is where the unique content of each page will load */}
        {children}
        
        {/* Footer is now global - shows on every page */}
        <Footer />
      </body>
    </html>
  );
}