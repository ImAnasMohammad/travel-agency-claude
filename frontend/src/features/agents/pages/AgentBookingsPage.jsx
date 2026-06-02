/*
 *  FileName:-     AgentBookingsPage.jsx
 *  Description:-  Agent booking management page with search, filter, and card grid
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarCheck } from 'lucide-react';
import AgentBookingCard from '../components/AgentBookingCard';
import { useGetAgentBookingsQuery } from '../apis/agentApi';

const STATUSES = ['all', 'confirmed', 'pending', 'completed', 'cancelled'];

const AgentBookingsPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data, isLoading, isError } = useGetAgentBookingsQuery({
    status: statusFilter !== 'all' ? statusFilter : undefined,
    search: search || undefined,
  });

  const toArray = (val) => (Array.isArray(val) ? val : []);
  const bookings = toArray(data?.bookings ?? data?.data ?? data);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (!search) return true;
      const customerName = b.user?.name || b.customer || '';
      const bookingId = b._id || b.id || b.bookingId || '';
      const packageName = b.package?.name || b.packageName || b.package || '';
      return (
        customerName.toLowerCase().includes(search.toLowerCase()) ||
        bookingId.toLowerCase().includes(search.toLowerCase()) ||
        packageName.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [bookings, search]);

  const totalCommission = filtered.reduce((s, b) => s + (b.commission || b.commissionAmount || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0B4F6C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-red-500">Failed to load bookings. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500">{filtered.length} bookings • ₹{totalCommission.toLocaleString('en-IN')} total commission</p>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by customer, booking ID, package..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {STATUSES.map((s) => {
              const colors = { all: '', confirmed: 'bg-blue-600 text-white', pending: 'bg-amber-500 text-white', completed: 'bg-emerald-600 text-white', cancelled: 'bg-red-500 text-white' };
              return (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 text-xs font-medium rounded-lg capitalize transition-all ${statusFilter === s ? (colors[s] || 'bg-gray-800 text-white') : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-gray-100">
          <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No bookings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((booking) => (
            <AgentBookingCard key={booking._id || booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentBookingsPage;
