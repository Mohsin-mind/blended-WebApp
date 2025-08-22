import {
  setCookie,
  getCookie,
  getLoginPageUrl,
  getRoleFromUrl,
} from '@/utils/helper';
import { handlePost } from './handlePost';

// Login
export async function login(credentials) {
  return await handlePost('POST', '/users/login', credentials);
}

// Signup
export async function signup(userData) {
  return await handlePost('POST', '/users/register', userData);
}

// Google Authentication
export async function googleAuth(googleData) {
  return await handlePost('POST', '/users/auth/google', googleData);
}

/**
 * Get Google user profile from access token
 * @param {string} accessToken - Google access token
 * @returns {Promise<Object>} User profile data
 */
export async function getGoogleUserProfile(accessToken) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Google user profile');
    }

    const userData = await response.json();
    return {
      googleId: userData.id,
      email: userData.email,
      firstName: userData.given_name,
      lastName: userData.family_name,
      avatar: userData.picture,
    };
  } catch (error) {
    console.error('Error fetching Google user profile:', error);
    throw new Error('Failed to get Google user profile');
  }
}

/**
 * Authenticate with Google using access token
 * @param {string} accessToken - Google access token
 * @returns {Promise<Object>} Authentication response
 */
export async function authenticateWithGoogle(accessToken) {
  try {
    const userProfile = await getGoogleUserProfile(accessToken);
    const result = await googleAuth(JSON.stringify(userProfile));
    return result;
  } catch (error) {
    console.error('Google authentication error:', error);
    throw error;
  }
}

// Forgot Password
export async function forgotPassword(email) {
  return await handlePost('POST', '/users/forgot-password', email);
}

// OTP Verification
export async function otpVerification(credentials) {
  return await handlePost('POST', '/users/teachers/verify-code', credentials);
}

// Reset Password
export async function resetPassword(credentials) {
  return await handlePost('POST', '/users/reset-password', credentials);
}

export async function teacherResetPassword(credentials) {
  return await handlePost(
    'POST',
    '/users/teachers/setup-password',
    credentials
  );
}

// Change Password
export async function changePassword(credentials) {
  return await handlePost('POST', '/change-password', credentials);
}

// Email Verification
export async function verifyEmail(token) {
  return await handlePost('GET', `/users/verify-email?token=${token}`, null);
}

// Resend Email Verification
export async function resendEmailVerification(email) {
  return await handlePost(
    'POST',
    '/users/resend-verification',
    JSON.stringify({ email })
  );
}

// ✅ NEW: Update User Status (ADMIN)
export function updateUserStatus({ userId, status }) {
  return handlePost('PATCH', `/user-status/${userId}`, { status });
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
 * Get stored token based on current URL path
 * @returns {string|null} The appropriate token
 */
export function getTokenFromUrl() {
  const roleFromUrl = getRoleFromUrl();
  if (roleFromUrl === 'STUDENT') {
    return getCookie('student_token');
  } else if (roleFromUrl === 'TEACHER') {
    return getCookie('teacher_token');
  }

  // Fallback to role-based token
  return getToken();
}

const apiService = {
  login,
  logout,
  isAuthenticated,
  getUser,
  getToken,
  getUserRole,
  getTokenFromUrl,
};

export default apiService;
