/*
 *  FileName:-     BookingSummaryCard.jsx
 *  Description:-  Card showing booking summary with package details, dates and pricing
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import BookingStatusBadge from './BookingStatusBadge';

const BookingSummaryCard = ({ booking, showStatus = false, compact = false }) => {
  const {
    package: pkg,
    travelDate,
    guestCount,
    totalAmount,
    status,
    bookingId,
  } = booking || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <img
          src={pkg?.images?.[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200'}
          alt={pkg?.name}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{pkg?.name}</p>
          <p className="text-sm text-gray-500">{formatDate(travelDate)} · {guestCount} guests</p>
        </div>
        <p className="font-bold text-gray-900 flex-shrink-0">{formatAmount(totalAmount)}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={pkg?.images?.[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'}
          alt={pkg?.name}
          className="w-full h-48 object-cover"
        />
        {showStatus && status && (
          <div className="absolute top-3 right-3">
            <BookingStatusBadge status={status} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg?.name}</h3>
        {bookingId && (
          <p className="text-xs text-gray-500 mb-3 font-mono">#{bookingId}</p>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-[#0B4F6C]" />
            <span>{pkg?.destination || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-[#0B4F6C]" />
            <span>{formatDate(travelDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-[#0B4F6C]" />
            <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          {pkg?.duration && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#0B4F6C]" />
              <span>{pkg.duration?.days}D / {pkg.duration?.nights}N</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Amount</span>
          <span className="text-xl font-bold text-gray-900">{formatAmount(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
