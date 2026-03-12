import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Globe, Smartphone, GraduationCap, Palette, Code2, Database, CheckCircle2, Award, Clock, Shield, Zap, Users } from "lucide-react";
import { useContent } from "@/admin/context/ContentContext";

const Home = () => {
  const { content } = useContent();
  
  // Fallback data if content is not loaded
  const heroData = content?.hero || {
    mainHeading: "Build Your Digital Presence and Projects with Experts",
    subheading: "Websites, Apps, Assignments, and Branding — Done for You",
    ctaButtonText: "Let's Build Your Idea",
    ctaLink: "/contact"
  };

  return (
  <Layout>
    {/* Hero Section */}
    <section className="py-8 md:py-12 lg:py-16 px-4 min-h-[70vh] flex items-center">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 md:mb-4 animate-fade-in-up">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-primary text-xs md:text-sm font-semibold">Trusted by 50+ Clients Worldwide</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 md:mb-4 animate-fade-in-up px-2">
          {heroData.mainHeading.split(' ').slice(0, -1).join(' ')} <span className="text-gradient-gold">{heroData.mainHeading.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gradient-gold mb-3 md:mb-4 animate-fade-in-up px-2" style={{ animationDelay: "0.15s" }}>
          {heroData.subheading}
        </p>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6 animate-fade-in-up px-4" style={{ animationDelay: "0.3s" }}>
          Professional digital solutions for businesses, students, and entrepreneurs. Fast delivery, SEO-optimized, and 100% confidential.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-4 md:mb-6 animate-fade-in-up px-4" style={{ animationDelay: "0.45s" }}>
          <Link to={heroData.ctaLink} className="gradient-gold text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl hover:opacity-90 transition-opacity animate-pulse-glow shadow-premium">
            🚀 {heroData.ctaButtonText}
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8 animate-fade-in-up px-4" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
            <Clock className="w-4 h-4 text-success" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
            <Shield className="w-4 h-4 text-success" />
            <span>100% Confidential</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
            <Zap className="w-4 h-4 text-success" />
            <span>SEO Optimized</span>
          </div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-8 md:py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { number: "100+", label: "Projects Delivered" },
            { number: "50+", label: "Happy Clients" },
            { number: "98%", label: "Success Rate" },
            { number: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-gold mb-1">{stat.number}</p>
              <p className="text-muted-foreground text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose DevDesk Section */}
    <section className="py-8 md:py-12 px-4 bg-muted/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            Why Choose <span className="text-gradient-gold">DevDesk</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 px-4 max-w-5xl mx-auto">
          <div className="space-y-4">
            {[
              "Fast delivery",
              "100% confidential handling",
              "Unlimited revisions on premium plans",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success shrink-0" />
                <span className="text-foreground text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[
              "Dedicated project manager",
              "SEO-optimized solutions",
              "Ongoing support & maintenance",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success shrink-0" />
                <span className="text-foreground text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-6 md:py-10 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            End-to-end digital solutions for businesses, startups, and students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: Globe, title: "Web Development", desc: "Responsive websites with modern frontend & backend development.", hash: "web-dev" },
            { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform Android & iOS applications.", hash: "mobile-app" },
            { icon: GraduationCap, title: "Assignment & Academic Help", desc: "Professional assistance for university and college assignments.", hash: "academic-help" },
            { icon: Code2, title: "Custom Digital Solutions", desc: "Tailored software solutions to automate workflows.", hash: "custom-solutions" },
            { icon: Database, title: "Database & Backend", desc: "Robust backend architecture and database design.", hash: "database" },
            { icon: Users, title: "1-on-1 Project Guidance", desc: "Personalized mentorship and guidance to help you build and ship your own projects.", hash: "mentorship" },
          ].map((s) => (
            <Link 
              key={s.title} 
              to={`/services#${s.hash}`}
              className="card-glass rounded-2xl p-5 md:p-6 shadow-premium hover:border-primary/30 border border-transparent transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-gold flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link to="/services" className="text-primary hover:text-primary/80 font-semibold transition-colors text-sm md:text-base">
            View All Services →
          </Link>
        </div>
      </div>
    </section>

    {/* Client Reviews Section */}
    <section className="py-8 md:py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Real feedback from satisfied clients worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              name: "Ahmed Khan",
              role: "University Student",
              rating: 5,
              review: "DevDesk helped me with my final year project. The code quality was excellent and delivered on time. Highly recommended for students!",
              avatar: "AK"
            },
            {
              name: "Sarah Williams",
              role: "Startup Founder",
              rating: 5,
              review: "Amazing work on our e-commerce website! Professional, fast, and SEO-optimized. Our sales increased by 40% after launch.",
              avatar: "SW"
            },
            {
              name: "Muhammad Ali",
              role: "Business Owner",
              rating: 5,
              review: "Best logo design service in Pakistan! They understood our brand vision perfectly. The complete brand kit was worth every penny.",
              avatar: "MA"
            },
            {
              name: "Emily Chen",
              role: "App Developer",
              rating: 5,
              review: "Needed help with React Native app. DevDesk delivered a polished, bug-free app with great UI/UX. Will definitely work again!",
              avatar: "EC"
            },
            {
              name: "Hassan Raza",
              role: "PhD Candidate",
              rating: 5,
              review: "Excellent research paper assistance! They helped with data analysis and documentation. Very professional and confidential service.",
              avatar: "HR"
            },
            {
              name: "Jennifer Lopez",
              role: "Marketing Manager",
              rating: 5,
              review: "SEO optimization service was outstanding! Our website now ranks on first page of Google. Traffic increased by 200%!",
              avatar: "JL"
            }
          ].map((review, idx) => (
            <div key={idx} className="card-glass rounded-2xl p-5 md:p-6 shadow-premium border border-muted/30 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-muted-foreground mb-4">Join 50+ satisfied clients worldwide</p>
          <Link to="/contact" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-premium">
            Start Your Project Today
          </Link>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="py-12 md:py-16 px-4 bg-muted/20">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "How long does it take to complete a project?",
              answer: "Delivery time varies by project complexity. Simple assignments take 2-3 days, websites 1-2 weeks, and mobile apps 3-4 weeks. We offer rush delivery for urgent projects."
            },
            {
              question: "Do you provide revisions?",
              answer: "Yes! We offer unlimited revisions on premium plans and up to 3 revisions on standard projects to ensure you're completely satisfied with the final result."
            },
            {
              question: "Is my project information kept confidential?",
              answer: "Absolutely! We maintain 100% confidentiality. Your project details, code, and personal information are never shared with third parties."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept bank transfers, JazzCash, Easypaisa, PayPal, and cryptocurrency. Payment plans are available for larger projects."
            }
          ].map((faq, idx) => (
            <details key={idx} className="card-glass rounded-xl p-5 md:p-6 shadow-premium border border-muted/30 group">
              <summary className="font-bold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span className="text-sm md:text-base">{faq.question}</span>
                <span className="text-primary text-xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground text-sm md:text-base mt-3 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary hover:text-primary/80 font-semibold transition-colors text-sm md:text-base">
            View More FAQs →
          </Link>
        </div>
      </div>
    </section>

    {/* Premium Membership Banner */}
    <section className="py-12 md:py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 shadow-premium">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative p-6 md:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4 md:mb-6">
              <Award className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              <span className="text-primary text-xs md:text-sm font-bold">🔥 Limited Time Offer</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-2">
              Unlock <span className="text-gradient-gold">Premium Membership</span>
            </h3>
            
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3 px-2">
              Save 20% on All Services for 1 Year
            </p>
            
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-2xl mx-auto px-4">
              Get unlimited projects, priority support, and exclusive benefits for just <span className="text-foreground font-bold text-lg md:text-xl lg:text-2xl text-gradient-gold">$50 / Rs 14,000</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-3 md:mb-4 px-4">
              <Link
                to="/contact?service=premium&subject=Premium%20Membership%20-%201%20Year%20-%20$50%20/%20Rs%2014,000"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 gradient-gold text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-premium animate-pulse-glow"
              >
                🎯 Get Premium Now
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground px-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-success" />
                <span>Valid for 1 Year</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-success" />
                <span>20% Off All Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-success" />
                <span>Priority Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Home;
