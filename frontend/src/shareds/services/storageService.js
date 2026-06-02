/*
 *  FileName:-     storageService.js
 *  Description:-  Browser storage abstraction service for tokens, user data, and preferences
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { STORAGE_KEYS } from '@constants/appConstants';

/* ============================================================
   Safe JSON parse/stringify
   ============================================================ */
const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

const safeJsonStringify = (val) => {
  try {
    return JSON.stringify(val);
  } catch {
    return null;
  }
};

/* ============================================================
   LocalStorage Service
   ============================================================ */
const storageService = {
  /* ---- Token Management ---- */
  getToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  setToken: (token) => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  removeToken: () => localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),

  getRefreshToken: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token) => localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  removeRefreshToken: () => localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),

  /* ---- User Data ---- */
  getUser: () => safeJsonParse(localStorage.getItem(STORAGE_KEYS.USER)),
  setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, safeJsonStringify(user)),
  removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

  /* ---- Clear all auth data ---- */
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  /* ---- Wishlist ---- */
  getWishlist: () => safeJsonParse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [],
  setWishlist: (items) => localStorage.setItem(STORAGE_KEYS.WISHLIST, safeJsonStringify(items)),
  clearWishlist: () => localStorage.removeItem(STORAGE_KEYS.WISHLIST),

  /* ---- Recent Searches ---- */
  getRecentSearches: () =>
    safeJsonParse(localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)) || [],
  addRecentSearch: (query) => {
    if (!query?.trim()) return;
    const searches = safeJsonParse(localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)) || [];
    const filtered = searches.filter((s) => s !== query);
    const updated = [query, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, safeJsonStringify(updated));
  },
  clearRecentSearches: () => localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES),

  /* ---- User Preferences ---- */
  getPreferences: () =>
    safeJsonParse(localStorage.getItem(STORAGE_KEYS.PREFERENCES)) || {},
  setPreferences: (prefs) => {
    const current = safeJsonParse(localStorage.getItem(STORAGE_KEYS.PREFERENCES)) || {};
    localStorage.setItem(
      STORAGE_KEYS.PREFERENCES,
      safeJsonStringify({ ...current, ...prefs })
    );
  },
  clearPreferences: () => localStorage.removeItem(STORAGE_KEYS.PREFERENCES),

  /* ---- Generic get/set ---- */
  get: (key) => safeJsonParse(localStorage.getItem(key)),
  set: (key, value) => localStorage.setItem(key, safeJsonStringify(value)),
  remove: (key) => localStorage.removeItem(key),

  /* ---- Session Storage ---- */
  session: {
    get: (key) => safeJsonParse(sessionStorage.getItem(key)),
    set: (key, value) => sessionStorage.setItem(key, safeJsonStringify(value)),
    remove: (key) => sessionStorage.removeItem(key),
    clear: () => sessionStorage.clear(),
  },

  /* ---- Clear everything ---- */
  clearAll: () => {
    localStorage.clear();
    sessionStorage.clear();
  },

  /* ---- Check auth ---- */
  isAuthenticated: () => !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
};

export default storageService;
