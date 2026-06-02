/*
 *  FileName:-     AgentCommissionsPage.jsx
 *  Description:-  Agent commission breakdown table with payout status and summary
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Clock, CheckCircle, Download } from 'lucide-react';
import AgentCommissionRow from '../components/AgentCommissionRow';
import toast from 'react-hot-toast';
import { useGetAgentCommissionsQuery } from '../apis/agentApi';

const AgentCommissionsPage = () => {
  const [filter, setFilter] = useState('all');

  const { data, isLoading, isError } = useGetAgentCommissionsQuery();

  const toArray = (val) => (Array.isArray(val) ? val : []);
  const commissions = toArray(data?.commissions ?? data?.data ?? data);

  const filtered = commissions.filter((c) => filter === 'all' || c.payoutStatus === filter);

  const totalEarned = commissions.reduce((s, c) => s + (c.commissionAmount || 0), 0);
  const totalPaid = commissions.filter((c) => c.payoutStatus === 'paid').reduce((s, c) => s + (c.commissionAmount || 0), 0);
  const totalPending = commissions.filter((c) => c.payoutStatus === 'pending').reduce((s, c) => s + (c.commissionAmount || 0), 0);

  const exportCSV = () => {
    const headers = ['Commission ID', 'Booking ID', 'Customer', 'Package', 'Booking Amount', 'Commission', 'Rate', 'Status', 'Earned Date'];
    const rows = filtered.map((c) => [
      c._id || c.id,
      c.bookingId || c.booking?._id || '',
      c.user?.name || c.customer || '',
      c.package?.name || c.packageName || c.package || '',
      c.bookingAmount || '',
      c.commissionAmount || '',
      `${c.commissionRate || 0}%`,
      c.payoutStatus,
      c.earnedDate || c.createdAt || '',
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'commissions.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0B4F6C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading commissions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-red-500">Failed to load commissions. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Commissions</h1>
          <p className="text-sm text-gray-500">{commissions.length} commission entries</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-emerald-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { icon: TrendingUp, label: 'Total Earned', value: `₹${totalEarned.toLocaleString('en-IN')}`, color: 'text-[#0B4F6C]', bg: 'bg-[#0B4F6C]/10', gradient: 'from-[#0B4F6C] to-[#00B4D8]', featured: true },
          { icon: CheckCircle, label: 'Total Paid Out', value: `₹${totalPaid.toLocaleString('en-IN')}`, color: 'text-emerald-700', bg: 'bg-emerald-100' },
          { icon: Clock, label: 'Pending Payout', value: `₹${totalPending.toLocaleString('en-IN')}`, color: 'text-amber-700', bg: 'bg-amber-100' },
        ].map(({ icon: Icon, label, value, color, bg, gradient, featured }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl p-5 shadow-sm border ${featured ? `bg-gradient-to-br ${gradient} border-transparent` : `bg-white border-gray-100`}`}>
            <div className={`w-10 h-10 ${featured ? 'bg-white/20' : bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${featured ? 'text-white' : color}`} />
            </div>
            <p className={`text-2xl font-black ${featured ? 'text-white' : color}`}>{value}</p>
            <p className={`text-sm mt-0.5 ${featured ? 'text-white/70' : 'text-gray-500'}`}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex gap-1.5 flex-wrap">
          {[
            { value: 'all', label: 'All', count: commissions.length },
            { value: 'paid', label: 'Paid', count: commissions.filter((c) => c.payoutStatus === 'paid').length },
            { value: 'pending', label: 'Pending', count: commissions.filter((c) => c.payoutStatus === 'pending').length },
            { value: 'failed', label: 'Failed', count: commissions.filter((c) => c.payoutStatus === 'failed').length },
          ].map(({ value, label, count }) => (
            <button key={value} onClick={() => setFilter(value)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${filter === value ? 'bg-[#0B4F6C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {label}
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${filter === value ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Commission ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Customer / Package</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Booking</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Commission</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Earned</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Payout</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => <AgentCommissionRow key={c._id || c.id} commission={c} />)}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-sm">No commissions found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCommissionsPage;
