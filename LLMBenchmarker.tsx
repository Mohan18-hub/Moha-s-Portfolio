/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ShieldCheck, Database, Layers, Brain, Award } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Identity', href: '#about' },
    { name: 'Chronology', href: '#timeline' },
    { name: 'Smart Sandbox', href: '#sandbox' },
    { name: 'AI Models', href: '#predictors' },
    { name: 'Credentials', href: '#credentials' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#0A0A0B]/90 backdrop-blur-xl border-white/10 h-20'
          : 'bg-transparent border-transparent h-24'
      }`}
      id="main-navigation-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center justify-between w-full h-full">
          {/* Brand logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
              <span className="text-[#0A0A0B] font-bold text-xl">MB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-widest uppercase text-white leading-none mb-1">
                Mohan Kumar B
              </span>
              <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase leading-none">
                Engineering Node
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-[11px] uppercase tracking-widest font-medium text-white/40 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-sm text-white/40 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0B] border-b border-white/10 absolute top-full left-0 w-full" id="mobile-nav-panel">
          <div className="px-4 pt-2 pb-4 flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-4 py-3 rounded-sm text-[11px] uppercase tracking-widest font-medium text-white/60 hover:text-white hover:bg-white/5 block transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
