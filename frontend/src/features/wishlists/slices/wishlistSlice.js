/*
 *  FileName:-     wishlistSlice.js
 *  Description:-  Redux slice for wishlist state (set of package IDs)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const loadLocalWishlist = () => {
  try {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  packageIds: loadLocalWishlist(),
  wishlistPackages: [],
  isLoading: false,
  isToggling: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistIds: (state, action) => {
      state.packageIds = action.payload;
    },
    addToWishlist: (state, action) => {
      const id = action.payload;
      if (!state.packageIds.includes(id)) {
        state.packageIds.push(id);
        try { localStorage.setItem('wishlist', JSON.stringify(state.packageIds)); } catch {}
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.packageIds = state.packageIds.filter((pid) => pid !== id);
      try { localStorage.setItem('wishlist', JSON.stringify(state.packageIds)); } catch {}
    },
    toggleWishlistLocal: (state, action) => {
      const id = action.payload;
      if (state.packageIds.includes(id)) {
        state.packageIds = state.packageIds.filter((pid) => pid !== id);
      } else {
        state.packageIds.push(id);
      }
      try { localStorage.setItem('wishlist', JSON.stringify(state.packageIds)); } catch {}
    },
    setWishlistPackages: (state, action) => {
      state.wishlistPackages = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToggling: (state, action) => {
      state.isToggling = action.payload;
    },
  },
});

export const {
  setWishlistIds,
  addToWishlist,
  removeFromWishlist,
  toggleWishlistLocal,
  setWishlistPackages,
  setLoading,
  setToggling,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlistIds = (state) => state.wishlist.packageIds;
export const selectWishlistPackages = (state) => state.wishlist.wishlistPackages;
export const selectIsInWishlist = (packageId) => (state) =>
  state.wishlist.packageIds.includes(packageId);
export const selectWishlistLoading = (state) => state.wishlist.isLoading;
export const selectWishlistToggling = (state) => state.wishlist.isToggling;
