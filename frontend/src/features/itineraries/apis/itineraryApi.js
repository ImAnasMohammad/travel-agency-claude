/*
 *  FileName:-     itineraryApi.js
 *  Description:-  RTK Query API for itinerary management and AI generation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const itineraryApi = createApi({
  reducerPath: 'itineraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Itinerary'],
  endpoints: (builder) => ({
    getItineraries: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/itineraries?page=${page}&limit=${limit}`,
      providesTags: ['Itinerary'],
      transformResponse: (res) => res?.data || res,
    }),
    getItineraryById: builder.query({
      query: (id) => `/itineraries/${id}`,
      providesTags: (r, e, id) => [{ type: 'Itinerary', id }],
      transformResponse: (res) => res?.data || res,
    }),
    getItineraryByPackage: builder.query({
      query: (packageId) => `/packages/${packageId}/itinerary`,
      providesTags: ['Itinerary'],
      transformResponse: (res) => res?.data || res,
    }),
    createItinerary: builder.mutation({
      query: (body) => ({ url: '/itineraries', method: 'POST', body }),
      invalidatesTags: ['Itinerary'],
    }),
    updateItinerary: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/itineraries/${id}`, method: 'PUT', body }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Itinerary', id }, 'Itinerary'],
    }),
    deleteItinerary: builder.mutation({
      query: (id) => ({ url: `/itineraries/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Itinerary'],
    }),
    generateAiItinerary: builder.mutation({
      query: (body) => ({ url: '/itineraries/ai-generate', method: 'POST', body }),
    }),
  }),
});

export const {
  useGetItinerariesQuery,
  useGetItineraryByIdQuery,
  useGetItineraryByPackageQuery,
  useCreateItineraryMutation,
  useUpdateItineraryMutation,
  useDeleteItineraryMutation,
  useGenerateAiItineraryMutation,
} = itineraryApi;

export default itineraryApi;
