/*
 *  FileName:-     loyaltySlice.js
 *  Description:-  Redux slice for loyalty program state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const TIERS = {
  BRONZE: { name: 'Bronze', minPoints: 0, maxPoints: 999, color: '#CD7F32', multiplier: 1 },
  SILVER: { name: 'Silver', minPoints: 1000, maxPoints: 4999, color: '#C0C0C0', multiplier: 1.5 },
  GOLD: { name: 'Gold', minPoints: 5000, maxPoints: 14999, color: '#FFD166', multiplier: 2 },
  PLATINUM: { name: 'Platinum', minPoints: 15000, maxPoints: Infinity, color: '#E5E4E2', multiplier: 3 },
};

const initialState = {
  balance: 0,
  tier: 'BRONZE',
  transactions: [],
  redeemAmount: '',
  isLoading: false,
  error: null,
};

const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setTier: (state, action) => {
      state.tier = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setRedeemAmount: (state, action) => {
      state.redeemAmount = action.payload;
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
  setBalance,
  setTier,
  setTransactions,
  setRedeemAmount,
  setLoading,
  setError,
} = loyaltySlice.actions;

export default loyaltySlice.reducer;

export { TIERS };
export const selectLoyaltyBalance = (state) => state.loyalty.balance;
export const selectLoyaltyTier = (state) => state.loyalty.tier;
export const selectLoyaltyTransactions = (state) => state.loyalty.transactions;
export const selectLoyaltyLoading = (state) => state.loyalty.isLoading;
