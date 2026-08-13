import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Layout, Server, Wrench, CheckCircle } from 'lucide-react';
import { skillCategories } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages & Frontend':
        return <Layout className="w-4 h-4 text-[#1B4DFF] dark:text-[#FF5A1F]" />;
      case 'Backend & Database':
        return <Server className="w-4 h-4 text-[#FF5A1F] dark:text-[#1B4DFF]" />;
      case 'Tools & Technologies':
        return <Wrench className="w-4 h-4 text-[#1B4DFF] dark:text-[#FF5A1F]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#FF5A1F]" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 text-[#1B4DFF] dark:text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>TECHNICAL SKILLS</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          Tech Stack & <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Capabilities</span>
        </h2>
        <p className="text-sm sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Grouped by engineering domains with interactive cards and proficiency tags.
        </p>
        <div className="w-16 h-1 bg-[#1B4DFF] rounded-full mt-4" />
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            className="p-6 sm:p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#1B4DFF]/40 dark:hover:border-[#FF5A1F]/40 transition-all shadow-sm"
          >
            {/* Category Title */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-black/30 border border-black/10 dark:border-white/10">
                  {getCategoryIcon(group.category)}
                </div>
                <h3 className="font-heading text-xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                  {group.category}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60">
                {group.skills.length} modules
              </span>
            </div>

            {/* Skill Badges */}
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: groupIdx * 0.1 + skillIdx * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] border border-black/10 dark:border-white/10 hover:border-[#1B4DFF] dark:hover:border-[#FF5A1F] shadow-xs font-mono text-xs font-semibold transition-all cursor-default"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#1B4DFF] dark:text-[#FF5A1F] opacity-80 group-hover:opacity-100" />
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className="text-[10px] text-[#16161C]/50 dark:text-[#FBFAF7]/50 font-normal border-l border-black/10 dark:border-white/10 pl-1.5">
                      {skill.level}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

