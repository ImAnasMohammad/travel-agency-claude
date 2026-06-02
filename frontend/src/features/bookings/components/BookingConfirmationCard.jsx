/*
 *  FileName:-     BookingConfirmationCard.jsx
 *  Description:-  Success confirmation card with booking ID, QR placeholder and details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { CheckCircle, Download, Share2, QrCode, Calendar, Users, MapPin } from 'lucide-react';
import BookingStatusBadge from './BookingStatusBadge';

const BookingConfirmationCard = ({ booking }) => {
  const {
    bookingId,
    package: pkg,
    travelDate,
    guestCount,
    totalAmount,
    status,
    travellers,
  } = booking || {};

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'N/A';

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg max-w-lg mx-auto">
      {/* Header */}
      <div className="bg-black p-6 text-center text-white">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-1">Booking Confirmed!</h2>
        <p className="text-gray-400 text-sm">Your adventure awaits you</p>
      </div>

      {/* Booking ID + Status */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Booking ID</p>
          <p className="text-lg font-bold text-gray-900 font-mono">#{bookingId}</p>
        </div>
        <BookingStatusBadge status={status || 'confirmed'} />
      </div>

      {/* Package Details */}
      <div className="p-6">
        <div className="flex gap-4 mb-5">
          <img
            src={pkg?.images?.[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200'}
            alt={pkg?.name}
            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
          />
          <div>
            <h3 className="font-bold text-gray-900">{pkg?.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pkg?.destination}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{pkg?.duration?.days}D / {pkg?.duration?.nights}N</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Travel Date</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{formatDate(travelDate)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Travellers</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {guestCount} {guestCount === 1 ? 'Person' : 'People'}
            </p>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex flex-col items-center py-4 border border-dashed border-gray-300 rounded-xl mb-5">
          <QrCode className="w-24 h-24 text-gray-400" strokeWidth={1} />
          <p className="text-xs text-gray-500 mt-2">Show this at the point of departure</p>
          <p className="text-xs font-mono text-gray-400">#{bookingId}</p>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <span className="text-sm text-gray-600">Total Paid</span>
          <span className="text-2xl font-bold text-gray-900">{formatAmount(totalAmount)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationCard;
