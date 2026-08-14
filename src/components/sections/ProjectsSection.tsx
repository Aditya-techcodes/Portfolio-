import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, FolderGit2, Info } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';
import { Project } from '../../types';
import { TiltCard } from '../ui/TiltCard';
import { ProjectModal } from '../ui/ProjectModal';

const categories = ['All', 'MERN Stack', 'Frontend React', 'Mini Apps'];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 text-[#1B4DFF] dark:text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>FEATURED WORK</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          Highlighted <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Projects</span>
        </h2>
        <p className="text-xs sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Production-ready applications built with modern web technologies, robust architecture, and sleek interfaces.
        </p>
        <div className="w-16 h-1 bg-[#1B4DFF] rounded-full mt-4" />
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[38px] ${
              selectedCategory === cat
                ? 'bg-[#1B4DFF] text-white shadow-md shadow-[#1B4DFF]/30'
                : 'bg-black/5 dark:bg-white/5 text-[#16161C]/70 dark:text-[#FBFAF7]/70 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid with 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
          >
            <TiltCard className="h-full">
              <div className="h-full flex flex-col rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md overflow-hidden shadow-md hover:shadow-xl hover:border-[#1B4DFF]/40 dark:hover:border-[#FF5A1F]/40 transition-all">
                
                {/* Mini Browser Header Dots */}
                <div className="flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1B4DFF]/10 text-[#1B4DFF] dark:bg-[#FF5A1F]/20 dark:text-[#FF5A1F] font-semibold">
                    {project.category}
                  </span>
                </div>

                {/* Screenshot Frame */}
                <div 
                  onClick={() => setActiveModalProject(project)}
                  className="relative group/img overflow-hidden h-44 sm:h-48 bg-slate-100 dark:bg-slate-900 cursor-pointer"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#16161C] text-xs font-heading font-semibold shadow-md">
                      <Info className="w-3.5 h-3.5" />
                      <span>Overview & Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#16161C]/70 dark:text-[#FBFAF7]/70 leading-relaxed font-body line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C]/80 dark:text-[#FBFAF7]/80 text-[10px] sm:text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-heading font-semibold text-[#16161C]/80 dark:text-[#FBFAF7]/80 hover:text-[#1B4DFF] dark:hover:text-[#FF5A1F] transition-colors py-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-heading font-semibold text-[#1B4DFF] dark:text-[#FF5A1F] hover:underline py-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] transition-colors cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
