/*
 *  FileName:-     destinationApi.js
 *  Description:-  RTK Query API slice for destination CRUD and listing endpoints
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const destinationApi = createApi({
  reducerPath: 'destinationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/destinations`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Destination'],
  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => { if (v) search.set(k, v); });
        return `?${search.toString()}`;
      },
      providesTags: ['Destination'],
    }),
    getDestinationById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Destination', id }],
      transformResponse: (res) => res?.data ?? res,
    }),
    getFeaturedDestinations: builder.query({
      query: () => '/featured',
      providesTags: ['Destination'],
    }),
    createDestination: builder.mutation({
      query: (data) => ({ url: '/', method: 'POST', body: data }),
      invalidatesTags: ['Destination'],
    }),
    updateDestination: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Destination', id }, 'Destination'],
    }),
    deleteDestination: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Destination'],
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
  useGetFeaturedDestinationsQuery,
  useCreateDestinationMutation,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
} = destinationApi;
