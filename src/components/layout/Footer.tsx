import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-[#FBFAF7] dark:bg-[#0E0E12] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1B4DFF] to-[#FF5A1F] flex items-center justify-center text-white shadow-md">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#16161C] dark:text-[#FBFAF7]">
              {personalInfo.name}
            </h3>
            <p className="text-xs text-[#16161C]/60 dark:text-[#FBFAF7]/60">
              {personalInfo.title}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] transition-all transform hover:-translate-y-1"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] transition-all transform hover:-translate-y-1"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email Address"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] transition-all transform hover:-translate-y-1"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs text-[#16161C]/60 dark:text-[#FBFAF7]/60">
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#FF5A1F] fill-current" /> in 2026
          </span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] text-[#16161C] dark:text-[#FBFAF7] transition-all font-heading font-medium"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};


