'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { HiArrowRight } from 'react-icons/hi';

import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-[500px] lg:h-[85vh] flex items-center pt-28 lg:pt-32 pb-12 overflow-hidden bg-transparent">
      <Container className="relative z-20">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Architecting <br className="hidden sm:block" />
              India&apos;s Next <br className="hidden sm:block" />
              Economic Era
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 leading-tight max-w-xl mx-auto lg:mx-0">
              Building institutions, platforms, and partnerships for 21st-century growth
            </h2>
            
            <p className="text-sm md:text-base text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              India Chamber facilitates and establishes world-class integration for its global members to create economic and development impact delivered through both public and private sector operations, advisory services, and knowledge support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="none"
                size="lg" 
                className="bg-blue-600 hover:bg-blue-400 text-white border-none px-10 flex items-center gap-2 justify-center"
              >
                Learn more
                <HiArrowRight className="text-lg" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Large Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image 
                src="/ichambar-logo.png" 
                alt="India Chamber Logo" 
                fill
                priority
                className="object-contain drop-shadow-[0_0_50px_rgba(37,99,235,0.2)]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
