'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { HiPlay, HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import Container from '../components/layout/Container';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const leaders = [
  {
    name: 'H.H. Pujya Swami Chidana...',
    title: 'President & Spiritual Head, Parmarth Niketan Ashram,...',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    duration: '01:15',
    profileImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    name: 'Bertrand Badré',
    title: 'Founder & Managing Partner, Blue Like an Orange Sustainable Capita...',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    duration: '00:57',
    profileImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    name: 'Hubert François',
    title: 'Secretary General, Indo-European Digital Federation (France)',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
    duration: '00:49',
    profileImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    name: 'Romain Faroux',
    title: 'COO, La Ferme Digitale (France)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    duration: '00:42',
    profileImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    name: 'Dr. Praveen Singh',
    title: 'Advisory Board Member, Global Innovation Council',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop',
    duration: '02:30',
    profileImg: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=100&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    name: 'Elena Rodriguez',
    title: 'Head of Sustainability, Euro-Asia Partnerships',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    duration: '01:20',
    profileImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const Leadership = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Background Decorations matching Hero/Framework */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
         <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 rotate-12" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <Container>
        <div className="mb-12 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Leadership Perspectives
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl"
          >
            Insights from leaders influencing policy, markets, and societal transformation.
          </motion.p>
        </div>

        <div className="relative group/carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-16"
          >
            {leaders.map((leader, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden group/card shadow-2xl border border-white/5"
                >
                  {/* Thumbnail Image */}
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white border border-white/10 uppercase tracking-tighter">
                      {leader.duration}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.button
                      aria-label={`Play video from ${leader.name}`}
                      title={`Play video from ${leader.name}`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setActiveVideo(leader.videoUrl)}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 cursor-pointer group-hover/card:bg-white/20 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      <HiPlay className="text-white text-2xl sm:text-3xl ml-1" />
                    </motion.button>
                  </div>

                  {/* Info Card at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-30">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 overflow-hidden shrink-0">
                        <Image src={leader.profileImg} alt={leader.name} width={40} height={40} className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs sm:text-sm leading-tight mb-1 group-hover/card:text-blue-400 transition-colors">
                          {leader.name}
                        </h4>
                        <p className="text-gray-400 text-[9px] sm:text-[10px] leading-tight line-clamp-2">
                          {leader.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button 
            aria-label="Previous slide"
            title="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white/10 cursor-pointer"
          >
            <HiChevronLeft className="text-2xl" />
          </button>
          <button 
            aria-label="Next slide"
            title="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white/10 cursor-pointer"
          >
            <HiChevronRight className="text-2xl" />
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center gap-2 mt-8" />
        </div>
      </Container>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                aria-label="Close video"
                title="Close video"
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <HiX className="text-2xl" />
              </button>
              <iframe
                src={activeVideo}
                title="Leadership Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Leadership;
