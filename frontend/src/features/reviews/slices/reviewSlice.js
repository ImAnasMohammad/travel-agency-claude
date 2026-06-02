/*
 *  FileName:-     reviewSlice.js
 *  Description:-  Redux slice for review state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  reviewForm: {
    rating: 0,
    title: '',
    body: '',
    images: [],
  },
  filters: {
    rating: null,
    sortBy: 'newest',
  },
  isLoading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setReviewFormField: (state, action) => {
      const { field, value } = action.payload;
      state.reviewForm[field] = value;
    },
    setReviewRating: (state, action) => {
      state.reviewForm.rating = action.payload;
    },
    addReviewImage: (state, action) => {
      state.reviewForm.images.push(action.payload);
    },
    removeReviewImage: (state, action) => {
      state.reviewForm.images = state.reviewForm.images.filter((_, i) => i !== action.payload);
    },
    resetReviewForm: (state) => {
      state.reviewForm = initialState.reviewForm;
    },
    setReviewFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setReviews,
  setReviewFormField,
  setReviewRating,
  addReviewImage,
  removeReviewImage,
  resetReviewForm,
  setReviewFilters,
  setLoading,
  setError,
} = reviewSlice.actions;

export default reviewSlice.reducer;

export const selectReviewForm = (state) => state.review.reviewForm;
export const selectReviewFilters = (state) => state.review.filters;
