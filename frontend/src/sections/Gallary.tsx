'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import SectionTitle from '../components/ui/SectionTitle';

const images = [
  'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop',
];

const Gallary = () => {
  return (
    <section className="py-24 bg-muted">
      <Container>
        <SectionTitle
          title="Building Brand India"
          subtitle="Capturing the spirit of innovation, excellence, and economic transformation across the nation."
        />

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative inline-block w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group shrink-0"
              style={{ minHeight: '300px' }}
            >
              <Image
                src={img}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Gallary;
