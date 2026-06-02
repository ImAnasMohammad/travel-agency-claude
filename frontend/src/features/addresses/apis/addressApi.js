/*
 *  FileName:-     addressApi.js
 *  Description:-  RTK Query API for address CRUD and default setting
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => '/addresses',
      providesTags: ['Address'],
    }),

    createAddress: builder.mutation({
      query: (data) => ({ url: '/addresses', method: 'POST', body: data }),
      invalidatesTags: ['Address'],
    }),

    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/addresses/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Address'],
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({ url: `/addresses/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Address'],
    }),

    setDefaultAddress: builder.mutation({
      query: (id) => ({ url: `/addresses/${id}/default`, method: 'PATCH' }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
