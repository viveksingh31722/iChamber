'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const RuralForumBanner = () => {
  return (
    <div className="max-w-[1232px] mx-4 sm:mx-6 lg:mx-auto relative group overflow-hidden rounded-[1rem] shadow-2xl min-h-[140px] h-auto py-8 md:py-0 md:h-[150px]">
      {/* Full-Width Parallax Image */}
      <div className="absolute inset-x-0 -top-40 -bottom-40 z-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundAttachment: 'fixed' }}
        />
        {/* Gradient Overlay: Clear on left, dark glass on right */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#0a1128]/60 to-[#0a1128] backdrop-blur-[1px]" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Logo - Styled like the screenshot */}
          <div className="relative w-12 h-12 flex-shrink-0 hidden lg:block">
            <div className="relative w-full h-full bg-linear-to-br from-green-400/20 to-emerald-600/20 rounded-xl flex items-center justify-center p-2.5 shadow-lg border border-white/10 backdrop-blur-md">
               <svg viewBox="0 0 24 24" className="w-full h-full text-green-400 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">
                Upcoming
              </span>
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-white mb-1.5 leading-tight">
              Rural Economic Forum 2026
            </h3>
            <p className="text-gray-300 text-xs md:text-base font-medium max-w-xl">
              The Rural Grassroots, the strategic agenda for transforming rural grassroots into an ecosystem.
            </p>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/20 transition-all group/btn flex-shrink-0 backdrop-blur-sm"
        >
          Explore 
          <HiArrowRight className="text-base transition-transform group-hover/btn:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
};



export default RuralForumBanner;
