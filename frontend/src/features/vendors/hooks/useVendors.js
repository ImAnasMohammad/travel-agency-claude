/*
 *  FileName:-     useVendors.js
 *  Description:-  Custom hook for vendor management operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { selectVendorFilters, selectVendorPagination, setFilter, setPagination, setSelectedVendor } from '../slices/vendorSlice';
import { useGetVendorsQuery, useUpdateVendorStatusMutation, useDeleteVendorMutation } from '../apis/vendorApi';
import toast from 'react-hot-toast';

const useVendors = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectVendorFilters);
  const pagination = useSelector(selectVendorPagination);

  const { data, isLoading, error, refetch } = useGetVendorsQuery({
    page: pagination.page,
    limit: pagination.limit,
    ...filters,
  });

  const [updateStatus] = useUpdateVendorStatusMutation();
  const [deleteVendor] = useDeleteVendorMutation();

  const handleFilterChange = useCallback(
    (key, value) => dispatch(setFilter({ key, value })),
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => dispatch(setPagination({ page })),
    [dispatch]
  );

  const handleSelectVendor = useCallback(
    (vendor) => dispatch(setSelectedVendor(vendor)),
    [dispatch]
  );

  const handleStatusUpdate = useCallback(
    async (id, status) => {
      try {
        await updateStatus({ id, status }).unwrap();
        toast.success(`Vendor ${status}`);
      } catch {
        toast.error('Failed to update status');
      }
    },
    [updateStatus]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteVendor(id).unwrap();
        toast.success('Vendor removed');
      } catch {
        toast.error('Failed to delete vendor');
      }
    },
    [deleteVendor]
  );

  return {
    vendors: data?.vendors || data || [],
    total: data?.total || 0,
    isLoading,
    error,
    filters,
    pagination,
    refetch,
    handleFilterChange,
    handlePageChange,
    handleSelectVendor,
    handleStatusUpdate,
    handleDelete,
  };
};

export default useVendors;
