/*
 *  FileName:-     AdminUserManagementPage.jsx
 *  Description:-  Admin user management with table, role management, block/unblock, and promote actions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Shield, UserCheck, UserX, Eye, Users,
  ChevronLeft, ChevronRight, X, Crown, Phone, Mail, CalendarDays, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetAllUsersQuery, useUpdateUserBlockMutation, useUpdateUserRoleMutation } from '../apis/userApi';

const ROLE_CONFIG = {
  admin: { label: 'Admin', classes: 'bg-purple-100 text-purple-700', icon: Crown },
  agent: { label: 'Agent', classes: 'bg-blue-100 text-blue-700', icon: Shield },
  vendor: { label: 'Vendor', classes: 'bg-orange-100 text-orange-700', icon: Shield },
  user: { label: 'User', classes: 'bg-gray-100 text-gray-600', icon: UserCheck },
};

const STATUS_CONFIG = {
  active: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700' },
  blocked: { label: 'Blocked', classes: 'bg-red-100 text-red-700' },
};

const ROLES = ['all', 'user', 'agent', 'vendor', 'admin'];

const UserDetailModal = ({ user, onClose, onToggleBlock, onPromote, isUpdating }) => {
  const role = user.authId?.role || user.role || 'user';
  const isActive = user.authId?.isActive !== false;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-2xl font-bold">
              {user.firstName?.charAt(0) || '?'}
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{user.firstName} {user.lastName}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ROLE_CONFIG[role]?.classes}`}>{ROLE_CONFIG[role]?.label}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isActive ? STATUS_CONFIG.active.classes : STATUS_CONFIG.blocked.classes}`}>{isActive ? 'Active' : 'Blocked'}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            {[
              { icon: Mail, label: 'Email', value: user.authId?.email || '—' },
              { icon: Phone, label: 'Phone', value: user.phone || '—' },
              { icon: CalendarDays, label: 'Joined', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
              { icon: Users, label: 'Bookings', value: `${user.totalBookings || 0} bookings made` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="text-sm font-medium text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {role === 'user' && (
              <button disabled={isUpdating} onClick={() => onPromote(user.authId?._id || user._id)} className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                <Crown className="w-4 h-4" /> Promote to Agent
              </button>
            )}
            <button disabled={isUpdating} onClick={() => onToggleBlock(user.authId?._id || user._id, isActive)} className={`w-full py-2.5 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
              {isActive ? <><UserX className="w-4 h-4" /> Block User</> : <><UserCheck className="w-4 h-4" /> Unblock User</>}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminUserManagementPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, isError } = useGetAllUsersQuery({ page: currentPage, limit: perPage, role: roleFilter, search });
  const [updateUserBlock, { isLoading: isBlocking }] = useUpdateUserBlockMutation();
  const [updateUserRole, { isLoading: isRoleUpdating }] = useUpdateUserRoleMutation();

  const isUpdating = isBlocking || isRoleUpdating;
  const users = data?.data || [];
  const pagination = data?.pagination || {};

  const roleStats = useMemo(() => {
    return ROLES.filter((r) => r !== 'all').map((role) => ({
      role,
      count: users.filter((u) => (u.authId?.role || u.role) === role).length,
    }));
  }, [users]);

  const toggleBlock = async (authId, currentlyActive) => {
    try {
      await updateUserBlock({ id: authId, isBlocked: currentlyActive }).unwrap();
      toast.success(`User ${currentlyActive ? 'blocked' : 'unblocked'}`);
      setSelectedUser(null);
    } catch {
      toast.error('Failed to update user status');
    }
  };

  const promoteToAgent = async (authId) => {
    try {
      await updateUserRole({ id: authId, role: 'agent' }).unwrap();
      toast.success('User promoted to Agent');
      setSelectedUser(null);
    } catch {
      toast.error('Failed to promote user');
    }
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
        <p className="text-red-500">Failed to load users. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">{pagination.total || users.length} registered users</p>
        </div>
      </div>

      {/* Role Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {roleStats.map(({ role, count }) => {
          const cfg = ROLE_CONFIG[role];
          return (
            <div key={role} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-xl font-bold text-gray-900">{count}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${cfg.classes}`}>{cfg.label}s</span>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]"
            />
          </div>
          <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-white">
            {ROLES.map((r) => <option key={r} value={r}>{r === 'all' ? 'All Roles' : ROLE_CONFIG[r]?.label}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">User</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Contact</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Role</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Bookings</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Joined</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, index) => {
                const role = user.authId?.role || user.role || 'user';
                const isActive = user.authId?.isActive !== false;
                return (
                  <motion.tr key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{user.firstName?.charAt(0) || '?'}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-500 hidden sm:block">{user.authId?.email || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <p className="text-xs text-gray-600">{user.authId?.email || '—'}</p>
                      <p className="text-xs text-gray-500">{user.phone || '—'}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${ROLE_CONFIG[role]?.classes}`}>{ROLE_CONFIG[role]?.label}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${isActive ? STATUS_CONFIG.active.classes : STATUS_CONFIG.blocked.classes}`}>{isActive ? 'Active' : 'Blocked'}</span>
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <span className="text-sm font-medium text-gray-700">{user.totalBookings || 0}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setSelectedUser(user)} className="p-1.5 text-gray-400 hover:text-[#0B4F6C] hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => toggleBlock(user.authId?._id || user._id, isActive)} disabled={isUpdating} className={`p-1.5 rounded-lg transition-colors disabled:opacity-40 ${isActive ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'}`}>
                          {isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-light">No users found</p>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Page {pagination.page} of {pagination.totalPages} · {pagination.total} users</p>
            <div className="flex gap-1">
              <button disabled={!pagination.hasPrevPage} onClick={() => setCurrentPage((p) => p - 1)} className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled={!pagination.hasNextPage} onClick={() => setCurrentPage((p) => p + 1)} className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onToggleBlock={toggleBlock}
            onPromote={promoteToAgent}
            isUpdating={isUpdating}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUserManagementPage;
