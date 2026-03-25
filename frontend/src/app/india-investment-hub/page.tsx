'use client';

import React from 'react';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

// Mock data based on the screenshot
const aboutCards = [
  {
    title: 'What is IIH',
    desc: 'The global capital engine of India Chamber, mobilizing investment for ruralization, healthcare, innovation, future tech, and sustainability.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Why it Matters',
    desc: 'India is the world\'s investment engine for the 21st century. IIH transforms capital into ecosystems across manufacturing, digital economy, and green transition.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    title: 'Who is Involved',
    desc: 'Global investors, sovereign funds, institutional investors, and policy makers collaborating to shape India\'s investment landscape.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932&auto=format&fit=crop'
  }
];

const pipelineCards = [
  {
    title: 'Rural Economy (REF)',
    desc: 'Regenerative agriculture, Project ONE FUTURE, and sustainable rural development initiatives.',
    img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Healthcare & Nutrition',
    desc: 'MedTech, nutrition security, and preventive health solutions driving transformation.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Future Tech & Innovation',
    desc: 'AI, robotics, semiconductors, space technology, and innovation accelerators.',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Sustainability & Green Energy',
    desc: 'Hydrogen economy, EVs, renewables, and circular economy solutions.',
    img: 'https://images.unsplash.com/photo-1509391366360-1f9509e1394e?q=80&w=2072&auto=format&fit=crop'
  },
  {
    title: 'MSME & Inclusive Finance',
    desc: 'Investment pipelines for MSMEs, women entrepreneurs, and youth-led businesses.',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop'
  },
  {
    title: 'Carbon & Nature Markets',
    desc: 'Linking finance to sustainability through carbon credits and nature-based solutions.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop'
  }
];

const investorServices = [
  {
    title: 'Curated Project Matchmaking',
    desc: 'Access to pre-vetted, high-potential investment opportunities aligned with your capital deployment strategy and sector preferences.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932&auto=format&fit=crop'
  },
  {
    title: 'Risk & Due Diligence Support',
    desc: 'Comprehensive risk assessment, compliance verification, and due diligence support for informed investment decisions.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Co-investment Opportunities',
    desc: 'Exclusive co-investment opportunities with India Chamber, state governments, and strategic institutional partners.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Global Policy & Advocacy Networks',
    desc: 'Direct access to policy makers, regulatory bodies, and government advocacy networks for strategic alignment.',
    img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop'
  }
];

export default function IndiaInvestmentHubPage() {
  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative bg-primary overflow-hidden min-h-screen flex items-center pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-primary via-primary/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/50 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 max-w-xl">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                India<br/>Investment<br/>Hub
              </h1>
              <p className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                The Global Platform for Investments in India
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium max-w-md pt-2">
                A business operating system for global investors, designed to connect capital, policy, and opportunities in India&apos;s next-growth sectors. Transforming capital into ecosystems.
              </p>
              <div className="pt-6">
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white border-none py-3 px-6 shadow-xl shadow-blue-500/20 text-sm font-bold flex items-center gap-2 rounded-lg">
                  Explore Opportunities <span>→</span>
                </Button>
              </div>
            </div>

            {/* Right side graphic */}
            <div className="hidden lg:flex justify-center items-center opacity-90 relative">
               <div className="flex flex-col items-center justify-center transform scale-125">
                 <img src="/ichambar-logo.png" alt="India Chamber Logo" className="w-[280px] md:w-[350px] h-auto object-contain" />
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. About Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">About India Investment Hub</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aboutCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[#1E3A8A] mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Global Investment Pipelines */}
      <section className="py-24 bg-[#1a233a]">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white tracking-wide">Global Investment Pipelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {pipelineCards.map((card, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden group h-64 shadow-lg cursor-pointer">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 right-0">
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed opacity-90">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Investor Services */}
      <section className="py-24 bg-white">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary tracking-wide">Investor Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {investorServices.map((card, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden group h-72 shadow-lg cursor-pointer">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 right-0">
                  <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-90">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. About IIH Platform */}
      <section className="py-24 bg-[#1e3a89]">
        <Container>
          <div className="max-w-4xl mx-auto space-y-5">
            <h2 className="text-[22px] font-bold text-white tracking-wide">About India Investment Hub Platform</h2>
            <p className="text-[#D1D5DB] text-[14px] leading-relaxed">
              The India Investment Hub is more than an investment platform - it&apos;s a complete ecosystem designed to connect global capital with India&apos;s most transformative opportunities. From rural development to future tech, from healthcare to sustainability, IIH provides investors with curated access to high-impact projects backed by policy support and institutional partnerships.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. CTA Footer */}
      <section className="py-28 bg-[#4285F4]">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-[28px] font-bold text-white tracking-wide">Ready to Invest in India&apos;s Future?</h2>
            <p className="text-white flex-1 text-[15px]">
              Join the global investor network shaping India&apos;s $10T economy by 2047
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button className=" text-gray-500 border-none px-8 py-[10px] rounded-md shadow-none font-bold text-[13px]">
                Get Started
              </Button>
              <Button className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-[10px] rounded-md shadow-none font-bold text-[13px]">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
