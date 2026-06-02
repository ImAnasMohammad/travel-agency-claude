/*
 *  FileName:-     BookingCard.jsx
 *  Description:-  Beautiful booking list item card with image, status, dates and actions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ChevronRight, X, Eye, Clock } from 'lucide-react';
import BookingStatusBadge from './BookingStatusBadge';

const BookingCard = ({ booking, onCancel, isCancelling }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const {
    _id,
    bookingId,
    package: pkg,
    travelDate,
    guestCount,
    totalAmount,
    status,
    createdAt,
  } = booking || {};

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'N/A';

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const canCancel =
    (status === 'pending' || status === 'confirmed') &&
    new Date(travelDate) > new Date();

  const daysLeft = Math.ceil(
    (new Date(travelDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const handleCancelConfirm = () => {
    onCancel(_id, cancelReason || 'User requested cancellation');
    setShowCancelModal(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-48 sm:flex-shrink-0 relative">
            <img
              src={pkg?.images?.[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400'}
              alt={pkg?.name}
              className="w-full h-44 sm:h-full object-cover"
            />
            {status === 'confirmed' && daysLeft > 0 && daysLeft <= 30 && (
              <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
                {daysLeft}d left
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                    {pkg?.name || 'Unknown Package'}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">#{bookingId}</p>
                </div>
                <BookingStatusBadge status={status} />
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#0B4F6C]" />
                  <span>{pkg?.destination || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#0B4F6C]" />
                  <span>{formatDate(travelDate)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-[#0B4F6C]" />
                  <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#0B4F6C]" />
                  <span>Booked {formatDate(createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">{formatAmount(totalAmount)}</p>
              </div>

              <div className="flex items-center gap-2">
                {canCancel && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    disabled={isCancelling}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600
                      text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                )}
                <Link
                  to={`/bookings/${_id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white
                    text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Booking?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to cancel{' '}
              <span className="font-semibold">{pkg?.name}</span>? This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason (optional)
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Tell us why you're cancelling..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm
                  focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={isCancelling}
                className="flex-1 py-2.5 rounded-full bg-red-600 text-white text-sm font-medium
                  hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
