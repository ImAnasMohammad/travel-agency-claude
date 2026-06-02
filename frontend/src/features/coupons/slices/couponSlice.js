/*
 *  FileName:-     couponSlice.js
 *  Description:-  Redux slice for coupon state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appliedCoupon: null,
  availableCoupons: [],
  isValidating: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setAppliedCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
      state.error = null;
    },
    clearAppliedCoupon: (state) => {
      state.appliedCoupon = null;
      state.error = null;
    },
    setAvailableCoupons: (state, action) => {
      state.availableCoupons = action.payload;
    },
    setValidating: (state, action) => {
      state.isValidating = action.payload;
    },
    setCouponError: (state, action) => {
      state.error = action.payload;
      state.appliedCoupon = null;
    },
  },
});

export const {
  setAppliedCoupon,
  clearAppliedCoupon,
  setAvailableCoupons,
  setValidating,
  setCouponError,
} = couponSlice.actions;

export default couponSlice.reducer;

export const selectAppliedCoupon = (state) => state.coupon.appliedCoupon;
export const selectAvailableCoupons = (state) => state.coupon.availableCoupons;
export const selectCouponValidating = (state) => state.coupon.isValidating;
export const selectCouponError = (state) => state.coupon.error;
