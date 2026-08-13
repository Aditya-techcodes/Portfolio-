import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../../data/portfolioData';

const navLinks = [
  { name: '~/about', href: '#about' },
  { name: '~/projects', href: '#projects' },
  { name: '~/skills', href: '#skills' },
  { name: '~/experience', href: '#experience' },
  { name: '~/github', href: '#github-stats' },
  { name: '~/resume', href: '#resume' },
  { name: '~/contact', href: '#contact' }
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0F2E2B]/95 backdrop-blur-md shadow-lg border-b border-[#225651]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Terminal File System style */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="group flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold text-[#F1EFE7]"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FF6B4A] flex items-center justify-center text-[#0F2E2B] shadow-md group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="tracking-tight">
            <span className="text-[#F4D35E]">~/</span>
            {personalInfo.name.toLowerCase().replace(' ', '')}
            <span className="text-[#FF6B4A]">.ts</span>
          </span>
        </a>

        {/* Desktop Navigation File Paths */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#153E3A] px-3 py-1.5 rounded-xl border border-[#225651]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1 text-xs font-mono transition-colors rounded-lg ${
                  isActive
                    ? 'text-[#0F2E2B] font-bold'
                    : 'text-[#F1EFE7]/80 hover:text-[#FF6B4A]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#F4D35E] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B4A] text-[#0F2E2B] font-mono font-bold text-xs tracking-wide shadow-md hover:bg-[#ff8266] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>init_contact()</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl bg-[#153E3A] text-[#F1EFE7] border border-[#225651] hover:bg-[#1C514C] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0F2E2B] border-b border-[#225651] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2 max-w-md mx-auto">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-mono font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FF6B4A] text-[#0F2E2B] font-bold'
                        : 'text-[#F1EFE7] bg-[#153E3A] border border-[#225651] hover:text-[#F4D35E]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </a>
                );
              })}

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#F4D35E] text-[#0F2E2B] font-mono font-bold text-xs"
                >
                  <span>init_contact()</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

