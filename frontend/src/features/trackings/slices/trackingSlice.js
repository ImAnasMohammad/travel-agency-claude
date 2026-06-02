/*
 *  FileName:-     trackingSlice.js
 *  Description:-  Redux slice for live trip tracking state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTrip: null,
  tripUpdates: [],
  guideLocation: null,
  isTracking: false,
  lastUpdated: null,
  selectedBookingId: null,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    setActiveTrip(state, action) {
      state.activeTrip = action.payload;
      state.isTracking = !!action.payload;
    },
    addTripUpdate(state, action) {
      state.tripUpdates = [action.payload, ...state.tripUpdates];
      state.lastUpdated = new Date().toISOString();
    },
    setTripUpdates(state, action) {
      state.tripUpdates = action.payload;
    },
    setGuideLocation(state, action) {
      state.guideLocation = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setSelectedBookingId(state, action) {
      state.selectedBookingId = action.payload;
    },
    clearTracking(state) {
      state.activeTrip = null;
      state.tripUpdates = [];
      state.guideLocation = null;
      state.isTracking = false;
      state.lastUpdated = null;
    },
  },
});

export const {
  setActiveTrip,
  addTripUpdate,
  setTripUpdates,
  setGuideLocation,
  setSelectedBookingId,
  clearTracking,
} = trackingSlice.actions;

export const selectActiveTrip = (state) => state.tracking.activeTrip;
export const selectTripUpdates = (state) => state.tracking.tripUpdates;
export const selectGuideLocation = (state) => state.tracking.guideLocation;
export const selectIsTracking = (state) => state.tracking.isTracking;
export const selectLastUpdated = (state) => state.tracking.lastUpdated;

export default trackingSlice.reducer;
