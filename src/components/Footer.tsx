import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { useContent } from "@/admin/context/ContentContext";

const Footer = () => {
  const { content } = useContent();
  
  // Get data from content or use fallback
  const logoText = content?.header?.logoText || "DevDesk";
  const description = content?.footer?.description || "Professional digital solutions for businesses, startups, and students. Fast, reliable, and confidential.";
  const copyrightText = content?.footer?.copyrightText || "© 2024 DevDesk. All rights reserved.";
  const phone = content?.contact?.phone || "+92 304 7974977";
  const email = content?.contact?.email || "azlanshahidd@gmail.com";
  const whatsapp = content?.contact?.whatsapp || "+92 304 7974977";
  const address = content?.contact?.address || "Sahiwal, Pakistan";

  return (
  <footer className="border-t border-border py-12 px-4 bg-muted/20">
    <div className="container max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div>
          <Link to="/" className="text-xl font-bold tracking-tight mb-4 block">
            <span className="text-gradient-gold">{logoText.slice(0, 3)}</span>
            <span className="text-foreground">{logoText.slice(3)}</span>
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            {description}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-foreground font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Services</Link></li>
            <li><Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm">Portfolio</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pricing</Link></li>
            <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-foreground font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Web Development</li>
            <li>Mobile App Development</li>
            <li>Assignment Help</li>
            <li>Logo & Branding</li>
            <li>SEO Optimization</li>
            <li>Custom Solutions</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-foreground font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </a>
            </li>
            <li>
              <a 
                href={`https://wa.me/${whatsapp.replace(/[\s+-]/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20your%20services`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-success transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-muted-foreground text-sm text-center">
            {copyrightText}
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
