import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import { protect } from '../middleware/auth.js';
import Portfolio from '../models/Portfolio.js';

const router = express.Router();

// @desc    Generate static site from portfolio
// @route   POST /api/site/generate/:portfolioId
// @access  Private
router.post('/generate/:portfolioId', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    // Generate HTML content
    const htmlContent = generateHTML(portfolio);
    
    // Create sites directory if it doesn't exist
    const sitesDir = path.join(process.cwd(), 'sites');
    await fs.ensureDir(sitesDir);
    
    // Create user directory
    const userDir = path.join(sitesDir, req.user._id.toString());
    await fs.ensureDir(userDir);
    
    // Create portfolio directory
    const portfolioDir = path.join(userDir, portfolio.slug);
    await fs.ensureDir(portfolioDir);
    
    // Write HTML file
    const indexPath = path.join(portfolioDir, 'index.html');
    await fs.writeFile(indexPath, htmlContent);
    
    // Copy assets if they exist
    const assetsDir = path.join(portfolioDir, 'assets');
    await fs.ensureDir(assetsDir);
    
    // Copy user uploads if they exist
    const userUploadsDir = path.join(process.cwd(), 'uploads', req.user._id.toString());
    if (await fs.pathExists(userUploadsDir)) {
      await fs.copy(userUploadsDir, path.join(assetsDir, 'uploads'));
    }

    const siteUrl = `/sites/${req.user._id}/${portfolio.slug}/index.html`;

    res.json({
      success: true,
      message: 'Static site generated successfully',
      data: {
        siteUrl,
        localPath: portfolioDir,
        portfolioId: portfolio._id
      }
    });
  } catch (error) {
    console.error('Generate site error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during site generation'
    });
  }
});

// @desc    Get generated site URL
// @route   GET /api/site/:portfolioId
// @access  Private
router.get('/:portfolioId', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    const sitePath = path.join(process.cwd(), 'sites', req.user._id.toString(), portfolio.slug, 'index.html');
    const siteExists = await fs.pathExists(sitePath);

    if (!siteExists) {
      return res.status(404).json({
        success: false,
        error: 'Site not generated yet'
      });
    }

    const siteUrl = `/sites/${req.user._id}/${portfolio.slug}/index.html`;

    res.json({
      success: true,
      data: {
        siteUrl,
        portfolioId: portfolio._id,
        isGenerated: true
      }
    });
  } catch (error) {
    console.error('Get site error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Delete generated site
// @route   DELETE /api/site/:portfolioId
// @access  Private
router.delete('/:portfolioId', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    const siteDir = path.join(process.cwd(), 'sites', req.user._id.toString(), portfolio.slug);
    
    if (await fs.pathExists(siteDir)) {
      await fs.remove(siteDir);
    }

    res.json({
      success: true,
      message: 'Generated site deleted successfully'
    });
  } catch (error) {
    console.error('Delete site error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during site deletion'
    });
  }
});

// Helper function to generate HTML content
function generateHTML(portfolio) {
  const { title, description, components, settings } = portfolio;
  
  const css = generateCSS(settings);
  const js = generateJS(settings);
  
  const componentsHTML = components
    .filter(comp => comp.isVisible)
    .sort((a, b) => a.order - b.order)
    .map(comp => generateComponentHTML(comp))
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.seo.title || title}</title>
    <meta name="description" content="${settings.seo.description || description || ''}">
    ${settings.seo.keywords ? `<meta name="keywords" content="${settings.seo.keywords.join(', ')}">` : ''}
    ${settings.seo.ogImage ? `<meta property="og:image" content="${settings.seo.ogImage}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        ${css}
    </style>
</head>
<body>
    <div class="portfolio-container">
        ${componentsHTML}
    </div>
    ${settings.customCSS ? `<style>${settings.customCSS}</style>` : ''}
    ${settings.customJS ? `<script>${settings.customJS}</script>` : ''}
    <script>
        ${js}
    </script>
</body>
</html>`;
}

function generateCSS(settings) {
  const { theme, layout } = settings;
  
  return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: ${theme.fontFamily || 'Inter, sans-serif'};
        line-height: 1.6;
        color: ${theme.textColor || '#333333'};
        background-color: ${theme.backgroundColor || '#ffffff'};
    }
    
    .portfolio-container {
        max-width: ${layout.maxWidth || '1200px'};
        margin: 0 auto;
        padding: ${layout.padding || '20px'};
    }
    
    .component {
        margin-bottom: ${layout.spacing || '60px'};
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .header-component {
        background: linear-gradient(135deg, ${theme.primaryColor || '#667eea'} 0%, ${theme.secondaryColor || '#764ba2'} 100%);
        color: white;
        text-align: center;
        padding: 80px 20px;
    }
    
    .header-component h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .header-component h2 {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1.5rem;
        opacity: 0.9;
    }
    
    .header-component p {
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
        opacity: 0.8;
    }
    
    .about-component h2,
    .skills-component h2,
    .projects-component h2,
    .contact-component h2 {
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 2rem;
        text-align: center;
        color: ${theme.primaryColor || '#667eea'};
    }
    
    .about-component p {
        font-size: 1.1rem;
        line-height: 1.8;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .skill-item {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .skill-name {
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .skill-level {
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .skill-progress {
        height: 100%;
        background: ${theme.primaryColor || '#667eea'};
        transition: width 0.3s ease;
    }
    
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .project-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
    }
    
    .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .project-content {
        padding: 1.5rem;
    }
    
    .project-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .project-description {
        color: #666;
        margin-bottom: 1rem;
    }
    
    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .tech-tag {
        background: ${theme.primaryColor || '#667eea'};
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
    }
    
    .contact-info {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .contact-item {
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    
    .contact-item a {
        color: ${theme.primaryColor || '#667eea'};
        text-decoration: none;
    }
    
    .contact-item a:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        .header-component h1 {
            font-size: 2rem;
        }
        
        .header-component h2 {
            font-size: 1.2rem;
        }
        
        .component {
            padding: 15px;
        }
        
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
  `;
}

function generateJS(settings) {
  return `
    // Animate skill bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    // Observe skills component
    const skillsComponent = document.querySelector('.skills-component');
    if (skillsComponent) {
        observer.observe(skillsComponent);
    }
    
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
  `;
}

function generateComponentHTML(component) {
  const { type, content, styles } = component;
  
  switch (type) {
    case 'header':
      return `
        <div class="component header-component" style="background: ${styles.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; color: ${styles.textColor || 'white'}; padding: ${styles.padding || '80px 20px'}">
          <h1>${content.title || 'Your Name'}</h1>
          <h2>${content.subtitle || 'Professional Title'}</h2>
          <p>${content.description || 'A brief introduction about yourself and your expertise.'}</p>
        </div>
      `;
      
    case 'about':
      return `
        <div class="component about-component">
          <h2>${content.title || 'About Me'}</h2>
          <p>${content.content || 'Write a compelling story about your background, skills, and what drives you in your field.'}</p>
        </div>
      `;
      
    case 'skills':
      return `
        <div class="component skills-component">
          <h2>${content.title || 'Skills & Expertise'}</h2>
          <div class="skills-grid">
            ${(content.skills || []).map(skill => `
              <div class="skill-item">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">
                  <div class="skill-progress" data-level="${skill.level}" style="width: 0%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'projects':
      return `
        <div class="component projects-component">
          <h2>${content.title || 'Featured Projects'}</h2>
          <div class="projects-grid">
            ${(content.projects || []).map(project => `
              <div class="project-card">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
                <div class="project-content">
                  <h3 class="project-title">${project.title}</h3>
                  <p class="project-description">${project.description}</p>
                  <div class="project-tech">
                    ${(project.technologies || []).map(tech => `
                      <span class="tech-tag">${tech}</span>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'contact':
      return `
        <div class="component contact-component">
          <h2>${content.title || 'Get In Touch'}</h2>
          <div class="contact-info">
            ${content.email ? `<div class="contact-item">Email: <a href="mailto:${content.email}">${content.email}</a></div>` : ''}
            ${content.phone ? `<div class="contact-item">Phone: <a href="tel:${content.phone}">${content.phone}</a></div>` : ''}
            ${content.location ? `<div class="contact-item">Location: ${content.location}</div>` : ''}
          </div>
        </div>
      `;
      
    default:
      return `<div class="component">Unknown component type: ${type}</div>`;
  }
}

export default router; 