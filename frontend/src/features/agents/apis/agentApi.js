/*
 *  FileName:-     agentApi.js
 *  Description:-  RTK Query API for agent management and commission tracking
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const agentApi = createApi({
  reducerPath: 'agentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Agent', 'AgentBooking', 'AgentCommission', 'AgentStats'],
  endpoints: (builder) => ({
    getAgentProfile: builder.query({
      query: () => '/agents/profile',
      providesTags: ['Agent'],
      transformResponse: (res) => res?.data || res,
    }),
    getAgentStats: builder.query({
      query: (period = 'monthly') => `/agents/stats?period=${period}`,
      providesTags: ['AgentStats'],
      transformResponse: (res) => res?.data || res,
    }),
    getAgentBookings: builder.query({
      query: ({ page = 1, limit = 10, status, search } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (status && status !== 'all') p.append('status', status);
        if (search) p.append('search', search);
        return `/agents/bookings?${p}`;
      },
      providesTags: ['AgentBooking'],
      transformResponse: (res) => res?.data || res,
    }),
    getAgentCommissions: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/agents/commissions?page=${page}&limit=${limit}`,
      providesTags: ['AgentCommission'],
      transformResponse: (res) => res?.data || res,
    }),
    createQuote: builder.mutation({
      query: (body) => ({ url: '/agents/quotes', method: 'POST', body }),
      invalidatesTags: ['AgentBooking'],
    }),
    updateAgentProfile: builder.mutation({
      query: (body) => ({ url: '/agents/profile', method: 'PATCH', body }),
      invalidatesTags: ['Agent'],
    }),
    getAllAgents: builder.query({
      query: ({ page = 1, limit = 10, status, search } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (status && status !== 'all') p.append('status', status);
        if (search) p.append('search', search);
        return `/agents/admin/all?${p}`;
      },
      providesTags: ['Agent'],
      transformResponse: (res) => res?.data || res,
    }),
    updateAgentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/agents/admin/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Agent'],
    }),
  }),
});

export const {
  useGetAgentProfileQuery,
  useGetAgentStatsQuery,
  useGetAgentBookingsQuery,
  useGetAgentCommissionsQuery,
  useCreateQuoteMutation,
  useUpdateAgentProfileMutation,
  useGetAllAgentsQuery,
  useUpdateAgentStatusMutation,
} = agentApi;

export default agentApi;
