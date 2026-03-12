// Admin Panel Type Definitions

export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

export interface HeaderContent {
  logoText: string;
  navLinks: NavLink[];
  contactNumber: string;
}

export interface NavLink {
  id: string;
  label: string;
  path: string;
}

export interface HeroContent {
  mainHeading: string;
  subheading: string;
  ctaButtonText: string;
  ctaLink: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  features: string[];
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlighted: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  themeColor: string;
}

export interface FooterContent {
  description: string;
  socialLinks: SocialLink[];
  copyrightText: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface WebsiteContent {
  header: HeaderContent;
  hero: HeroContent;
  services: Service[];
  pricing: PricingPlan[];
  contact: ContactInfo;
  seo: SEOSettings;
  footer: FooterContent;
  academicCategories?: Record<string, string[]>;
  brandingCategories?: Record<string, string[]>;
}
