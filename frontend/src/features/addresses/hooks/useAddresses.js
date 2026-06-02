/*
 *  FileName:-     useAddresses.js
 *  Description:-  Custom hook for address management operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from '../apis/addressApi';
import { setEditingAddress, setModalOpen } from '../slices/addressSlice';

export const useAddresses = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetAddressesQuery();
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [setDefault, { isLoading: isSettingDefault }] = useSetDefaultAddressMutation();

  const addresses = data?.addresses || [];

  const handleCreate = useCallback(async (addressData) => {
    try {
      await createAddress(addressData).unwrap();
      toast.success('Address added successfully');
      dispatch(setModalOpen(false));
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add address');
      throw err;
    }
  }, [createAddress, dispatch]);

  const handleUpdate = useCallback(async (id, addressData) => {
    try {
      await updateAddress({ id, ...addressData }).unwrap();
      toast.success('Address updated');
      dispatch(setModalOpen(false));
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update address');
    }
  }, [updateAddress, dispatch]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteAddress(id).unwrap();
      toast.success('Address deleted');
    } catch {
      toast.error('Failed to delete address');
    }
  }, [deleteAddress]);

  const handleSetDefault = useCallback(async (id) => {
    try {
      await setDefault(id).unwrap();
      toast.success('Default address updated');
    } catch {
      toast.error('Failed to set default address');
    }
  }, [setDefault]);

  const openAddModal = useCallback(() => {
    dispatch(setEditingAddress(null));
    dispatch(setModalOpen(true));
  }, [dispatch]);

  const openEditModal = useCallback((address) => {
    dispatch(setEditingAddress(address));
    dispatch(setModalOpen(true));
  }, [dispatch]);

  return {
    addresses,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    isSettingDefault,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSetDefault,
    openAddModal,
    openEditModal,
    refetch,
  };
};
