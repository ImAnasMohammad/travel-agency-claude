/*
 *  FileName:-     dashboardSlice.js
 *  Description:-  Redux slice for admin dashboard state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPeriod: 'monthly',
  selectedYear: new Date().getFullYear(),
  filters: {
    dateRange: 'last30days',
    status: 'all',
  },
  activeTab: 'overview',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedPeriod(state, action) {
      state.selectedPeriod = action.payload;
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setSelectedPeriod,
  setSelectedYear,
  setFilter,
  setActiveTab,
  resetFilters,
} = dashboardSlice.actions;

export const selectDashboardPeriod = (state) => state.dashboard.selectedPeriod;
export const selectDashboardYear = (state) => state.dashboard.selectedYear;
export const selectDashboardFilters = (state) => state.dashboard.filters;
export const selectDashboardActiveTab = (state) => state.dashboard.activeTab;

export default dashboardSlice.reducer;
