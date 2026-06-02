/*
 *  FileName:-     categoryApi.js
 *  Description:-  RTK Query API slice for travel package category CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/categories`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/',
      providesTags: ['Category'],
      transformResponse: (res) => res?.data ?? res,
    }),
    getCategoryById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Category', id }],
      transformResponse: (res) => res?.data ?? res,
    }),
    createCategory: builder.mutation({
      query: (data) => ({ url: '/', method: 'POST', body: data }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Category', id }, 'Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
