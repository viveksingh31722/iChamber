'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';

const newsItems = [
  {
    id: 1,
    title: "Project ONE Future in Partnership with MSME, GOI",
    description: "Accelerating rural development through MSME collaborations",
    source: "PIB - Press Information Bureau",
    date: "Oct 12, 2025",
    type: "large"
  },
  {
    id: 2,
    title: "ICBC & ICMR sign MoA: Shaping India's Healthcare Future",
    description: "Marking a milestone collaboration toward smart, accessible care nationwide",
    source: "Ministry of MSME, GOI",
    date: "Oct 12, 2025",
    type: "medium"
  },
  {
    id: 3,
    title: "REF Powers MSME Growth in Rural India",
    description: "Evaluating progress and strategic priorities",
    source: "PIB - Press Information Bureau",
    date: "Oct 12, 2025",
    type: "small"
  },
  {
    id: 4,
    title: "Shri Narayan Rane Reviews India Health Dialogue & MGMTZ",
    description: "Evaluating progress and strategic priorities",
    source: "PIB - Press Information Bureau",
    date: "Oct 12, 2025",
    type: "small"
  },
  {
    id: 5,
    title: "Shri Narayan Rane Reviews India Health Dialogue",
    description: "PIB - Press Information Bureau",
    source: "", // Combined in image
    date: "Oct 12, 2025",
    type: "small"
  }
];

const marqueeHeadlines = [
  "MoHFW Endorses Project ONE Future Initiative",
  "REF Driving MSME Growth Across Rural India",
  "MoHFW Endorses Project ONE Future Initiative",
  "REF Driving MSME Growth Across Rural India",
  "MoHFW Endorses Project ONE Future Initiative",
  "REF Driving MSME Growth Across Rural India",
];

const News = () => {
  return (
    <section className="py-24 bg-[#050b18]">
      <Container>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">India Chamber in the News</h2>
          <Link href="/news" className="flex items-center gap-1 text-blue-400 font-bold hover:text-blue-300 transition-colors">
            View all <HiChevronRight className="text-xl" />
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Top Row: Large and Medium */}
          <div className="md:col-span-2">
            <NewsCard item={newsItems[0]} />
          </div>
          <div className="md:col-span-1">
            <NewsCard item={newsItems[1]} />
          </div>

          {/* Bottom Row: 3 Small Cards */}
          {newsItems.slice(2).map((item) => (
            <div key={item.id} className="md:col-span-1">
              <NewsCard item={item} />
            </div>
          ))}
        </div>

        {/* Marquee Ticker */}
        <div className="relative overflow-hidden py-8 border-t border-white/5">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex whitespace-nowrap gap-12 items-center"
          >
            {marqueeHeadlines.map((headline, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-400 font-medium group-hover:text-blue-400 transition-colors cursor-default">
                  {headline}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {marqueeHeadlines.map((headline, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-400 font-medium group-hover:text-blue-400 transition-colors cursor-default">
                  {headline}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const NewsCard = ({ item }: { item: typeof newsItems[0] }) => {
  const isLarge = item.type === 'large';
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative rounded-3xl p-8 h-full bg-[#0a152d] border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer flex flex-col justify-between ${
        isLarge ? 'min-h-[400px]' : 'min-h-[280px]'
      }`}
    >
      <div>
        <h3 className={`${isLarge ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl'} font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors`}>
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {item.description}
        </p>
      </div>
      
      <div className="mt-auto pt-6 border-t border-white/5">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
          {item.source}
        </p>
        <p className="text-gray-600 text-[10px] font-medium">
          {item.date}
        </p>
      </div>
    </motion.div>
  );
};

export default News;
