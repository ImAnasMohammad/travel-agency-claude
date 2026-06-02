/*
 *  FileName:-     AdminReviewModerationPage.jsx
 *  Description:-  Admin review moderation page with approve/reject, filtering, and detail view
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, X, MessageSquare, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminReviewModerationCard from '../components/AdminReviewModerationCard';
import { useGetAllReviewsForAdminQuery, useModerateReviewMutation } from '../apis/reviewApi';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Flagged', value: 'flagged' },
];

const AdminReviewModerationPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetAllReviewsForAdminQuery({ page, limit: 20, status: statusFilter, search });
  const [moderateReview, { isLoading: isModerating }] = useModerateReviewMutation();

  const reviews = data?.data || [];
  const pagination = data?.pagination || {};

  const handleApprove = async (id) => {
    try {
      await moderateReview({ id, isApproved: true }).unwrap();
      toast.success('Review approved and published');
      setSelectedReview(null);
    } catch {
      toast.error('Failed to approve review');
    }
  };

  const handleReject = async (id) => {
    try {
      await moderateReview({ id, isApproved: false }).unwrap();
      toast.success('Review rejected');
      setSelectedReview(null);
    } catch {
      toast.error('Failed to reject review');
    }
  };

  const pendingCount = reviews.filter((r) => r.status === 'pending' || !r.isApproved).length;
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : '0.0';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0B4F6C] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load reviews. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Moderation</h1>
          <p className="text-sm text-gray-500">{pendingCount} reviews pending approval</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-amber-700">{avgRating}</span>
          <span className="text-xs text-amber-600">avg rating</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {FILTERS.filter((f) => f.value !== 'all').map(({ label, value }) => {
          const count = reviews.filter((r) => r.status === value).length;
          const colors = { pending: 'text-amber-600', approved: 'text-emerald-600', rejected: 'text-red-500', flagged: 'text-orange-600' };
          return (
            <div key={value} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className={`text-xl font-bold ${colors[value]}`}>{count}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search reviews..."
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => { setStatusFilter(value); setPage(1); }}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${statusFilter === value ? 'bg-[#0B4F6C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      {reviews.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-gray-100">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No reviews found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {reviews.map((review) => (
              <AdminReviewModerationCard
                key={review._id}
                review={review}
                onApprove={handleApprove}
                onReject={handleReject}
                onView={setSelectedReview}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3">
          <p className="text-sm text-gray-500">Page {pagination.page} of {pagination.totalPages}</p>
          <div className="flex gap-2">
            <button disabled={!pagination.hasPrevPage} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50">Prev</button>
            <button disabled={!pagination.hasNextPage} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}

      {/* Full Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Review Details</h3>
                <button onClick={() => setSelectedReview(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white font-bold">
                    {selectedReview.user?.name?.charAt(0) || selectedReview.userId?.firstName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{selectedReview.user?.name || `${selectedReview.userId?.firstName || ''} ${selectedReview.userId?.lastName || ''}`.trim() || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{selectedReview.user?.email || selectedReview.userId?.email || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < selectedReview.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                  <span className="text-sm font-bold text-gray-700">{selectedReview.rating}/5</span>
                </div>
                {selectedReview.packageId && (
                  <p className="text-sm font-semibold text-[#0B4F6C] bg-[#0B4F6C]/10 px-2 py-1 rounded-lg inline-block">
                    {selectedReview.packageId?.title || 'Package'}
                  </p>
                )}
                {selectedReview.title && <h4 className="text-base font-bold text-gray-900">"{selectedReview.title}"</h4>}
                <p className="text-sm text-gray-700 leading-relaxed">{selectedReview.comment}</p>
                <p className="text-xs text-gray-400">{selectedReview.createdAt ? new Date(selectedReview.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</p>
                {!selectedReview.isApproved && selectedReview.status !== 'rejected' && (
                  <div className="flex gap-3 pt-2">
                    <button
                      disabled={isModerating}
                      onClick={() => handleApprove(selectedReview._id)}
                      className="flex-1 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-60"
                    >
                      Approve
                    </button>
                    <button
                      disabled={isModerating}
                      onClick={() => handleReject(selectedReview._id)}
                      className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReviewModerationPage;
