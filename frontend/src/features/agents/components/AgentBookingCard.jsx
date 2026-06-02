/*
 *  FileName:-     AgentBookingCard.jsx
 *  Description:-  Booking card for agent view showing customer, package, commission earned
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Package, IndianRupee, TrendingUp, Eye } from 'lucide-react';

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', classes: 'bg-blue-100 text-blue-700' },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-700' },
};

const AgentBookingCard = ({ booking, onView }) => {
  const {
    id,
    customer,
    package: packageName,
    destination,
    travelDate,
    amount,
    commission,
    commissionRate,
    status,
    travelers,
  } = booking;

  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-mono font-bold text-[#0B4F6C]">{id}</span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.classes}`}>{cfg.label}</span>
        </div>
        <span className="text-xs text-gray-400">{new Date(travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800">{customer}</span>
          {travelers > 1 && <span className="text-xs text-gray-500">+{travelers - 1} more</span>}
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600">{packageName}</span>
        </div>
      </div>

      {/* Financial */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">Booking</span>
          </div>
          <p className="text-sm font-bold text-gray-800">₹{amount?.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span className="text-xs text-emerald-600">Commission</span>
          </div>
          <p className="text-sm font-bold text-emerald-700">₹{commission?.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Commission Rate */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{commissionRate}% commission rate</span>
        <button onClick={() => onView?.(booking)} className="flex items-center gap-1 text-xs text-[#00B4D8] hover:text-[#0B4F6C] font-medium transition-colors">
          <Eye className="w-3.5 h-3.5" /> Details
        </button>
      </div>
    </motion.div>
  );
};

export default AgentBookingCard;
