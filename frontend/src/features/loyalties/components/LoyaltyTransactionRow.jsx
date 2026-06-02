/*
 *  FileName:-     LoyaltyTransactionRow.jsx
 *  Description:-  Individual transaction row showing earned/redeemed points with date
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Gift, RotateCcw } from 'lucide-react';

const TYPE_CONFIG = {
  earn: {
    icon: ArrowDownLeft,
    color: 'text-green-600',
    bg: 'bg-green-100',
    prefix: '+',
    label: 'Earned',
  },
  redeem: {
    icon: ArrowUpRight,
    color: 'text-red-500',
    bg: 'bg-red-100',
    prefix: '-',
    label: 'Redeemed',
  },
  bonus: {
    icon: Gift,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    prefix: '+',
    label: 'Bonus',
  },
  refund: {
    icon: RotateCcw,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    prefix: '+',
    label: 'Refunded',
  },
};

const LoyaltyTransactionRow = ({ transaction }) => {
  const {
    type = 'earn',
    description,
    points,
    balance,
    createdAt,
    bookingId,
  } = transaction || {};

  const config = TYPE_CONFIG[type] || TYPE_CONFIG.earn;
  const Icon = config.icon;

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
        })
      : '';

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">
          {description || config.label}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
          {bookingId && (
            <span className="text-xs text-gray-400 font-mono">#{bookingId}</span>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`font-bold text-base ${config.color}`}>
          {config.prefix}{points?.toLocaleString('en-IN')} pts
        </p>
        {balance !== undefined && (
          <p className="text-xs text-gray-400">Balance: {balance.toLocaleString('en-IN')}</p>
        )}
      </div>
    </div>
  );
};

export default LoyaltyTransactionRow;
