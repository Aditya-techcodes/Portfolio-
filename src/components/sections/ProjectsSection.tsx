import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, FolderGit2, Info, X, CheckCircle2, Globe } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';
import { Project } from '../../types';
import { TiltCard } from '../ui/TiltCard';

const categories = ['All', 'MERN Stack', 'Frontend React', 'Mini Apps'];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 text-[#1B4DFF] dark:text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>FEATURED WORK</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          Highlighted <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Projects</span>
        </h2>
        <p className="text-sm sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Production-ready applications built with modern web technologies, robust architecture, and sleek interfaces.
        </p>
        <div className="w-16 h-1 bg-[#1B4DFF] rounded-full mt-4" />
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <TiltCard className="h-full">
              <div className="h-full flex flex-col rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-xl hover:border-[#1B4DFF]/40 dark:hover:border-[#FF5A1F]/40 transition-all">
                
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
                <div className="relative group/img overflow-hidden h-48 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-xs">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#16161C] text-xs font-heading font-semibold shadow-md hover:bg-[#1B4DFF] hover:text-white transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Overview & Screenshots</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#16161C]/70 dark:text-[#FBFAF7]/70 leading-relaxed font-body line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C]/80 dark:text-[#FBFAF7]/80 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-heading font-semibold text-[#16161C]/80 dark:text-[#FBFAF7]/80 hover:text-[#1B4DFF] dark:hover:text-[#FF5A1F] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1B4DFF] text-white hover:bg-[#1230B3] text-xs font-heading font-semibold transition-all shadow-sm"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#FBFAF7] dark:bg-[#16161C] border border-black/10 dark:border-white/15 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#16161C] dark:text-[#FBFAF7] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#1B4DFF] dark:text-[#FF5A1F] uppercase">
                    {activeModalProject.category}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#16161C] dark:text-[#FBFAF7] mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>

                <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 max-h-72">
                  <img
                    src={activeModalProject.imageUrl}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-bold text-sm text-[#16161C] dark:text-[#FBFAF7]">
                    About this project:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#16161C]/80 dark:text-[#FBFAF7]/80 leading-relaxed font-body">
                    {activeModalProject.longDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-bold text-sm text-[#16161C] dark:text-[#FBFAF7]">
                    Key Technical Highlights:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                    {activeModalProject.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00C48C] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-heading font-semibold text-[#16161C] dark:text-[#FBFAF7]"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>

                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#1B4DFF] hover:bg-[#1230B3] text-white text-xs font-heading font-semibold shadow-md"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live App</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="text-xs font-heading font-medium text-[#16161C]/60 dark:text-[#FBFAF7]/60 hover:underline cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
