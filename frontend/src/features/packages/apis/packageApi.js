/*
 *  FileName:-     packageApi.js
 *  Description:-  RTK Query API slice for package CRUD, filtering, search, and featured endpoints
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const packageApi = createApi({
  reducerPath: 'packageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/packages`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Package'],
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        const { priceMin, priceMax, duration, categories, destination, rating, featured, sortBy, page, limit, search: q } = params;
        if (q) search.set('search', q);
        if (priceMin) search.set('minPrice', priceMin);
        if (priceMax && priceMax < 10000) search.set('maxPrice', priceMax);
        if (duration?.length) search.set('duration', duration.join(','));
        if (categories?.length) search.set('categories', categories.join(','));
        if (destination) search.set('destination', destination);
        if (rating) search.set('rating', rating);
        if (featured) search.set('isFeatured', 'true');
        if (sortBy) search.set('sort', sortBy);
        if (page) search.set('page', page);
        if (limit) search.set('limit', limit);
        return `?${search.toString()}`;
      },
      providesTags: ['Package'],
    }),
    getPackageById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Package', id }],
      transformResponse: (res) => res?.data ?? res,
    }),
    getFeaturedPackages: builder.query({
      query: (limit = 6) => `/featured?limit=${limit}`,
      providesTags: ['Package'],
    }),
    searchPackages: builder.query({
      query: (query) => `/search?q=${encodeURIComponent(query)}`,
    }),
    createPackage: builder.mutation({
      query: (data) => ({ url: '/', method: 'POST', body: data }),
      invalidatesTags: ['Package'],
    }),
    updatePackage: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Package', id }, 'Package'],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Package'],
    }),
    getRelatedPackages: builder.query({
      query: ({ id, limit = 4 }) => `/${id}/related?limit=${limit}`,
    }),

    getAllAdminPackages: builder.query({
      query: ({ page = 1, limit = 20, search, status } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (search) p.append('search', search);
        if (status && status !== 'all') p.append('isActive', status === 'active' ? 'true' : 'false');
        return `/admin/all?${p}`;
      },
      providesTags: ['Package'],
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useGetFeaturedPackagesQuery,
  useSearchPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetRelatedPackagesQuery,
  useGetAllAdminPackagesQuery,
} = packageApi;
