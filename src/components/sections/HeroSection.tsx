import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Download, Sparkles, FolderGit2, MapPin } from 'lucide-react';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { personalInfo } from '../../data/portfolioData';
import { downloadResumePdf } from '../../utils/generateResumePdf';

export const HeroSection: React.FC = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % personalInfo.tagline.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#FF5A1F]/10 dark:bg-[#FF5A1F]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Content + Right 3D Object */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">

        {/* Left Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
        >
          {/* Availability Badge */}
          {personalInfo.availableForHire && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00C48C]/15 border border-[#00C48C]/30 text-[#024330] dark:text-[#00C48C] text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C48C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C48C]"></span>
              </span>
              <span>Available for new roles & projects</span>
            </div>
          )}

          {/* Name & Title */}
          <div className="space-y-2">
            <p className="text-sm font-mono tracking-wide text-[#1B4DFF] dark:text-[#FF5A1F] uppercase font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Hi, I'm {personalInfo.name}</span>
            </p>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7] leading-[1.08]">
              Full Stack Engineer & <span className="bg-gradient-to-r from-[#1B4DFF] to-[#FF5A1F] bg-clip-text text-transparent">UI Architect</span>
            </h1>
          </div>

          {/* Animated Dynamic Tagline */}
          <div className="h-14 sm:h-12 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="font-heading text-lg sm:text-2xl font-semibold text-[#16161C]/90 dark:text-[#FBFAF7]/90 border-l-4 border-[#1B4DFF] dark:border-[#FF5A1F] pl-3.5"
              >
                {personalInfo.tagline[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#16161C]/75 dark:text-[#FBFAF7]/75 max-w-2xl leading-relaxed font-body">
            {personalInfo.subtitle}
          </p>

          {/* Location tag */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60">
            <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>{personalInfo.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={scrollToProjects}
              id="hero-view-projects-btn"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#1B4DFF] text-white font-heading font-semibold text-sm shadow-lg shadow-[#1B4DFF]/25 hover:bg-[#1230B3] hover:shadow-xl hover:shadow-[#1B4DFF]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 stroke-[2.5]" />
              <span>View Projects</span>
            </button>

            <button
              onClick={downloadResumePdf}
              id="hero-download-resume-btn"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] font-heading font-semibold text-sm border border-black/10 dark:border-white/15 hover:bg-black/10 dark:hover:bg-white/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FF5A1F]" />
              <span>Download Resume</span>
            </button>
          </div>
        </motion.div>

        {/* Right 3D Object Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <Hero3DCanvas />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex flex-col items-center justify-center pt-8 z-10">
        <button
          onClick={scrollToProjects}
          aria-label="Scroll to projects section"
          className="group flex flex-col items-center gap-2 text-xs font-mono text-[#16161C]/50 dark:text-[#FBFAF7]/50 hover:text-[#1B4DFF] dark:hover:text-[#FF5A1F] transition-colors cursor-pointer"
        >
          <span>SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:border-[#1B4DFF] dark:group-hover:border-[#FF5A1F]"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>
    </section>
  );
};
