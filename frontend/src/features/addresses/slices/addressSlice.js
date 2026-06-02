/*
 *  FileName:-     addressSlice.js
 *  Description:-  Redux slice for address state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
  defaultAddressId: null,
  editingAddress: null,
  isModalOpen: false,
  isLoading: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
      const defaultAddr = action.payload.find((a) => a.isDefault);
      state.defaultAddressId = defaultAddr?._id || null;
    },
    setEditingAddress: (state, action) => {
      state.editingAddress = action.payload;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
      if (!action.payload) state.editingAddress = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAddresses, setEditingAddress, setModalOpen, setLoading } = addressSlice.actions;
export default addressSlice.reducer;

export const selectAddresses = (state) => state.address.addresses;
export const selectEditingAddress = (state) => state.address.editingAddress;
export const selectAddressModalOpen = (state) => state.address.isModalOpen;
