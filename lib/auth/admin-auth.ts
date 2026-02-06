/**
 * Admin Authentication Utilities
 * Simple session-based authentication for admin dashboard
 */

const ADMIN_SESSION_KEY = "admin_authenticated";
const ADMIN_LOGIN_TIME_KEY = "admin_login_time";
const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const authStatus = sessionStorage.getItem(ADMIN_SESSION_KEY);
  const loginTime = sessionStorage.getItem(ADMIN_LOGIN_TIME_KEY);
  
  if (authStatus !== "true" || !loginTime) {
    return false;
  }
  
  // Check if session has expired
  const loginTimestamp = parseInt(loginTime, 10);
  const now = Date.now();
  const sessionAge = now - loginTimestamp;
  
  if (sessionAge > SESSION_TIMEOUT) {
    // Session expired
    clearAdminSession();
    return false;
  }
  
  return true;
};

/**
 * Set admin authentication
 */
export const setAdminAuthenticated = (): void => {
  if (typeof window === "undefined") return;
  
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  sessionStorage.setItem(ADMIN_LOGIN_TIME_KEY, Date.now().toString());
};

/**
 * Clear admin session
 */
export const clearAdminSession = (): void => {
  if (typeof window === "undefined") return;
  
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  sessionStorage.removeItem(ADMIN_LOGIN_TIME_KEY);
};

/**
 * Verify admin credentials
 */
export const verifyAdminCredentials = (username: string, password: string): boolean => {
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin@cognimuse";
  
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};
