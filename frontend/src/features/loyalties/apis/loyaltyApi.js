/*
 *  FileName:-     loyaltyApi.js
 *  Description:-  RTK Query API for loyalty program operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const loyaltyApi = createApi({
  reducerPath: 'loyaltyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Loyalty'],
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => '/loyalty/balance',
      providesTags: ['Loyalty'],
    }),

    getTransactions: builder.query({
      query: (params = {}) => ({ url: '/loyalty/transactions', params }),
      providesTags: ['Loyalty'],
    }),

    redeemPoints: builder.mutation({
      query: ({ points, bookingId }) => ({
        url: '/loyalty/redeem',
        method: 'POST',
        body: { points, bookingId },
      }),
      invalidatesTags: ['Loyalty'],
    }),

    getEarnRules: builder.query({
      query: () => '/loyalty/earn-rules',
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useGetTransactionsQuery,
  useRedeemPointsMutation,
  useGetEarnRulesQuery,
} = loyaltyApi;
