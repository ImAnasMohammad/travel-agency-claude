/*
 *  FileName:-     dashboardApi.js
 *  Description:-  RTK Query API for admin dashboard data fetching
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
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
  tagTypes: ['DashboardStats', 'TopDestinations', 'RecentBookings', 'OccupancyRates', 'RevenueTrend'],
  endpoints: (builder) => ({
    getStats: builder.query({
      query: (period = 'monthly') => `/dashboard/stats?period=${period}`,
      providesTags: ['DashboardStats'],
      transformResponse: (response) => response?.data || response,
    }),

    getTopDestinations: builder.query({
      query: ({ limit = 5, period = 'monthly' } = {}) =>
        `/dashboard/top-destinations?limit=${limit}&period=${period}`,
      providesTags: ['TopDestinations'],
      transformResponse: (response) => response?.data || response,
    }),

    getRecentBookings: builder.query({
      query: ({ limit = 10, page = 1 } = {}) =>
        `/dashboard/recent-bookings?limit=${limit}&page=${page}`,
      providesTags: ['RecentBookings'],
      transformResponse: (response) => response?.data || response,
    }),

    getOccupancyRates: builder.query({
      query: ({ year = new Date().getFullYear() } = {}) =>
        `/dashboard/occupancy?year=${year}`,
      providesTags: ['OccupancyRates'],
      transformResponse: (response) => response?.data || response,
    }),

    getRevenueTrend: builder.query({
      query: ({ year = new Date().getFullYear(), period = 'monthly' } = {}) =>
        `/dashboard/revenue-by-category?year=${year}&period=${period}`,
      providesTags: ['RevenueTrend'],
      transformResponse: (response) => response?.data || response,
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetTopDestinationsQuery,
  useGetRecentBookingsQuery,
  useGetOccupancyRatesQuery,
  useGetRevenueTrendQuery,
} = dashboardApi;

export default dashboardApi;
