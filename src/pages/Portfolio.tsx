import Layout from "@/components/Layout";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "🛒",
  },
  {
    title: "Fitness Tracker App",
    category: "Mobile App",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and progress with social features.",
    tags: ["React Native", "Firebase", "Charts"],
    image: "💪",
  },
  {
    title: "University Portal",
    category: "Academic Project",
    description: "Complete university management system with student portal, grading, and attendance tracking.",
    tags: ["Python", "Django", "MySQL"],
    image: "🎓",
  },
  {
    title: "Restaurant Brand Identity",
    category: "Brand Design",
    description: "Full brand identity including logo, menu design, social media kit, and signage for a premium restaurant.",
    tags: ["Logo", "Branding", "Print Design"],
    image: "🍽️",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Analytics dashboard with real-time data visualization, user management, and automated reporting.",
    tags: ["Next.js", "Supabase", "Recharts"],
    image: "📊",
  },
  {
    title: "Healthcare Booking App",
    category: "Mobile App",
    description: "Patient appointment booking system with doctor profiles, notifications, and medical records.",
    tags: ["Flutter", "Firebase", "REST API"],
    image: "🏥",
  },
];

const Portfolio = () => (
  <Layout>
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient-gold">Work</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of projects we've delivered for businesses, startups, and students across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="card-glass rounded-2xl overflow-hidden shadow-premium group hover:border-primary/30 border border-transparent transition-all">
              <div className="h-40 bg-muted/30 flex items-center justify-center text-5xl">{p.image}</div>
              <div className="p-6">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</span>
                <h3 className="text-lg font-bold mt-1 mb-2 text-foreground">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
