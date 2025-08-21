import CONST from './constant';

const MILLISECONDS_PER_DAY =
  CONST.MAGIC_NUMBERS.HOURS_PER_DAY *
  CONST.MAGIC_NUMBERS.MINUTES_PER_HOUR *
  CONST.MAGIC_NUMBERS.SECONDS_PER_MINUTE *
  CONST.MAGIC_NUMBERS.MILLISECONDS_PER_SECOND;

export function setCookie(name, value, days = 7) {
  const expires = new Date(
    Date.now() + days * MILLISECONDS_PER_DAY
  ).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, val] = cookie.split('=');
    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(val);
    }
  }
  return null;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function replacePlaceholder(string, prefix, toReplace) {
  return string.replace(prefix, toReplace);
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Generate email verification URL
export function generateEmailVerificationUrl(token) {
  const baseUrl = window.location.origin;
  return `${baseUrl}/verify-email?token=${token}`;
}

/**
 * Get user role from URL path (for use outside React components)
 * @param {string} pathname - The URL pathname
 * @returns {string|null} The user's role based on URL path
 */
export function getRoleFromUrl() {
  const pathname = window.location.pathname;
  if (pathname?.startsWith('/student/')) {
    return 'STUDENT';
  } else if (pathname?.startsWith('/teacher/')) {
    return 'TEACHER';
  }
  return null;
}

/**
 * Get login page URL based on role
 * @param {string} role - The user's role ('STUDENT' or 'TEACHER')
 * @returns {string} The appropriate login page URL
 */
export function getLoginPageUrl(role) {
  switch (role) {
    case 'STUDENT':
      return '/student/login';
    case 'TEACHER':
      return '/teacher/login';
    default:
      return '/student/login'; // default fallback
  }
}

/**
 * Get dashboard URL based on role
 * @param {string} role - The user's role ('STUDENT' or 'TEACHER')
 * @returns {string} The appropriate dashboard URL
 */
export function getDashboardUrl(role) {
  switch (role) {
    case 'STUDENT':
      return '/student/dashboard';
    case 'TEACHER':
      return '/teacher/dashboard';
    default:
      return '/student/dashboard'; // default fallback
  }
}
