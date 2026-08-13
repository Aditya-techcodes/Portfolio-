import { jsPDF } from 'jspdf';
import { personalInfo, projectsData, skillCategories, timelineData } from '../data/portfolioData';

export const generateResumePdf = (): jsPDF => {
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

  // --------------------------------------------------------------------------
  // HEADER: NAME & CONTACT
  // --------------------------------------------------------------------------
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text(personalInfo.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 18;

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  const contactText = `${personalInfo.location}  |  ${personalInfo.phone}  |  ${personalInfo.email}  |  GitHub: ${personalInfo.githubUsername}`;
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Divider Line
  doc.setLineWidth(1);
  doc.setDrawColor(30, 41, 59); // dark grey line
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  // Helper function for section headings
  const addSectionHeader = (title: string) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setLineWidth(0.75);
    doc.setDrawColor(71, 85, 105);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;
  };

  // Helper function to print wrapped text with bullet
  const addBulletPoint = (text: string, indent = 12) => {
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

  // --------------------------------------------------------------------------
  // CAREER OBJECTIVE
  // --------------------------------------------------------------------------
  addSectionHeader('CAREER OBJECTIVE');
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  const objLines = doc.splitTextToSize(personalInfo.careerObjective, contentWidth);
  doc.text(objLines, margin, y);
  y += objLines.length * 11 + 10;

  // --------------------------------------------------------------------------
  // EDUCATION
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // TECHNICAL SKILLS
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // PROJECTS
  // --------------------------------------------------------------------------
  addSectionHeader('PROJECTS');

  projectsData.forEach((proj, idx) => {
    // Project Title & Link
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    const titleText = `${proj.title.split('—')[0].trim()} – ${proj.title.includes('—') ? proj.title.split('—')[1].trim() : ''}`;
    doc.text(titleText, margin, y);
    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.text('| Live Demo', margin + doc.getTextWidth(titleText) + 6, y);
    y += 12;

    // Technologies line
    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.text('Technologies: ', margin, y);
    doc.setFont('times', 'normal');
    doc.text(proj.techStack.join(', '), margin + doc.getTextWidth('Technologies: '), y);
    y += 11;

    // Highlights Bullets
    proj.highlights.forEach((hl) => {
      addBulletPoint(hl, 6);
    });

    if (idx < projectsData.length - 1) {
      y += 4;
    }
  });

  // --------------------------------------------------------------------------
  // CERTIFICATIONS
  // --------------------------------------------------------------------------
  addSectionHeader('CERTIFICATIONS');
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.text('•  Apna College – Full Stack Web Development Certificate', margin + 6, y);
  y += 16;

  // --------------------------------------------------------------------------
  // SOFT SKILLS
  // --------------------------------------------------------------------------
  addSectionHeader('SOFT SKILLS');
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.text(personalInfo.softSkills.join('  |  '), margin + 6, y);

  return doc;
};

export const downloadResumePdf = () => {
  const doc = generateResumePdf();
  doc.save('Aditya_Sisodiya_Resume.pdf');
};

export const openResumePdfInNewTab = () => {
  const doc = generateResumePdf();
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');
};
