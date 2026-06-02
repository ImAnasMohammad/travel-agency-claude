/*
 *  FileName:-     RecentBookingsTable.jsx
 *  Description:-  Table of recent 10 bookings with ID, user, package, date, amount, status, and view link
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const mockBookings = [
  { id: 'BK-2026-001', user: 'Arjun Sharma', package: 'Golden Triangle Tour', date: '2026-04-20', amount: 45000, status: 'confirmed' },
  { id: 'BK-2026-002', user: 'Priya Patel', package: 'Kerala Backwaters', date: '2026-04-22', amount: 38500, status: 'pending' },
  { id: 'BK-2026-003', user: 'Rahul Gupta', package: 'Goa Beach Package', date: '2026-04-18', amount: 22000, status: 'completed' },
  { id: 'BK-2026-004', user: 'Ananya Singh', package: 'Manali Snow Trek', date: '2026-04-25', amount: 31000, status: 'confirmed' },
  { id: 'BK-2026-005', user: 'Vikram Reddy', package: 'Andaman Explorer', date: '2026-05-02', amount: 55000, status: 'pending' },
  { id: 'BK-2026-006', user: 'Kavya Nair', package: 'Rajasthan Heritage', date: '2026-04-28', amount: 41500, status: 'cancelled' },
  { id: 'BK-2026-007', user: 'Rohan Mehta', package: 'Varanasi Spiritual', date: '2026-04-30', amount: 18000, status: 'confirmed' },
  { id: 'BK-2026-008', user: 'Divya Joshi', package: 'Darjeeling Tea Tour', date: '2026-05-05', amount: 27500, status: 'pending' },
  { id: 'BK-2026-009', user: 'Aditya Kumar', package: 'Coorg Plantation', date: '2026-04-19', amount: 33000, status: 'completed' },
  { id: 'BK-2026-010', user: 'Sneha Iyer', package: 'Leh Ladakh Ride', date: '2026-05-10', amount: 62000, status: 'confirmed' },
];

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', classes: 'bg-blue-100 text-blue-700' },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-700' },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || { label: status, classes: 'bg-gray-100 text-gray-700' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes}`}>
      {config.label}
    </span>
  );
};

const RecentBookingsTable = ({ data = mockBookings, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="w-48 h-5 bg-gray-200 rounded mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 mb-3">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-40 h-4 bg-gray-200 rounded" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0B4F6C]" />
          <h3 className="text-base font-semibold text-gray-800">Recent Bookings</h3>
        </div>
        <Link
          to="/admin/bookings"
          className="text-sm text-[#00B4D8] hover:text-[#0B4F6C] font-medium transition-colors flex items-center gap-1"
        >
          View All <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Booking ID</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">User</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Package</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Travel Date</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Amount</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((booking, index) => (
              <motion.tr
                key={booking.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-3.5">
                  <span className="text-sm font-mono font-medium text-[#0B4F6C]">{booking.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {booking.user.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{booking.user}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="text-sm text-gray-600 max-w-[160px] truncate block">{booking.package}</span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <span className="text-sm font-semibold text-gray-800">
                    ₹{booking.amount.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Link
                    to={`/admin/bookings/${booking.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#00B4D8] hover:text-[#0B4F6C] transition-colors"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentBookingsTable;
