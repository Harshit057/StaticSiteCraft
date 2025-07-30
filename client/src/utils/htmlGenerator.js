import { getThemeStyles } from './themeStyles.js';
import { getBaseStyles } from './baseStyles.js';
import { getTemplateStyles } from './templateStyles.js';
import {
  generateHeader,
  generateHero,
  generateAbout,
  generateProjects,
  generateContact,
  generateFeatures,
  generateTestimonials,
  generateCTA,
  generateFooter,
  generateServices,
  generateTeam,
  generateFeaturedPosts,
  generateRecentPosts,
  generateSidebar
} from './htmlGenerators.js';

export const generateHTML = (template, content, theme) => {
  try {
    console.log('Generating HTML for template:', template?.id, 'theme:', theme);
    console.log('Content:', content);
    
    const themeStyles = getThemeStyles(theme);
    const templateHTML = generateTemplateHTML(template, content);
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.header?.title || 'My Website'}</title>
    <meta name="description" content="${content.hero?.subtitle || 'A beautiful website created with StaticSiteCraft'}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        ${themeStyles}
        ${getBaseStyles()}
        ${getTemplateStyles(template.id)}
    </style>
</head>
<body>
    ${templateHTML}
    <script>
        ${getBaseScripts()}
    </script>
</body>
</html>`;

    console.log('HTML generated successfully, length:', htmlContent.length);
    return htmlContent;
  } catch (error) {
    console.error('Error in generateHTML:', error);
    throw error;
  }
};

const generateTemplateHTML = (template, content) => {
  try {
    console.log('Generating template HTML for sections:', template.layout);
    
    const sections = template.layout.map(section => {
      console.log('Generating section:', section);
      
      switch (section) {
        case 'header':
          return generateHeader(content.header);
        case 'hero':
          return generateHero(content.hero);
        case 'about':
          return generateAbout(content.about);
        case 'projects':
          return generateProjects(content.projects);
        case 'contact':
          return generateContact(content.contact);
        case 'features':
          return generateFeatures(content.features);
        case 'testimonials':
          return generateTestimonials(content.testimonials);
        case 'cta':
          return generateCTA(content.cta);
        case 'footer':
          return generateFooter(content.footer);
        case 'services':
          return generateServices(content.services);
        case 'team':
          return generateTeam(content.team);
        case 'featured-posts':
          return generateFeaturedPosts(content.featuredPosts);
        case 'recent-posts':
          return generateRecentPosts(content.recentPosts);
        case 'sidebar':
          return generateSidebar(content.sidebar);
        default:
          console.warn('Unknown section:', section);
          return '';
      }
    });
    
    const result = sections.join('\n');
    console.log('Template HTML generated, length:', result.length);
    return result;
  } catch (error) {
    console.error('Error in generateTemplateHTML:', error);
    throw error;
  }
};

const getBaseScripts = () => `
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add some basic interactivity
  document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .feature-card, .service-card, .team-card, .post-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  });
`; 