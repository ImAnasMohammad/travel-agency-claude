/*
 *  FileName:-     AdminDestinationManagementPage.jsx
 *  Description:-  Admin CRUD page for managing travel destinations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, MapPin, Image as ImageIcon, X, Globe, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  useGetDestinationsQuery,
  useCreateDestinationMutation,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
} from '../apis/destinationApi';

const schema = yup.object({
  name: yup.string().min(2).required('Name is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('Region is required'),
  description: yup.string().min(20).required('Description is required'),
  bestTimeToVisit: yup.string().required('Best time to visit is required'),
  isActive: yup.boolean(),
  isFeatured: yup.boolean(),
});

const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Northeast', 'Andaman', 'Lakshadweep'];

const DestinationFormModal = ({ dest, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: dest
      ? {
          name: dest.name,
          country: dest.country,
          state: dest.state || '',
          description: dest.description || '',
          bestTimeToVisit: dest.bestTimeToVisit || '',
          isActive: dest.isActive ?? true,
          isFeatured: dest.isFeatured ?? false,
        }
      : { name: '', country: 'India', state: '', description: '', bestTimeToVisit: '', isActive: true, isFeatured: false },
  });

  const onSubmit = async (data) => {
    await onSave(data);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{dest ? 'Edit Destination' : 'Add Destination'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name *</label>
              <input {...register('name')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" placeholder="e.g. Goa" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Country *</label>
              <input {...register('country')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
              {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Region *</label>
              <select {...register('state')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white">
                <option value="">Select region</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Best Time to Visit *</label>
              <input {...register('bestTimeToVisit')} placeholder="e.g. Oct–Mar" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
              {errors.bestTimeToVisit && <p className="text-xs text-red-500 mt-1">{errors.bestTimeToVisit.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description *</label>
            <textarea {...register('description')} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] resize-none" placeholder="Describe the destination..." />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#00B4D8] transition-colors cursor-pointer">
            <ImageIcon className="w-7 h-7 text-gray-400 mx-auto mb-1.5" />
            <p className="text-xs text-gray-500">Click to upload cover image</p>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('isActive')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C]" />
              <span className="text-sm text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded border-gray-300 text-[#0B4F6C]" />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B4F6C]/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : dest ? 'Update' : 'Add Destination'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const AdminDestinationManagementPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, isError } = useGetDestinationsQuery({ page, limit: 20, search: search || undefined });
  const [createDestination] = useCreateDestinationMutation();
  const [updateDestination] = useUpdateDestinationMutation();
  const [deleteDestination] = useDeleteDestinationMutation();

  const destinations = data?.data || [];
  const pagination = data?.pagination;

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await updateDestination({ id: editing._id, ...formData }).unwrap();
        toast.success('Destination updated!');
      } else {
        await createDestination(formData).unwrap();
        toast.success('Destination added!');
      }
      setEditing(null);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save destination');
      throw err; // keep modal open
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDestination(deletingId).unwrap();
      setDeletingId(null);
      toast.success('Destination deleted');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete destination');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destination Management</h1>
          <p className="text-sm text-gray-500">
            {pagination ? `${pagination.total} destinations configured` : 'Loading...'}
          </p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#0B4F6C]/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search destinations..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#0B4F6C] mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Loading destinations...</p>
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Failed to load destinations</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Destination</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Region</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Packages</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Best Time</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {destinations.map((dest, index) => (
                <motion.tr key={dest._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {dest.coverImage ? (
                        <img src={dest.coverImage} alt={dest.name} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" onError={(e) => { e.target.src = 'https://via.placeholder.com/48x36?text=IMG'; }} />
                      ) : (
                        <div className="w-12 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{dest.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Globe className="w-3 h-3" />{dest.country}</p>
                      </div>
                      {dest.isFeatured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Featured</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell"><span className="text-sm text-gray-600">{dest.state || '—'}</span></td>
                  <td className="px-4 py-4 text-center"><span className="inline-flex items-center justify-center w-8 h-8 bg-[#0B4F6C]/10 text-[#0B4F6C] text-sm font-bold rounded-full">{dest.packageCount ?? 0}</span></td>
                  <td className="px-4 py-4 hidden lg:table-cell"><span className="text-sm text-gray-600">{dest.bestTimeToVisit || '—'}</span></td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${dest.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {dest.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => { setEditing(dest); setShowModal(true); }} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeletingId(dest._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}

        {!isLoading && !isError && destinations.length === 0 && (
          <div className="py-16 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No destinations found</p>
          </div>
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {page} of {pagination.totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <DestinationFormModal
            dest={editing}
            onClose={() => { setShowModal(false); setEditing(null); }}
            onSave={handleSave}
          />
        )}
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Destination?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">All packages linked to this destination will need to be reassigned.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDestinationManagementPage;
