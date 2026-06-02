/*
 *  FileName:-     userSlice.js
 *  Description:-  Redux slice for user profile state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  passportDetails: null,
  isProfileLoading: false,
  isUpdating: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfileLocal: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setPassportDetails: (state, action) => {
      state.passportDetails = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.isProfileLoading = action.payload;
    },
    setUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
      state.isProfileLoading = false;
      state.isUpdating = false;
    },
    clearUserError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.passportDetails = null;
    },
  },
});

export const {
  setProfile,
  updateProfileLocal,
  setPassportDetails,
  setProfileLoading,
  setUpdating,
  setUserError,
  clearUserError,
  clearProfile,
} = userSlice.actions;

export const selectProfile = (state) => state.user.profile;
export const selectPassportDetails = (state) => state.user.passportDetails;
export const selectIsProfileLoading = (state) => state.user.isProfileLoading;
export const selectIsUpdating = (state) => state.user.isUpdating;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
