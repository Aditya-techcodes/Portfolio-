import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, Github, Linkedin, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry / Opportunity',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#1B4DFF', '#FF5A1F', '#00C48C']
      });
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Project Inquiry / Opportunity',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4DFF]/10 dark:bg-[#1B4DFF]/20 text-[#1B4DFF] dark:text-[#FF5A1F] text-xs font-mono font-medium mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>GET IN TOUCH</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          Let's <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Connect</span>
        </h2>
        <p className="text-xs sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Available for MERN stack roles, full stack engineering, and software collaborations.
        </p>
        <div className="w-16 h-1 bg-[#1B4DFF] rounded-full mt-4" />
      </motion.div>

      {/* Grid: Left Info Links + Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Direct Links & Badges */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6 sm:space-y-8"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-6">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
              Contact Information
            </h3>

            <p className="text-xs sm:text-sm text-[#16161C]/75 dark:text-[#FBFAF7]/75 leading-relaxed font-body">
              Currently seeking MERN Stack Developer or Software Engineer opportunities (Internship / Entry-Level).
            </p>

            <div className="space-y-3 sm:space-y-4 pt-1">
              {/* Email Link */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-black/30 border border-black/10 dark:border-white/10 hover:border-[#1B4DFF] transition-all group"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#1B4DFF]/10 text-[#1B4DFF] dark:bg-[#FF5A1F]/20 dark:text-[#FF5A1F] shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-mono text-[#16161C]/50 dark:text-[#FBFAF7]/50">Direct Email</p>
                  <p className="font-heading font-semibold text-xs sm:text-sm text-[#16161C] dark:text-[#FBFAF7] group-hover:text-[#1B4DFF] dark:group-hover:text-[#FF5A1F] transition-colors truncate">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              {/* Location Badge */}
              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-black/30 border border-black/10 dark:border-white/10">
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#FF5A1F]/10 text-[#FF5A1F] dark:bg-[#1B4DFF]/20 dark:text-[#1B4DFF] shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[#16161C]/50 dark:text-[#FBFAF7]/50">Location</p>
                  <p className="font-heading font-semibold text-xs sm:text-sm text-[#16161C] dark:text-[#FBFAF7]">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <p className="text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 mb-3">
                Social Profiles:
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] transition-all text-xs font-heading font-medium min-h-[40px]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-[#16161C] dark:text-[#FBFAF7] hover:bg-[#1B4DFF] hover:text-white dark:hover:bg-[#FF5A1F] transition-all text-xs font-heading font-medium min-h-[40px]"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Animated Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 w-full"
        >
          <div className="p-6 sm:p-10 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Confirmation State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-10 sm:py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00C48C]/10 text-[#00C48C] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#16161C] dark:text-[#FBFAF7]">
                    Message Sent!
                  </h3>

                  <p className="text-xs sm:text-sm text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-md font-body">
                    Thank you, <span className="font-bold text-[#16161C] dark:text-[#FBFAF7]">{formData.name}</span>! I've received your note and will reply promptly.
                  </p>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#1B4DFF] text-white font-heading font-semibold text-xs shadow-md hover:bg-[#1230B3] transition-all cursor-pointer min-h-[40px]"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Interactive Form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-heading font-semibold text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Aditya Sisodiya"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[#16161C] dark:text-[#FBFAF7] focus:outline-none focus:ring-2 focus:ring-[#1B4DFF]"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-heading font-semibold text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sisodiyaaditya81@gmail.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[#16161C] dark:text-[#FBFAF7] focus:outline-none focus:ring-2 focus:ring-[#1B4DFF]"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-heading font-semibold text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[#16161C] dark:text-[#FBFAF7] focus:outline-none focus:ring-2 focus:ring-[#1B4DFF]"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-heading font-semibold text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discussing MERN stack opportunities or projects..."
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-[#16161C] dark:text-[#FBFAF7] focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-2xl bg-[#16161C] text-white dark:bg-[#FBFAF7] dark:text-[#16161C] font-heading font-semibold text-xs sm:text-sm shadow-lg hover:bg-[#1B4DFF] dark:hover:bg-[#FF5A1F] dark:hover:text-white transition-all disabled:opacity-60 cursor-pointer min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
