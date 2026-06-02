/*
 *  FileName:-     vendorApi.js
 *  Description:-  RTK Query API for vendor management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Vendor', 'VendorCommission', 'VendorStats'],
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: ({ page = 1, limit = 10, status, category, search } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (status && status !== 'all') params.append('status', status);
        if (category && category !== 'all') params.append('category', category);
        if (search) params.append('search', search);
        return `/vendors?${params}`;
      },
      providesTags: ['Vendor'],
      transformResponse: (res) => res?.data || res,
    }),
    getVendorById: builder.query({
      query: (id) => `/vendors/${id}`,
      providesTags: (r, e, id) => [{ type: 'Vendor', id }],
      transformResponse: (res) => res?.data || res,
    }),
    getVendorStats: builder.query({
      query: (id) => `/vendors/${id}/stats`,
      providesTags: ['VendorStats'],
      transformResponse: (res) => res?.data || res,
    }),
    getVendorCommissions: builder.query({
      query: ({ vendorId, page = 1, limit = 10 } = {}) => `/vendors/${vendorId}/commissions?page=${page}&limit=${limit}`,
      providesTags: ['VendorCommission'],
      transformResponse: (res) => res?.data || res,
    }),
    createVendor: builder.mutation({
      query: (body) => ({ url: '/vendors', method: 'POST', body }),
      invalidatesTags: ['Vendor'],
    }),
    updateVendor: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/vendors/${id}`, method: 'PUT', body }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Vendor', id }, 'Vendor'],
    }),
    updateVendorStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/vendors/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Vendor'],
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({ url: `/vendors/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Vendor'],
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useGetVendorStatsQuery,
  useGetVendorCommissionsQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useUpdateVendorStatusMutation,
  useDeleteVendorMutation,
} = vendorApi;

export default vendorApi;
