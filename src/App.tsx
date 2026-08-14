import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { GitHubStatsSection } from './components/sections/GitHubStatsSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { ContactSection } from './components/sections/ContactSection';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FBFAF7] text-[#12131A] dark:bg-[#0E0E12] dark:text-[#FBFAF7] font-sans selection:bg-[#FF5A1F]/30 selection:text-[#FF5A1F] relative overflow-x-hidden transition-colors duration-300">
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <TimelineSection />
          <GitHubStatsSection />
          <ResumeSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
