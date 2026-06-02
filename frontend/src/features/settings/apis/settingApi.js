/*
 *  FileName:-     settingApi.js
 *  Description:-  RTK Query API slice for platform settings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/settings`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => '/',
      providesTags: ['Settings'],
      transformResponse: (res) => res?.data || res,
    }),
    updateSettings: builder.mutation({
      query: (data) => ({ url: '/', method: 'PATCH', body: data }),
      invalidatesTags: ['Settings'],
      transformResponse: (res) => res?.data || res,
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingApi;

export default settingApi;
