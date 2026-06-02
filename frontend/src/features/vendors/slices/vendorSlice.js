/*
 *  FileName:-     vendorSlice.js
 *  Description:-  Redux slice for vendor state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vendors: [],
  selectedVendor: null,
  filters: { status: 'all', category: 'all', search: '' },
  pagination: { page: 1, limit: 10, total: 0 },
};

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setVendors(state, action) { state.vendors = action.payload; },
    setSelectedVendor(state, action) { state.selectedVendor = action.payload; },
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.pagination.page = 1;
    },
    setPagination(state, action) { state.pagination = { ...state.pagination, ...action.payload }; },
    clearSelectedVendor(state) { state.selectedVendor = null; },
    resetFilters(state) { state.filters = initialState.filters; },
  },
});

export const { setVendors, setSelectedVendor, setFilter, setPagination, clearSelectedVendor, resetFilters } = vendorSlice.actions;

export const selectVendors = (state) => state.vendors.vendors;
export const selectSelectedVendor = (state) => state.vendors.selectedVendor;
export const selectVendorFilters = (state) => state.vendors.filters;
export const selectVendorPagination = (state) => state.vendors.pagination;

export default vendorSlice.reducer;
