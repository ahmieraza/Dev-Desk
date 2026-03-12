import Layout from "@/components/Layout";
import { Globe, Smartphone, GraduationCap, Palette, Code2, Database, Search, Users } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Responsive websites with modern frontend & backend development. Fast, SEO-optimized, and mobile-friendly.",
    features: ["React & Next.js", "Custom CMS", "E-commerce", "Landing Pages"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform Android & iOS applications built for performance and great user experience.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Deployment"],
  },
  {
    icon: GraduationCap,
    title: "Assignment & Academic Help",
    description: "Professional assistance for university and college assignments, projects, and research work.",
    features: ["Programming Tasks", "Database Projects", "Research Papers", "Technical Reports"],
  },
  {
    icon: Code2,
    title: "Custom Digital Solutions",
    description: "Tailored software solutions to automate workflows, manage data, and scale your business.",
    features: ["SaaS Products", "Automation Tools", "API Development", "Cloud Solutions"],
  },
  {
    icon: Database,
    title: "Database & Backend",
    description: "Robust backend architecture and database design for scalable, secure applications.",
    features: ["PostgreSQL", "Firebase", "REST APIs", "Authentication"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Boost your online visibility with technical SEO, content optimization, and performance tuning.",
    features: ["Technical SEO", "Page Speed", "Keyword Strategy", "Analytics Setup"],
  },
  {
    icon: Users,
    title: "1-on-1 Project Guidance",
    description: "Personalized mentorship and guidance to help you build and ship your own projects.",
    features: ["Code Reviews", "Architecture Planning", "Tech Stack Advice", "Deployment Help"],
  },
];

const academicCategories = {
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
};

const webDevCategories = {
  "Frontend Technologies": [
    "React", "Next.js", "Vue.js", "Angular", "Svelte", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI", "Sass/SCSS", "TypeScript", "JavaScript ES6+"
  ],
  "Backend Technologies": [
    "Node.js", "Express.js", "Django", "Flask", "FastAPI", "Ruby on Rails", "Laravel", "ASP.NET", "Spring Boot", "NestJS"
  ],
  "CMS & E-commerce": [
    "WordPress", "Shopify", "WooCommerce", "Magento", "Drupal", "Joomla", "Strapi", "Contentful", "Sanity"
  ],
  "Website Types": [
    "Landing Pages", "Corporate Websites", "E-commerce Stores", "Portfolio Sites", "Blog Platforms", "SaaS Applications", "Admin Dashboards", "Progressive Web Apps (PWA)"
  ]
};

const mobileAppCategories = {
  "Cross-Platform": [
    "React Native", "Flutter", "Ionic", "Xamarin", "Cordova", "Capacitor"
  ],
  "Native Development": [
    "Android (Java)", "Android (Kotlin)", "iOS (Swift)", "iOS (Objective-C)"
  ],
  "App Types": [
    "E-commerce Apps", "Social Media Apps", "Food Delivery Apps", "Fitness & Health Apps", "Education Apps", "Finance Apps", "Travel Apps", "Entertainment Apps"
  ],
  "Features & Integration": [
    "Push Notifications", "Payment Gateway", "GPS & Maps", "Camera & Gallery", "Social Login", "Chat & Messaging", "Offline Mode", "App Store Deployment"
  ]
};

const logoDesignCategories = {
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
};

const customSolutionsCategories = {
  "SaaS Products": [
    "Multi-tenant Architecture", "Subscription Management", "User Authentication", "Role-based Access", "API Development", "Microservices", "Cloud Deployment"
  ],
  "Automation Tools": [
    "Workflow Automation", "Data Scraping", "Email Automation", "Report Generation", "Task Scheduling", "Integration APIs", "Chatbots"
  ],
  "Enterprise Solutions": [
    "CRM Systems", "ERP Solutions", "Inventory Management", "HR Management", "Project Management", "Document Management", "Analytics Dashboard"
  ],
  "Cloud & DevOps": [
    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD Pipeline", "Serverless", "Cloud Migration"
  ]
};

const databaseCategories = {
  "Relational Databases": [
    "MySQL", "PostgreSQL", "SQL Server", "Oracle", "MariaDB", "SQLite"
  ],
  "NoSQL Databases": [
    "MongoDB", "Firebase", "Redis", "Cassandra", "CouchDB", "DynamoDB", "Neo4j"
  ],
  "Backend Services": [
    "REST API", "GraphQL", "WebSocket", "Authentication (JWT)", "OAuth Integration", "API Gateway", "Microservices"
  ],
  "Database Services": [
    "Database Design", "Query Optimization", "Data Migration", "Backup & Recovery", "Performance Tuning", "Database Security", "Cloud Database Setup"
  ]
};

const seoCategories = {
  "Technical SEO": [
    "Site Speed Optimization", "Mobile Optimization", "Schema Markup", "XML Sitemap", "Robots.txt", "Canonical Tags", "SSL Certificate", "Core Web Vitals"
  ],
  "On-Page SEO": [
    "Keyword Research", "Meta Tags", "Header Tags", "Content Optimization", "Internal Linking", "Image Optimization", "URL Structure"
  ],
  "Off-Page SEO": [
    "Link Building", "Guest Posting", "Social Signals", "Brand Mentions", "Local SEO", "Google My Business"
  ],
  "Analytics & Tools": [
    "Google Analytics", "Google Search Console", "SEMrush", "Ahrefs", "Moz", "Screaming Frog", "PageSpeed Insights"
  ]
};

const mentorshipCategories = {
  "Code Review & Guidance": [
    "Code Quality Review", "Best Practices", "Design Patterns", "Refactoring", "Performance Optimization", "Security Review", "Testing Strategies"
  ],
  "Architecture & Planning": [
    "System Design", "Database Schema", "API Design", "Scalability Planning", "Tech Stack Selection", "Microservices Architecture", "Cloud Architecture"
  ],
  "Career Development": [
    "Portfolio Building", "GitHub Profile", "Resume Review", "Interview Preparation", "Project Ideas", "Learning Roadmap", "Freelancing Tips"
  ],
  "Deployment & DevOps": [
    "Hosting Setup", "Domain Configuration", "CI/CD Setup", "Docker Deployment", "Cloud Deployment", "Monitoring Setup", "SSL Configuration"
  ]
};


const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAcademicHelp, setShowAcademicHelp] = useState(false);
  const [showWebDev, setShowWebDev] = useState(false);
  const [showMobileApp, setShowMobileApp] = useState(false);
  const [showCustomSolutions, setShowCustomSolutions] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [showSEO, setShowSEO] = useState(false);
  const [showMentorship, setShowMentorship] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle URL hash for opening modals
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'academic-help') setShowAcademicHelp(true);
    else if (hash === 'web-dev') setShowWebDev(true);
    else if (hash === 'mobile-app') setShowMobileApp(true);
    else if (hash === 'custom-solutions') setShowCustomSolutions(true);
    else if (hash === 'database') setShowDatabase(true);
    else if (hash === 'seo') setShowSEO(true);
    else if (hash === 'mentorship') setShowMentorship(true);
  }, [location.hash]);

  const openModal = (hash: string) => {
    navigate(`/services#${hash}`, { replace: false });
    setSearchQuery("");
  };

  const closeModal = () => {
    // Clear all modal states
    setShowAcademicHelp(false);
    setShowWebDev(false);
    setShowMobileApp(false);
    setShowCustomSolutions(false);
    setShowDatabase(false);
    setShowSEO(false);
    setShowMentorship(false);
    setSearchQuery("");
    // Navigate back to services page
    navigate('/services', { replace: false });
  };

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (!location.hash) {
        setShowAcademicHelp(false);
        setShowWebDev(false);
        setShowMobileApp(false);
        setShowLogoDesign(false);
        setShowCustomSolutions(false);
        setShowDatabase(false);
        setShowSEO(false);
        setShowMentorship(false);
        setSearchQuery("");
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.hash]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const isAnyModalOpen = showAcademicHelp || showWebDev || showMobileApp || 
                           showCustomSolutions || showDatabase || 
                           showSEO || showMentorship;

    if (isAnyModalOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [showAcademicHelp, showWebDev, showMobileApp, 
      showCustomSolutions, showDatabase, showSEO, showMentorship]);

  const renderModal = (
    isOpen: boolean,
    onClose: () => void,
    title: string,
    description: string,
    categories: Record<string, string[]>
  ) => {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen flex items-start justify-center p-4 py-8 md:py-12">
          <div 
            className="relative w-full max-w-6xl bg-background rounded-2xl shadow-premium"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                onClose();
              }}
              type="button"
              className="absolute top-3 right-3 z-[100] w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg font-bold text-lg hover:scale-110"
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div className="p-4 md:p-8 pt-14 md:pt-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-center px-2">
              {title.split('&')[0]} <span className="text-gradient-gold">{title.split('&')[1] || title.split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="text-muted-foreground text-center mb-6 md:mb-8 text-sm md:text-base px-2">
              {description}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8">
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for technologies, tools, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6 md:space-y-8">
              {Object.entries(categories).map(([category, items]) => {
                const filteredItems = items.filter(item => 
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
                if (filteredItems.length === 0 && searchQuery) return null;

                return (
                  <div key={category}>
                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground px-2">{category}</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {filteredItems.map((item) => (
                        <Link
                          key={item}
                          to={`/contact?service=${encodeURIComponent(item)}`}
                          className="group inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/50 transition-all text-xs md:text-sm font-medium"
                        >
                          <span>{item}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {searchQuery && Object.entries(categories).every(([_, items]) => 
              items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).length === 0
            ) && (
              <div className="text-center py-8 md:py-12 px-4">
                <p className="text-muted-foreground text-base md:text-lg">No results found for "{searchQuery}"</p>
                <p className="text-muted-foreground text-xs md:text-sm mt-2">Try searching for different keywords or browse all categories</p>
              </div>
            )}

            <div className="mt-6 md:mt-8 text-center px-4">
              <Link
                to={`/contact?service=${encodeURIComponent(title)}`}
                className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-premium"
              >
                Get Custom Quote
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
    <section className="py-12 md:py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            Our <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            End-to-end digital solutions for businesses, startups, and students — fully managed by our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s) => (
            <div key={s.title} className="card-glass rounded-2xl p-5 md:p-8 shadow-premium hover:border-primary/30 border border-transparent transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-gold flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 md:mb-5">{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                {s.features.map((f) => (
                  <span key={f} className="text-xs px-2 md:px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">{f}</span>
                ))}
              </div>
              <Link
                to="/contact"
                className="block text-center w-full px-4 py-2.5 rounded-lg gradient-gold text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity shadow-md"
                onClick={(e) => {
                  e.preventDefault();
                  if (s.title === "Assignment & Academic Help") {
                    openModal('academic-help');
                  } else if (s.title === "Web Development") {
                    openModal('web-dev');
                  } else if (s.title === "Mobile App Development") {
                    openModal('mobile-app');
                  } else if (s.title === "Custom Digital Solutions") {
                    openModal('custom-solutions');
                  } else if (s.title === "Database & Backend") {
                    openModal('database');
                  } else if (s.title === "SEO Optimization") {
                    openModal('seo');
                  } else if (s.title === "1-on-1 Project Guidance") {
                    openModal('mentorship');
                  }
                }}
              >
                Get Quote →
              </Link>
            </div>
          ))}
        </div>





        {/* All Service Modals */}
        {renderModal(
          showAcademicHelp,
          closeModal,
          "Assignment & Academic Help",
          "Professional assistance for university and college assignments, projects, and research work",
          academicCategories
        )}

        {renderModal(
          showWebDev,
          closeModal,
          "Web Development",
          "Responsive websites with modern frontend & backend development. Fast, SEO-optimized, and mobile-friendly",
          webDevCategories
        )}

        {renderModal(
          showMobileApp,
          closeModal,
          "Mobile App Development",
          "Native and cross-platform Android & iOS applications built for performance and great user experience",
          mobileAppCategories
        )}

        {renderModal(
          showCustomSolutions,
          closeModal,
          "Custom Digital Solutions",
          "Tailored software solutions to automate workflows, manage data, and scale your business",
          customSolutionsCategories
        )}

        {renderModal(
          showDatabase,
          closeModal,
          "Database & Backend",
          "Robust backend architecture and database design for scalable, secure applications",
          databaseCategories
        )}

        {renderModal(
          showSEO,
          closeModal,
          "SEO Optimization",
          "Boost your online visibility with technical SEO, content optimization, and performance tuning",
          seoCategories
        )}

        {renderModal(
          showMentorship,
          closeModal,
          "1-on-1 Project Guidance",
          "Personalized mentorship and guidance to help you build and ship your own projects",
          mentorshipCategories
        )}
      </div>
    </section>
  </Layout>
);
};

export default Services;
