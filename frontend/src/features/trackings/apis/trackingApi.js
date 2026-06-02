/*
 *  FileName:-     trackingApi.js
 *  Description:-  RTK Query API for live trip tracking data
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const trackingApi = createApi({
  reducerPath: 'trackingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['TripTracking', 'TripUpdates'],
  endpoints: (builder) => ({
    getActiveTripByBooking: builder.query({
      query: (bookingId) => `/trackings/booking/${bookingId}`,
      providesTags: ['TripTracking'],
      transformResponse: (response) => response?.data || response,
    }),

    getTripUpdates: builder.query({
      query: ({ tripId, limit = 20 }) => `/trackings/${tripId}/updates?limit=${limit}`,
      providesTags: ['TripUpdates'],
      transformResponse: (response) => response?.data || response,
    }),

    getGuideLocation: builder.query({
      query: (tripId) => `/trackings/${tripId}/guide-location`,
      providesTags: ['TripTracking'],
      transformResponse: (response) => response?.data || response,
    }),

    addTripUpdate: builder.mutation({
      query: ({ tripId, ...body }) => ({
        url: `/trackings/${tripId}/updates`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TripUpdates'],
    }),

    updateGuideLocation: builder.mutation({
      query: ({ tripId, ...body }) => ({
        url: `/trackings/${tripId}/guide-location`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TripTracking'],
    }),
  }),
});

export const {
  useGetActiveTripByBookingQuery,
  useGetTripUpdatesQuery,
  useGetGuideLocationQuery,
  useAddTripUpdateMutation,
  useUpdateGuideLocationMutation,
} = trackingApi;

export default trackingApi;
