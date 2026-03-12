import Layout from "@/components/Layout";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const pricingData = [
  {
    category: "Single Services",
    items: [
      {
        name: "Academic Assignments",
        priceUSD: "$20",
        pricePKR: "5,500",
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
      },
      {
        name: "Custom Digital Solutions",
        priceUSD: "$100",
        pricePKR: "27,500",
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
      },
      {
        name: "Database & Backend",
        priceUSD: "$50",
        pricePKR: "13,500",
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
      },
    ],
  },
  {
    category: "Web Development",
    items: [
      {
        name: "Frontend Web Development",
        priceUSD: "$70",
        pricePKR: "19,000",
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
      },
      {
        name: "E-commerce Websites with Backend",
        priceUSD: "$300",
        pricePKR: "83,500",
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
      },
      {
        name: "Educational Websites",
        priceUSD: "$200",
        pricePKR: "55,500",
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
      },
    ],
  },
  {
    category: "App & SEO Services",
    items: [
      {
        name: "Mobile App Development",
        priceUSD: "$300",
        pricePKR: "83,500",
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
      },
      {
        name: "3D Game Development",
        priceUSD: "$350",
        pricePKR: "95,500",
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
      },
      {
        name: "SEO Optimization",
        priceUSD: "$50",
        pricePKR: "13,500",
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
      },
    ],
  },
  {
    category: "1-on-1 Project Guidance",
    items: [
      {
        name: "Fiverr Account Help",
        priceUSD: "$10",
        pricePKR: "2,500",
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
      },
      {
        name: "GitHub ID Publish",
        priceUSD: "$10",
        pricePKR: "2,500",
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
      },
      {
        name: "Project Guidance",
        priceUSD: "$10",
        pricePKR: "2,500",
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
      },
    ],
  },
];

const Pricing = () => (
  <Layout>
    <section className="py-12 md:py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            Transparent <span className="text-gradient-gold">Pricing</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Clear, upfront pricing for all our services. No hidden fees, no surprises.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {pricingData.map((section, sectionIdx) => {
            return (
              <div key={section.category} className="card-glass rounded-3xl p-6 md:p-8 shadow-premium border-2 border-muted/30">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8 text-center text-gray-100" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  {section.category}
                </h2>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {section.items.map((item) => (
                    <div 
                      key={item.name}
                      className="card-glass rounded-2xl p-5 md:p-6 shadow-premium border-2 border-muted/50 hover:border-primary/30 transition-all flex flex-col"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">{item.name}</h3>
                      
                        {item.features && item.features.length > 0 && (
                          <div className="space-y-2 mb-4">
                            {item.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    
                      <div className="mt-auto pt-4 border-t border-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-2xl md:text-3xl font-bold text-gradient-gold">{item.priceUSD}</p>
                            <p className="text-xs text-muted-foreground">USD</p>
                          </div>
                        
                          <div className="text-muted-foreground text-sm">or</div>
                        
                          <div>
                            <p className="text-2xl md:text-3xl font-bold text-gradient-gold">Rs {item.pricePKR}</p>
                            <p className="text-xs text-muted-foreground">PKR</p>
                          </div>
                        </div>
                      
                        <Link
                          to={`/contact?service=${encodeURIComponent(item.name)}`}
                          className="w-full block text-center px-5 py-2.5 rounded-lg gradient-gold text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity shadow-md"
                        >
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="card-glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-premium">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground px-2">
              Need a Custom Quote?
            </h3>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base px-4">
              Have a unique project or need multiple services? Get in touch for a personalized quote.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-premium"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Pricing;
