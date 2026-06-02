/*
 *  FileName:-     packageSlice.js
 *  Description:-  Redux slice for packages state including filters, search, and selected package
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTERS, DEFAULT_SORT } from '../constants/packageConstants';

const initialState = {
  packages: [],
  selectedPackage: null,
  filters: DEFAULT_FILTERS,
  sortBy: DEFAULT_SORT,
  searchQuery: '',
  currentPage: 1,
  totalCount: 0,
  isLoading: false,
  error: null,
  wishlist: JSON.parse(localStorage.getItem('packageWishlist') || '[]'),
};

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setPackages: (state, action) => {
      state.packages = action.payload.data;
      state.totalCount = action.payload.total;
      state.error = null;
    },
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.filters = DEFAULT_FILTERS;
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPackageLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPackageError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      const idx = state.wishlist.indexOf(id);
      if (idx === -1) {
        state.wishlist.push(id);
      } else {
        state.wishlist.splice(idx, 1);
      }
      localStorage.setItem('packageWishlist', JSON.stringify(state.wishlist));
    },
  },
});

export const {
  setPackages,
  setSelectedPackage,
  setFilters,
  resetFilters,
  setSortBy,
  setSearchQuery,
  setCurrentPage,
  setPackageLoading,
  setPackageError,
  toggleWishlist,
} = packageSlice.actions;

export const selectPackages = (state) => state.packages.packages;
export const selectSelectedPackage = (state) => state.packages.selectedPackage;
export const selectFilters = (state) => state.packages.filters;
export const selectSortBy = (state) => state.packages.sortBy;
export const selectSearchQuery = (state) => state.packages.searchQuery;
export const selectCurrentPage = (state) => state.packages.currentPage;
export const selectTotalCount = (state) => state.packages.totalCount;
export const selectWishlist = (state) => state.packages.wishlist;

export default packageSlice.reducer;
