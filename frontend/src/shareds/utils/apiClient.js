/*
 *  FileName:-     apiClient.js
 *  Description:-  Axios instance with interceptors for auth, token refresh, and error handling
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import axios from 'axios';
import envConfig from '@configs/envConfig';

/* ============================================================
   Storage helpers (inline to avoid circular deps)
   ============================================================ */
const getToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setToken = (t) => localStorage.setItem('accessToken', t);
const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

/* ============================================================
   Create Axios Instance
   ============================================================ */
const apiClient = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: envConfig.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

/* ============================================================
   Request Interceptor - Attach auth token
   ============================================================ */
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================================================
   Response Interceptor - Handle token refresh & errors
   ============================================================ */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;
        clearAuth();
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${envConfig.apiBaseUrl}/auth/refresh-token`, {
          refreshToken,
        });
        const { token: newToken } = response.data;
        setToken(newToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const BASE_URL = envConfig.apiBaseUrl || 'http://localhost:5000/api/v1';

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default apiClient;
