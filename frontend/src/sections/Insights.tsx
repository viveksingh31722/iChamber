'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    category: 'ECONOMIC OPPORTUNITY',
    categoryColor: 'bg-blue-600',
    title: "India's $35 Trillion Opportunity",
    description: "Economic Growth & India's Path to a $35 Trillion Economy",
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2069&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 2,
    category: 'INNOVATION & SUSTAINABILITY',
    categoryColor: 'bg-purple-600',
    title: 'PROJECT ONE FUTURE',
    description: "Fueling India's Growth through Sustainability and Rural Transformation",
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    category: 'GLOBAL PARTNERSHIPS',
    categoryColor: 'bg-orange-600',
    title: 'Architecting Global Alliances',
    description: "Building institutions, platforms and partnerships for 21st-century growth",
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop',
    link: '#',
  }
];

const Insights = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden group/insights">
      {/* Slide Counter Overlay */}
      <div className="absolute top-4 right-4 sm:top-10 sm:right-10 z-30 text-white font-mono text-xs sm:text-sm tracking-widest bg-black/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1 rounded-full border border-white/10">
        {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: '.insights-prev',
          nextEl: '.insights-next',
        }}
        pagination={{
            clickable: true,
            el: '.insights-pagination',
            bulletClass: 'insights-bullet',
            bulletActiveClass: 'insights-bullet-active',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Content Panel */}
              <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <span className={`inline-block px-4 py-1 rounded-sm text-[10px] font-bold text-white tracking-widest mb-6 ${slide.categoryColor}`}>
                          {slide.category}
                        </span>
                      </motion.div>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                      >
                        {slide.title}
                      </motion.h2>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-light"
                      >
                        {slide.description}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        <a 
                          href={slide.link}
                          className="group inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors"
                        >
                          Watch Now
                          <span className="w-8 h-px bg-white group-hover:bg-blue-400 transition-all origin-left group-hover:w-12" />
                        </a>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Elements */}
      <button className="insights-prev absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white opacity-0 group-hover/insights:opacity-100 transition-all hover:bg-white/10 rounded-full cursor-pointer">
        <HiArrowLeft className="text-2xl" />
      </button>
      <button className="insights-next absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white opacity-0 group-hover/insights:opacity-100 transition-all hover:bg-white/10 rounded-full cursor-pointer">
        <HiArrowRight className="text-2xl" />
      </button>

      {/* Custom Pagination Line */}
      <div className="insights-pagination absolute bottom-12 left-6 md:left-20 lg:left-32 z-30 flex items-center gap-4" />

      {/* Global styles for custom swiper pagination */}
      <style jsx global>{`
        .insights-bullet {
          width: 40px;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .insights-bullet-active {
          background: #fff;
          width: 60px;
        }
      `}</style>
    </section>
  );
};

export default Insights;
