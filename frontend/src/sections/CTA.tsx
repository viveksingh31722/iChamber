'use client';

import React from 'react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

const CTA = () => {
  return (
    <section className="py-24">
      <Container>
        <div className="relative bg-primary rounded-3xl p-8 md:p-16 overflow-hidden text-center">
          {/* Decorative background elements */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to be part of India&apos;s <span className="text-secondary">Growth Story?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Join our network of global leaders and businesses architecting the future of trade, innovation, and economic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">Partner With Us</Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Become a Member
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
