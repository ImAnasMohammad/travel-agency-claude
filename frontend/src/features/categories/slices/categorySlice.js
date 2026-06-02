/*
 *  FileName:-     categorySlice.js
 *  Description:-  Redux slice for travel package categories state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCategoryLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCategoryError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const {
  setCategories,
  setSelectedCategory,
  setCategoryLoading,
  setCategoryError,
  clearSelectedCategory,
} = categorySlice.actions;

export const selectCategories = (state) => state.categories.categories;
export const selectSelectedCategory = (state) => state.categories.selectedCategory;
export const selectCategoryLoading = (state) => state.categories.isLoading;

export default categorySlice.reducer;
