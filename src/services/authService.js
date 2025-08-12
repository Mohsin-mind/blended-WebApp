import api from './api';
import { setCookie, getCookie } from '@/utils/helper';
import { handlePost } from './handlePost';

// Login
export async function login(credentials) {
  const { data, meta } = await handlePost(api, 'POST', '/login', credentials);
  if (meta.code) {
    setCookie('token', meta?.token);
    setCookie('adminDetail', JSON.stringify(data));
  }
  return { data, meta };
}

// Forgot Password
export async function forgotPassword(email) {
  return await handlePost(api, 'POST', '/forgot-password', email);
}

// OTP Verification
export async function otpVerification(credentials) {
  return await handlePost(api, 'POST', '/verify-otp', credentials);
}

// Reset Password
export async function resetPassword(credentials) {
  return await handlePost(api, 'POST', '/reset-password', credentials);
}

// Change Password
export async function changePassword(credentials) {
  return await handlePost(api, 'POST', '/change-password', credentials);
}

// ✅ NEW: Update User Status (ADMIN)
export function updateUserStatus({ userId, status }) {
  return handlePost(api, 'PATCH', `/user-status/${userId}`, { status });
}
// Logout user
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
  setCookie('token', '', -1);
  setCookie('adminDetail', '', -1);
  window.location.href = '/login';
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getCookie('token');
}

// Get stored user data
export function getUser() {
  const user = getCookie('admin');
  return user ? JSON.parse(user) : null;
}

// Get stored token
export function getToken() {
  return getCookie('token');
}

const authService = {
  login,
  logout,
  isAuthenticated,
  getUser,
  getToken,
};

export default authService;
