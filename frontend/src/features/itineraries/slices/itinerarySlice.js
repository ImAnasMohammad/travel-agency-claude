/*
 *  FileName:-     itinerarySlice.js
 *  Description:-  Redux slice for itinerary state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentItinerary: null,
  aiBuilderState: {
    destination: '',
    days: 5,
    budget: 'medium',
    interests: [],
    generatedItinerary: null,
    isGenerating: false,
  },
  savedItineraries: [],
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setCurrentItinerary(state, action) { state.currentItinerary = action.payload; },
    clearCurrentItinerary(state) { state.currentItinerary = null; },
    setAiBuilderField(state, action) {
      const { field, value } = action.payload;
      state.aiBuilderState[field] = value;
    },
    setGeneratedItinerary(state, action) {
      state.aiBuilderState.generatedItinerary = action.payload;
      state.aiBuilderState.isGenerating = false;
    },
    setIsGenerating(state, action) { state.aiBuilderState.isGenerating = action.payload; },
    toggleInterest(state, action) {
      const interest = action.payload;
      const idx = state.aiBuilderState.interests.indexOf(interest);
      if (idx === -1) {
        state.aiBuilderState.interests.push(interest);
      } else {
        state.aiBuilderState.interests.splice(idx, 1);
      }
    },
    saveItinerary(state, action) {
      const existing = state.savedItineraries.findIndex((i) => i.id === action.payload.id);
      if (existing !== -1) {
        state.savedItineraries[existing] = action.payload;
      } else {
        state.savedItineraries.push(action.payload);
      }
    },
    resetAiBuilder(state) { state.aiBuilderState = initialState.aiBuilderState; },
  },
});

export const {
  setCurrentItinerary, clearCurrentItinerary, setAiBuilderField, setGeneratedItinerary,
  setIsGenerating, toggleInterest, saveItinerary, resetAiBuilder,
} = itinerarySlice.actions;

export const selectCurrentItinerary = (state) => state.itinerary.currentItinerary;
export const selectAiBuilderState = (state) => state.itinerary.aiBuilderState;
export const selectSavedItineraries = (state) => state.itinerary.savedItineraries;

export default itinerarySlice.reducer;
