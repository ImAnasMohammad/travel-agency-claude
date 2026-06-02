/*
 *  FileName:-     AddressManagementPage.jsx
 *  Description:-  Address management page with list, add/edit modal
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, X, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';
import { useAddresses } from '../hooks/useAddresses';
import { selectEditingAddress, selectAddressModalOpen, setModalOpen } from '../slices/addressSlice';

const AddressManagementPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectAddressModalOpen);
  const editingAddress = useSelector(selectEditingAddress);

  const {
    addresses,
    isLoading,
    isCreating,
    isUpdating,
    isSettingDefault,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSetDefault,
    openAddModal,
    openEditModal,
  } = useAddresses();

  const handleSubmit = async (data) => {
    if (editingAddress) {
      await handleUpdate(editingAddress._id, data);
    } else {
      await handleCreate(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-7 h-7" />
              <div>
                <h1 className="text-2xl font-black">Saved Addresses</h1>
                <p className="text-gray-400 text-sm mt-0.5">{addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-3" />
          </div>
        ) : addresses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No addresses saved</h3>
            <p className="text-gray-500 text-sm mb-6">Add your home, work or travel addresses for quick checkout</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
                isSettingDefault={isSettingDefault}
              />
            ))}
            <button
              onClick={openAddModal}
              className="flex flex-col items-center justify-center gap-2 h-40 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-black hover:text-black transition-colors"
            >
              <Plus className="w-8 h-8" />
              <span className="font-medium text-sm">Add New Address</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button onClick={() => dispatch(setModalOpen(false))} className="p-2 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-5">
                <AddressForm
                  defaultValues={editingAddress}
                  onSubmit={handleSubmit}
                  isSubmitting={isCreating || isUpdating}
                  onCancel={() => dispatch(setModalOpen(false))}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressManagementPage;
