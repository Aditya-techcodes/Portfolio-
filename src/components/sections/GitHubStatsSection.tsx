import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, GitCommit, Star, GitFork, Code2, ExternalLink } from 'lucide-react';
import { gitHubStatsData } from '../../data/portfolioData';

export const GitHubStatsSection: React.FC = () => {
  const [username, setUsername] = useState(gitHubStatsData.username);

  // Generate 52*7 days simulated contribution squares
  const contributionGrid = Array.from({ length: 52 * 7 }, (_, i) => {
    const intensity = Math.floor(Math.sin(i * 0.15) * 3 + Math.random() * 2);
    return Math.max(0, Math.min(4, intensity));
  });

  const getContributionColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-900/40 dark:bg-emerald-950/60 border border-emerald-700/30';
      case 2:
        return 'bg-emerald-600/70 dark:bg-emerald-700/80';
      case 3:
        return 'bg-emerald-500';
      case 4:
        return 'bg-[#00C48C] shadow-sm';
      default:
        return 'bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5';
    }
  };

  return (
    <section id="github-stats" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16161C] text-white dark:bg-white/10 dark:text-[#FBFAF7] text-xs font-mono font-medium mb-3">
          <Github className="w-3.5 h-3.5" />
          <span>OPEN SOURCE & ACTIVITY</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#16161C] dark:text-[#FBFAF7]">
          GitHub <span className="text-[#1B4DFF] dark:text-[#FF5A1F]">Statistics</span>
        </h2>
        <p className="text-sm sm:text-base text-[#16161C]/70 dark:text-[#FBFAF7]/70 max-w-xl mt-3 font-body">
          Contribution activity and language distribution metrics.
        </p>
        <div className="w-16 h-1 bg-[#16161C] dark:bg-[#FBFAF7] rounded-full mt-4" />
      </motion.div>

      {/* Main Stats Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-8"
      >
        {/* Username Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-3 rounded-2xl bg-[#16161C] text-white dark:bg-white/10">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#16161C] dark:text-[#FBFAF7]">
                @{username}
              </h3>
              <p className="text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60">
                GitHub Profile Stats
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your GitHub Username"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/15 text-xs font-mono text-[#16161C] dark:text-[#FBFAF7] focus:outline-none focus:ring-2 focus:ring-[#1B4DFF] w-full sm:w-56"
            />
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile"
              className="p-2.5 rounded-xl bg-[#1B4DFF] text-white hover:bg-[#1230B3] transition-colors shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Overview Metric Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 mb-1">
              <GitCommit className="w-3.5 h-3.5 text-[#00C48C]" />
              <span>Commits (2026)</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#16161C] dark:text-[#FBFAF7]">
              {gitHubStatsData.contributionsThisYear}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 mb-1">
              <Code2 className="w-3.5 h-3.5 text-[#1B4DFF]" />
              <span>Repositories</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#16161C] dark:text-[#FBFAF7]">
              {gitHubStatsData.totalRepos}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 mb-1">
              <Star className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Stars Earned</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#16161C] dark:text-[#FBFAF7]">
              {gitHubStatsData.starsEarned}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 mb-1">
              <GitFork className="w-3.5 h-3.5 text-purple-500" />
              <span>Pull Requests</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#16161C] dark:text-[#FBFAF7]">
              120+
            </p>
          </div>
        </div>

        {/* Contribution Heatmap */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#16161C]/70 dark:text-[#FBFAF7]/70">
            <span>Contribution Activity Grid</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded bg-black/10 dark:bg-white/10" />
              <span className="w-2.5 h-2.5 rounded bg-emerald-800" />
              <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
              <span className="w-2.5 h-2.5 rounded bg-[#00C48C]" />
              <span>More</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/10 overflow-x-auto">
            <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[640px]">
              {contributionGrid.map((level, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-sm transition-all hover:scale-125 ${getContributionColor(level)}`}
                  title={`Contribution activity level: ${level}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Languages Distribution Bar */}
        <div className="space-y-3 pt-2">
          <h4 className="font-heading font-semibold text-xs font-mono text-[#16161C]/60 dark:text-[#FBFAF7]/60 uppercase tracking-wider">
            Most Used Languages
          </h4>

          <div className="h-3 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
            {gitHubStatsData.topLanguages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color
                }}
                className="h-full transition-all hover:opacity-80"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            {gitHubStatsData.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5 text-xs font-mono text-[#16161C]/80 dark:text-[#FBFAF7]/80">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span>{lang.name}</span>
                <span className="text-[#16161C]/50 dark:text-[#FBFAF7]/50">({lang.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};


