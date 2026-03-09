'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';

const reportItems = [
  {
    title: 'Global Nutritional Security Blueprint',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2070&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2070&auto=format&fit=crop',
    isUpcoming: true,
    isLarge: true,
    bgColor: 'from-[#0a2e1f] to-[#041a12]',
  },
  {
    title: 'Quantum Ayurveda',
    subtitle: 'Engineering Tradition for Global Health Innovation',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2070&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop',
    isUpcoming: false,
    isLarge: false,
    bgColor: 'from-[#0d2b3a] to-[#05161f]',
  },
  {
    title: "To Transform India's Trillion Dollar Assistive Technology Future",
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
    isUpcoming: true,
    isLarge: false,
    bgColor: 'from-[#0a1128] to-[#04081a]',
  },
];

const Reports = () => {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Shaping the Agenda: Strategic Reports & Insights
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Defining the future of growth, sustainability, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Large Card */}
          <div className="lg:col-span-7">
            {reportItems.filter(item => item.isLarge).map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative h-[500px] sm:h-[650px] rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-2xl bg-linear-to-b ${item.bgColor}`}
              >
                {/* Background Image Blurred */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-700">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover blur-2xl scale-125 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* UPCOMING Tag */}
                {item.isUpcoming && (
                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30">
                    <span className="px-4 py-2 sm:px-6 sm:py-2.5 bg-blue-600 text-white text-[10px] sm:text-[11px] font-black rounded-xl uppercase tracking-[0.2em] shadow-lg">
                      Upcoming
                    </span>
                  </div>
                )}

                {/* Central Report Cover */}
                <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 lg:p-20 z-20">
                   <div className="relative w-full h-[300px] sm:h-[400px] max-w-[220px] sm:max-w-[300px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden transform group-hover:scale-[1.03] transition-transform duration-500">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                   </div>
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent z-10" />

                <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 z-30">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Cards Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {reportItems.filter(item => !item.isLarge).map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex-1 rounded-[1.5rem] overflow-hidden group cursor-pointer min-h-[280px] sm:min-h-[310px] shadow-2xl bg-linear-to-br ${item.bgColor}`}
              >
                {/* Background Image Blurred */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover blur-2xl scale-125 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {item.isUpcoming && (
                  <div className="absolute top-6 left-6 z-30">
                    <span className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-[0.15em] shadow-lg">
                      Upcoming
                    </span>
                  </div>
                )}

                {/* Central Report Cover - Smaller */}
                <div className="absolute inset-y-0 right-6 sm:right-12 flex items-center justify-center z-20 opacity-40 sm:opacity-100">
                   <div className="relative w-28 h-40 sm:w-36 sm:h-48 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden transform group-hover:translate-x-1 transition-transform duration-500">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                   </div>
                </div>

                {/* Left Content Area */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:pr-48 z-30">
                   <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight mb-2">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm text-gray-300 font-medium leading-snug line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Reports;
