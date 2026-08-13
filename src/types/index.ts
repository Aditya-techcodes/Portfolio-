export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  featured: boolean;
  githubUrl: string; // editable placeholder
  liveUrl: string;   // editable placeholder
  imageUrl: string;  // screenshot placeholder
  browserUrl: string;
  highlights: string[];
  category: string;
  fakeFilename?: string;
}

export interface SkillCategory {
  category: 'Languages & Frontend' | 'Backend & Database' | 'Tools & Technologies' | 'Core Engineering Concepts' | 'Frontend' | 'Backend' | 'Tools & Platforms' | 'Design & Methodologies';
  skills: {
    name: string;
    iconName?: string;
    level?: string;
  }[];
}

export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  companyOrInstitution: string;
  location: string;
  description: string;
  type: 'experience' | 'education';
  technologies?: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string[];
  subtitle: string;
  bio: string[];
  location: string;
  phone: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  resumePdfUrl: string;
  profileImageUrl: string;
  availableForHire: boolean;
  careerObjective: string;
  softSkills: string[];
}

export interface GitHubStats {
  username: string;
  totalRepos: number;
  starsEarned: number;
  contributionsThisYear: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}
