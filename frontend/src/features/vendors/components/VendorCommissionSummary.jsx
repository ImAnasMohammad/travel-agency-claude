/*
 *  FileName:-     VendorCommissionSummary.jsx
 *  Description:-  Commission summary card showing earnings, pending, and paid amounts
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { IndianRupee, TrendingUp, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VendorCommissionSummary = ({ summary }) => {
  const {
    totalEarned = 485000,
    pendingPayout = 45000,
    paidOut = 440000,
    thisMonthEarned = 68000,
    commissionRate = 10,
    bookingsCount = 47,
    growth = 12.5,
  } = summary || {};

  const stats = [
    { label: 'Total Earned', value: totalEarned, prefix: '₹', color: 'from-[#0B4F6C] to-[#00B4D8]', textColor: 'text-white', icon: IndianRupee, featured: true },
    { label: 'This Month', value: thisMonthEarned, prefix: '₹', color: 'bg-emerald-50', textColor: 'text-emerald-800', icon: TrendingUp, badge: `+${growth}%` },
    { label: 'Pending Payout', value: pendingPayout, prefix: '₹', color: 'bg-amber-50', textColor: 'text-amber-800', icon: Clock },
    { label: 'Total Paid Out', value: paidOut, prefix: '₹', color: 'bg-blue-50', textColor: 'text-blue-800', icon: CheckCircle },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-800">Commission Summary</h3>
        <span className="text-xs bg-[#0B4F6C]/10 text-[#0B4F6C] px-2.5 py-1 rounded-full font-semibold">
          {commissionRate}% rate • {bookingsCount} bookings
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, prefix, color, textColor, icon: Icon, badge, featured }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 ${featured ? `bg-gradient-to-br ${color}` : color} col-span-${featured ? '2' : '1'}`}
            style={featured ? {} : {}}
          >
            {featured ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs mb-1">{label}</p>
                  <p className="text-2xl font-black text-white">
                    {prefix}{(value / 100000).toFixed(1)}L
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${textColor} opacity-70`} />
                  {badge && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      {badge} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className={`text-base font-bold ${textColor}`}>
                  {prefix}{value.toLocaleString('en-IN')}
                </p>
                <p className={`text-xs mt-0.5 opacity-70 ${textColor}`}>{label}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Commission Bar */}
      <div className="mt-4 pt-4 border-t border-gray-50">
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-gray-500">Payout Progress</span>
          <span className="text-xs font-semibold text-gray-700">{Math.round((paidOut / totalEarned) * 100)}% paid</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(paidOut / totalEarned) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] rounded-full"
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-gray-400">Paid: ₹{(paidOut / 1000).toFixed(0)}K</span>
          <span className="text-xs text-amber-600 font-medium">Pending: ₹{(pendingPayout / 1000).toFixed(0)}K</span>
        </div>
      </div>
    </div>
  );
};

export default VendorCommissionSummary;
