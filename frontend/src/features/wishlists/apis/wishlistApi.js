/*
 *  FileName:-     wishlistApi.js
 *  Description:-  RTK Query API for wishlist operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),

    toggleWishlist: builder.mutation({
      query: (packageId) => ({
        url: '/wishlist/toggle',
        method: 'POST',
        body: { packageId },
      }),
      invalidatesTags: ['Wishlist'],
    }),

    removeFromWishlist: builder.mutation({
      query: (packageId) => ({
        url: `/wishlist/${packageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useToggleWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
