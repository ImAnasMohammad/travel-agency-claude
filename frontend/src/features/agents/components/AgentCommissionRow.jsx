/*
 *  FileName:-     AgentCommissionRow.jsx
 *  Description:-  Table row component for commission breakdown display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { IndianRupee, CheckCircle, Clock, XCircle } from 'lucide-react';

const PAYOUT_CONFIG = {
  paid: { label: 'Paid', classes: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700', icon: Clock },
  failed: { label: 'Failed', classes: 'bg-red-100 text-red-700', icon: XCircle },
};

const AgentCommissionRow = ({ commission }) => {
  const {
    id,
    bookingId,
    customer,
    package: packageName,
    bookingAmount,
    commissionAmount,
    commissionRate,
    payoutStatus,
    payoutDate,
    earnedDate,
  } = commission;

  const cfg = PAYOUT_CONFIG[payoutStatus] || PAYOUT_CONFIG.pending;
  const PayoutIcon = cfg.icon;

  return (
    <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
      <td className="px-4 py-3.5">
        <div>
          <p className="text-xs font-mono font-semibold text-[#0B4F6C]">{id}</p>
          <p className="text-xs text-gray-400">{bookingId}</p>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-sm font-medium text-gray-800">{customer}</p>
        <p className="text-xs text-gray-500 hidden sm:block">{packageName}</p>
      </td>
      <td className="px-4 py-3.5 text-right">
        <p className="text-sm text-gray-600">₹{bookingAmount?.toLocaleString('en-IN')}</p>
        <p className="text-xs text-gray-400">{commissionRate}% rate</p>
      </td>
      <td className="px-4 py-3.5 text-right">
        <p className="text-sm font-bold text-emerald-700">₹{commissionAmount?.toLocaleString('en-IN')}</p>
      </td>
      <td className="px-4 py-3.5 text-center hidden md:table-cell">
        <span className="text-xs text-gray-500">
          {new Date(earnedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </span>
      </td>
      <td className="px-4 py-3.5 text-center">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.classes}`}>
          <PayoutIcon className="w-3 h-3" />
          {cfg.label}
        </span>
        {payoutDate && payoutStatus === 'paid' && (
          <p className="text-[10px] text-gray-400 mt-0.5">{new Date(payoutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
        )}
      </td>
    </tr>
  );
};

export default AgentCommissionRow;
