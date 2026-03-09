'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Container from '../components/layout/Container';

const tabs = ['Platforms', 'Programs', 'Strategic Agenda'];

const frameworkData = {
  'Platforms': [
    { title: 'Building Brand India', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Innovation', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Entrepreneurship', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Global Trade and Commerce', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop' },
    { title: 'Investments', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Sustainability', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop' },
  ],
  'Programs': [
    { title: 'MSME Growth Hub', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop' },
    { title: 'Skill India Dialogue', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Digital Transformation', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
  ],
  'Strategic Agenda': [
    { title: 'Economic Roadmap 2030', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop' },
    { title: 'Global Policy Summit', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop' },
  ],
};

const Framework = () => {
  const [activeTab, setActiveTab] = useState('Platforms');

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Abstract Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00f2fe]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#1a2b4b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      </div>

      <Container className="relative z-10">
        <div className="bg-[#0a1128] rounded-4xl sm:rounded-[3rem] p-6 sm:p-8 md:p-16 border border-white/5 shadow-2xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-center">Our Institutional Framework</h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed text-center">
              We tackle global challenges through our specialized platforms and strategic initiatives.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            <div className="inline-flex bg-[#1a2b4b]/50 p-1.5 rounded-xl border border-white/10 whitespace-nowrap mx-auto md:mx-0">
              {tabs.map((tab) => (
                <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-[#1a2b4b]/30 text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                {tab}
              </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {frameworkData[activeTab as keyof typeof frameworkData].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="absolute inset-x-0 top-0 bottom-[22%] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a1128] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Title Bar */}
                  <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[#1a2b4b] flex items-center justify-center px-4">
                    <h3 className="text-sm md:text-base font-bold text-center text-white group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Framework;
