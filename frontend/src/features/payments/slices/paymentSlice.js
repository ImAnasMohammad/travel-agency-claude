/*
 *  FileName:-     paymentSlice.js
 *  Description:-  Redux slice for payment state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMethod: 'card', // 'card' | 'upi' | 'netbanking' | 'emi'
  selectedEmiMonths: 3,
  cardData: {
    number: '',
    expiry: '',
    cvv: '',
    holderName: '',
    saveCard: false,
  },
  upiId: '',
  selectedBank: '',
  currentPayment: null,
  paymentStatus: null, // 'pending' | 'success' | 'failed'
  isProcessing: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setSelectedMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    setSelectedEmiMonths: (state, action) => {
      state.selectedEmiMonths = action.payload;
    },
    setCardData: (state, action) => {
      state.cardData = { ...state.cardData, ...action.payload };
    },
    setUpiId: (state, action) => {
      state.upiId = action.payload;
    },
    setSelectedBank: (state, action) => {
      state.selectedBank = action.payload;
    },
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setPaymentError: (state, action) => {
      state.error = action.payload;
    },
    resetPayment: (state) => {
      state.cardData = initialState.cardData;
      state.upiId = '';
      state.selectedBank = '';
      state.currentPayment = null;
      state.paymentStatus = null;
      state.isProcessing = false;
      state.error = null;
    },
  },
});

export const {
  setSelectedMethod,
  setSelectedEmiMonths,
  setCardData,
  setUpiId,
  setSelectedBank,
  setCurrentPayment,
  setPaymentStatus,
  setProcessing,
  setPaymentError,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;

export const selectPaymentMethod = (state) => state.payment.selectedMethod;
export const selectCardData = (state) => state.payment.cardData;
export const selectUpiId = (state) => state.payment.upiId;
export const selectSelectedBank = (state) => state.payment.selectedBank;
export const selectCurrentPayment = (state) => state.payment.currentPayment;
export const selectPaymentStatus = (state) => state.payment.paymentStatus;
export const selectIsProcessing = (state) => state.payment.isProcessing;
export const selectPaymentError = (state) => state.payment.error;
export const selectSelectedEmiMonths = (state) => state.payment.selectedEmiMonths;
