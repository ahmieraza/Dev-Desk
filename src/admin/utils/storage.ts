// Content Storage Management
import { WebsiteContent, AdminUser } from '../types';

const CONTENT_KEY = 'devdesk_website_content';
const ADMIN_KEY = 'devdesk_admin_credentials';

// Default admin credentials (hashed)
// Default: username: admin, password: admin
const DEFAULT_ADMIN: AdminUser = {
  username: 'admin',
  passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // SHA-256 of 'admin'
};

// Initialize admin credentials
export const initializeAdmin = (): void => {
  const existing = localStorage.getItem(ADMIN_KEY);
  if (!existing) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
};

// Get admin credentials
export const getAdminCredentials = (): AdminUser => {
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : DEFAULT_ADMIN;
};

// Update admin credentials
export const updateAdminCredentials = (admin: AdminUser): void => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

// Get website content
export const getWebsiteContent = (): WebsiteContent | null => {
  const data = localStorage.getItem(CONTENT_KEY);
  return data ? JSON.parse(data) : null;
};

// Save website content
export const saveWebsiteContent = (content: WebsiteContent): void => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};

// Initialize with default content
export const initializeContent = (defaultContent: WebsiteContent): void => {
  const existing = getWebsiteContent();
  if (!existing) {
    saveWebsiteContent(defaultContent);
  } else {
    // Force update navigation if FAQ is missing
    if (!existing.header.navLinks.some(link => link.path === '/faq')) {
      const updatedContent = {
        ...existing,
        header: {
          ...existing.header,
          navLinks: [
            { id: '1', label: 'Home', path: '/' },
            { id: '2', label: 'Services', path: '/services' },
            { id: '3', label: 'Portfolio', path: '/portfolio' },
            { id: '4', label: 'Pricing', path: '/pricing' },
            { id: '5', label: 'FAQ', path: '/faq' },
            { id: '6', label: 'Contact', path: '/contact' },
          ]
        }
      };
      saveWebsiteContent(updatedContent);
    }
  }
};
