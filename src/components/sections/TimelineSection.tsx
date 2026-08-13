import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin, Terminal } from 'lucide-react';
import { timelineData } from '../../data/portfolioData';

export const TimelineSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
          <span>~/timeline.log</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F1EFE7]">
          Education & <span className="text-[#FF6B4A]">Experience</span>
        </h2>
        <p className="text-sm sm:text-base text-[#F1EFE7]/80 max-w-xl mt-3 font-sans">
          Academic achievements at Uttam Institute & Full Stack Web Development Certifications.
        </p>
        <div className="w-16 h-1 bg-[#FF6B4A] rounded-full mt-4" />
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#225651] -translate-x-1/2" />

        <div className="space-y-12">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0F2E2B] border-2 border-[#FF6B4A] flex items-center justify-center text-[#F4D35E] shadow-md z-10">
                  {item.type === 'experience' ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                {/* Content Card Side */}
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                  <div className="p-6 rounded-2xl bg-[#123733] border border-[#225651] hover:border-[#FF6B4A] transition-all shadow-xl">
                    {/* Period & Location Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#153E3A] border border-[#225651] text-[#F4D35E] text-xs font-mono font-bold">
                        <Calendar className="w-3 h-3 text-[#FF6B4A]" />
                        <span>{item.period}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-mono text-[#F1EFE7]/70">
                        <MapPin className="w-3 h-3 text-[#FF6B4A]" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-display text-xl font-bold text-[#F1EFE7]">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono font-bold text-[#FF6B4A] mb-3">
                      @ {item.companyOrInstitution}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#F1EFE7]/80 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>

                    {/* Technologies Tag Chips */}
                    {item.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#225651]">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#153E3A] border border-[#225651] text-[10px] font-mono text-[#F4D35E]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

