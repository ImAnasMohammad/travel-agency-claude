/*
 *  FileName:-     documentSlice.js
 *  Description:-  Redux slice for travel document vault state
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  documents: [],
  filterType: 'all',
  isLoading: false,
  uploadProgress: 0,
  error: null,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDocuments, setFilterType, setLoading, setUploadProgress, setError } = documentSlice.actions;
export default documentSlice.reducer;

export const selectDocuments = (state) => state.document.documents;
export const selectDocumentFilter = (state) => state.document.filterType;
export const selectDocumentLoading = (state) => state.document.isLoading;
