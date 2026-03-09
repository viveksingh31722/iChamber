'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/sections/Hero";
import Framework from "@/sections/Framework";
import Reports from "@/sections/Reports";
import Gallary from "@/sections/Gallary";
import Ease from "@/sections/Ease";
import Leadership from "@/sections/Leadership";
import News from "@/sections/News";
import Insights from "@/sections/Insights";
import Glance from "@/sections/Glance";
import RuralForumBanner from "@/sections/RuralForumBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative bg-primary overflow-hidden">
        {/* Shared Background Image and Overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-primary via-primary/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/50 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        </div>
        
        <div className="relative z-10">
          <Hero />
          <RuralForumBanner />
          <Framework />
        </div>
      </div>
      <Reports />
      <Ease />
      <div className="relative bg-primary overflow-hidden">
        {/* Shared Background Image and Overlays for Leadership */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-primary via-primary/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/50 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        </div>
        <div className="relative z-10">
          <Leadership />
        </div>
      </div>
      <News />
      <Insights />
      <Glance />
      <Footer />
    </main>
  );
}
