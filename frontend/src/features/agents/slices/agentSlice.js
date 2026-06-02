/*
 *  FileName:-     agentSlice.js
 *  Description:-  Redux slice for agent state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agentProfile: null,
  commissions: [],
  bookings: [],
  stats: null,
  filters: { status: 'all', dateRange: 'all', search: '' },
  pagination: { page: 1, limit: 10, total: 0 },
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgentProfile(state, action) { state.agentProfile = action.payload; },
    setCommissions(state, action) { state.commissions = action.payload; },
    setBookings(state, action) { state.bookings = action.payload; },
    setStats(state, action) { state.stats = action.payload; },
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.pagination.page = 1;
    },
    setPagination(state, action) { state.pagination = { ...state.pagination, ...action.payload }; },
    resetFilters(state) { state.filters = initialState.filters; },
  },
});

export const { setAgentProfile, setCommissions, setBookings, setStats, setFilter, setPagination, resetFilters } = agentSlice.actions;

export const selectAgentProfile = (state) => state.agent.agentProfile;
export const selectAgentCommissions = (state) => state.agent.commissions;
export const selectAgentBookings = (state) => state.agent.bookings;
export const selectAgentStats = (state) => state.agent.stats;
export const selectAgentFilters = (state) => state.agent.filters;
export const selectAgentPagination = (state) => state.agent.pagination;

export default agentSlice.reducer;
