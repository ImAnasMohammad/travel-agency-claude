/*
 *  FileName:-     AdminVendorManagementPage.jsx
 *  Description:-  Admin page for managing vendors with CRUD, approval, and commission tracking
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Grid, List, X } from 'lucide-react';
import toast from 'react-hot-toast';
import VendorCard from '../components/VendorCard';
import VendorForm from '../components/VendorForm';
import {
  useGetVendorsQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useUpdateVendorStatusMutation,
  useDeleteVendorMutation,
} from '../apis/vendorApi';

const AdminVendorManagementPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, isError } = useGetVendorsQuery({ search, status: statusFilter });
  const [createVendor] = useCreateVendorMutation();
  const [updateVendor] = useUpdateVendorMutation();
  const [updateVendorStatus] = useUpdateVendorStatusMutation();
  const [deleteVendor] = useDeleteVendorMutation();

  const toArray = (val) => (Array.isArray(val) ? val : []);
  const vendors = toArray(data?.vendors ?? data?.data ?? data);

  const filtered = vendors.filter((v) => {
    const matchSearch = !search ||
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.location?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await updateVendor({ id: editing._id || editing.id, ...formData }).unwrap();
        toast.success('Vendor updated!');
      } else {
        await createVendor(formData).unwrap();
        toast.success('Vendor added!');
      }
      setShowModal(false);
      setEditing(null);
    } catch {
      toast.error('Failed to save vendor');
    }
  };

  const handleApprove = async (id) => {
    try {
      await updateVendorStatus({ id, status: 'active' }).unwrap();
      toast.success('Vendor approved!');
    } catch {
      toast.error('Failed to approve vendor');
    }
  };

  const handleSuspend = async (id) => {
    try {
      await updateVendorStatus({ id, status: 'suspended' }).unwrap();
      toast.success('Vendor suspended');
    } catch {
      toast.error('Failed to suspend vendor');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVendor(id).unwrap();
      setDeletingId(null);
      toast.success('Vendor removed');
    } catch {
      toast.error('Failed to remove vendor');
    }
  };

  const statuses = ['all', 'active', 'pending', 'suspended'];
  const statusColors = { all: 'bg-gray-800 text-white', active: 'bg-emerald-600 text-white', pending: 'bg-amber-500 text-white', suspended: 'bg-red-500 text-white' };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0B4F6C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading vendors...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-red-500">Failed to load vendors. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-sm text-gray-500">{vendors.length} vendors registered</p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#0B4F6C]/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', value: vendors.length, color: 'text-gray-900' },
          { label: 'Active', value: vendors.filter((v) => v.status === 'active').length, color: 'text-emerald-600' },
          { label: 'Pending', value: vendors.filter((v) => v.status === 'pending').length, color: 'text-amber-600' },
          { label: 'Suspended', value: vendors.filter((v) => v.status === 'suspended').length, color: 'text-red-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label} Vendors</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
          </div>
          <div className="flex gap-1.5">
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 text-xs font-medium rounded-lg capitalize transition-all ${statusFilter === s ? statusColors[s] : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}><Grid className="w-4 h-4 text-gray-600" /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}><List className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
      </div>

      {/* Vendor Grid */}
      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        <AnimatePresence>
          {filtered.map((vendor) => (
            <VendorCard
              key={vendor._id || vendor.id}
              vendor={vendor}
              onView={() => {}}
              onEdit={(v) => { setEditing(v); setShowModal(true); }}
              onDelete={(id) => setDeletingId(id)}
              onApprove={handleApprove}
              onSuspend={handleSuspend}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white rounded-xl border border-gray-100 mt-4">
          <p className="text-gray-500 font-medium">No vendors found</p>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{editing ? 'Edit Vendor' : 'Add New Vendor'}</h3>
                <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5">
                <VendorForm initialData={editing} onSubmit={handleSave} onCancel={() => { setShowModal(false); setEditing(null); }} />
              </div>
            </motion.div>
          </motion.div>
        )}
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Remove Vendor?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">All vendor data and associated packages will be affected.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleDelete(deletingId)} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600">Remove</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminVendorManagementPage;
