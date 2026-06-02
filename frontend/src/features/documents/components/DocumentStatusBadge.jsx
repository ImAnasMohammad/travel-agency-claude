/*
 *  FileName:-     DocumentStatusBadge.jsx
 *  Description:-  Valid/Expired/Expiring Soon status badges for documents
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const STATUS_CONFIG = {
  valid: {
    icon: CheckCircle,
    label: 'Valid',
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  expiring: {
    icon: AlertTriangle,
    label: 'Expiring Soon',
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  expired: {
    icon: XCircle,
    label: 'Expired',
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
  },
};

const DocumentStatusBadge = ({ status = 'valid', size = 'sm' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.valid;
  const Icon = config.icon;

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.bg} ${config.text} ${config.border} ${sizes[size]}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {config.label}
    </span>
  );
};

export default DocumentStatusBadge;
