/*
 *  FileName:-     bookingApi.js
 *  Description:-  RTK Query API for booking operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Booking', 'MyBookings'],
  endpoints: (builder) => ({
    // User endpoints
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['MyBookings'],
    }),

    getMyBookings: builder.query({
      query: (params = {}) => ({
        url: '/bookings/my',
        params,
      }),
      providesTags: ['MyBookings'],
    }),

    getBookingById: builder.query({
      query: (id) => `/bookings/${id}`,
      providesTags: (result, error, id) => [{ type: 'Booking', id }],
    }),

    cancelBooking: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/bookings/${id}/cancel`,
        method: 'PATCH',
        body: { reason },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Booking', id },
        'MyBookings',
      ],
    }),

    // Admin endpoints
    getAllBookings: builder.query({
      query: (params = {}) => ({
        url: '/bookings',
        params,
      }),
      providesTags: ['Booking'],
      transformResponse: (res) => res?.data ?? res,
    }),

    updateBookingStatus: builder.mutation({
      query: ({ id, status, notes }) => ({
        url: `/admin/bookings/${id}/status`,
        method: 'PATCH',
        body: { status, notes },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Booking', id },
        'MyBookings',
      ],
    }),

    getBookingStats: builder.query({
      query: () => '/admin/bookings/stats',
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetBookingStatsQuery,
} = bookingApi;
