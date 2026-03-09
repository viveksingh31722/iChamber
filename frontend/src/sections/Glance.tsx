'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import Container from '../components/layout/Container';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const glanceItems = [
  {
    id: 1,
    tag: 'OUR IMPACT',
    title: 'Roundtable with Maharashtra Government',
    description: 'Policy dialogue with state leadership to drive economic development and create business opportunities.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', // Placeholder for the shared image
  },
  {
    id: 2,
    tag: 'MILESTONE',
    title: 'Project ONE Future Initiative Launch',
    description: 'Marking a significant step towards sustainable rural transformation and MSME growth.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'PARTNERSHIP',
    title: 'Digital India Transformation Summit',
    description: 'Collaborating with global tech leaders to architect India\'s next economic era.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
  }
];

const Glance = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = React.useRef<SwiperType | null>(null);

  return (
    <section className="py-24 bg-[#050b18] text-white overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                India Chamber at a Glance
                <div className="w-20 h-1 bg-blue-600 mt-4 rounded-full" />
              </h2>
              <p className="text-gray-400 text-lg">
                Key milestones, platforms, partnerships, and impact from our journey so far.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-3xl overflow-hidden"
          >
            {glanceItems.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#0a152d] border border-white/5 rounded-3xl overflow-hidden">
                  {/* Left: Image */}
                  <div className="relative h-[300px] md:h-[500px] w-full group/image overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/image:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Right: Content */}
                  <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <div key={item.id}>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                          >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold tracking-widest mb-8 border border-blue-500/20">
                              {item.tag}
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight hover:text-blue-400 transition-colors cursor-default">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10">
                              {item.description}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Controls inside the content area */}
                    <div className="mt-auto flex items-center gap-6">
                      <button 
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-white cursor-pointer"
                        aria-label="Previous slide"
                      >
                        <HiChevronLeft className="text-xl" />
                      </button>

                      {/* Pagination Dots */}
                      <div className="flex gap-2">
                        {glanceItems.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => swiperRef.current?.slideToLoop(dotIndex)}
                            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                              activeIndex === dotIndex 
                                ? 'w-6 bg-blue-600' 
                                : 'w-1.5 bg-gray-600 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${dotIndex + 1}`}
                          />
                        ))}
                      </div>

                      <button 
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-white cursor-pointer"
                        aria-label="Next slide"
                      >
                        <HiChevronRight className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Glance;
