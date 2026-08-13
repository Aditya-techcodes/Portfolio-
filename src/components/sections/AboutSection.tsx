import React from 'react';
import { motion } from 'motion/react';
import { User, Award, CheckCircle2, Terminal, Code, Cpu } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#153E3A] border border-[#225651] text-[#F4D35E] text-xs font-mono font-bold mb-3">
          <Terminal className="w-4 h-4 text-[#FF6B4A]" />
          <span>~/about.md</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F1EFE7]">
          About <span className="text-[#FF6B4A]">Aditya Sisodiya</span>
        </h2>
        <div className="w-16 h-1 bg-[#FF6B4A] rounded-full mt-4" />
      </motion.div>

      {/* Grid: Developer Terminal Profile + Bio Text */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Code Frame Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="w-full max-w-md bg-[#123733] rounded-2xl border border-[#225651] overflow-hidden shadow-2xl">
            {/* Window Bar */}
            <div className="bg-[#153E3A] px-4 py-2.5 border-b border-[#225651] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF6B4A]" />
                <span className="w-3 h-3 rounded-full bg-[#F4D35E]" />
                <span className="w-3 h-3 rounded-full bg-[#225651]" />
              </div>
              <span className="font-mono text-xs text-[#F1EFE7]/70">sisodiya_profile.json</span>
            </div>

            {/* Profile Photo & Code Details */}
            <div className="p-4 space-y-4 font-mono text-xs">
              <div className="rounded-xl overflow-hidden border border-[#225651] h-64 bg-[#0F2E2B]">
                <img
                  src={personalInfo.profileImageUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>

              <div className="bg-[#153E3A] p-3 rounded-xl border border-[#225651] space-y-1 text-[#F1EFE7]">
                <p><span className="text-[#FF6B4A]">name:</span> "{personalInfo.name}"</p>
                <p><span className="text-[#FF6B4A]">degree:</span> "BCA (2024-2027)"</p>
                <p><span className="text-[#FF6B4A]">cgpa:</span> "7.8 / 10"</p>
                <p><span className="text-[#FF6B4A]">location:</span> "{personalInfo.location}"</p>
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
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#F4D35E] bg-[#153E3A] px-3 py-1 rounded-lg border border-[#225651]">
            <Code className="w-4 h-4 text-[#FF6B4A]" />
            <span>Full Stack MERN Developer</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F1EFE7] leading-snug">
            Building reliable web systems, secure REST APIs, and structured full-stack architectures.
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-[#F1EFE7]/85 leading-relaxed font-sans">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Key Traits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#225651]">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#153E3A] border border-[#225651]">
              <div className="p-2 rounded-lg bg-[#FF6B4A] text-[#0F2E2B] mt-0.5">
                <Code className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-[#F1EFE7]">MVC Architecture</h4>
                <p className="text-xs text-[#F1EFE7]/70">Models, controllers, routes & services</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#153E3A] border border-[#225651]">
              <div className="p-2 rounded-lg bg-[#F4D35E] text-[#0F2E2B] mt-0.5">
                <Cpu className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-[#F1EFE7]">Security & RBAC</h4>
                <p className="text-xs text-[#F1EFE7]/70">JWT, OAuth, Rate Limiting & OTP</p>
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
            className="p-5 rounded-xl bg-[#123733] border border-[#225651] flex flex-col items-start justify-between hover:border-[#FF6B4A] transition-all"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#FF6B4A] tracking-tight">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="font-mono text-xl font-bold text-[#F4D35E]">
                  {stat.suffix}
                </span>
              )}
            </div>

            <div className="mt-3">
              <h4 className="font-mono font-bold text-sm text-[#F1EFE7]">
                {stat.label}
              </h4>
              <p className="text-xs text-[#F1EFE7]/70 mt-1 font-sans">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

