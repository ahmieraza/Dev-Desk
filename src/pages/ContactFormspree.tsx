import Layout from "@/components/Layout";
import { useState } from "react";
import { ShieldCheck, Mail, Phone, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Formspree endpoint - Replace with your Formspree form ID
      const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
      
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
        }),
      });

      if (response.ok) {
        alert("✅ Message sent successfully! We'll get back to you within 24 hours.");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
                      placeholder="+92 315 4071924"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">Service Needed</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
                    >
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="academic">Assignment / Academic Help</option>
                      <option value="branding">Logo & Brand Identity</option>
                      <option value="custom">Custom Digital Solutions</option>
                      <option value="seo">SEO Optimization</option>
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
                  <a href="tel:+923154071924" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+92 315 4071924</span>
                  </a>
                  <a href="mailto:ahmiekamboh@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>ahmiekamboh@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/923154071924?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
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
