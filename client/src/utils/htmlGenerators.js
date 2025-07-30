// Header HTML Generator
export const generateHeader = (header) => {
  if (!header) return '';
  
  return `
    <header class="header" role="banner">
      <div class="container">
        <nav class="nav" role="navigation" aria-label="Main navigation">
          <div class="logo">
            <h2>${header.title || header.logo || 'My Website'}</h2>
          </div>
          <ul class="nav-links">
            ${(header.navLinks || []).map(link => `<li><a href="#${link.toLowerCase()}" aria-label="Navigate to ${link} section">${link}</a></li>`).join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;
};

// Hero Section HTML Generator
export const generateHero = (hero) => {
  if (!hero) return '';
  
  return `
    <section class="hero" role="banner" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-content">
          <h1 id="hero-title">${hero.title || 'Welcome'}</h1>
          <p>${hero.subtitle || 'Your amazing website'}</p>
          ${hero.ctaText ? `<a href="${hero.ctaLink || '#'}" class="btn btn-primary" aria-label="${hero.ctaText}">${hero.ctaText}</a>` : ''}
          ${hero.secondaryCtaText ? `<a href="${hero.secondaryCtaLink || '#'}" class="btn btn-secondary" aria-label="${hero.secondaryCtaText}">${hero.secondaryCtaText}</a>` : ''}
        </div>
      </div>
    </section>
  `;
};

// About Section HTML Generator
export const generateAbout = (about) => {
  if (!about) return '';
  
  return `
    <section class="section" id="about" role="region" aria-labelledby="about-title">
      <div class="container">
        <div class="text-center">
          <h2 id="about-title">${about.title || 'About'}</h2>
          <p>${about.content || ''}</p>
          ${about.skills ? `
            <div class="skills" style="margin-top: 2rem;">
              <h3>Skills</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 1rem;" role="list" aria-label="Skills list">
                ${about.skills.map(skill => `<span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;" role="listitem">${skill}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          ${about.stats ? `
            <div class="stats-grid" role="list" aria-label="Statistics">
              ${about.stats.map(stat => `
                <div class="stat-item" role="listitem">
                  <div class="stat-number">${stat.number}</div>
                  <div>${stat.label}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
};

// Projects Section HTML Generator
export const generateProjects = (projects) => {
  if (!projects) return '';
  
  return `
    <section class="section" id="projects" role="region" aria-labelledby="projects-title">
      <div class="container">
        <div class="text-center">
          <h2 id="projects-title">${projects.title || 'Projects'}</h2>
        </div>
        <div class="projects-grid" role="list" aria-label="Projects list">
          ${(projects.items || []).map((project, index) => `
            <article class="project-card" role="listitem">
              <img src="${project.image || 'https://via.placeholder.com/300x200'}" alt="${project.title}" class="project-image">
              <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link || '#'}" class="btn btn-primary" style="margin-top: 1rem;" aria-label="View ${project.title} project">View Project</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

// Contact Section HTML Generator
export const generateContact = (contact) => {
  if (!contact) return '';
  
  return `
    <section class="section" id="contact" role="region" aria-labelledby="contact-title">
      <div class="container">
        <div class="text-center">
          <h2 id="contact-title">${contact.title || 'Contact'}</h2>
          <div style="margin-top: 2rem;">
            ${contact.email ? `<p><strong>Email:</strong> <a href="mailto:${contact.email}" aria-label="Send email to ${contact.email}">${contact.email}</a></p>` : ''}
            ${contact.phone ? `<p><strong>Phone:</strong> <a href="tel:${contact.phone}" aria-label="Call ${contact.phone}">${contact.phone}</a></p>` : ''}
            ${contact.address ? `<p><strong>Address:</strong> ${contact.address}</p>` : ''}
            ${contact.hours ? `<p><strong>Hours:</strong> ${contact.hours}</p>` : ''}
            ${contact.socialLinks ? `
              <div style="margin-top: 2rem;">
                <h3>Follow Me</h3>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;" role="list" aria-label="Social media links">
                  ${Object.entries(contact.socialLinks).map(([platform, url]) => 
                    `<a href="${url}" style="color: var(--primary-color); text-decoration: none; font-weight: 500;" aria-label="Visit ${platform} profile">${platform}</a>`
                  ).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  `;
};

// Features Section HTML Generator
export const generateFeatures = (features) => {
  if (!features) return '';
  return `
    <section class="section" id="features" role="region" aria-labelledby="features-title">
      <div class="container">
        <div class="text-center">
          <h2 id="features-title">${features.title || 'Features'}</h2>
        </div>
        <div class="features-grid" role="list" aria-label="Features list">
          ${(features.items || []).map((feature, index) => `
            <div class="feature-card" role="listitem">
              <div class="feature-icon" aria-hidden="true">
                <img src="/src/assets/icons/${feature.icon}" alt="" width="32" height="32" loading="lazy" aria-hidden="true" />
              </div>
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

// Testimonials Section HTML Generator
export const generateTestimonials = (testimonials) => {
  if (!testimonials) return '';
  
  return `
    <section class="section testimonials" role="region" aria-labelledby="testimonials-title">
      <div class="container">
        <div class="text-center">
          <h2 id="testimonials-title">${testimonials.title || 'Testimonials'}</h2>
        </div>
        <div class="grid grid-cols-2" role="list" aria-label="Testimonials list">
          ${(testimonials.items || []).map((testimonial, index) => `
            <blockquote class="testimonial-card" role="listitem">
              <img src="${testimonial.avatar || 'https://via.placeholder.com/60x60'}" alt="${testimonial.name}" class="testimonial-avatar">
              <p>"${testimonial.content}"</p>
              <div style="margin-top: 1rem;">
                <cite><strong>${testimonial.name}</strong></cite>
                <div style="color: var(--text-secondary);">${testimonial.role}</div>
              </div>
            </blockquote>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

// CTA Section HTML Generator
export const generateCTA = (cta) => {
  if (!cta) return '';
  
  return `
    <section class="section" style="background: var(--primary-color); color: white;" role="region" aria-labelledby="cta-title">
      <div class="container">
        <div class="text-center">
          <h2 id="cta-title">${cta.title || 'Get Started'}</h2>
          <p>${cta.subtitle || ''}</p>
          <a href="${cta.ctaLink || '#'}" class="btn" style="background: white; color: var(--primary-color); margin-top: 1rem;" aria-label="${cta.ctaText || 'Get Started'}">${cta.ctaText || 'Get Started'}</a>
        </div>
      </div>
    </section>
  `;
};

// Footer HTML Generator
export const generateFooter = (footer) => {
  if (!footer) return '';
  
  return `
    <footer class="section" style="background: var(--bg-secondary);" role="contentinfo">
      <div class="container">
        <div class="text-center">
          <h3>${footer.company || footer.title || 'My Website'}</h3>
          <p>${footer.description || ''}</p>
          ${footer.links ? `
            <nav style="margin-top: 2rem;" aria-label="Footer navigation">
              ${Object.entries(footer.links).map(([text, url]) => 
                `<a href="${url}" style="color: var(--text-secondary); text-decoration: none; margin: 0 1rem;" aria-label="${text}">${text}</a>`
              ).join('')}
            </nav>
          ` : ''}
          ${footer.socialLinks ? `
            <div style="margin-top: 2rem;">
              <div style="display: flex; gap: 1rem; justify-content: center;" role="list" aria-label="Social media links">
                ${Object.entries(footer.socialLinks).map(([platform, url]) => 
                  `<a href="${url}" style="color: var(--primary-color); text-decoration: none; margin: 0 0.5rem;" aria-label="Visit ${platform} profile">${platform}</a>`
                ).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </footer>
  `;
};

// Services Section HTML Generator
export const generateServices = (services) => {
  if (!services) return '';
  return `
    <section class="section" id="services" role="region" aria-labelledby="services-title">
      <div class="container">
        <div class="text-center">
          <h2 id="services-title">${services.title || 'Services'}</h2>
        </div>
        <div class="services-grid" role="list" aria-label="Services list">
          ${(services.items || []).map((service, index) => `
            <div class="service-card" role="listitem">
              <div class="service-icon" aria-hidden="true">
                <img src="/src/assets/icons/${service.icon}" alt="" width="32" height="32" loading="lazy" aria-hidden="true" />
              </div>
              <h3>${service.title}</h3>
              <p>${service.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

// Team Section HTML Generator
export const generateTeam = (team) => {
  if (!team) return '';
  
  return `
    <section class="section" id="team" role="region" aria-labelledby="team-title">
      <div class="container">
        <div class="text-center">
          <h2 id="team-title">${team.title || 'Our Team'}</h2>
        </div>
        <div class="team-grid" role="list" aria-label="Team members list">
          ${(team.items || []).map((member, index) => `
            <div class="team-card" role="listitem">
              <img src="${member.avatar || 'https://via.placeholder.com/150x150'}" alt="${member.name}" class="team-avatar">
              <h3>${member.name}</h3>
              <p style="color: var(--primary-color); font-weight: 500;">${member.role}</p>
              <p style="margin-top: 1rem;">${member.bio}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

// Featured Posts HTML Generator
export const generateFeaturedPosts = (posts) => {
  if (!posts) return '';
  
  return `
    <section class="section" id="posts" role="region" aria-labelledby="posts-title">
      <div class="container">
        <div class="blog-layout">
          <div>
            <h2 id="posts-title">${posts.title || 'Featured Posts'}</h2>
            ${(posts.items || []).map((post, index) => `
              <article class="post-card" role="article">
                <img src="${post.image || 'https://via.placeholder.com/400x250'}" alt="${post.title}" class="post-image">
                <div class="post-content">
                  <h3>${post.title}</h3>
                  <p>${post.excerpt}</p>
                  <div style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.875rem;">
                    By ${post.author} • ${post.date} • ${post.category}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
};

// Recent Posts HTML Generator
export const generateRecentPosts = (posts) => {
  if (!posts) return '';
  
  return `
    <section class="section" role="region" aria-labelledby="recent-posts-title">
      <div class="container">
        <h2 id="recent-posts-title">${posts.title || 'Recent Posts'}</h2>
        ${(posts.items || []).map((post, index) => `
          <article style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);" role="article">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.875rem;">
              By ${post.author} • ${post.date} • ${post.category}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
};

// Sidebar HTML Generator
export const generateSidebar = (sidebar) => {
  if (!sidebar) return '';
  
  return `
    <aside class="sidebar" role="complementary">
      ${sidebar.about ? `
        <div style="text-align: center; margin-bottom: 2rem;">
          <img src="${sidebar.about.avatar || 'https://via.placeholder.com/100x100'}" alt="Author" class="sidebar-avatar">
          <h3>${sidebar.about.title}</h3>
          <p>${sidebar.about.content}</p>
        </div>
      ` : ''}
      ${sidebar.categories ? `
        <div>
          <h3>Categories</h3>
          <ul class="category-list" role="list" aria-label="Categories">
            ${sidebar.categories.map(category => 
              `<li role="listitem">${category.name} (${category.count})</li>`
            ).join('')}
          </ul>
        </div>
      ` : ''}
    </aside>
  `;
}; 