/*
 *  FileName:-     useDocuments.js
 *  Description:-  Custom hook for travel document vault management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
} from '../apis/documentApi';
import { setFilterType, selectDocumentFilter } from '../slices/documentSlice';

export const useDocuments = () => {
  const dispatch = useDispatch();
  const filterType = useSelector(selectDocumentFilter);

  const { data, isLoading, refetch } = useGetDocumentsQuery(
    filterType !== 'all' ? { type: filterType } : {}
  );

  const [uploadDocument, { isLoading: isUploading }] = useUploadDocumentMutation();
  const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation();

  const documents = data?.documents || [];

  const getDocumentStatus = useCallback((doc) => {
    if (!doc.expiryDate) return 'valid';
    const daysLeft = Math.ceil((new Date(doc.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 90) return 'expiring';
    return 'valid';
  }, []);

  const handleUpload = useCallback(async (file, metadata) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', metadata.type);
    formData.append('name', metadata.name);
    if (metadata.expiryDate) formData.append('expiryDate', metadata.expiryDate);
    if (metadata.documentNumber) formData.append('documentNumber', metadata.documentNumber);

    try {
      await uploadDocument(formData).unwrap();
      toast.success('Document uploaded successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to upload document');
      throw err;
    }
  }, [uploadDocument]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteDocument(id).unwrap();
      toast.success('Document deleted');
    } catch {
      toast.error('Failed to delete document');
    }
  }, [deleteDocument]);

  const handleFilterChange = useCallback((type) => {
    dispatch(setFilterType(type));
  }, [dispatch]);

  const stats = {
    total: documents.length,
    valid: documents.filter((d) => getDocumentStatus(d) === 'valid').length,
    expiring: documents.filter((d) => getDocumentStatus(d) === 'expiring').length,
    expired: documents.filter((d) => getDocumentStatus(d) === 'expired').length,
  };

  return {
    documents,
    isLoading,
    isUploading,
    isDeleting,
    filterType,
    stats,
    getDocumentStatus,
    handleUpload,
    handleDelete,
    handleFilterChange,
    refetch,
  };
};
