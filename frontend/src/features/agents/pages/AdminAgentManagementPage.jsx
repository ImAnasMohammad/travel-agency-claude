/*
 *  FileName:-     AdminAgentManagementPage.jsx
 *  Description:-  Admin agent management page with list, status, and commission overview
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, CheckCircle, XCircle, Clock, Star, TrendingUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetAllAgentsQuery, useUpdateAgentStatusMutation } from '../apis/agentApi';

const STATUS_BADGE = {
  active: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  inactive: { label: 'Inactive', classes: 'bg-red-100 text-red-700', icon: XCircle },
  suspended: { label: 'Suspended', classes: 'bg-amber-100 text-amber-700', icon: Clock },
};

const AdminAgentManagementPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetAllAgentsQuery({ page, limit: 20, status: statusFilter, search });
  const [updateAgentStatus] = useUpdateAgentStatusMutation();

  const agents = data?.data || data || [];
  const pagination = data?.pagination || {};

  const handleStatusChange = async (agentId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateAgentStatus({ id: agentId, status: newStatus }).unwrap();
      toast.success(`Agent ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch {
      toast.error('Failed to update agent status');
    }
  };

  const handleActivate = async (agentId) => {
    try {
      await updateAgentStatus({ id: agentId, status: 'active' }).unwrap();
      toast.success('Agent activated');
    } catch {
      toast.error('Failed to activate agent');
    }
  };

  const stats = {
    total: pagination.total || agents.length,
    active: agents.filter((a) => a.status === 'active').length,
    suspended: agents.filter((a) => a.status === 'suspended').length,
    totalCommission: agents.reduce((s, a) => s + (a.totalCommissionEarned || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0B4F6C] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load agents. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
          <p className="text-sm text-gray-500">{stats.total} registered agents</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Agents', value: stats.total, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Suspended', value: stats.suspended, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Total Commission', value: `₹${stats.totalCommission.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.color.split(' ')[1]}`}>
              <stat.icon className={`w-4 h-4 ${stat.color.split(' ')[0]}`} />
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, code..."
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Agent</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agency</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Bookings</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Commission</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Rating</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {agents.map((agent, i) => {
                const statusKey = agent.status in STATUS_BADGE ? agent.status : 'inactive';
                const statusCfg = STATUS_BADGE[statusKey];
                return (
                  <motion.tr key={agent._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {agent.agencyName?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{agent.agencyName}</p>
                          <p className="text-xs text-gray-400 font-mono">{agent.agencyCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <p className="text-sm text-gray-600">{agent.user?.email || '—'}</p>
                    </td>
                    <td className="px-4 py-3.5 text-center"><span className="text-sm font-semibold text-gray-800">{agent.bookingsCount || 0}</span></td>
                    <td className="px-4 py-3.5 text-right hidden md:table-cell"><span className="text-sm font-semibold text-gray-800">₹{(agent.totalCommissionEarned || 0).toLocaleString('en-IN')}</span></td>
                    <td className="px-4 py-3.5 text-center hidden lg:table-cell">
                      {agent.rating > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-semibold text-gray-800">{agent.rating}</span>
                        </div>
                      ) : <span className="text-xs text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusCfg.classes}`}>
                        <statusCfg.icon className="w-3 h-3" />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {agent.status === 'suspended' ? (
                        <button onClick={() => handleActivate(agent._id)} className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(agent._id, agent.status)}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${agent.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                        >
                          {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {agents.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-light">No agents found</p>
          </div>
        )}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Page {pagination.page} of {pagination.totalPages}</p>
            <div className="flex gap-2">
              <button disabled={!pagination.hasPrevPage} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <button disabled={!pagination.hasNextPage} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAgentManagementPage;
