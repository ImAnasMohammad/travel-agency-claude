/*
 *  FileName:-     AgentDashboardPage.jsx
 *  Description:-  Agent dashboard with stats, recent bookings, and quick quote generation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, IndianRupee, TrendingUp, Clock, Plus, FileText,
  Target, Award, BarChart2, Bell, ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import AgentBookingCard from '../components/AgentBookingCard';
import AgentQuoteForm from '../components/AgentQuoteForm';
import { motion as m, AnimatePresence } from 'framer-motion';

const agentStats = {
  totalBookings: 234, totalCommission: 185000, pendingBookings: 12,
  thisMonthBookings: 28, thisMonthCommission: 22400, conversionRate: 68,
};

const monthlyCommission = [
  { month: 'Jan', amount: 12000, bookings: 15 },
  { month: 'Feb', amount: 9500, bookings: 12 },
  { month: 'Mar', amount: 18000, bookings: 22 },
  { month: 'Apr', amount: 22400, bookings: 28 },
  { month: 'May', amount: 16000, bookings: 19 },
  { month: 'Jun', amount: 14000, bookings: 17 },
];

const recentBookings = [
  { id: 'COM-001', bookingId: 'BK-001', customer: 'Arjun Sharma', package: 'Golden Triangle Tour', travelDate: '2026-04-20', amount: 45000, commission: 3600, commissionRate: 8, status: 'confirmed', travelers: 4 },
  { id: 'COM-002', bookingId: 'BK-002', customer: 'Priya Patel', package: 'Kerala Backwaters', travelDate: '2026-04-22', amount: 38500, commission: 3080, commissionRate: 8, status: 'pending', travelers: 2 },
  { id: 'COM-003', bookingId: 'BK-003', customer: 'Rahul Gupta', package: 'Goa Beach', travelDate: '2026-04-18', amount: 22000, commission: 1760, commissionRate: 8, status: 'completed', travelers: 6 },
  { id: 'COM-004', bookingId: 'BK-004', customer: 'Ananya Singh', package: 'Manali Trek', travelDate: '2026-04-25', amount: 31000, commission: 2480, commissionRate: 8, status: 'confirmed', travelers: 3 },
];

const CommissionTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-emerald-700 font-bold">₹{payload[0]?.value?.toLocaleString('en-IN')}</p>
        <p className="text-xs text-gray-500">{payload[1]?.value} bookings</p>
      </div>
    );
  }
  return null;
};

const AgentDashboardPage = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Rahul Gupta! Here's your performance overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <button onClick={() => setShowQuoteModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#0B4F6C]/90 transition-colors">
            <Plus className="w-4 h-4" /> New Quote
          </button>
        </div>
      </motion.div>

      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: CalendarCheck, label: 'Total Bookings', value: agentStats.totalBookings, color: 'text-[#0B4F6C]', bg: 'bg-[#0B4F6C]/10' },
            { icon: IndianRupee, label: 'Total Commission', value: `₹${(agentStats.totalCommission / 1000).toFixed(0)}K`, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: Clock, label: 'Pending', value: agentStats.pendingBookings, color: 'text-amber-600', bg: 'bg-amber-100' },
            { icon: TrendingUp, label: 'This Month', value: agentStats.thisMonthBookings, color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: Award, label: 'Month Comm.', value: `₹${(agentStats.thisMonthCommission / 1000).toFixed(0)}K`, color: 'text-purple-600', bg: 'bg-purple-100' },
            { icon: Target, label: 'Conversion', value: `${agentStats.conversionRate}%`, color: 'text-rose-600', bg: 'bg-rose-100' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Commission Chart + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="text-base font-bold text-gray-800">Commission Trend</h3>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +18% vs last month
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyCommission} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CommissionTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2.5} fill="url(#commGrad)" dot={false} activeDot={{ r: 5, fill: '#059669' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Card */}
          <div className="bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] rounded-xl shadow-sm p-5 text-white">
            <h3 className="text-sm font-bold opacity-80 mb-4">Agent Performance</h3>
            <div className="space-y-3">
              {[
                { label: 'Monthly Target', current: 28, target: 35, pct: 80 },
                { label: 'Commission Target', current: 22400, target: 30000, pct: 75, prefix: '₹' },
                { label: 'Conversion Rate', current: 68, target: 75, pct: 91, suffix: '%' },
              ].map(({ label, current, target, pct, prefix = '', suffix = '' }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-80">{label}</span>
                    <span className="font-semibold">{prefix}{typeof current === 'number' && current > 999 ? (current / 1000).toFixed(0) + 'K' : current}{suffix} / {prefix}{typeof target === 'number' && target > 999 ? (target / 1000).toFixed(0) + 'K' : target}{suffix}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} className="h-full bg-white rounded-full" />
                  </div>
                  <p className="text-xs opacity-60 mt-0.5">{pct}% achieved</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-800">Recent Bookings</h3>
            <a href="/agent/bookings" className="text-sm text-[#00B4D8] hover:text-[#0B4F6C] font-medium">View All →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {recentBookings.map((b) => <AgentBookingCard key={b.id} booking={b} />)}
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0B4F6C]" />
                  <h3 className="text-lg font-bold text-gray-900">Generate Quote</h3>
                </div>
                <button onClick={() => setShowQuoteModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
              </div>
              <div className="p-5">
                <AgentQuoteForm onSuccess={() => setShowQuoteModal(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentDashboardPage;
