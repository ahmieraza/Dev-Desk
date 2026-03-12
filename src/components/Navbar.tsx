import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useContent } from "@/admin/context/ContentContext";

const Navbar = () => {
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Get data from content or use fallback
  const logoText = content?.header?.logoText || "DevDesk";
  const navLinks = content?.header?.navLinks || [
    { id: "1", label: "Home", path: "/" },
    { id: "2", label: "Services", path: "/services" },
    { id: "3", label: "Portfolio", path: "/portfolio" },
    { id: "4", label: "Pricing", path: "/pricing" },
    { id: "5", label: "FAQ", path: "/faq" },
    { id: "6", label: "Contact", path: "/contact" },
  ];
  const contactNumber = content?.header?.contactNumber || "+92 304 7974977";
  const email = content?.contact?.email || "azlanshahidd@gmail.com";

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity z-10">
          <span className="text-gradient-gold">{logoText.slice(0, 3)}</span>
          <span className="text-foreground">{logoText.slice(3)}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === l.path
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-5 py-2 rounded-xl gradient-gold text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors z-10"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-background z-[61] md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
          <Link to="/" onClick={() => setOpen(false)} className="text-xl font-bold tracking-tight">
            <span className="text-gradient-gold">{logoText.slice(0, 3)}</span>
            <span className="text-foreground">{logoText.slice(3)}</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-6 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-4 rounded-xl text-base font-medium transition-all ${
                pathname === l.path
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 px-5 py-4 rounded-xl gradient-gold text-primary-foreground text-base font-bold shadow-lg"
          >
            Get a Quote
          </Link>
          
          {/* Mobile Menu Footer */}
          <div className="pt-6 mt-6 border-t border-border">
            <p className="text-center text-muted-foreground text-sm mb-2">Contact Us</p>
            <div className="space-y-2 text-center text-sm">
              <a href={`tel:${contactNumber.replace(/\s/g, '')}`} className="block text-primary hover:underline">
                {contactNumber}
              </a>
              <a href={`mailto:${email}`} className="block text-primary hover:underline">
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
