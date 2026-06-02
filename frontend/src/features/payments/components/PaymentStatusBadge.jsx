/*
 *  FileName:-     PaymentStatusBadge.jsx
 *  Description:-  Badge component for payment status display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';

const STATUS_CONFIG = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', label: 'Pending' },
  success: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500', label: 'Paid' },
  failed: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500', label: 'Failed' },
  refunded: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500', label: 'Refunded' },
  processing: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500', label: 'Processing' },
};

const PaymentStatusBadge = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export default PaymentStatusBadge;
