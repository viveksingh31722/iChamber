'use client';

import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { HiArrowRight, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({ type: 'success', message: 'Your message has been securely sent! Our team will get back to you shortly.' });
      setFormData({ fullName: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again or email us directly.' });
      } else {
        setStatus({ type: 'error', message: 'An unknown error occurred. Please try again or email us directly.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] font-sans flex flex-col">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0A478C]">
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/30 pointer-events-none" />
        <Container className="relative z-10 w-full min-h-[50vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-7 max-w-lg"
            >
              {/* Contact Us Pill */}
              <div className="inline-block bg-[#4141FF] px-5 py-1.5 rounded-full text-[13px] font-bold tracking-wide shadow-md">
                Contact Us
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                Get in <span className="text-[#5974FF]">Touch</span>
              </h1>
              
              <p className="text-[#C0D1E6] text-[15px] lg:text-base leading-relaxed">
                Ready to transform your business with our comprehensive platforms and services? Connect with our team for personalized consultation and partnership opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button 
                  onClick={(e) => scrollToSection('message-form', e)}
                  className="bg-[#2E6EE5] hover:bg-[#1E5AD6] text-white border-none py-[14px] px-8 rounded shadow-lg font-bold text-[14px] flex items-center justify-center gap-2 group transition-all w-full sm:w-auto"
                >
                  Send Message <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  onClick={(e) => scrollToSection('contact-info', e)}
                  className="bg-[#2E6EE5] hover:bg-[#1E5AD6] text-white border-none py-[14px] px-8 rounded shadow-lg font-bold text-[14px] transition-all w-full sm:w-auto"
                >
                  Contact Info
                </Button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[450px] w-full max-w-xl mx-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" 
                alt="Person reading magazine/brochure mapping design" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. Contact Information Section */}
      <section id="contact-info" className="py-24 bg-[#202938]">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <h2 className="text-[26px] font-bold text-white mb-3 tracking-wide">Contact Information</h2>
            <p className="text-[#9CA3AF] text-[15px]">
              Multiple ways to reach us for all your business needs and inquiries
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 max-w-4xl">
            {/* Box 1: Email */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#2E374A] rounded-[20px] p-8 flex-1 border border-transparent hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-center mb-6">
                 <div className="bg-[#2E6EE5] p-3.5 rounded-2xl text-white shadow-lg group-hover:-translate-y-1 transition-transform">
                   <HiOutlineMail size={24} />
                 </div>
              </div>
              <h3 className="text-white text-center font-bold text-[17px] mb-5">Email Addresses</h3>
              <div className="space-y-2 text-center text-[12px] text-[#D1D5DB] leading-relaxed">
                <p>General Inquiry: contact@ichamber.org</p>
                <p>Technical Support: support@ichamber.org</p>
                <p>Membership: member@ichamber.org</p>
              </div>
            </motion.div>

            {/* Box 2: Working Hours */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#2E374A] rounded-[20px] p-8 flex-1 border border-transparent hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-center mb-6">
                 <div className="bg-[#2E6EE5] p-3.5 rounded-2xl text-white shadow-lg group-hover:-translate-y-1 transition-transform">
                   <HiOutlineClock size={24} />
                 </div>
              </div>
              <h3 className="text-white text-center font-bold text-[17px] mb-5">Business Hours</h3>
              <div className="space-y-2 text-center text-[12px] text-[#D1D5DB] leading-relaxed">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Send Us A Message Form - Modern Redesign */}
      <section id="message-form" className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0F1C]">
        {/* Modern ambient lights behind the form */}
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>

        <Container className="relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-300 mb-4 tracking-tight">
              Send Us a Message
            </h2>
            <p className="text-[#8B98A9] text-[15px] font-medium max-w-xl mx-auto">
              Fill out the form below and our dedicated team will get back to you within 24 hours to discuss your needs.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-3xl relative"
          >
            {/* Elegant glassmorphic container background */}
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-3xl border border-white/5 backdrop-blur-3xl -z-10 shadow-2xl"></div>

            <form onSubmit={handleSubmit} className="p-8 md:p-14 space-y-8">
              {status.message && (
                <div className={`p-4 rounded-xl text-sm font-bold shadow-md border ${
                  status.type === 'success' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="group space-y-2 relative">
                  <label className="text-[#8B98A9] group-focus-within:text-blue-400 text-[11px] font-bold tracking-wider uppercase transition-colors">Full Name <span className="text-blue-500">*</span></label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[14px] text-white placeholder-gray-600 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all duration-300 shadow-inner"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="group space-y-2 relative">
                  <label className="text-[#8B98A9] group-focus-within:text-blue-400 text-[11px] font-bold tracking-wider uppercase transition-colors">Email Address <span className="text-blue-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[14px] text-white placeholder-gray-600 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all duration-300 shadow-inner"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="group space-y-2 relative">
                  <label className="text-[#8B98A9] group-focus-within:text-blue-400 text-[11px] font-bold tracking-wider uppercase transition-colors">Phone Number <span className="text-blue-500">*</span></label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[14px] text-white placeholder-gray-600 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all duration-300 shadow-inner"
                    required
                  />
                </div>

                {/* Company/Organization */}
                <div className="group space-y-2 relative">
                  <label className="text-[#8B98A9] group-focus-within:text-blue-400 text-[11px] font-bold tracking-wider uppercase transition-colors">Company/Organization <span className="text-blue-500">*</span></label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Global Innovations Inc." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[14px] text-white placeholder-gray-600 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all duration-300 shadow-inner"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="group space-y-2 relative">
                <label className="text-[#8B98A9] group-focus-within:text-blue-400 text-[11px] font-bold tracking-wider uppercase transition-colors">Subject <span className="text-blue-500">*</span></label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry regarding investment opportunities or partnerships" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[14px] text-white placeholder-gray-600 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all duration-300 shadow-inner"
                  required
                />
              </div>

              {/* Message */}
              <div className="group space-y-2 relative">
                <label className="text-[#8B98A9] group-focus-within:text-blue-400 text-[11px] font-bold tracking-wider uppercase transition-colors">Message <span className="text-blue-500">*</span></label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Please describe your business needs and how we can assist you..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-5 text-[14px] text-white placeholder-gray-600 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all duration-300 shadow-inner resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex justify-center md:justify-end">
                <Button 
                  type="submit"
                  disabled={submitting}
                  className="relative group overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] font-extrabold text-[14px] flex items-center justify-center gap-3 transition-all duration-300 w-full md:w-auto min-w-[220px] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? 'Sending securely...' : 'Send Message'} 
                    {!submitting && <HiArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />}
                  </span>
                </Button>
              </div>
            </form>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
