import axios from 'axios';
import { setCookie } from '@/utils/helper';
import CONST from '@/utils/constant';
import { isAuthenticated, getToken, getTokenFromUrl } from './apiService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach auth token
api.interceptors.request.use(
  config => {
    // Try to get token from URL first, then fallback to role-based token
    const token = getTokenFromUrl() || getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;

// Response interceptor to handle authentication-related actions only
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      const { status } = error.response;

      // Only handle authentication-related actions
      if (status === CONST.HTTP_STATUS.UNAUTHORIZED) {
        const isAuth = isAuthenticated();
        // Clear all possible auth cookies
        setCookie('token', '', -1);
        setCookie('admin', '', -1);
        setCookie('student_token', '', -1);
        setCookie('student_detail', '', -1);
        setCookie('teacher_token', '', -1);
        setCookie('teacher_detail', '', -1);

        if (isAuth) {
          window.location.reload(true);
        }
      }
    }

    return Promise.reject(error);
  }
);
