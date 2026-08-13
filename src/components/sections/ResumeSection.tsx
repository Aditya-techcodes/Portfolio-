import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, CheckCircle2, Sparkles, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, projectsData } from '../../data/portfolioData';
import { downloadResumePdf, openResumePdfInNewTab } from '../../utils/generateResumePdf';

export const ResumeSection: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1B4DFF', '#FF5A1F', '#00C48C']
    });

    downloadResumePdf();
  };

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 dark:bg-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>CURRICULUM VITAE</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          Official <span className="text-[#FF5A1F]">Resume</span>
        </h2>
        <p className="text-sm sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Download the official PDF CV or view the exact document below.
        </p>
        <div className="w-16 h-1 bg-[#FF5A1F] rounded-full mt-4" />
      </motion.div>

      {/* Styled Card Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl bg-gradient-to-br from-[#16161C] to-[#22222E] text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-white/10"
      >
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1B4DFF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF5A1F]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#00C48C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack & MERN Developer Resume</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-snug">
              Looking for a MERN Stack or Full Stack Web Developer?
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body max-w-2xl">
              BCA student graduating in 2027 with expertise in MongoDB, Express.js, React.js, Node.js, Redux Toolkit, REST APIs, JWT, Google OAuth, and Cloudinary.
            </p>

            {/* Quick Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#00C48C]" />
                <span>BCA Degree (2024–2027) | CGPA: 7.8/10</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#00C48C]" />
                <span>MERN Stack (MongoDB, Express, React, Node)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#00C48C]" />
                <span>Synergy+ Hospital & NestMart MERN Projects</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#00C48C]" />
                <span>Apna College Full Stack Certification</span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
            <button
              onClick={handleDownload}
              id="resume-download-btn"
              className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FF5A1F] text-white font-heading font-semibold text-sm shadow-xl hover:bg-[#e04810] hover:scale-105 transition-all transform active:scale-100 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF Resume</span>
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              id="resume-preview-btn"
              className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Eye className="w-5 h-5 text-[#1B4DFF]" />
              <span>{showPreview ? 'Hide Resume Document' : 'View Full Resume Document'}</span>
            </button>
          </div>
        </div>

        {/* Inline Printable Resume Document Visualizer */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-10 pt-8 border-t border-white/15 text-slate-900"
          >
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FF5A1F]" />
                <h4 className="font-heading text-lg font-bold">
                  Official PDF Resume Document Replica
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={openResumePdfInNewTab}
                  className="text-xs font-mono bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-[#00C48C] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open PDF File</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Sheet */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-slate-200 text-slate-800 font-serif text-xs leading-relaxed max-w-4xl mx-auto space-y-6">
              
              {/* PDF Header */}
              <div className="text-center space-y-1.5 border-b border-slate-300 pb-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
                  {personalInfo.name.toUpperCase()}
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-600 font-sans tracking-wide">
                  {personalInfo.location} &nbsp;|&nbsp; {personalInfo.phone} &nbsp;|&nbsp;{' '}
                  <a href={`mailto:${personalInfo.email}`} className="text-blue-700 underline">
                    {personalInfo.email}
                  </a>{' '}
                  &nbsp;|&nbsp; GitHub:{' '}
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    {personalInfo.githubUsername}
                  </a>
                </p>
              </div>

              {/* Career Objective */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-300 pb-0.5">
                  CAREER OBJECTIVE
                </h2>
                <p className="text-slate-700 text-xs sm:text-[12px] leading-normal pt-1 font-sans">
                  {personalInfo.careerObjective}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-300 pb-0.5 flex items-center justify-between">
                  <span>EDUCATION</span>
                </h2>
                <div className="pt-1 font-sans">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span>Bachelor of Computer Applications (BCA)</span>
                    <span className="font-normal text-slate-600">Expected Graduation: 2027 &nbsp;|&nbsp; CGPA: 7.8/10</span>
                  </div>
                  <p className="text-slate-700 italic text-xs">Uttam Institute of Technology and Management</p>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-300 pb-0.5">
                  TECHNICAL SKILLS
                </h2>
                <ul className="list-disc list-inside space-y-1 text-slate-800 text-xs pt-1 font-sans">
                  <li><strong className="font-bold">Languages:</strong> JavaScript (ES6+), HTML5, CSS3</li>
                  <li><strong className="font-bold">Frontend:</strong> React.js, Redux Toolkit, React Router, Tailwind CSS, Bootstrap, Responsive Web Design</li>
                  <li><strong className="font-bold">Backend:</strong> Node.js, Express.js, REST APIs, MVC Architecture</li>
                  <li><strong className="font-bold">Database:</strong> MongoDB, Mongoose</li>
                  <li><strong className="font-bold">Tools & Technologies:</strong> Git, GitHub, VS Code, npm, Cloudinary</li>
                  <li><strong className="font-bold">Core Concepts:</strong> CRUD Operations, Authentication & Authorization, JWT, OTP Verification, RBAC, Rate Limiting, API Integration, State Management, Responsive UI Design</li>
                </ul>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-300 pb-0.5">
                  PROJECTS
                </h2>

                {projectsData.map((project) => (
                  <div key={project.id} className="space-y-1 font-sans text-xs">
                    <div className="flex items-baseline justify-between font-bold text-slate-900">
                      <span>
                        {project.title} &nbsp;<span className="font-normal text-slate-500 italic">| Live Demo</span>
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700">
                      Technologies: <span className="font-normal">{project.techStack.join(', ')}</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                      {project.highlights.map((hl, index) => (
                        <li key={index} className="leading-tight">{hl}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-300 pb-0.5">
                  CERTIFICATIONS
                </h2>
                <ul className="list-disc list-inside text-slate-800 text-xs pt-1 font-sans">
                  <li>Apna College – Full Stack Web Development Certificate</li>
                </ul>
              </div>

              {/* Soft Skills */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-300 pb-0.5">
                  SOFT SKILLS
                </h2>
                <p className="text-slate-800 text-xs pt-1 font-sans">
                  {personalInfo.softSkills.join('  |  ')}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};



