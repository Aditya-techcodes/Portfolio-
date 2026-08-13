import React from 'react';
import { motion } from 'motion/react';
import { User, Award, CheckCircle2, Code, Cpu } from 'lucide-react';
import { personalInfo, statsData } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 text-[#1B4DFF] dark:text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <User className="w-3.5 h-3.5" />
          <span>ABOUT ME</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          About <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Aditya Sisodiya</span>
        </h2>
        <div className="w-16 h-1 bg-[#1B4DFF] rounded-full mt-4" />
      </motion.div>

      {/* Grid: Developer Profile + Bio Text */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Code Frame Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="w-full max-w-md bg-black/5 dark:bg-white/5 rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow-xl">
            {/* Window Bar */}
            <div className="bg-black/5 dark:bg-white/5 px-4 py-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-xs text-[#16161C]/60 dark:text-[#FBFAF7]/60">sisodiya_profile.json</span>
            </div>

            {/* Profile Photo & Code Details */}
            <div className="p-5 space-y-4 font-mono text-xs">
              <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 h-64 bg-slate-100 dark:bg-slate-900">
                <img
                  src={personalInfo.profileImageUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>

              <div className="bg-white dark:bg-black/40 p-4 rounded-2xl border border-black/10 dark:border-white/10 space-y-1.5 text-[#16161C] dark:text-[#FBFAF7]">
                <p><span className="text-[#1B4DFF] dark:text-[#FF5A1F]">name:</span> "{personalInfo.name}"</p>
                <p><span className="text-[#1B4DFF] dark:text-[#FF5A1F]">degree:</span> "BCA (2024-2027)"</p>
                <p><span className="text-[#1B4DFF] dark:text-[#FF5A1F]">cgpa:</span> "7.8 / 10"</p>
                <p><span className="text-[#1B4DFF] dark:text-[#FF5A1F]">location:</span> "{personalInfo.location}"</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Text Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#1B4DFF] dark:text-[#FF5A1F] bg-[#1B4DFF]/10 dark:bg-[#FF5A1F]/20 px-3.5 py-1.5 rounded-full">
            <Code className="w-4 h-4" />
            <span>Full Stack MERN Developer</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#16161C] dark:text-[#FBFAF7] leading-snug">
            Building reliable web systems, secure REST APIs, and structured full-stack architectures.
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-[#16161C]/80 dark:text-[#FBFAF7]/80 leading-relaxed font-body">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Key Traits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 dark:border-white/10">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-[#1B4DFF]/10 text-[#1B4DFF] dark:bg-[#FF5A1F]/20 dark:text-[#FF5A1F] mt-0.5">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#16161C] dark:text-[#FBFAF7]">MVC Architecture</h4>
                <p className="text-xs text-[#16161C]/60 dark:text-[#FBFAF7]/60">Models, controllers, routes & services</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-[#FF5A1F]/10 text-[#FF5A1F] dark:bg-[#1B4DFF]/20 dark:text-[#1B4DFF] mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#16161C] dark:text-[#FBFAF7]">Security & RBAC</h4>
                <p className="text-xs text-[#16161C]/60 dark:text-[#FBFAF7]/60">JWT, OAuth, Rate Limiting & OTP</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stat Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col items-start justify-between hover:border-[#1B4DFF] dark:hover:border-[#FF5A1F] transition-all"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1B4DFF] dark:text-[#FF5A1F] tracking-tight">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="font-mono text-xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                  {stat.suffix}
                </span>
              )}
            </div>

            <div className="mt-3">
              <h4 className="font-heading font-bold text-sm text-[#16161C] dark:text-[#FBFAF7]">
                {stat.label}
              </h4>
              <p className="text-xs text-[#16161C]/60 dark:text-[#FBFAF7]/60 mt-1 font-body">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


