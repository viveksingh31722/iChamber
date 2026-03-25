'use client';

import React from 'react';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    title: 'Stakeholder Meeting on Smart and Sustainable Gaushalas',
    desc: 'Strategic discussions on modernizing gaushala operations and sustainable cattle management practices',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932&auto=format&fit=crop',
  },
  {
    title: 'Rural Economic Forum',
    desc: 'Global flagship initiative for building pathways for rural economy development. Feb 2024, New Delhi',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'CEO Roundtable',
    desc: 'High-level discussions with industry leaders and government officials on economic policies',
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    link: 'Click to view 6 photos →'
  },
  {
    title: 'MOA Signing between India Chamber and ICMR',
    desc: 'Memorandum of Agreement signing ceremony with Indian Council of Medical Research',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'India Health Dialogue Summit',
    desc: 'Comprehensive healthcare policy discussions and innovation showcase',
    img: 'https://images.unsplash.com/photo-1475721025505-111ec8be68ea?q=80&w=1932&auto=format&fit=crop',
  },
  {
    title: 'MOU with Indian Medical Association',
    desc: 'Strategic partnership agreement with Indian Medical Association for healthcare initiatives',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Launch of India Manufacturing Dialogue',
    desc: 'Inaugural event for manufacturing sector development and policy dialogue platform',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Roundtable with Maharashtra Government',
    desc: 'State-level policy discussions and economic development initiatives',
    img: 'https://images.unsplash.com/photo-1517486808906-f2f2ac90df46?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Dialogue with Union Minister for Food Processing',
    desc: 'High-level discussions with Sh. Paras Paswan on food processing industry development',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <section className="pt-32 pb-24 flex-1">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 max-w-3xl space-y-3"
          >
            <h1 className="text-[28px] font-bold text-[#0F172A] tracking-tight">Event Gallery</h1>
            <p className="text-gray-500 text-[14px] leading-relaxed max-w-2xl">
              Explore our comprehensive collection of events, meetings, and initiatives showcasing India Chamber&apos;s impact on economic development and global partnerships
            </p>
          </motion.div>

          {/* Staggered Grid Animation Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {galleryItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative rounded-2xl overflow-hidden group h-64 md:h-72 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-100 ring-2 ring-transparent hover:ring-blue-100"
              >
                {/* Image has a slightly deeper zoom on hover */}
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                />
                
                {/* Dual Gradient for readability, gets slightly darker on hover to push text focus */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/95 via-[#0f172a]/30 to-transparent transition-opacity duration-500 group-hover:from-black/95"></div>
                
                {/* Text sliding up slightly on hover */}
                <div className="absolute bottom-0 left-0 p-5 right-0 text-white flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[14px] font-bold mb-1.5 leading-snug tracking-wide group-hover:text-blue-100 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-[11px] text-[#CBD5E1] leading-relaxed transition-opacity duration-300 line-clamp-2">
                       {item.desc}
                    </p>
                  </div>
                  
                  {item.link && (
                    <span className="text-[11px] font-semibold text-[#60A5FA] mt-2 flex items-center group-hover:text-blue-300 transition-all duration-300 transform group-hover:translate-x-1 opacity-90 group-hover:opacity-100">
                      {item.link}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Smooth Fade-in Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex justify-center mt-6"
          >
            {/* Native Link wrapper with interactive button */}
            <Link href="/">
              <Button className="bg-[#1e293b] hover:bg-[#0f172a] text-white px-7 py-[9px] rounded-md font-bold text-[13px] flex items-center justify-center border border-transparent hover:border-blue-900 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                Back to Homepage 
                <HiArrowLeft size={16} className="ml-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
