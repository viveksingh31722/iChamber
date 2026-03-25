'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Container from './Container';
import NavDropdown from '../navigation/NavDropdown';
import Button from '../ui/Button';

import { useAuth } from '@/context/AuthContext';

// Sidebar Link Data
const sidebarLinks = [
  { label: 'Home', href: '/' },
  { label: 'India Investment Hub', href: '/india-investment-hub' },
  { label: 'India Health Dialogue', href: '/india-health-dialogue' },
  {
    label: 'Rural Economic Forum',
    items: [
      { label: 'REF Main', href: '/rural-economic-forum' },
      {
        label: 'Past Events',
        items: [
          { label: 'REF 2024', href: '/rural-economic-forum/2024' },
          { label: 'REF 2025', href: '/rural-economic-forum/2025' }
        ]
      },
      {
        label: 'Upcoming',
        items: [
          { label: 'REF 2026', href: '/rural-economic-forum/2026' }
        ]
      }
    ]
  },
  { label: 'Project One Future', href: '/project-one-future' },
  { label: 'Governance', href: '/governance' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Partnerships', href: '/partnerships' },
  {
    label: 'Our Global Offices',
    items: [
      { label: 'India Chamber Center USA', href: '/global-offices/usa' },
      { label: 'India Chamber Center Germany', href: '/global-offices/germany' },
      { label: 'India Chamber Center Singapore', href: '/global-offices/singapore' }
    ]
  },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' }
];

// Desktop Navigation links for the main bar (if any, keeping original ones to not break existing layout)
const navLinksDesktop = [
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

/** Recursive Sidebar Item Component */
const SidebarItem = ({ item, setIsOpen, level = 0 }: { item: any; setIsOpen: any; level?: number }) => {
  const [expanded, setExpanded] = useState(false);

  // Styling based on level
  const isTopLevel = level === 0;
  const paddingLeft = level > 0 ? `pl-${level * 4}` : 'pl-0';
  
  if (item.items) {
    return (
      <div className={`border-b border-white/10 last:border-none ${paddingLeft} ${isTopLevel ? 'py-2' : 'py-1'}`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-left font-bold transition-all ${
            isTopLevel ? 'text-white text-base' : 'text-gray-300 text-sm'
          } hover:text-white`}
        >
          {item.label}
          <span className="ml-2 text-gray-400">
            {expanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
          </span>
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              {item.items.map((subItem: any, idx: number) => (
                <SidebarItem key={idx} item={subItem} setIsOpen={setIsOpen} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`border-b border-white/10 last:border-none ${paddingLeft} ${isTopLevel ? 'py-4' : 'py-2'}`}>
      <Link
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={`block font-bold transition-all ${
          isTopLevel ? 'text-white text-base' : 'text-gray-300 text-sm'
        } hover:text-white ${item.label === 'Governance' ? 'bg-[#001733] p-2 rounded -ml-2' : ''}`}
      >
        {item.label}
      </Link>
    </div>
  );
};

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

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
        }`}
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

            {/* Desktop Navigation - Hidden on md, visible on lg */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8 gap-8">
              {navLinksDesktop.map((link) => (
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
            </div>

            {/* Right Side Tools & Hamburger */}
            <div className="flex items-center gap-4">
              {/* Conditional Profile / Auth (Hidden on small screens since it's in the menu now) */}
              <div className="hidden lg:flex items-center gap-3">
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
                  <>
                    <Link href="/login" className="text-sm font-bold text-primary hover:text-secondary">Login</Link>
                    <Link href="/join-us">
                      <Button size="sm">Join Us</Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Universal Hamburger Menu Toggle */}
              <button
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <HiMenu size={24} />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0B0F19] z-[120] text-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold tracking-tight">Quick Links</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Scrollable Links */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              <div className="flex flex-col">
                {sidebarLinks.map((item, idx) => (
                  <SidebarItem key={idx} item={item} setIsOpen={setIsOpen} />
                ))}
              </div>
            </div>

            {/* Action Buttons at the bottom */}
            <div className="p-6 border-t border-white/10 bg-[#0B0F19] flex flex-col gap-3">
              <Link href="/download-brochure" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center bg-[#1D4ED8] hover:bg-[#1E40AF] border-none text-white !py-3">
                  Download Brochure
                </Button>
              </Link>

              {!user && (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-center !py-3 bg-transparent border-white/20 text-white hover:bg-white/5">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center bg-[#2563EB] hover:bg-[#1D4ED8] border-none text-white !py-3">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              
              <Link href="/join-us" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center bg-[#1E3A8A] hover:bg-[#1E40AF] border-none text-white !py-3 shadow-none">
                  Join Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
