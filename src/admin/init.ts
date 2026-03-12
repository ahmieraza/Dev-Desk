// Initialize Admin Panel
import { initializeAdmin } from './utils/storage';

export const initializeAdminPanel = () => {
  // Initialize admin credentials on app startup
  initializeAdmin();
  
  console.log('✅ Admin Panel Initialized');
  console.log('📍 Login at: /admin/login');
  console.log('👤 Default credentials: admin / admin');
  console.log('⚠️  Please change default credentials after first login!');
};
