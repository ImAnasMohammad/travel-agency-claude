/*
 *  FileName:-     destinationSlice.js
 *  Description:-  Redux slice for destinations state with filter and search management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destinations: [],
  selectedDestination: null,
  activeContinent: 'All',
  searchQuery: '',
  isLoading: false,
  error: null,
  totalCount: 0,
};

const destinationSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload.data;
      state.totalCount = action.payload.total;
      state.error = null;
    },
    setSelectedDestination: (state, action) => {
      state.selectedDestination = action.payload;
    },
    setActiveContinent: (state, action) => {
      state.activeContinent = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDestinationLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDestinationError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearSelectedDestination: (state) => {
      state.selectedDestination = null;
    },
  },
});

export const {
  setDestinations,
  setSelectedDestination,
  setActiveContinent,
  setSearchQuery,
  setDestinationLoading,
  setDestinationError,
  clearSelectedDestination,
} = destinationSlice.actions;

export const selectDestinations = (state) => state.destinations.destinations;
export const selectSelectedDestination = (state) => state.destinations.selectedDestination;
export const selectActiveContinent = (state) => state.destinations.activeContinent;
export const selectSearchQuery = (state) => state.destinations.searchQuery;
export const selectDestinationLoading = (state) => state.destinations.isLoading;

export default destinationSlice.reducer;
