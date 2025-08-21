import axios from 'axios';
import { setCookie } from '@/utils/helper';
import CONST from '@/utils/constant';
import { showToast } from '@/lib/toast';
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

function handleBadRequest(message) {
  showToast('error', message || CONST.HTTP_ERROR_MSG.BAD_REQUEST);
}

function handleUnauthorized(message) {
  const isAuth = isAuthenticated();
  // Clear all possible auth cookies
  setCookie('token', '', -1);
  setCookie('admin', '', -1);
  setCookie('student_token', '', -1);
  setCookie('student_detail', '', -1);
  setCookie('teacher_token', '', -1);
  setCookie('teacher_detail', '', -1);
  showToast('error', message || CONST.HTTP_ERROR_MSG.UNAUTHORIZED);
  if (isAuth) {
    window.location.reload(true);
  }
}

function handleForbidden(message) {
  showToast('error', message || CONST.HTTP_ERROR_MSG.FORBIDDEN);
}

function handleNotFound(message) {
  showToast('error', message || CONST.HTTP_ERROR_MSG.NOT_FOUND);
}

function handleTooManyRequests(message) {
  showToast('error', message || CONST.HTTP_ERROR_MSG.TOO_MANY_REQUESTS);
}

function handleServerError(message) {
  showToast('error', message || CONST.HTTP_ERROR_MSG.INTERNAL_SERVER_ERROR);
}

function handleDefaultError(message) {
  showToast('error', message || CONST.HTTP_ERROR_MSG.DEFAULT_ERROR);
}

function handleNetworkError(message) {
  showToast('error', 'Network error: ' + message);
}

function handleOtherError(message) {
  showToast('error', 'Error: ' + message);
}

// Response interceptor to handle global errors
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.meta?.message || data?.message;

      switch (status) {
        case CONST.HTTP_STATUS.BAD_REQUEST:
          handleBadRequest(message);
          break;
        case CONST.HTTP_STATUS.UNAUTHORIZED:
          handleUnauthorized(message);
          break;
        case CONST.HTTP_STATUS.FORBIDDEN:
          handleForbidden(message);
          break;
        case CONST.HTTP_STATUS.NOT_FOUND:
          handleNotFound(message);
          break;
        case CONST.HTTP_STATUS.TOO_MANY_REQUESTS:
          handleTooManyRequests(message);
          break;
        case CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR:
          handleServerError(message);
          break;
        default:
          handleDefaultError(message);
      }
    } else if (error.request) {
      handleNetworkError(error.message);
    } else {
      handleOtherError(error.message);
    }

    return Promise.reject(error);
  }
);
