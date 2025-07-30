export const templates = {
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work and skills with a professional portfolio template',
    thumbnail: '/templates/portfolio.jpg',
    layout: ['header', 'hero', 'about', 'projects', 'contact'],
    defaultContent: {
      header: {
        title: 'John Doe',
        subtitle: 'Web Developer & Designer',
        navLinks: ['Home', 'About', 'Projects', 'Contact']
      },
      hero: {
        title: 'Hi, I\'m John Doe',
        subtitle: 'I create beautiful and functional websites',
        ctaText: 'View My Work',
        ctaLink: '#projects'
      },
      about: {
        title: 'About Me',
        content: 'I\'m a passionate web developer with 5+ years of experience creating modern, responsive websites. I specialize in React, Node.js, and modern web technologies.',
        skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB']
      },
      projects: {
        title: 'My Projects',
        items: [
          {
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce solution built with React and Node.js',
            image: 'https://via.placeholder.com/300x200',
            link: '#'
          },
          {
            title: 'Portfolio Website',
            description: 'A responsive portfolio website built with modern technologies',
            image: 'https://via.placeholder.com/300x200',
            link: '#'
          },
          {
            title: 'Task Management App',
            description: 'A collaborative task management application',
            image: 'https://via.placeholder.com/300x200',
            link: '#'
          }
        ]
      },
      contact: {
        title: 'Get In Touch',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        socialLinks: {
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          twitter: 'https://twitter.com/johndoe'
        }
      }
    }
  },
  landing: {
    id: 'landing',
    name: 'Landing Page',
    description: 'Convert visitors into customers with a compelling landing page',
    thumbnail: '/templates/landing.jpg',
    layout: ['header', 'hero', 'features', 'testimonials', 'cta', 'footer'],
    defaultContent: {
      header: {
        logo: 'Your Brand',
        navLinks: ['Home', 'Features', 'Pricing', 'Contact']
      },
      hero: {
        title: 'Transform Your Business',
        subtitle: 'The ultimate solution for modern businesses looking to scale and grow',
        ctaText: 'Get Started',
        ctaLink: '#pricing',
        secondaryCtaText: 'Learn More',
        secondaryCtaLink: '#features'
      },
      features: {
        title: 'Why Choose Us',
        items: [
          {
            title: 'Easy to Use',
            description: 'Intuitive interface that anyone can master in minutes',
            icon: 'rocket.svg'
          },
          {
            title: 'Fast Performance',
            description: 'Lightning-fast loading times and smooth interactions',
            icon: 'lightning.svg'
          },
          {
            title: '24/7 Support',
            description: 'Round-the-clock customer support when you need it',
            icon: 'shield.svg'
          }
        ]
      },
      testimonials: {
        title: 'What Our Customers Say',
        items: [
          {
            name: 'Sarah Johnson',
            role: 'CEO, TechStart',
            content: 'This platform transformed our business. Highly recommended!',
            avatar: 'https://via.placeholder.com/60x60'
          },
          {
            name: 'Mike Chen',
            role: 'Founder, DesignCo',
            content: 'The best solution we\'ve found for our needs.',
            avatar: 'https://via.placeholder.com/60x60'
          }
        ]
      },
      cta: {
        title: 'Ready to Get Started?',
        subtitle: 'Join thousands of satisfied customers today',
        ctaText: 'Start Free Trial',
        ctaLink: '#pricing'
      },
      footer: {
        company: 'Your Company',
        description: 'Making the world a better place through innovative solutions.',
        links: {
          'About Us': '#',
          'Privacy Policy': '#',
          'Terms of Service': '#',
          'Contact': '#'
        }
      }
    }
  },
  business: {
    id: 'business',
    name: 'Business Website',
    description: 'Professional business website with services and company information',
    thumbnail: '/templates/business.jpg',
    layout: ['header', 'hero', 'about', 'services', 'team', 'contact'],
    defaultContent: {
      header: {
        logo: 'Business Name',
        navLinks: ['Home', 'About', 'Services', 'Team', 'Contact']
      },
      hero: {
        title: 'Welcome to Business Name',
        subtitle: 'Your trusted partner for professional services and solutions',
        ctaText: 'Our Services',
        ctaLink: '#services'
      },
      about: {
        title: 'About Our Company',
        content: 'We are a leading provider of professional services, dedicated to helping businesses grow and succeed. With years of experience and a passionate team, we deliver exceptional results for our clients.',
        stats: [
          { number: '500+', label: 'Happy Clients' },
          { number: '50+', label: 'Team Members' },
          { number: '10+', label: 'Years Experience' }
        ]
      },
      services: {
        title: 'Our Services',
        items: [
          {
            title: 'Web Development',
            description: 'Custom websites and web applications built with modern technologies',
            icon: 'laptop.svg'
          },
          {
            title: 'Digital Marketing',
            description: 'Comprehensive digital marketing strategies to grow your business',
            icon: 'chart.svg'
          },
          {
            title: 'Consulting',
            description: 'Expert business consulting to help you make informed decisions',
            icon: 'target.svg'
          }
        ]
      },
      team: {
        title: 'Our Team',
        items: [
          {
            name: 'Jane Smith',
            role: 'CEO & Founder',
            bio: '10+ years of experience in business development',
            avatar: 'https://via.placeholder.com/150x150'
          },
          {
            name: 'David Wilson',
            role: 'CTO',
            bio: 'Expert in technology and innovation',
            avatar: 'https://via.placeholder.com/150x150'
          },
          {
            name: 'Lisa Brown',
            role: 'Marketing Director',
            bio: 'Specialist in digital marketing strategies',
            avatar: 'https://via.placeholder.com/150x150'
          }
        ]
      },
      contact: {
        title: 'Contact Us',
        address: '123 Business St, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'info@businessname.com',
        hours: 'Monday - Friday: 9:00 AM - 6:00 PM'
      }
    }
  },
  blog: {
    id: 'blog',
    name: 'Blog',
    description: 'Share your thoughts and ideas with a beautiful blog template',
    thumbnail: '/templates/blog.jpg',
    layout: ['header', 'hero', 'featured-posts', 'recent-posts', 'sidebar', 'footer'],
    defaultContent: {
      header: {
        title: 'My Blog',
        subtitle: 'Thoughts, ideas, and insights',
        navLinks: ['Home', 'Blog', 'About', 'Contact']
      },
      hero: {
        title: 'Welcome to My Blog',
        subtitle: 'Sharing thoughts on technology, design, and life',
        ctaText: 'Read Latest Posts',
        ctaLink: '#posts'
      },
      featuredPosts: {
        title: 'Featured Posts',
        items: [
          {
            title: 'Getting Started with React',
            excerpt: 'Learn the basics of React and start building modern web applications...',
            author: 'John Doe',
            date: '2024-01-15',
            image: 'https://via.placeholder.com/400x250',
            category: 'Technology'
          },
          {
            title: 'Design Principles for Web',
            excerpt: 'Essential design principles that every web developer should know...',
            author: 'Jane Smith',
            date: '2024-01-10',
            image: 'https://via.placeholder.com/400x250',
            category: 'Design'
          }
        ]
      },
      recentPosts: {
        title: 'Recent Posts',
        items: [
          {
            title: 'The Future of Web Development',
            excerpt: 'Exploring upcoming trends and technologies...',
            author: 'John Doe',
            date: '2024-01-05',
            category: 'Technology'
          },
          {
            title: 'Building Responsive Websites',
            excerpt: 'Best practices for creating mobile-friendly websites...',
            author: 'Jane Smith',
            date: '2024-01-01',
            category: 'Development'
          }
        ]
      },
      sidebar: {
        about: {
          title: 'About the Author',
          content: 'I\'m a passionate developer and writer, sharing insights about web development and design.',
          avatar: 'https://via.placeholder.com/100x100'
        },
        categories: [
          { name: 'Technology', count: 15 },
          { name: 'Design', count: 8 },
          { name: 'Development', count: 12 },
          { name: 'Tutorials', count: 20 }
        ]
      },
      footer: {
        title: 'My Blog',
        description: 'Sharing knowledge and insights about web development and design.',
        socialLinks: {
          twitter: 'https://twitter.com/johndoe',
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe'
        }
      }
    }
  }
};

export const getTemplateById = (id) => {
  return templates[id] || null;
};

export const getAllTemplates = () => {
  return Object.values(templates);
}; 