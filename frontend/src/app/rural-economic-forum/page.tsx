import React from 'react';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto rounded-xl border border-gray-100 p-12 bg-gray-50 text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Rural Economic Forum</h1>
            <p className="text-gray-500">This page is currently under development.</p>
          </div>
        </Container>
      </div>
    </div>
  );
}
