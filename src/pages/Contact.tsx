import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { ShieldCheck, Mail, Phone, MessageCircle, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Pre-fill message from URL parameter
  useEffect(() => {
    const subject = searchParams.get('subject');
    const serviceParam = searchParams.get('service');
    
    if (subject) {
      setForm(prev => ({ ...prev, message: decodeURIComponent(subject) }));
    }
    
    if (serviceParam) {
      const decodedService = decodeURIComponent(serviceParam);
      
      // Map common service names to dropdown values
      const serviceMapping: Record<string, string> = {
        // Main categories
        'Web Development': 'Frontend Web Development',
        'Mobile App Development': 'Mobile App Development',
        'Assignment & Academic Help': 'Academic Assignments',
        'Logo & Brand Identity': 'Logo & Brand Identity',
        'Custom Digital Solutions': 'Custom Digital Solutions',
        'Database & Backend': 'Database & Backend',
        'SEO Optimization': 'SEO Optimization',
        '1-on-1 Project Guidance': 'Project Guidance',
        
        // Specific technologies - map to main categories
        'React': 'Frontend Web Development',
        'Next.js': 'Frontend Web Development',
        'Vue.js': 'Frontend Web Development',
        'Angular': 'Frontend Web Development',
        'HTML5': 'Frontend Web Development',
        'CSS3': 'Frontend Web Development',
        'Tailwind CSS': 'Frontend Web Development',
        'Bootstrap': 'Frontend Web Development',
        'TypeScript': 'Frontend Web Development',
        'JavaScript ES6+': 'Frontend Web Development',
        
        'Node.js': 'Frontend Web Development',
        'Express.js': 'Frontend Web Development',
        'Django': 'Frontend Web Development',
        'Flask': 'Frontend Web Development',
        'Laravel': 'Frontend Web Development',
        
        'WordPress': 'Frontend Web Development',
        'Shopify': 'E-commerce Websites with Backend',
        'WooCommerce': 'E-commerce Websites with Backend',
        
        'React Native': 'Mobile App Development',
        'Flutter': 'Mobile App Development',
        'Android (Java)': 'Mobile App Development',
        'Android (Kotlin)': 'Mobile App Development',
        'iOS (Swift)': 'Mobile App Development',
        
        'MySQL': 'Database & Backend',
        'MongoDB': 'Database & Backend',
        'PostgreSQL': 'Database & Backend',
        'Firebase': 'Database & Backend',
        
        'Python': 'Academic Assignments',
        'Java': 'Academic Assignments',
        'C++': 'Academic Assignments',
        'C#': 'Academic Assignments',
        'PHP': 'Academic Assignments',
      };
      
      // Try to find exact match first, then try mapping
      const mappedService = serviceMapping[decodedService] || decodedService;
      setForm(prev => ({ 
        ...prev, 
        service: mappedService,
        // If service doesn't match dropdown, add it to message
        message: prev.message || (mappedService === decodedService && !serviceMapping[decodedService] 
          ? `I'm interested in: ${decodedService}\n\n` 
          : '')
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Formspree endpoint
      const formspreeEndpoint = 'https://formspree.io/f/xzdakpog';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          _replyto: form.email,
          _subject: `Mail from Your website: ${form.name} (${form.email})`,
        }),
      });

      if (response.ok) {
        alert("✅ Message sent successfully! We'll get back to you within 24 hours.");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("❌ Failed to send message. Please try WhatsApp or email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to start your project? Fill out the form or reach us directly.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 card-glass rounded-2xl p-8 shadow-premium">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">Full Name</label>
                    <input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">Phone</label>
                    <input
                      placeholder="+12 34567 89012"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-primary text-sm font-bold">Service Needed</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground [&>option]:bg-background [&>option]:text-foreground [&>optgroup]:bg-muted [&>optgroup]:text-foreground [&>optgroup]:font-bold"
                    >
                      <option value="">Select a service</option>
                      <option value="premium">Premium Membership (20% Off)</option>
                      <optgroup label="Academic Assignments">
                        <option value="Academic Assignments">Academic Assignments - $20 / Rs 5,500</option>
                      </optgroup>
                      <optgroup label="Projects">
                        <option value="Projects for GitHub">Projects for GitHub - $35 / Rs 10,000</option>
                        <option value="University Projects">University Projects - $43 / Rs 12,000</option>
                      </optgroup>
                      <optgroup label="Web Development">
                        <option value="Frontend Web Development">Frontend Web Development - $70 / Rs 19,000</option>
                        <option value="E-commerce Websites with Backend">E-commerce Websites with Backend - $300 / Rs 83,500</option>
                        <option value="Educational Websites">Educational Websites - $200 / Rs 55,500</option>
                      </optgroup>
                      <optgroup label="App Development">
                        <option value="Mobile App Development">Mobile App Development - $300 / Rs 83,500</option>
                        <option value="3D Game Development">3D Game Development - $350 / Rs 95,500</option>
                      </optgroup>
                      <optgroup label="Logo & Brand Identity">
                        <option value="Logo & Brand Identity">Logo & Brand Identity - $25 / Rs 6,500</option>
                      </optgroup>
                      <optgroup label="Custom Digital Solutions">
                        <option value="Custom Digital Solutions">Custom Digital Solutions - $100 / Rs 27,500</option>
                      </optgroup>
                      <optgroup label="Database & Backend">
                        <option value="Database & Backend">Database & Backend - $50 / Rs 13,500</option>
                      </optgroup>
                      <optgroup label="SEO Optimization">
                        <option value="SEO Optimization">SEO Optimization - $50 / Rs 13,500</option>
                      </optgroup>
                      <optgroup label="1-on-1 Project Guidance">
                        <option value="Fiverr Account Help">Fiverr Account Help - $10 / Rs 2,500</option>
                        <option value="GitHub ID Publish">GitHub ID Publish - $10 / Rs 2,500</option>
                        <option value="Project Guidance">Project Guidance - $10 / Rs 2,500</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-foreground text-sm font-medium">Project Details</label>
                  <textarea
                    placeholder="Tell us about your project, timeline, and budget..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 gradient-gold text-primary-foreground font-bold py-4 rounded-xl transition-opacity ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 animate-pulse-glow'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  Your information is secure and confidential.
                </p>
              </form>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="card-glass rounded-2xl p-6 shadow-premium">
                <h3 className="text-lg font-bold mb-4 text-foreground">Direct Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+923047974977" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+92 304 7974977</span>
                  </a>
                  <a href="mailto:azlanshahidd@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>azlanshahidd@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/923047974977?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-success" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="card-glass rounded-2xl p-6 shadow-premium">
                <h3 className="text-lg font-bold mb-3 text-foreground">Why Choose Us?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>✅ Fast response within 24 hours</li>
                  <li>✅ 100% confidential handling</li>
                  <li>✅ No spam, ever</li>
                  <li>✅ Free initial consultation</li>
                  <li>✅ Transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
