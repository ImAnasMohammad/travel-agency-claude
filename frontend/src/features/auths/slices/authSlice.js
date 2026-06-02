/*
 *  FileName:-     authSlice.js
 *  Description:-  Redux slice for authentication state management with localStorage persistence
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (user && token) {
      return { user: JSON.parse(user), token, isAuthenticated: true };
    }
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }
  return { user: null, token: null, isAuthenticated: false };
};

const persistedState = loadUserFromStorage();

const initialState = {
  user: persistedState.user,
  token: persistedState.token,
  isAuthenticated: persistedState.isAuthenticated,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, updateUser, logout, setLoading, setError, clearError } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
