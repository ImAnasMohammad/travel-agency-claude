/*
 *  FileName:-     AdminPackageManagementPage.jsx
 *  Description:-  Admin page for managing travel packages with DataTable, search, filter, and CRUD actions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Edit2, Trash2, Eye, ToggleLeft, ToggleRight,
  Package, Star, ChevronLeft, ChevronRight, X, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import PackageForm from '../components/PackageForm';
import {
  useGetAllAdminPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} from '../apis/packageApi';

const CATEGORIES = ['All', 'Adventure', 'Beach', 'Cultural', 'Wildlife', 'Pilgrimage', 'Honeymoon', 'Family', 'Budget', 'Luxury'];

const StatusToggle = ({ value, onChange, disabled }) => (
  <button onClick={onChange} disabled={disabled} className={`transition-colors disabled:opacity-50 ${value ? 'text-emerald-500' : 'text-gray-400'}`}>
    {value ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
  </button>
);

const AdminPackageManagementPage = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [togglingId, setTogglingId] = useState(null);
  const perPage = 20;

  const { data, isLoading, isError } = useGetAllAdminPackagesQuery({
    page: currentPage,
    limit: perPage,
    search: search || undefined,
    status: statusFilter,
  });

  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

  const allPackages = data?.data || [];
  const pagination = data?.pagination;

  // Client-side category filter on current page data
  const packages = useMemo(() => {
    if (categoryFilter === 'All') return allPackages;
    return allPackages.filter((pkg) => {
      const catName = typeof pkg.category === 'object' ? pkg.category?.name : '';
      return catName?.toLowerCase() === categoryFilter.toLowerCase();
    });
  }, [allPackages, categoryFilter]);

  const toggleStatus = async (pkg) => {
    setTogglingId(pkg._id);
    try {
      await updatePackage({ id: pkg._id, isActive: !pkg.isActive }).unwrap();
      toast.success(`Package ${pkg.isActive ? 'deactivated' : 'activated'}`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update status');
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePackage(deletingId).unwrap();
      setDeletingId(null);
      toast.success('Package deleted');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete package');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingPackage) {
        await updatePackage({ id: editingPackage._id, ...data }).unwrap();
        toast.success('Package updated!');
      } else {
        await createPackage(data).unwrap();
        toast.success('Package created!');
      }
      setShowForm(false);
      setEditingPackage(null);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save package');
      throw err; // keeps form open (isSubmitting resets)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {pagination ? `${pagination.total} total packages` : 'Loading...'}
          </p>
        </div>
        <button
          onClick={() => { setEditingPackage(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#0B4F6C]/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Package
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="w-full max-w-4xl my-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{editingPackage ? 'Edit Package' : 'Create New Package'}</h2>
                <button onClick={() => { setShowForm(false); setEditingPackage(null); }} className="text-white/80 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <PackageForm
                initialData={editingPackage}
                onSubmit={handleFormSubmit}
                onCancel={() => { setShowForm(false); setEditingPackage(null); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search packages..."
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#0B4F6C] mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Loading packages...</p>
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Failed to load packages</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Package</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Destination</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Duration</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Price</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Rating</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {packages.map((pkg, index) => (
                  <motion.tr
                    key={pkg._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {pkg.coverImage ? (
                          <img src={pkg.coverImage} alt={pkg.title} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" onError={(e) => { e.target.src = 'https://via.placeholder.com/56x40?text=IMG'; }} />
                        ) : (
                          <div className="w-14 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-gray-800">{pkg.title}</p>
                            {pkg.isFeatured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                          </div>
                          <p className="text-xs text-gray-500">
                            {typeof pkg.category === 'object' ? pkg.category?.name : pkg.category || '—'} • {pkg.bookingCount ?? 0} bookings
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">
                        {typeof pkg.destination === 'object' ? pkg.destination?.name : pkg.destination || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600">{pkg.duration?.days}D/{pkg.duration?.nights}N</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm font-semibold text-gray-800">₹{pkg.basePrice?.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-gray-700">{pkg.rating?.toFixed(1) ?? '0.0'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusToggle
                        value={pkg.isActive}
                        onChange={() => toggleStatus(pkg)}
                        disabled={togglingId === pkg._id}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-[#0B4F6C] hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setEditingPackage(pkg); setShowForm(true); }} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeletingId(pkg._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && packages.length === 0 && (
          <div className="py-16 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No packages found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {pagination.totalPages} ({pagination.total} total)
            </p>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => {
                const p = i + 1;
                return (
                  <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 text-sm rounded-lg transition-colors ${currentPage === p ? 'bg-[#0B4F6C] text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
                    {p}
                  </button>
                );
              })}
              <button
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Package?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone. All related bookings will remain but the package will be removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPackageManagementPage;
