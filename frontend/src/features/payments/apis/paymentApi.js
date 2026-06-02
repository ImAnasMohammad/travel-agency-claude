/*
 *  FileName:-     paymentApi.js
 *  Description:-  RTK Query API for payment operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Payment', 'SavedCards'],
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/initiate',
        method: 'POST',
        body: paymentData,
      }),
    }),

    verifyPayment: builder.mutation({
      query: ({ paymentId, signature, orderId }) => ({
        url: '/payments/verify',
        method: 'POST',
        body: { paymentId, signature, orderId },
      }),
      invalidatesTags: ['Payment'],
    }),

    getSavedCards: builder.query({
      query: () => '/payments/saved-cards',
      providesTags: ['SavedCards'],
    }),

    addCard: builder.mutation({
      query: (cardData) => ({
        url: '/payments/saved-cards',
        method: 'POST',
        body: cardData,
      }),
      invalidatesTags: ['SavedCards'],
    }),

    deleteCard: builder.mutation({
      query: (cardId) => ({
        url: `/payments/saved-cards/${cardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SavedCards'],
    }),

    getPaymentHistory: builder.query({
      query: () => '/payments/history',
      providesTags: ['Payment'],
    }),

    getPaymentById: builder.query({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Payment', id }],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
  useGetSavedCardsQuery,
  useAddCardMutation,
  useDeleteCardMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentByIdQuery,
} = paymentApi;
