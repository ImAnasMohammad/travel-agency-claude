/*
 *  FileName:-     userApi.js
 *  Description:-  RTK Query API slice for user profile, avatar, passport, and admin endpoints
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['UserProfile', 'PassportDetails', 'AllUsers', 'SavedTravellers'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/me',
      providesTags: ['UserProfile'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({ url: '/me', method: 'PATCH', body: data }),
      invalidatesTags: ['UserProfile'],
    }),
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: '/me/avatar',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['UserProfile'],
    }),
    getPassportDetails: builder.query({
      query: () => '/me/passport',
      providesTags: ['PassportDetails'],
    }),
    updatePassportDetails: builder.mutation({
      query: (data) => ({ url: '/me/passport', method: 'PATCH', body: data }),
      invalidatesTags: ['PassportDetails'],
    }),
    changePassword: builder.mutation({
      query: (data) => ({ url: '/me/change-password', method: 'POST', body: data }),
    }),
    deleteAccount: builder.mutation({
      query: (data) => ({ url: '/me', method: 'DELETE', body: data }),
    }),
    updateNotificationPreferences: builder.mutation({
      query: (data) => ({ url: '/me/notifications', method: 'PATCH', body: data }),
      invalidatesTags: ['UserProfile'],
    }),
    getSavedTravellers: builder.query({
      query: () => '/me/saved-travellers',
      providesTags: ['SavedTravellers'],
      transformResponse: (res) => res?.data ?? [],
    }),
    saveTravellers: builder.mutation({
      query: (travellers) => ({
        url: '/me/saved-travellers',
        method: 'POST',
        body: { travellers },
      }),
      invalidatesTags: ['SavedTravellers'],
    }),
    // Admin endpoints
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, role, status, search } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (role && role !== 'all') p.append('role', role);
        if (status && status !== 'all') p.append('status', status);
        if (search) p.append('search', search);
        return `/admin/all?${p}`;
      },
      providesTags: ['AllUsers'],
      transformResponse: (res) => res,
    }),
    updateUserBlock: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `/admin/${id}/block`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['AllUsers'],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['AllUsers'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useGetPassportDetailsQuery,
  useUpdatePassportDetailsMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateNotificationPreferencesMutation,
  useGetAllUsersQuery,
  useUpdateUserBlockMutation,
  useUpdateUserRoleMutation,
  useGetSavedTravellersQuery,
  useSaveTravellersMutation,
} = userApi;
