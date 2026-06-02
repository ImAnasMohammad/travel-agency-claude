/*
 *  FileName:-     authService.js
 *  Description:-  Token management and localStorage helper utilities for auth
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

const authService = {
  // Token helpers
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token) => localStorage.setItem(REFRESH_TOKEN_KEY, token),
  removeRefreshToken: () => localStorage.removeItem(REFRESH_TOKEN_KEY),

  // User helpers
  getUser: () => {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(USER_KEY),

  // Session helpers
  isTokenValid: () => {
    const token = authService.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  getTokenExpiry: () => {
    const token = authService.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  },

  clearSession: () => {
    authService.removeToken();
    authService.removeRefreshToken();
    authService.removeUser();
  },

  getUserRole: () => {
    const user = authService.getUser();
    return user?.role || null;
  },

  isAdmin: () => authService.getUserRole() === 'admin',
  isAgent: () => authService.getUserRole() === 'agent',
  isCustomer: () => authService.getUserRole() === 'customer',
};

export default authService;
