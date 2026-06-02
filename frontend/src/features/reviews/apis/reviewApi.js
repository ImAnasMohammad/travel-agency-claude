/*
 *  FileName:-     reviewApi.js
 *  Description:-  RTK Query API for review CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviewsByPackage: builder.query({
      query: ({ packageId, params = {} }) => ({
        url: `/reviews/package/${packageId}`,
        params,
      }),
      providesTags: (result, error, { packageId }) => [{ type: 'Review', id: packageId }],
    }),

    getAllReviewsForAdmin: builder.query({
      query: ({ page = 1, limit = 10, status, search } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (status && status !== 'all') p.append('status', status);
        if (search) p.append('search', search);
        return `/reviews/admin/all?${p}`;
      },
      providesTags: ['Review'],
      transformResponse: (res) => res,
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { packageId }) => [{ type: 'Review', id: packageId }],
    }),

    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { packageId }) => [{ type: 'Review', id: packageId }],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),

    moderateReview: builder.mutation({
      query: ({ id, isApproved, adminNote }) => ({
        url: `/reviews/${id}/moderate`,
        method: 'PATCH',
        body: { isApproved, adminNote },
      }),
      invalidatesTags: ['Review'],
    }),

    markHelpful: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}/helpful`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Review', id }],
    }),
  }),
});

export const {
  useGetReviewsByPackageQuery,
  useGetAllReviewsForAdminQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useModerateReviewMutation,
  useMarkHelpfulMutation,
} = reviewApi;
