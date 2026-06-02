/*
 *  FileName:-     authApi.js
 *  Description:-  RTK Query API slice for all authentication endpoints
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `/reset-password/${token}`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: '/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
