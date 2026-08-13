import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 text-[#1B4DFF] dark:text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>EXPERIENCE & EDUCATION</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          Education & <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Experience</span>
        </h2>
        <p className="text-sm sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Academic achievements at Uttam Institute & Full Stack Web Development Certifications.
        </p>
        <div className="w-16 h-1 bg-[#1B4DFF] rounded-full mt-4" />
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-black/10 dark:bg-white/10 -translate-x-1/2" />

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
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FBFAF7] dark:bg-[#16161C] border-2 border-[#1B4DFF] dark:border-[#FF5A1F] flex items-center justify-center text-[#1B4DFF] dark:text-[#FF5A1F] shadow-md z-10">
                  {item.type === 'experience' ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                {/* Content Card Side */}
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                  <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#1B4DFF] dark:hover:border-[#FF5A1F] transition-all shadow-md">
                    {/* Period & Location Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4DFF]/10 text-[#1B4DFF] dark:bg-[#FF5A1F]/20 dark:text-[#FF5A1F] text-xs font-mono font-semibold">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60">
                        <MapPin className="w-3 h-3 text-[#FF5A1F]" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-heading text-xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#1B4DFF] dark:text-[#FF5A1F] mb-3">
                      @ {item.companyOrInstitution}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#16161C]/80 dark:text-[#FBFAF7]/80 leading-relaxed font-body mb-4">
                      {item.description}
                    </p>

                    {/* Technologies Tag Chips */}
                    {item.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/10 dark:border-white/10">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-mono text-[#16161C]/80 dark:text-[#FBFAF7]/80"
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


