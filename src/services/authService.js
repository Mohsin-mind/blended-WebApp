import api from './api';
import { setCookie, getCookie } from '@/utils/helper';
import { handlePost } from './handlePost';

// Login
export async function login(credentials, showSuccessToast = true) {
  const { data, meta } = await handlePost(
    api,
    'POST',
    '/users/login',
    credentials,
    {},
    showSuccessToast
  );
  return { data, meta };
}

// Signup
export async function signup(userData) {
  const { data, meta } = await handlePost(
    api,
    'POST',
    '/users/register',
    userData
  );
  return { data, meta };
}

// Forgot Password
export async function forgotPassword(email) {
  return await handlePost(api, 'POST', '/users/forgot-password', email);
}

// OTP Verification
export async function otpVerification(credentials) {
  return await handlePost(
    api,
    'POST',
    '/users/teachers/verify-code',
    credentials
  );
}

// Reset Password
export async function resetPassword(credentials) {
  return await handlePost(api, 'POST', '/users/reset-password', credentials);
}

export async function teacherResetPassword(credentials) {
  return await handlePost(
    api,
    'POST',
    '/users/teachers/setup-password',
    credentials
  );
}

// Change Password
export async function changePassword(credentials) {
  return await handlePost(api, 'POST', '/change-password', credentials);
}

// Email Verification
export async function verifyEmail(token) {
  const response = await api.get(`/users/verify-email?token=${token}`);
  return response?.data;
}

// ✅ NEW: Update User Status (ADMIN)
export function updateUserStatus({ userId, status }) {
  return handlePost(api, 'PATCH', `/user-status/${userId}`, { status });
}

/**
 * Get user role from stored data
 * @returns {string|null} The user's role ('STUDENT', 'TEACHER', or null)
 */
export function getUserRole() {
  const studentDetail = getCookie('student_detail');
  const teacherDetail = getCookie('teacher_detail');

  if (studentDetail) {
    try {
      const userData = JSON.parse(studentDetail);
      return userData.user?.role || null;
    } catch (error) {
      console.error('Error parsing student detail:', error);
      return null;
    }
  } else if (teacherDetail) {
    try {
      const userData = JSON.parse(teacherDetail);
      return userData.user?.role || null;
    } catch (error) {
      console.error('Error parsing teacher detail:', error);
      return null;
    }
  }

  return null;
}

/**
 * Get user role from URL path
 * @param {string} pathname - The current URL pathname
 * @returns {string|null} The user's role based on URL path
 */
export function getRoleFromUrl(pathname) {
  if (pathname.startsWith('/student/')) {
    return 'STUDENT';
  } else if (pathname.startsWith('/teacher/')) {
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

/**
 * Logout user with role-based redirect
 *
 * This function:
 * 1. Gets the user's role before clearing cookies
 * 2. Clears all authentication cookies (student, teacher, and legacy)
 * 3. Redirects to the appropriate login page based on the user's role
 *
 * Cookies cleared:
 * - token (legacy)
 * - adminDetail (legacy)
 * - student_token
 * - student_detail
 * - teacher_token
 * - teacher_detail
 */
export async function logout() {
  // eslint-disable-next-line no-warning-comments
  // TODO : This is useful in future

  /*try {
    await api.post('/logout');
  } catch (error) {
    handleError(error);
  } finally {
    setCookie('token', '', -1);
    setCookie('adminDetail', '', -1);
    window.location.href = '/login';
  }*/

  // Get user role before clearing cookies
  const userRole = getUserRole();

  // Clear all possible auth cookies
  setCookie('token', '', -1);
  setCookie('adminDetail', '', -1);
  setCookie('student_token', '', -1);
  setCookie('student_detail', '', -1);
  setCookie('teacher_token', '', -1);
  setCookie('teacher_detail', '', -1);

  // Redirect to appropriate login page based on role
  const redirectPath = getLoginPageUrl(userRole);
  window.location.href = redirectPath;
}

// Check if user is authenticated
export function isAuthenticated() {
  const studentToken = getCookie('student_token');
  const teacherToken = getCookie('teacher_token');
  const genericToken = getCookie('token');

  return !!(studentToken || teacherToken || genericToken);
}

// Get stored user data
export function getUser() {
  const studentDetail = getCookie('student_detail');
  const teacherDetail = getCookie('teacher_detail');

  if (studentDetail) {
    try {
      const userData = JSON.parse(studentDetail);
      return userData.user || null;
    } catch (error) {
      console.error('Error parsing student detail:', error);
      return null;
    }
  } else if (teacherDetail) {
    try {
      const userData = JSON.parse(teacherDetail);
      return userData.user || null;
    } catch (error) {
      console.error('Error parsing teacher detail:', error);
      return null;
    }
  }

  // Fallback to old cookie format
  const user = getCookie('admin');
  return user ? JSON.parse(user) : null;
}

// Get stored token
export function getToken() {
  const userRole = getUserRole();

  if (userRole === 'STUDENT') {
    return getCookie('student_token');
  } else if (userRole === 'TEACHER') {
    return getCookie('teacher_token');
  }

  // Fallback to old cookie format
  return getCookie('token');
}

/**
 * Get stored token based on URL path (alternative method)
 * @param {string} pathname - The current URL pathname
 * @returns {string|null} The appropriate token
 */
export function getTokenFromUrl(pathname) {
  const roleFromUrl = getRoleFromUrl(pathname);

  if (roleFromUrl === 'STUDENT') {
    return getCookie('student_token');
  } else if (roleFromUrl === 'TEACHER') {
    return getCookie('teacher_token');
  }

  // Fallback to role-based token
  return getToken();
}

const authService = {
  login,
  logout,
  isAuthenticated,
  getUser,
  getToken,
  getUserRole,
  getLoginPageUrl,
  getDashboardUrl,
  getRoleFromUrl,
  getTokenFromUrl,
};

export default authService;
