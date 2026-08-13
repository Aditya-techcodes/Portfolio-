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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#FBFAF7] dark:bg-[#0E0E12] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden my-auto"
        >
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="ml-4 px-3 py-1 rounded-md bg-black/5 dark:bg-white/10 text-xs font-mono text-[#16161C]/70 dark:text-[#FBFAF7]/70 hidden sm:flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span>{project.browserUrl}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              id="close-modal-btn"
              className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-red-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Screenshot Header */}
            <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 max-h-80 shadow-inner">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#1B4DFF] text-white text-xs font-mono font-medium shadow-md">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-[#16161C]/80 dark:text-[#FBFAF7]/80 leading-relaxed font-body">
                {project.fullDescription}
              </p>
            </div>

            {/* Tech Stack List */}
            <div>
              <h4 className="font-heading font-semibold text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Technologies Used</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 uppercase tracking-wider">
                  Key Highlights & Architecture
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#00C48C] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Action Buttons */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4DFF] text-white font-heading font-semibold text-sm hover:bg-[#1230B3] shadow-md transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] font-heading font-semibold text-sm hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/10 dark:border-white/10"
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
