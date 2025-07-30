export const getTemplateStyles = (templateId) => {
  const styles = {
    portfolio: `
      .header {
        background-color: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }
      
      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
      }
      
      .nav-links a {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
      }
      
      .hero {
        min-height: 80vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }
      
      .hero-content {
        text-align: center;
      }
      
      .hero h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }
      
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .project-card {
        background: var(--bg-primary);
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: transform 0.2s ease;
      }
      
      .project-card:hover {
        transform: translateY(-4px);
      }
      
      .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      
      .project-content {
        padding: 1.5rem;
      }
    `,
    landing: `
      .header {
        background-color: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }
      
      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
      }
      
      .nav-links a {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
      }
      
      .hero {
        min-height: 80vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
        color: white;
      }
      
      .hero-content {
        text-align: center;
      }
      
      .hero h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
      
      .feature-card {
        text-align: center;
        padding: 2rem;
        background: var(--bg-primary);
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
      }
      
      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      
      .testimonials {
        background-color: var(--bg-secondary);
      }
      
      .testimonial-card {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
      }
      
      .testimonial-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 1rem;
      }
    `,
    business: `
      .header {
        background-color: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }
      
      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
      }
      
      .nav-links a {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
      }
      
      .hero {
        min-height: 70vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }
      
      .hero-content {
        text-align: center;
      }
      
      .hero h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
      }
      
      .stat-item {
        text-align: center;
      }
      
      .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
      }
      
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .service-card {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        text-align: center;
      }
      
      .service-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
      
      .team-card {
        text-align: center;
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
      }
      
      .team-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 1rem;
      }
    `,
    blog: `
      .header {
        background-color: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }
      
      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
      }
      
      .nav-links a {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
      }
      
      .hero {
        min-height: 60vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }
      
      .hero-content {
        text-align: center;
      }
      
      .hero h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }
      
      .blog-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        margin-top: 3rem;
      }
      
      .post-card {
        background: var(--bg-primary);
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
      }
      
      .post-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      
      .post-content {
        padding: 1.5rem;
      }
      
      .sidebar {
        background: var(--bg-primary);
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        height: fit-content;
      }
      
      .sidebar-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 1rem;
      }
      
      .category-list {
        list-style: none;
      }
      
      .category-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
      }
      
      @media (max-width: 768px) {
        .blog-layout {
          grid-template-columns: 1fr;
        }
      }
    `
  };
  
  return styles[templateId] || styles.portfolio;
}; 