import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Layout, Server, Wrench, CheckCircle, Terminal } from 'lucide-react';
import { skillCategories } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages & Frontend':
        return <Layout className="w-4 h-4 text-[#FF6B4A]" />;
      case 'Backend & Database':
        return <Server className="w-4 h-4 text-[#F4D35E]" />;
      case 'Tools & Technologies':
        return <Wrench className="w-4 h-4 text-[#FF6B4A]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#F4D35E]" />;
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#153E3A] border border-[#225651] text-[#F4D35E] text-xs font-mono font-bold mb-3">
          <Terminal className="w-4 h-4 text-[#FF6B4A]" />
          <span>~/skills.json</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F1EFE7]">
          Tech Stack & <span className="text-[#FF6B4A]">Capabilities</span>
        </h2>
        <p className="text-sm sm:text-base text-[#F1EFE7]/80 max-w-xl mt-3 font-sans">
          MERN stack ecosystem, REST APIs, state management, and production backend architecture.
        </p>
        <div className="w-16 h-1 bg-[#FF6B4A] rounded-full mt-4" />
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
            className="p-6 sm:p-8 rounded-2xl bg-[#123733] border border-[#225651] hover:border-[#FF6B4A] transition-all shadow-xl"
          >
            {/* Category Title */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#225651]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#153E3A] border border-[#225651]">
                  {getCategoryIcon(group.category)}
                </div>
                <h3 className="font-display text-xl font-bold text-[#F1EFE7]">
                  {group.category}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#F4D35E]">
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
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#153E3A] border border-[#225651] text-[#F1EFE7] font-mono text-xs hover:border-[#FF6B4A] hover:text-[#F4D35E] transition-all cursor-default"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className="text-[10px] text-[#F4D35E] opacity-90 border-l border-[#225651] pl-1.5 font-bold">
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

