/*
 *  FileName:-     rootReducer.js
 *  Description:-  Global UI and search slices not tied to a specific feature module
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

/* ============================================================
   UI Slice — sidebar, mobile menu, global loading
   ============================================================ */
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    sidebarCollapsed: false,
    mobileMenuOpen: false,
    theme: 'light',
    globalLoading: false,
  },
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setSidebarOpen: (state, action) => { state.sidebarOpen = action.payload; },
    toggleSidebarCollapse: (state) => { state.sidebarCollapsed = !state.sidebarCollapsed; },
    toggleMobileMenu: (state) => { state.mobileMenuOpen = !state.mobileMenuOpen; },
    setMobileMenuOpen: (state, action) => { state.mobileMenuOpen = action.payload; },
    setGlobalLoading: (state, action) => { state.globalLoading = action.payload; },
  },
});

/* ============================================================
   Search Slice — global search query & filters
   ============================================================ */
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    filters: {
      destination: '',
      category: '',
      priceMin: 0,
      priceMax: 500000,
      duration: '',
      rating: 0,
      sortBy: 'popularity',
    },
    recentSearches: [],
    isSearching: false,
  },
  reducers: {
    setSearchQuery: (state, action) => { state.query = action.payload; },
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
    resetFilters: (state) => {
      state.filters = { destination: '', category: '', priceMin: 0, priceMax: 500000, duration: '', rating: 0, sortBy: 'popularity' };
    },
    addRecentSearch: (state, action) => {
      const filtered = state.recentSearches.filter((s) => s !== action.payload);
      state.recentSearches = [action.payload, ...filtered].slice(0, 10);
    },
    clearRecentSearches: (state) => { state.recentSearches = []; },
    setSearching: (state, action) => { state.isSearching = action.payload; },
  },
});

export const uiReducer = uiSlice.reducer;
export const searchReducer = searchSlice.reducer;

export const {
  toggleSidebar, setSidebarOpen, toggleSidebarCollapse,
  toggleMobileMenu, setMobileMenuOpen, setGlobalLoading,
} = uiSlice.actions;

export const {
  setSearchQuery, setFilters, resetFilters,
  addRecentSearch, clearRecentSearches, setSearching,
} = searchSlice.actions;
