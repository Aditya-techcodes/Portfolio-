import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new jsPDF({
  unit: 'pt',
  format: 'a4',
});

const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
const margin = 36; // 0.5 inch margins
const contentWidth = pageWidth - margin * 2;
let y = 38;

// Set default font
doc.setFont('times', 'normal');

// HEADER: NAME & CONTACT
doc.setFont('times', 'bold');
doc.setFontSize(20);
doc.text('ADITYA SISODIYA', pageWidth / 2, y, { align: 'center' });
y += 18;

doc.setFont('times', 'normal');
doc.setFontSize(9.5);
const contactText = 'Agra, Uttar Pradesh, India  |  +91 7017430753  |  sisodiyaaditya81@gmail.com  |  GitHub: Aditya-techcodes';
doc.text(contactText, pageWidth / 2, y, { align: 'center' });
y += 14;

// Divider Line
doc.setLineWidth(1);
doc.setDrawColor(30, 41, 59);
doc.line(margin, y, pageWidth - margin, y);
y += 16;

const addSectionHeader = (title) => {
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text(title.toUpperCase(), margin, y);
  y += 4;
  doc.setLineWidth(0.75);
  doc.setDrawColor(71, 85, 105);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;
};

const addBulletPoint = (text, indent = 12) => {
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  const bulletX = margin + indent;
  const textX = bulletX + 10;
  const maxTextWidth = contentWidth - indent - 10;

  doc.text('•', bulletX, y);
  const lines = doc.splitTextToSize(text, maxTextWidth);
  doc.text(lines, textX, y);
  y += lines.length * 11 + 2;
};

// CAREER OBJECTIVE
addSectionHeader('CAREER OBJECTIVE');
doc.setFont('times', 'normal');
doc.setFontSize(9);
const objective = 'Motivated BCA student graduating in 2027 with a strong interest in Full Stack Web Development. Skilled in the MERN stack and passionate about building scalable, user-friendly web applications. Seeking an internship or entry-level Software Developer/MERN Stack Developer role where I can contribute to real-world projects while continuously improving my technical skills.';
const objLines = doc.splitTextToSize(objective, contentWidth);
doc.text(objLines, margin, y);
y += objLines.length * 11 + 10;

// EDUCATION
addSectionHeader('EDUCATION');
doc.setFont('times', 'bold');
doc.setFontSize(10);
doc.text('Bachelor of Computer Applications (BCA)', margin, y);
y += 12;

doc.setFont('times', 'italic');
doc.setFontSize(9);
doc.text('Uttam Institute of Technology and Management', margin, y);
doc.setFont('times', 'normal');
doc.text('Expected Graduation: 2027  |  CGPA: 7.8/10', pageWidth - margin, y, { align: 'right' });
y += 14;

// TECHNICAL SKILLS
addSectionHeader('TECHNICAL SKILLS');

const skillsList = [
  { label: 'Languages', text: 'JavaScript (ES6+), HTML5, CSS3' },
  { label: 'Frontend', text: 'React.js, Redux Toolkit, React Router, Tailwind CSS, Bootstrap, Responsive Web Design' },
  { label: 'Backend', text: 'Node.js, Express.js, REST APIs, MVC Architecture' },
  { label: 'Database', text: 'MongoDB, Mongoose' },
  { label: 'Tools & Technologies', text: 'Git, GitHub, VS Code, npm, Cloudinary' },
  { label: 'Core Concepts', text: 'CRUD Operations, Authentication & Authorization, JWT, OTP Verification, RBAC, Rate Limiting, API Integration, State Management, Responsive UI Design' },
];

skillsList.forEach((skill) => {
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.text('•', margin + 6, y);
  doc.setFont('times', 'bold');
  doc.text(`${skill.label}: `, margin + 16, y);
  
  const labelWidth = doc.getTextWidth(`${skill.label}: `);
  doc.setFont('times', 'normal');
  const remainingWidth = contentWidth - 16 - labelWidth;
  const lines = doc.splitTextToSize(skill.text, remainingWidth);

  if (lines.length === 1) {
    doc.text(lines[0], margin + 16 + labelWidth, y);
    y += 11;
  } else {
    doc.text(lines[0], margin + 16 + labelWidth, y);
    y += 11;
    for (let i = 1; i < lines.length; i++) {
      doc.text(lines[i], margin + 16, y);
      y += 11;
    }
  }
});
y += 4;

// PROJECTS
addSectionHeader('PROJECTS');

const projects = [
  {
    title: 'Synergy+ Hospital – Doctor Appointment Management System',
    tech: 'React.js, Node.js, Express.js, MongoDB, JWT, Google OAuth, Tailwind CSS, REST APIs',
    bullets: [
      'Developed a full-stack healthcare appointment portal using the MERN stack, structured with an MVC architecture (models, controllers, services, routes).',
      'Implemented JWT authentication with Google OAuth login and a multi-channel OTP verification system (HTTP email API with automatic SMTP fallback).',
      'Designed role-based access control separating the Patient Portal from an Administrator Command Center, with real-time appointment status tracking.',
      'Engineered a custom sliding-window rate-limiting middleware to protect authentication and OTP routes from brute-force abuse.',
      'Developed automated Mongoose seed routines to populate hospital departments, doctors, and admin credentials on first run.'
    ]
  },
  {
    title: 'NestMart – Full Stack MERN E-commerce Platform',
    tech: 'React.js, Redux Toolkit, Node.js, Express.js, MongoDB, JWT, Cloudinary, REST APIs',
    bullets: [
      'Developed a full-stack e-commerce platform with a React/Redux Toolkit frontend, an Express/Node.js REST API, and MongoDB for persistent data storage.',
      'Implemented secure JWT authentication with OTP email verification and role-based access control for User and Admin panels.',
      'Built an Admin Dashboard with revenue analytics, order management, and product inventory (add, edit, delete, search).',
      'Integrated Cloudinary for image uploads, and added a product review and rating system.',
      'Built a responsive, mobile-first UI with a shopping cart, checkout workflow, and mobile bottom navigation.'
    ]
  }
];

projects.forEach((proj, idx) => {
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.text(proj.title, margin, y);
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.text('| Live Demo', margin + doc.getTextWidth(proj.title) + 6, y);
  y += 12;

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.text('Technologies: ', margin, y);
  doc.setFont('times', 'normal');
  doc.text(proj.tech, margin + doc.getTextWidth('Technologies: '), y);
  y += 11;

  proj.bullets.forEach((hl) => {
    addBulletPoint(hl, 6);
  });

  if (idx < projects.length - 1) {
    y += 4;
  }
});

// CERTIFICATIONS
addSectionHeader('CERTIFICATIONS');
doc.setFont('times', 'normal');
doc.setFontSize(9);
doc.text('•  Apna College – Full Stack Web Development Certificate', margin + 6, y);
y += 16;

// SOFT SKILLS
addSectionHeader('SOFT SKILLS');
doc.setFont('times', 'normal');
doc.setFontSize(9);
doc.text('Problem Solving  |  Team Collaboration  |  Communication  |  Quick Learner  |  Adaptability', margin + 6, y);

const pdfOutput = doc.output('arraybuffer');
fs.writeFileSync(path.join(publicDir, 'Aditya_Sisodiya_Resume.pdf'), Buffer.from(pdfOutput));
console.log('Successfully generated public/Aditya_Sisodiya_Resume.pdf');
