import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Show sticky button when scrolled past 250px
      if (scrollTop > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Circumference for the circular SVG progress ring (radius = 20)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        >
          <button
            onClick={scrollToTop}
            id="sticky-back-to-top-btn"
            aria-label="Scroll back to top"
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#12131A] dark:bg-[#FBFAF7] text-white dark:text-[#12131A] shadow-xl hover:shadow-2xl hover:shadow-[#1B4DFF]/30 dark:hover:shadow-[#FF5A1F]/30 flex items-center justify-center transition-transform transform hover:-translate-y-1 active:translate-y-0 cursor-pointer border border-white/10 dark:border-black/10"
          >
            {/* Circular Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-black/15 dark:stroke-black/10 fill-none"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#FF5A1F] dark:stroke-[#1B4DFF] fill-none transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Bouncing Arrow Icon on Hover */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] group-hover:text-[#FF5A1F] dark:group-hover:text-[#1B4DFF] transition-colors" />
            </motion.div>

            {/* Tooltip on desktop hover */}
            <span className="absolute bottom-full mb-2 hidden sm:group-hover:block px-2.5 py-1 rounded-md bg-black/80 dark:bg-white/90 text-white dark:text-black text-[10px] font-mono tracking-wider whitespace-nowrap shadow-md pointer-events-none">
              BACK TO TOP
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
