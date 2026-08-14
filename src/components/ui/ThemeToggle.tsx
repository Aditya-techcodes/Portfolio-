import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', id = 'theme-toggle-btn' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id={id}
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative p-2 sm:px-3 sm:py-2 rounded-full border transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${
        isDark
          ? 'bg-white/10 hover:bg-white/15 border-white/15 text-[#FBFAF7] hover:border-white/30 shadow-sm'
          : 'bg-black/5 hover:bg-black/10 border-black/10 text-[#12131A] hover:border-black/20 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.div
          key={theme}
          initial={{ rotate: isDark ? -90 : 90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: isDark ? 90 : -90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex items-center justify-center text-amber-500 dark:text-amber-400"
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          )}
        </motion.div>
      </div>

      <span className="hidden md:inline-block text-[11px] font-mono font-medium capitalize tracking-wide select-none opacity-80 group-hover:opacity-100 transition-opacity">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
