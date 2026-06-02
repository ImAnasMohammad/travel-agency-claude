/*
 *  FileName:-     couponApi.js
 *  Description:-  RTK Query API for coupon operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Coupon'],
  endpoints: (builder) => ({
    validateCoupon: builder.mutation({
      query: ({ code, packageId, amount }) => ({
        url: '/coupons/validate',
        method: 'POST',
        body: { code, packageId, amount },
      }),
    }),

    // Admin
    getCoupons: builder.query({
      query: (params = {}) => ({ url: '/coupons', params }),
      providesTags: ['Coupon'],
      transformResponse: (res) => res?.data ?? res,
    }),

    createCoupon: builder.mutation({
      query: (data) => ({ url: '/admin/coupons', method: 'POST', body: data }),
      invalidatesTags: ['Coupon'],
    }),

    updateCoupon: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/coupons/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => ({ url: `/admin/coupons/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Coupon'],
    }),

    getActiveCoupons: builder.query({
      query: () => '/coupons/active',
      providesTags: ['Coupon'],
    }),
  }),
});

export const {
  useValidateCouponMutation,
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetActiveCouponsQuery,
} = couponApi;
