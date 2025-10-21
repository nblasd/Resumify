import jsPDF from 'jspdf';

export const generateCVPDFs = (formData) => {
  // Generate single Professional & ATS-Friendly CV
  return [generateProfessionalTemplate(formData)];
};

const generateProfessionalTemplate = (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Debug: Log the data being passed
  console.log('PDF Generation - Full Data:', data);
  console.log('PDF Generation - Experience:', data.experience);
  console.log('PDF Generation - Education:', data.education);
  console.log('PDF Generation - Projects:', data.projects);
  
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [88, 28, 135]; // Default purple if conversion fails
  };
  
  // Colors
  const primaryColor = data.headerColor ? hexToRgb(data.headerColor) : [88, 28, 135];
  const secondaryColor = [59, 130, 246]; // Blue
  const textColor = [31, 41, 55]; // Dark gray
  const lightGray = [156, 163, 175]; // Light gray
  
  // Calculate header height based on contact info
  const contactItems = [];
  if (data.email) contactItems.push(`Email: ${data.email}`);
  if (data.phone) contactItems.push(`Phone: ${data.phone}`);
  if (data.address) contactItems.push(`Address: ${data.address}`);
  if (data.linkedin) contactItems.push(`LinkedIn: ${data.linkedin}`);
  if (data.website) contactItems.push(`Website: ${data.website}`);
  
  const titleHeight = data.title ? 8 : 0;
  const headerHeight = 35 + titleHeight + Math.ceil(contactItems.length / 2) * 6;
  
  // Header Section
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');
  
  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.firstName} ${data.lastName}`, 20, 15);
  
  // Professional Title (if provided)
  let titleY = 22;
  if (data.title) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.title, 20, titleY);
    titleY += 8;
  }
  
  // Contact Info - arranged horizontally in header
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  let contactY = data.title ? 30 : 25;
  let contactX = 20;
  const maxWidth = pageWidth - 40;
  const itemsPerRow = 2;
  
  contactItems.forEach((item, index) => {
    if (index > 0 && index % itemsPerRow === 0) {
      contactY += 6;
      contactX = 20;
    } else if (index > 0) {
      contactX = pageWidth / 2 + 10;
    } else {
      contactX = 20;
    }
    
    doc.text(item, contactX, contactY);
  });
  
  let currentY = headerHeight + 10;
  
  // Professional Summary
  if (data.summary) {
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFESSIONAL SUMMARY', 20, currentY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 40);
    doc.text(summaryLines, 20, currentY + 10);
    currentY += 10 + (summaryLines.length * 5) + 10;
    
    // Horizontal line after summary
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, pageWidth - 20, currentY);
    currentY += 10;
  }
  
  // Skills
  if (data.skills && data.skills.length > 0) {
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', 20, currentY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    currentY += 10;
    
    // Arrange skills in 3 columns
    const skillsPerRow = 3;
    const columnWidth = (pageWidth - 40) / skillsPerRow;
    const startX = 20;
    
    data.skills.forEach((skill, index) => {
      const column = index % skillsPerRow;
      const row = Math.floor(index / skillsPerRow);
      const x = startX + (column * columnWidth);
      const y = currentY + (row * 6);
      
      const skillText = `• ${skill.name} (${skill.level})`;
      doc.text(skillText, x, y);
    });
    
    const totalRows = Math.ceil(data.skills.length / skillsPerRow);
    currentY += (totalRows * 6) + 10;
    
    // Horizontal line after skills
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, pageWidth - 20, currentY);
    currentY += 10;
  }
  
  // Work Experience
  if (data.experience && data.experience.length > 0) {
    if (currentY > pageHeight - 30) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WORK EXPERIENCE', 20, currentY);
    currentY += 10;
    
    data.experience.forEach((exp, index) => {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setTextColor(...textColor);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.position, 20, currentY);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...secondaryColor);
      doc.text(exp.company, 20, currentY + 8);
      
      doc.setTextColor(...lightGray);
      const dateRange = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      doc.text(dateRange, 20, currentY + 16);
      
      currentY += 16;
      
      if (exp.description) {
        doc.setTextColor(...textColor);
        const descLines = doc.splitTextToSize(exp.description, pageWidth - 40);
        doc.text(descLines, 20, currentY + 8);
        currentY += 8 + (descLines.length * 5);
      }
      
      // Projects within this experience
      if (exp.projects && exp.projects.length > 0) {
        currentY += 8;
        
        exp.projects.forEach((project) => {
          if (currentY > pageHeight - 30) {
            doc.addPage();
            currentY = 20;
          }
          
          // Project name
          doc.setTextColor(...textColor);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(`Project: ${project.name}`, 25, currentY);
          currentY += 6;
          
          // Project URL
          if (project.url) {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...secondaryColor);
            doc.text(project.url, 25, currentY);
            currentY += 5;
          }
          
          // Project dates
          doc.setFontSize(8);
          doc.setTextColor(...lightGray);
          const projectDateRange = `${project.startDate} - ${project.endDate}`;
          doc.text(projectDateRange, 25, currentY);
          currentY += 6;
          
          // Project points
          if (project.points && project.points.length > 0) {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...textColor);
            
            project.points.forEach((point) => {
              if (currentY > pageHeight - 15) {
                doc.addPage();
                currentY = 20;
              }
              const bulletPoint = `• ${point}`;
              const lines = doc.splitTextToSize(bulletPoint, pageWidth - 55);
              doc.text(lines, 30, currentY);
              currentY += lines.length * 4.5;
            });
          }
          
          currentY += 4;
        });
      }
      
      currentY += 10;
    });
    currentY += 5;
    
    // Horizontal line after work experience
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, pageWidth - 20, currentY);
    currentY += 10;
  }
  
  // Education
  if (data.education && data.education.length > 0) {
    if (currentY > pageHeight - 30) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', 20, currentY);
    currentY += 10;
    
    data.education.forEach((edu) => {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setTextColor(...textColor);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, 20, currentY);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...secondaryColor);
      doc.text(edu.institution, 20, currentY + 8);
      
      if (edu.field) {
        doc.setTextColor(...textColor);
        doc.text(edu.field, 20, currentY + 16);
      }
      
      doc.setTextColor(...lightGray);
      const dateRange = `${edu.startDate} - ${edu.endDate}`;
      const gpaText = edu.gpa ? ` • GPA: ${edu.gpa}` : '';
      doc.text(dateRange + gpaText, 20, currentY + (edu.field ? 24 : 16));
      
      currentY += (edu.field ? 32 : 24) + 5;
    });
    currentY += 5;
    
    // Horizontal line after education
    if (currentY < pageHeight - 20) {
      doc.setDrawColor(...lightGray);
      doc.setLineWidth(0.5);
      doc.line(20, currentY, pageWidth - 20, currentY);
      currentY += 10;
    }
  }
  
  return { doc, name: 'Professional_ATS_Resume.pdf' };
};
