/*
 *  FileName:-     AgentSidebar.jsx
 *  Description:-  Agent panel sidebar with navigation and user profile
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Plane, LayoutDashboard, Calendar, Package, Users2, DollarSign,
  ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleSidebarCollapse } from '@stores/rootReducer';
import { logout } from '@/features/auths/slices/authSlice';
import storageService from '@services/storageService';

const navItems = [
  { path: '/agent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/agent/bookings', label: 'Bookings', icon: Calendar },
  { path: '/agent/packages', label: 'Packages', icon: Package },
  { path: '/agent/clients', label: 'Clients', icon: Users2 },
  { path: '/agent/commissions', label: 'Commissions', icon: DollarSign },
];

function AgentSidebar() {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const collapsed = sidebarCollapsed;
  const width = collapsed ? '72px' : '240px';

  const handleLogout = () => {
    dispatch(logout());
    storageService.clearAuth();
    window.location.href = '/';
  };

  const getInitials = (name) => {
    if (!name) return 'AG';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside
      className="fixed top-0 left-0 h-full bg-black text-white z-30 flex flex-col transition-all duration-300"
      style={{ width }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 flex-shrink-0">
        {!collapsed ? (
          <>
            <Link to="/agent/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-black transform -rotate-45" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Wander<span className="text-[#00B4D8]">Lux</span>
                <span className="text-[10px] text-gray-500 font-normal block -mt-0.5">Agent</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => dispatch(toggleSidebarCollapse())}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-2">
            <Link to="/agent/dashboard">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-black transform -rotate-45" />
              </div>
            </Link>
            <button
              type="button"
              onClick={() => dispatch(toggleSidebarCollapse())}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group',
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-black' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  {!collapsed && (
                    <span className="text-sm whitespace-nowrap">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-white/10 p-3 flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 group">
            <div className="w-8 h-8 bg-[#00B4D8] rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Agent'}</p>
              <p className="text-xs text-gray-500 truncate">Agent</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
}

export default AgentSidebar;
