/*
 *  FileName:-     AdminCouponManagementPage.jsx
 *  Description:-  Admin coupon CRUD management page with table and modal form
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Tag, Copy, ToggleLeft, ToggleRight, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import CouponForm from '../components/CouponForm';
import {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} from '../apis/couponApi';

const AdminCouponManagementPage = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, isError } = useGetCouponsQuery();
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const toArray = (val) => (Array.isArray(val) ? val : []);
  const coupons = toArray(Array.isArray(data) ? data : data?.coupons ?? data?.data ?? data);

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await updateCoupon({ id: editing._id || editing.id, ...formData }).unwrap();
        toast.success('Coupon updated!');
      } else {
        await createCoupon(formData).unwrap();
        toast.success('Coupon created!');
      }
      setShowModal(false);
      setEditing(null);
    } catch {
      toast.error('Failed to save coupon');
    }
  };

  const toggleStatus = async (coupon) => {
    try {
      await updateCoupon({ id: coupon._id || coupon.id, isActive: !coupon.isActive }).unwrap();
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied: ${code}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id).unwrap();
      setDeletingId(null);
      toast.success('Coupon deleted');
    } catch {
      toast.error('Failed to delete coupon');
    }
  };

  const isExpired = (validTo) => new Date(validTo) < new Date();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0B4F6C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading coupons...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-red-500">Failed to load coupons. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupon Management</h1>
          <p className="text-sm text-gray-500">{coupons.filter((c) => c.isActive).length} active coupons</p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#0B4F6C]/90 transition-colors">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Coupons', value: coupons.length, color: 'text-[#0B4F6C]' },
          { label: 'Active', value: coupons.filter((c) => c.isActive).length, color: 'text-emerald-600' },
          { label: 'Expired', value: coupons.filter((c) => isExpired(c.validTo)).length, color: 'text-red-500' },
          { label: 'Total Used', value: coupons.reduce((s, c) => s + (c.usedCount || 0), 0), color: 'text-purple-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search coupons..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Coupon Code</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Discount</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Min Order</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Validity</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Usage</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((coupon, index) => (
                <motion.tr key={coupon._id || coupon.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B4F6C]/10 rounded-lg">
                        <Tag className="w-3.5 h-3.5 text-[#0B4F6C]" />
                        <span className="text-sm font-mono font-bold text-[#0B4F6C]">{coupon.code}</span>
                      </div>
                      <button onClick={() => copyCode(coupon.code)} className="text-gray-400 hover:text-[#0B4F6C] transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                    {coupon.description && <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-lg">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                    </span>
                    {coupon.maxDiscount && <p className="text-xs text-gray-400 mt-0.5">Max ₹{coupon.maxDiscount}</p>}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell"><span className="text-sm text-gray-600">₹{Number(coupon.minOrderValue || 0).toLocaleString('en-IN')}</span></td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div>
                      <p className="text-xs text-gray-500">
                        {coupon.validFrom && new Date(coupon.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        {' – '}
                        {coupon.validTo && new Date(coupon.validTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      {coupon.validTo && isExpired(coupon.validTo) && <span className="text-xs text-red-500 font-medium">Expired</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center hidden md:table-cell">
                    <div className="text-sm font-medium text-gray-700">{coupon.usedCount || 0} / {coupon.usageLimit || '∞'}</div>
                    {coupon.usageLimit && (
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div className="bg-[#00B4D8] h-1 rounded-full" style={{ width: `${Math.min(((coupon.usedCount || 0) / coupon.usageLimit) * 100, 100)}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleStatus(coupon)} className={`transition-colors ${coupon.isActive ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {coupon.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => { setEditing(coupon); setShowModal(true); }} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeletingId(coupon._id || coupon.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{editing ? 'Edit Coupon' : 'Create New Coupon'}</h3>
                <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                <CouponForm initialData={editing} onSubmit={handleSave} onCancel={() => { setShowModal(false); setEditing(null); }} />
              </div>
            </motion.div>
          </motion.div>
        )}
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Coupon?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">This coupon will no longer be usable by customers.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleDelete(deletingId)} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCouponManagementPage;
