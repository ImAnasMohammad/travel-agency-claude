/*
 *  FileName:-     BookingStatusBadge.jsx
 *  Description:-  Colored status badge component for booking statuses
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { BOOKING_STATUS_COLORS, BOOKING_STATUS_LABELS } from '../constants/bookingConstants';

const BookingStatusBadge = ({ status, size = 'md' }) => {
  const colors = BOOKING_STATUS_COLORS[status] || BOOKING_STATUS_COLORS.pending;
  const label = BOOKING_STATUS_LABELS[status] || status;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border
        ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {label}
    </span>
  );
};

export default BookingStatusBadge;
