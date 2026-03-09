'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Container from './Container';
import NavDropdown from '../navigation/NavDropdown';
import Button from '../ui/Button';

import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '/overview' },
    {
      label: 'Programs',
      items: [
        { label: 'India Health Dialogue', href: '/platforms/india-health-dialogue-v2/' },
        { label: 'India Investor Hub', href: '/platforms/india-investor-hub/' },
        { label: 'Rural Economic Forum', href: '/platforms/rural-economic-forum/' },
      ],
    },
    {
      label: 'Centers',
      items: [
        { label: 'USA', href: '/centers/usa/' },
        { label: 'Germany', href: '/centers/germany/' },
        { label: 'UAE', href: '/centers/uae/' },
      ],
    },
    { label: 'Global Trade', href: '/platforms/global-trade/' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      } ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              IC
            </div>
            <div className="hidden md:block">
              <span className="text-primary font-bold text-lg leading-tight block">India Chamber</span>
              <span className="text-secondary text-xs font-semibold block uppercase">For Businesses & Commerce</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.items ? (
                <NavDropdown key={link.label} label={link.label} items={link.items} />
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {loading ? (
              <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-full"></div>
            ) : user ? (
              <Link href="/profile">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">
                    {user.firstName[0]}
                  </div>
                  My Panel
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-bold text-primary hover:text-secondary">Login</Link>
                <Link href="/register">
                  <Button size="sm">Join Us</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 z-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
             {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-0 pt-[72px] bg-white z-90 lg:hidden overflow-y-auto px-6 pb-8"
          >
            <div className="flex flex-col gap-4 mt-6">
              {user && (
                <Link href="/profile" onClick={() => setIsOpen(false)} className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {user.firstName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">Manage Account</p>
                  </div>
                </Link>
              )}

              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-50 pb-3 last:border-none">
                  {link.items ? (
                    <div className="flex flex-col gap-2">
                       <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1 opacity-60">
                         {link.label}
                       </span>
                      <div className="flex flex-col gap-3 pl-2">
                        {link.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-primary text-base font-bold hover:text-secondary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold text-primary hover:text-secondary block py-1"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                {!user && (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Register</Button>
                    </Link>
                  </>
                )}
                <Button onClick={() => setIsOpen(false)} className="w-full py-4 text-base shadow-lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
