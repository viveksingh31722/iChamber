'use client';

import React from 'react';
import Link from 'next/link';
import Container from './Container';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Programs',
      links: [
        { label: 'India Health Dialogue', href: '/platforms/india-health-dialogue-v2/' },
        { label: 'India Investor Hub', href: '/platforms/india-investor-hub/' },
        { label: 'Rural Economic Forum', href: '/platforms/rural-economic-forum/' },
        { label: 'Project One Future', href: '/platforms/project-one-future/' },
      ],
    },
    {
      title: 'Centers',
      links: [
        { label: 'India Chamber Center USA', href: '/centers/usa/' },
        { label: 'India Chamber Center Russia', href: '/centers/russia/' },
        { label: 'India Chamber Center Germany', href: '/centers/germany/' },
        { label: 'India Chamber Center Singapore', href: '/centers/singapore/' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Strategic Reports', href: '/reports' },
        { label: 'Leadership Perspectives', href: '/leadership' },
        { label: 'News & Media', href: '/news' },
        { label: 'Ease with India Chamber', href: '/ease' },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold text-2xl">
                IC
              </div>
              <div>
                <span className="text-white font-bold text-xl leading-tight block">India Chamber</span>
                <span className="text-secondary text-xs font-semibold block uppercase">Businesses & Commerce</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Architecting India&apos;s Next Economic Era by building institutions, platforms, and partnerships for 21st-century growth.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors duration-300">
                <FaFacebookF size={14} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors duration-300">
                <FaTwitter size={14} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors duration-300">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors duration-300">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-bold mb-6 text-secondary uppercase tracking-wider">{column.title}</h3>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} India Chamber for Businesses and Commerce. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
