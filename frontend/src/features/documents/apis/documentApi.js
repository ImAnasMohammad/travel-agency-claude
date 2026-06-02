/*
 *  FileName:-     documentApi.js
 *  Description:-  RTK Query API for document vault operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shareds/utils/apiClient';

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Document'],
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (params = {}) => ({ url: '/documents', params }),
      providesTags: ['Document'],
    }),

    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: '/documents/upload',
        method: 'POST',
        body: formData,
        // Don't set Content-Type — let browser set multipart/form-data
        formData: true,
      }),
      invalidatesTags: ['Document'],
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({ url: `/documents/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Document'],
    }),

    downloadDocument: builder.query({
      query: (id) => `/documents/${id}/download`,
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useDownloadDocumentQuery,
} = documentApi;
