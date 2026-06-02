/*
 *  FileName:-     AdminBookingManagementPage.jsx
 *  Description:-  Full admin booking management with filters, status updates, detail view, and CSV export
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Download, Eye, X, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, Clock, CalendarDays, IndianRupee, User,
  Phone, Mail, Package, MapPin, ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetAllBookingsQuery, useUpdateBookingStatusMutation } from '../apis/bookingApi';

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', classes: 'bg-blue-100 text-blue-700', icon: CheckCircle },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700', icon: Clock },
  completed: { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-700', icon: XCircle },
};

const PAYMENT_CONFIG = {
  paid: { label: 'Paid', classes: 'bg-emerald-100 text-emerald-700' },
  partial: { label: 'Partial', classes: 'bg-orange-100 text-orange-700' },
  unpaid: { label: 'Unpaid', classes: 'bg-red-100 text-red-700' },
  refunded: { label: 'Refunded', classes: 'bg-gray-100 text-gray-500' },
};

const StatusBadge = ({ status, config }) => {
  const cfg = config[status] || { label: status, classes: 'bg-gray-100 text-gray-700' };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.classes}`}>{cfg.label}</span>;
};

const DetailRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-3">
    {Icon && <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />}
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);

const AdminBookingManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(() => {
    const s = searchParams.get('status');
    return s && STATUS_CONFIG[s] ? s : 'all';
  });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page: currentPage,
    limit: perPage,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    search: search || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const toArray = (val) => (Array.isArray(val) ? val : []);
  const bookings = toArray(Array.isArray(data) ? data : data?.bookings ?? data?.data ?? data);
  const totalCount = data?.total || data?.totalCount || bookings.length;
  const totalPages = data?.totalPages || Math.ceil(totalCount / perPage);

  useEffect(() => {
    if (statusFilter === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', statusFilter);
    }
    setSearchParams(searchParams, { replace: true });
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateFrom, dateTo]);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateBookingStatus({ id, status: newStatus }).unwrap();
      toast.success(`Booking marked as ${newStatus}`);
      setSelectedBooking((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const exportCSV = () => {
    const headers = ['Booking ID', 'User', 'Package', 'Travel Date', 'Travelers', 'Amount', 'Status'];
    const rows = bookings.map((b) => [
      b._id || b.id,
      b.user?.name || b.userName || '',
      b.package?.name || b.packageName || '',
      b.travelDate || b.startDate || '',
      b.travelers || b.guestCount || '',
      b.amount || b.totalAmount || '',
      b.status,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported!');
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-sm text-gray-500">{totalCount} total bookings</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-emerald-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {['confirmed', 'pending', 'completed', 'cancelled'].map((status) => {
          const count = bookings.filter((b) => b.status === status).length;
          const cfg = STATUS_CONFIG[status];
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              className={`p-3 rounded-xl border transition-all text-left ${statusFilter === status ? 'ring-2 ring-[#0B4F6C] border-[#0B4F6C]' : 'bg-white border-gray-100 hover:border-gray-200'} bg-white shadow-sm`}
            >
              <p className="text-xl font-bold text-gray-900">{count}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.classes} mt-1`}>{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, user, package..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-white">
            <option value="all">All Status</option>
            {Object.keys(STATUS_CONFIG).map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
          </select>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Booking ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">User</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Package</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Travel Date</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Amount</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((booking, index) => {
                const bookingId = booking._id || booking.id;
                const userName = booking.user?.name || booking.userName || '—';
                const packageName = booking.package?.name || booking.packageName || '—';
                const travelDate = booking.travelDate || booking.startDate;
                const amount = booking.amount || booking.totalAmount || 0;
                return (
                  <motion.tr key={bookingId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedBooking(booking)}>
                    <td className="px-4 py-3.5"><span className="text-sm font-mono font-semibold text-[#0B4F6C]">{bookingId}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{userName.charAt(0)}</div>
                        <span className="text-sm font-medium text-gray-800">{userName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-sm text-gray-600">{packageName}</span></td>
                    <td className="px-4 py-3.5 hidden lg:table-cell"><span className="text-sm text-gray-600">{travelDate ? new Date(travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span></td>
                    <td className="px-4 py-3.5 text-right"><span className="text-sm font-semibold text-gray-800">₹{Number(amount).toLocaleString('en-IN')}</span></td>
                    <td className="px-4 py-3.5 text-center"><StatusBadge status={booking.status} config={STATUS_CONFIG} /></td>
                    <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setSelectedBooking(booking)} className="p-1.5 text-gray-400 hover:text-[#0B4F6C] hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages} ({totalCount} total)
            </p>
            <div className="flex gap-1">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedBooking._id || selectedBooking.id}</h3>
                  <div className="flex gap-2 mt-1">
                    <StatusBadge status={selectedBooking.status} config={STATUS_CONFIG} />
                    {selectedBooking.paymentStatus && (
                      <StatusBadge status={selectedBooking.paymentStatus} config={PAYMENT_CONFIG} />
                    )}
                  </div>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-5 space-y-6">
                {/* User Info */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Customer Details</h4>
                  <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DetailRow label="Name" value={selectedBooking.user?.name || selectedBooking.userName || '—'} icon={User} />
                    <DetailRow label="Phone" value={selectedBooking.user?.phone || selectedBooking.phone || '—'} icon={Phone} />
                    <DetailRow label="Email" value={selectedBooking.user?.email || selectedBooking.email || '—'} icon={Mail} />
                    <DetailRow label="Travelers" value={selectedBooking.travelers || selectedBooking.guestCount || '—'} icon={User} />
                  </div>
                </div>

                {/* Package Info */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Package Details</h4>
                  <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DetailRow label="Package" value={selectedBooking.package?.name || selectedBooking.packageName || '—'} icon={Package} />
                    <DetailRow label="Destination" value={selectedBooking.destination?.name || selectedBooking.destination || '—'} icon={MapPin} />
                    <DetailRow label="Travel Date" value={selectedBooking.travelDate || selectedBooking.startDate ? new Date(selectedBooking.travelDate || selectedBooking.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'} icon={CalendarDays} />
                    <DetailRow label="Total Amount" value={`₹${Number(selectedBooking.amount || selectedBooking.totalAmount || 0).toLocaleString('en-IN')}`} icon={IndianRupee} />
                  </div>
                </div>

                {/* Actions */}
                {selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'completed' && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.status === 'pending' && (
                        <button onClick={() => updateStatus(selectedBooking._id || selectedBooking.id, 'confirmed')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                          <CheckCircle className="w-4 h-4" /> Confirm
                        </button>
                      )}
                      {(selectedBooking.status === 'confirmed' || selectedBooking.status === 'pending') && (
                        <button onClick={() => updateStatus(selectedBooking._id || selectedBooking.id, 'completed')} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                          <CheckCircle className="w-4 h-4" /> Mark Complete
                        </button>
                      )}
                      <button onClick={() => updateStatus(selectedBooking._id || selectedBooking.id, 'cancelled')} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors">
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBookingManagementPage;
