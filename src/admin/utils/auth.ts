// Authentication Utilities

// Simple hash function (in production, use bcrypt or similar)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};

// Session management
const SESSION_KEY = 'devdesk_admin_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const createSession = (username: string): void => {
  const session = {
    username,
    timestamp: Date.now(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = (): { username: string; timestamp: number } | null => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;
  
  try {
    const session = JSON.parse(sessionData);
    // Check if session is expired
    if (Date.now() - session.timestamp > SESSION_EXPIRY) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};
