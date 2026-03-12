import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WebsiteContent } from '../types';
import { getWebsiteContent, saveWebsiteContent, initializeContent } from '../utils/storage';

interface ContentContextType {
  content: WebsiteContent | null;
  updateContent: (content: WebsiteContent) => void;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

// Default content structure
const defaultContent: WebsiteContent = {
  header: {
    logoText: 'DevDesk',
    navLinks: [
      { id: '1', label: 'Home', path: '/' },
      { id: '2', label: 'Services', path: '/services' },
      { id: '3', label: 'Portfolio', path: '/portfolio' },
      { id: '4', label: 'Pricing', path: '/pricing' },
      { id: '5', label: 'FAQ', path: '/faq' },
      { id: '6', label: 'Contact', path: '/contact' },
    ],
    contactNumber: '+92 304 7974977',
  },
  hero: {
    mainHeading: 'Build Your Digital Presence and Projects with Experts',
    subheading: 'Websites, Apps, Assignments, and Branding — Done for You',
    ctaButtonText: "Let's Build Your Idea",
    ctaLink: '/contact',
  },
  services: [
    {
      id: '1',
      icon: 'Globe',
      title: 'Web Development',
      description: 'Responsive websites with modern frontend & backend development. Fast, SEO-optimized, and mobile-friendly.',
      features: ['React & Next.js', 'Custom CMS', 'E-commerce', 'Landing Pages'],
    },
    {
      id: '2',
      icon: 'Smartphone',
      title: 'Mobile App Development',
      description: 'Native and cross-platform Android & iOS applications built for performance and great user experience.',
      features: ['React Native', 'Flutter', 'iOS & Android', 'App Store Deployment'],
    },
    {
      id: '3',
      icon: 'GraduationCap',
      title: 'Assignment & Academic Help',
      description: 'Professional assistance for university and college assignments, projects, and research work.',
      features: ['Programming Tasks', 'Database Projects', 'Research Papers', 'Technical Reports'],
    },
    {
      id: '4',
      icon: 'Palette',
      title: 'Logo & Brand Identity',
      description: 'Distinctive logos and complete brand identity packages that make your business memorable.',
      features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Social Media Kit'],
    },
    {
      id: '5',
      icon: 'Code2',
      title: 'Custom Digital Solutions',
      description: 'Tailored software solutions to automate workflows, manage data, and scale your business.',
      features: ['SaaS Products', 'Automation Tools', 'API Development', 'Cloud Solutions'],
    },
    {
      id: '6',
      icon: 'Database',
      title: 'Database & Backend',
      description: 'Robust backend architecture and database design for scalable, secure applications.',
      features: ['PostgreSQL', 'Firebase', 'REST APIs', 'Authentication'],
    },
    {
      id: '7',
      icon: 'Search',
      title: 'SEO Optimization',
      description: 'Boost your online visibility with technical SEO, content optimization, and performance tuning.',
      features: ['Technical SEO', 'Page Speed', 'Keyword Strategy', 'Analytics Setup'],
    },
    {
      id: '8',
      icon: 'Users',
      title: '1-on-1 Project Guidance',
      description: 'Personalized mentorship and guidance to help you build and ship your own projects.',
      features: ['Code Reviews', 'Architecture Planning', 'Tech Stack Advice', 'Deployment Help'],
    },
  ],
  pricing: [
    {
      id: '1',
      name: 'Academic Assignments',
      price: '$20 / Rs 5,500',
      features: [
        'Coding Assignments',
        'Class Assignments',
        'Customized PPT Presentations',
        'Academic Projects',
        'Research Assignments',
        'Documentation & Reports',
        'Programming Projects',
        'Lab Assignments',
        'Case Study Assignments',
        'Presentation Design'
      ],
      highlighted: false,
    },
    {
      id: '2',
      name: 'Projects for GitHub',
      price: '$35 / Rs 10,000',
      features: [],
      highlighted: false,
    },
    {
      id: '3',
      name: 'University Projects',
      price: '$43 / Rs 12,000',
      features: [],
      highlighted: false,
    },
    {
      id: '4',
      name: 'Frontend Web Development',
      price: '$70 / Rs 19,000',
      features: [
        'HTML Development',
        'CSS Styling',
        'JavaScript Development',
        'Responsive Web Design',
        'UI/UX Implementation',
        'Landing Page Development',
        'Website Layout Design',
        'Interactive Web Elements',
        'Website Optimization',
        'Cross-Browser Compatibility'
      ],
      highlighted: false,
    },
    {
      id: '5',
      name: 'E-commerce Websites with Backend',
      price: '$300 / Rs 83,500',
      features: [
        'Custom E-commerce Website Development',
        'Product Management System',
        'Shopping Cart System',
        'Secure Payment Integration',
        'Order Management System',
        'User Authentication & Accounts',
        'Admin Dashboard',
        'Inventory Management',
        'API Integration',
        'Database Management',
        'Responsive E-commerce Design',
        'SEO Friendly E-commerce Website'
      ],
      highlighted: false,
    },
    {
      id: '6',
      name: 'Educational Websites',
      price: '$200 / Rs 55,500',
      features: [
        'Online Learning Platforms',
        'Course Management System',
        'Student Dashboard',
        'Teacher/Instructor Portal',
        'Quiz & Assignment System',
        'Video Lecture Integration',
        'Progress Tracking System',
        'User Authentication (Students & Teachers)',
        'Admin Panel for Course Management',
        'Certificate Generation System',
        'Responsive Educational Website Design',
        'SEO Optimized Education Platform'
      ],
      highlighted: false,
    },
    {
      id: '7',
      name: 'Mobile App Development',
      price: '$300 / Rs 83,500',
      features: [
        'Android App Development',
        'iOS App Development',
        'Cross-Platform App Development',
        'UI/UX Mobile Design',
        'App Backend Integration',
        'API Integration',
        'App Testing & Debugging',
        'App Performance Optimization',
        'Database Integration',
        'App Deployment & Publishing'
      ],
      highlighted: false,
    },
    {
      id: '8',
      name: '3D Game Development',
      price: '$350 / Rs 95,500',
      features: [
        '3D Game Design',
        'Character Design & Animation',
        'Game Environment Creation',
        'Level Design',
        'Game Mechanics Development',
        'Physics Integration',
        'Sound Effects & Background Music',
        'Multiplayer Game Features',
        'Game UI/HUD Design',
        'Game Testing & Debugging',
        'Game Optimization'
      ],
      highlighted: false,
    },
    {
      id: '9',
      name: 'Logo & Brand Identity',
      price: '$25 / Rs 6,500',
      features: [
        'Custom Logo Design',
        'Brand Identity Design',
        'Business Logo Creation',
        'Icon & Symbol Design',
        'Brand Color Palette',
        'Typography Design',
        'Social Media Branding',
        'Brand Style Guide',
        'Business Card Design',
        'Letterhead Design',
        'Complete Brand Kit'
      ],
      highlighted: false,
    },
    {
      id: '10',
      name: 'Custom Digital Solutions',
      price: '$100 / Rs 27,500',
      features: [
        'Web Application Development',
        'Mobile App Solutions',
        'API & Backend Integration',
        'Automation Tools & Scripts',
        'CRM/ERP Solutions',
        'Cloud-Based Applications',
        'E-commerce Customization',
        'Database Management Solutions',
        'SaaS Platform Development',
        'Performance Optimization & Support'
      ],
      highlighted: false,
    },
    {
      id: '11',
      name: 'Database & Backend',
      price: '$50 / Rs 13,500',
      features: [
        'Database Design & Modeling',
        'SQL/NoSQL Database Development',
        'Backend API Development',
        'Server-Side Programming (Python, Node.js, PHP, etc.)',
        'User Authentication & Authorization',
        'Data Storage & Retrieval Optimization',
        'Database Security & Backup',
        'Admin Panel/Dashboard Development',
        'Cloud Database Integration',
        'Performance Monitoring & Scaling'
      ],
      highlighted: false,
    },
    {
      id: '12',
      name: 'SEO Optimization',
      price: '$50 / Rs 13,500',
      features: [
        'On-Page SEO Optimization',
        'Off-Page SEO Strategies',
        'Keyword Research & Analysis',
        'Meta Tags & Description Optimization',
        'Content Optimization for SEO',
        'Technical SEO (Site Speed, Mobile-Friendly, Schema)',
        'Backlink Building',
        'Local SEO Optimization',
        'Analytics & Performance Tracking',
        'SEO Audit & Reporting'
      ],
      highlighted: false,
    },
    {
      id: '13',
      name: 'Fiverr Account Help',
      price: '$10 / Rs 2,500',
      features: [
        'Fiverr Profile Setup',
        'Gig Creation & Optimization',
        'Gig Description Writing',
        'SEO for Fiverr Gigs',
        'Pricing & Package Strategy',
        'Portfolio & Work Samples Upload',
        'Buyer Communication Tips',
        'Order Management Guidance',
        'Fiverr Account Troubleshooting',
        'Growth & Promotion Strategies'
      ],
      highlighted: false,
    },
    {
      id: '14',
      name: 'GitHub ID Publish',
      price: '$10 / Rs 2,500',
      features: [
        'GitHub Account Setup',
        'Repository Creation & Management',
        'Project Upload & Version Control',
        'README & Documentation Setup',
        'Branching & Merging Guidance',
        'Commit & Push Best Practices',
        'Public & Private Repository Management',
        'Collaboration & Pull Requests',
        'Project Showcase & Portfolio Integration',
        'GitHub Profile Optimization'
      ],
      highlighted: false,
    },
    {
      id: '15',
      name: 'Project Guidance',
      price: '$10 / Rs 2,500',
      features: [
        'Project Topic Selection',
        'Requirement Analysis',
        'Project Planning & Timeline',
        'Research & Resources Guidance',
        'Technology Stack Recommendation',
        'Design & Architecture Advice',
        'Coding & Implementation Support',
        'Testing & Debugging Assistance',
        'Documentation & Report Writing',
        'Presentation & Demo Preparation'
      ],
      highlighted: false,
    },
  ],
  contact: {
    phone: '+92 304 7974977',
    whatsapp: '+92 304 7974977',
    email: 'azlanshahidd@gmail.com',
    address: 'Sahiwal, Pakistan',
    workingHours: 'Mo-Su 00:00-23:59',
  },
  seo: {
    title: 'DevDesk – Professional Web Development, Mobile Apps & Digital Solutions',
    description: 'Expert web development, mobile app development, assignment help, logo design, and custom digital solutions.',
    keywords: 'web development, mobile app development, React development, assignment help, logo design',
    ogTitle: 'DevDesk – Professional Web Development & Digital Solutions',
    ogDescription: 'Expert web development, mobile apps, assignments, and branding.',
    canonicalUrl: 'https://devdesk.com/',
    themeColor: '#8B5CF6',
  },
  footer: {
    description: 'Professional digital solutions for businesses, startups, and students. Fast, reliable, and confidential.',
    socialLinks: [],
    copyrightText: '© 2024 DevDesk. All rights reserved.',
  },
  academicCategories: {
    "Programming Tasks": [
      "HTML", "CSS", "JavaScript", "C#", "C++", "Python", "Java", "PHP", "Ruby", "Swift", "Kotlin", "TypeScript", "Go", "Rust", "React JS", "Node JS", "Angular", "Vue.js", "Next.js", "Express.js", "Django", "Flask", "Laravel", "ASP.NET", "React Native", "Flutter"
    ],
    "Database Projects": [
      "MySQL", "MongoDB", "PostgreSQL", "Firebase", "SQL Server", "Oracle", "Redis", "Cassandra", "SQLite", "MariaDB", "CouchDB", "DynamoDB"
    ],
    "Research Papers": [
      "Thesis Writing", "Research Proposal", "Literature Review", "Case Study", "Survey Research", "Qualitative Research", "Quantitative Research", "Data Analysis", "Academic Writing"
    ],
    "Technical & Business Reports": [
      "Technical Documentation", "Business Reports", "Project Reports", "Feasibility Study", "System Analysis", "Requirements Documentation", "User Manuals", "API Documentation"
    ]
  },
  brandingCategories: {
    "Logo Design": [
      "Minimalist Logo", "Modern Logo", "Vintage Logo", "3D Logo", "Mascot Logo", "Lettermark", "Wordmark", "Abstract Logo", "Geometric Logo"
    ],
    "Brand Identity": [
      "Brand Guidelines", "Color Palette", "Typography", "Brand Voice", "Visual Identity", "Brand Strategy"
    ],
    "Marketing Materials": [
      "Business Cards", "Letterheads", "Brochures", "Flyers", "Posters", "Banners", "Social Media Kit", "Email Templates"
    ],
    "Design Tools": [
      "Adobe Illustrator", "Adobe Photoshop", "Figma", "Sketch", "CorelDRAW", "Canva Pro", "Adobe InDesign"
    ]
  },
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize content on mount
    initializeContent(defaultContent);
    const loadedContent = getWebsiteContent();
    setContent(loadedContent);
    setLoading(false);
  }, []);

  const updateContent = (newContent: WebsiteContent) => {
    saveWebsiteContent(newContent);
    setContent(newContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};
