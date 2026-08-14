import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Globe, Layers } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#FBFAF7] dark:bg-[#0E0E12] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
              <div className="ml-3 px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[11px] font-mono text-[#16161C]/70 dark:text-[#FBFAF7]/70 hidden sm:flex items-center gap-1.5">
                <Globe className="w-3 h-3" />
                <span className="truncate max-w-[240px]">{project.browserUrl}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              id="close-modal-btn"
              aria-label="Close project modal"
              className="p-1.5 sm:p-2 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-red-500 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            {/* Screenshot Header */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 h-44 sm:h-64 shadow-inner bg-slate-900">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-[#1B4DFF] text-white text-[10px] sm:text-xs font-mono font-medium shadow-md">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="font-heading text-xl sm:text-3xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                {project.title}
              </h3>
              <p className="text-xs sm:text-base text-[#16161C]/80 dark:text-[#FBFAF7]/80 leading-relaxed font-body">
                {project.fullDescription}
              </p>
            </div>

            {/* Tech Stack List */}
            <div>
              <h4 className="font-heading font-semibold text-[11px] sm:text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Technologies Used</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 sm:px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] text-[11px] sm:text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-[11px] sm:text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 uppercase tracking-wider">
                  Key Highlights & Architecture
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00C48C] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Action Buttons */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1B4DFF] text-white font-heading font-semibold text-xs sm:text-sm hover:bg-[#1230B3] shadow-md transition-all min-h-[44px]"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] font-heading font-semibold text-xs sm:text-sm hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/10 dark:border-white/10 min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
