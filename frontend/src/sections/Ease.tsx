'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const Ease = () => {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full min-h-[500px] lg:h-[700px]">
        {/* Left Side: Image with Rounded Corner */}
        <div className="lg:w-1/2 relative min-h-[400px] sm:min-h-[450px]">
          <div className="absolute inset-x-0 bottom-0 top-0 lg:rounded-tr-[50px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Skyscrapers"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-1/2 bg-linear-to-br from-[#1a365d] to-[#0a1128] p-8 sm:p-12 md:p-24 lg:p-32 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-10 tracking-tight">
              Ease with India Chamber
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-12 leading-relaxed max-w-xl">
              We work on strategies to advance &quot;Brand India,&quot; growth, and opportunity for our members. Our mission is to create a robust platform for business excellence and economic development.
            </p>
            
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <button className="flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl text-sm sm:text-base group">
                Join India Chamber 
                <HiArrowRight className="text-base sm:text-xl transition-transform group-hover:translate-x-1" />
              </button>
              <button className="px-8 py-4 sm:px-10 sm:py-5 bg-transparent border border-gray-400 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base">
                Discover
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ease;
