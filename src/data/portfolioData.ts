import { PersonalInfo, Project, SkillCategory, TimelineEntry, StatItem, GitHubStats } from '../types';

/**
 * ============================================================================
 * PORTFOLIO DATA FOR ADITYA SISODIYA
 * Extracted from official BCA Full Stack / MERN Developer Resume
 * ============================================================================
 */

export const personalInfo: PersonalInfo = {
  name: "Aditya Sisodiya",
  title: "MERN Stack & Full Stack Developer",
  
  tagline: [
    "Building scalable MERN Stack web applications",
    "Engineering secure REST APIs & Role-Based Access Systems",
    "Crafting responsive, mobile-first React interfaces",
    "Developing real-time healthcare & e-commerce platforms"
  ],
  
  subtitle: "Motivated BCA student graduating in 2027 with expertise in the MERN stack (MongoDB, Express.js, React.js, Node.js). Skilled in designing scalable, user-friendly web applications, secure JWT authentication, and responsive UIs.",
  
  bio: [
    "I'm a Full Stack Web Developer and BCA student (2024-2027) at Uttam Institute of Technology and Management (CGPA: 7.8/10). My engineering focus centers around building scalable MERN stack web applications with clean architecture and robust security.",
    "I have engineered production-grade projects including Synergy+ Hospital (a doctor appointment management system with Google OAuth and rate-limiting) and NestMart (a full-featured e-commerce platform with Redux Toolkit and Cloudinary). I am passionate about continuous learning, clean code, and API integration."
  ],
  
  location: "Agra, Uttar Pradesh, India",
  phone: "+91 7017430753",
  email: "sisodiyaaditya81@gmail.com",
  
  githubUsername: "Aditya-techcodes",
  githubUrl: "https://github.com/Aditya-techcodes",
  linkedinUrl: "https://www.linkedin.com/in/aditya-sisodiya",
  
  resumePdfUrl: "/Aditya_Sisodiya_Resume.pdf",
  profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  
  availableForHire: true,
  
  careerObjective: "Motivated BCA student graduating in 2027 with a strong interest in Full Stack Web Development. Skilled in the MERN stack and passionate about building scalable, user-friendly web applications. Seeking an internship or entry-level Software Developer/MERN Stack Developer role where I can contribute to real-world projects while continuously improving my technical skills.",
  
  softSkills: [
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Quick Learner",
    "Adaptability"
  ]
};

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    label: "CGPA",
    value: 7.8,
    suffix: "/10",
    description: "Uttam Institute of Technology & Management"
  },
  {
    id: "stat-2",
    label: "Core Projects",
    value: 2,
    suffix: " Major",
    description: "Healthcare & E-Commerce MERN Platforms"
  },
  {
    id: "stat-3",
    label: "Graduation Year",
    value: 2027,
    description: "Bachelor of Computer Applications (BCA)"
  },
  {
    id: "stat-4",
    label: "Certifications",
    value: 1,
    suffix: " Certified",
    description: "Apna College Full Stack Web Development"
  }
];

export const projectsData: Project[] = [
  {
    id: "synergy-hospital",
    title: "Synergy+ Hospital — Doctor Appointment System",
    shortDescription: "A full-stack healthcare appointment portal built with MERN stack, featuring Google OAuth, multi-channel OTP verification, sliding-window rate limiting, and an Admin Command Center.",
    fullDescription: "Synergy+ Hospital is a comprehensive healthcare management platform engineered with MVC architecture (models, controllers, services, routes). It features role-based access control separating the Patient Portal from the Administrator Command Center, real-time appointment status tracking, JWT authentication with Google OAuth, and custom sliding-window rate-limiting middleware to prevent brute-force attacks.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Google OAuth", "Tailwind CSS", "REST APIs"],
    featured: true,
    githubUrl: "https://github.com/Aditya-techcodes/synergy-hospital",
    liveUrl: "https://github.com/Aditya-techcodes/synergy-hospital",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    browserUrl: "synergy-hospital.app/appointments",
    category: "Full Stack",
    fakeFilename: "synergy-hospital.tsx",
    highlights: [
      "Structured full-stack healthcare portal using MERN stack with MVC architecture (models, controllers, services, routes)",
      "Implemented JWT authentication with Google OAuth login and multi-channel OTP verification (HTTP email API with automatic SMTP fallback)",
      "Designed role-based access control separating Patient Portal from Administrator Command Center with real-time status tracking",
      "Engineered custom sliding-window rate-limiting middleware to protect authentication and OTP routes from brute-force abuse",
      "Developed automated Mongoose seed routines to populate hospital departments, doctors, and admin credentials on first run"
    ]
  },
  {
    id: "nestmart-ecommerce",
    title: "NestMart — Full Stack MERN E-Commerce Platform",
    shortDescription: "A full-stack MERN e-commerce platform with React & Redux Toolkit, JWT auth, Cloudinary image uploads, Admin Analytics Dashboard, and mobile-first checkout workflow.",
    fullDescription: "NestMart is a full-featured e-commerce web application with a React and Redux Toolkit frontend, Express/Node.js REST API, and MongoDB database. It provides secure JWT authentication with OTP email verification, an Admin Dashboard for revenue analytics, order management, inventory control, Cloudinary image uploads, product reviews/ratings, and a responsive mobile-first UI.",
    techStack: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "REST APIs"],
    featured: true,
    githubUrl: "https://github.com/Aditya-techcodes/nestmart-ecommerce",
    liveUrl: "https://github.com/Aditya-techcodes/nestmart-ecommerce",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    browserUrl: "nestmart.shop/store",
    category: "Full Stack",
    fakeFilename: "nestmart.tsx",
    highlights: [
      "Developed full-stack e-commerce platform with React/Redux Toolkit frontend, Express/Node.js REST API, and MongoDB",
      "Implemented secure JWT authentication with OTP email verification and role-based access control for User and Admin panels",
      "Built Admin Dashboard with revenue analytics, order management, and product inventory management (add, edit, delete, search)",
      "Integrated Cloudinary for image uploads and built a product review and rating system",
      "Built responsive, mobile-first UI with shopping cart, checkout workflow, and mobile bottom navigation"
    ]
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio — Code Editor & Terminal Identity",
    shortDescription: "Personal boutique developer portfolio designed around a code editor window aesthetic, flat color blocking (#0F2E2B, #FF6B4A, #F4D35E), Three.js wireframe canvas, and PDF resume generator.",
    fullDescription: "A custom personal portfolio website built with React, Vite, Tailwind CSS, Motion, Three.js, and jsPDF. Designed around an un-templated 'editor/terminal' visual identity, it features interactive code-editor window project cards, terminal typing commands, dynamic resume generation, and responsive keyboard accessibility.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Three.js", "Motion", "jsPDF", "Vite"],
    featured: true,
    githubUrl: "https://github.com/Aditya-techcodes",
    liveUrl: "https://github.com/Aditya-techcodes",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    browserUrl: "adityasisodiya.dev/portfolio",
    category: "Frontend & 3D",
    fakeFilename: "portfolio.tsx",
    highlights: [
      "Designed boutique editor/terminal visual identity using flat color-blocking (#0F2E2B base, #FF6B4A coral, #F4D35E acid yellow)",
      "Implemented interactive project cards styled like IDE windows with tab bars, syntax tags, and hover expand effects",
      "Built client-side jsPDF resume generator with instant PDF download and Blob preview stream",
      "Engineered responsive Three.js WebGL wireframe canvas responding smoothly to cursor position",
      "Ensured full mobile-to-desktop accessibility and WCAG contrast compliance without generic templates"
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages & Frontend",
    skills: [
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "React.js", level: "Advanced" },
      { name: "Redux Toolkit", level: "Intermediate" },
      { name: "React Router", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Bootstrap", level: "Intermediate" },
      { name: "HTML5 & CSS3", level: "Expert" },
      { name: "Responsive Web Design", level: "Expert" }
    ]
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Mongoose ODM", level: "Advanced" },
      { name: "REST APIs", level: "Expert" },
      { name: "MVC Architecture", level: "Advanced" }
    ]
  },
  {
    category: "Tools & Technologies",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced" },
      { name: "VS Code", level: "Expert" },
      { name: "npm", level: "Advanced" },
      { name: "Cloudinary", level: "Intermediate" }
    ]
  },
  {
    category: "Core Engineering Concepts",
    skills: [
      { name: "CRUD Operations", level: "Expert" },
      { name: "Authentication & Authorization", level: "Advanced" },
      { name: "JWT (JSON Web Tokens)", level: "Advanced" },
      { name: "OTP Verification", level: "Advanced" },
      { name: "Role-Based Access Control (RBAC)", level: "Advanced" },
      { name: "Rate Limiting", level: "Advanced" },
      { name: "API Integration", level: "Advanced" },
      { name: "State Management", level: "Advanced" }
    ]
  }
];

export const timelineData: TimelineEntry[] = [
  {
    id: "edu-bca",
    period: "2024 — 2027 (Expected)",
    role: "Bachelor of Computer Applications (BCA)",
    companyOrInstitution: "Uttam Institute of Technology and Management",
    location: "Agra, Uttar Pradesh, India",
    description: "Pursuing BCA with a CGPA of 7.8/10. Coursework includes Full Stack Web Development, Database Management Systems, Software Engineering, Data Structures, and Computer Networks.",
    type: "education",
    technologies: ["MERN Stack", "C/C++", "Java", "DBMS", "Web Technologies"]
  },
  {
    id: "cert-apna",
    period: "2024",
    role: "Full Stack Web Development Certificate",
    companyOrInstitution: "Apna College",
    location: "Online",
    description: "Completed comprehensive certification program covering full-stack web development using the MERN stack, REST API construction, state management, and modern deployment practices.",
    type: "experience",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Git"]
  }
];

export const gitHubStatsData: GitHubStats = {
  username: "Aditya-techcodes",
  totalRepos: 18,
  starsEarned: 35,
  contributionsThisYear: 520,
  topLanguages: [
    { name: "JavaScript", percentage: 62, color: "#F7DF1E" },
    { name: "React / JSX", percentage: 22, color: "#61DAFB" },
    { name: "HTML / CSS", percentage: 12, color: "#38BDF8" },
    { name: "Other", percentage: 4, color: "#6E7681" }
  ]
};
