/*
 *  FileName:-     bookingSlice.js
 *  Description:-  Redux slice for booking state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBooking: null,
  myBookings: [],
  checkoutData: {
    packageId: null,
    packageDetails: null,
    selectedDate: null,
    selectedVariant: null,
    guestCount: 1,
    couponCode: '',
    couponDiscount: 0,
    priceBreakdown: {
      basePrice: 0,
      taxes: 0,
      discount: 0,
      total: 0,
    },
  },
  travellerDetails: [],
  emergencyContact: {
    name: '',
    phone: '',
    relationship: '',
  },
  step: 1,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = { ...state.checkoutData, ...action.payload };
    },
    setSelectedDate: (state, action) => {
      state.checkoutData.selectedDate = action.payload;
    },
    setSelectedVariant: (state, action) => {
      state.checkoutData.selectedVariant = action.payload;
    },
    setGuestCount: (state, action) => {
      state.checkoutData.guestCount = action.payload;
    },
    setCoupon: (state, action) => {
      state.checkoutData.couponCode = action.payload.code;
      state.checkoutData.couponDiscount = action.payload.discount;
    },
    clearCoupon: (state) => {
      state.checkoutData.couponCode = '';
      state.checkoutData.couponDiscount = 0;
    },
    setPriceBreakdown: (state, action) => {
      state.checkoutData.priceBreakdown = action.payload;
    },
    setTravellerDetails: (state, action) => {
      state.travellerDetails = action.payload;
    },
    updateTraveller: (state, action) => {
      const { index, data } = action.payload;
      state.travellerDetails[index] = { ...state.travellerDetails[index], ...data };
    },
    setEmergencyContact: (state, action) => {
      state.emergencyContact = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      if (state.step < 5) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    setMyBookings: (state, action) => {
      state.myBookings = action.payload;
    },
    resetBookingFlow: (state) => {
      state.checkoutData = initialState.checkoutData;
      state.travellerDetails = [];
      state.emergencyContact = initialState.emergencyContact;
      state.step = 1;
      state.currentBooking = null;
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
  setCheckoutData,
  setSelectedDate,
  setSelectedVariant,
  setGuestCount,
  setCoupon,
  clearCoupon,
  setPriceBreakdown,
  setTravellerDetails,
  updateTraveller,
  setEmergencyContact,
  setStep,
  nextStep,
  prevStep,
  setCurrentBooking,
  setMyBookings,
  resetBookingFlow,
  setLoading,
  setError,
} = bookingSlice.actions;

export default bookingSlice.reducer;

// Selectors
export const selectCurrentBooking = (state) => state.booking.currentBooking;
export const selectMyBookings = (state) => state.booking.myBookings;
export const selectCheckoutData = (state) => state.booking.checkoutData;
export const selectTravellerDetails = (state) => state.booking.travellerDetails;
export const selectEmergencyContact = (state) => state.booking.emergencyContact;
export const selectBookingStep = (state) => state.booking.step;
export const selectBookingLoading = (state) => state.booking.isLoading;
export const selectBookingError = (state) => state.booking.error;
