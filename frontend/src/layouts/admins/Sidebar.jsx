/*
 *  FileName:-     Sidebar.jsx
 *  Description:-  Admin sidebar with navigation links, collapse, and beautiful black design
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Plane, LayoutDashboard, Package, MapPin, Calendar, Users,
  UserCheck, Star, BarChart2, Settings, ChevronLeft, ChevronRight,
  LogOut, Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleSidebarCollapse } from '@stores/rootReducer';
import { logout } from '@/features/auths/slices/authSlice';
import storageService from '@services/storageService';

const navItems = [
  {
    section: 'Overview',
    items: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    section: 'Catalogue',
    items: [
      { path: '/admin/packages', label: 'Packages', icon: Package },
      { path: '/admin/destinations', label: 'Destinations', icon: MapPin },
    ],
  },
  {
    section: 'Operations',
    items: [
      { path: '/admin/bookings', label: 'Bookings', icon: Calendar },
      { path: '/admin/reviews', label: 'Reviews', icon: Star },
    ],
  },
  {
    section: 'People',
    items: [
      { path: '/admin/users', label: 'Users', icon: Users },
      { path: '/admin/agents', label: 'Agents', icon: UserCheck },
    ],
  },
  {
    section: 'Analytics',
    items: [
      { path: '/admin/reports', label: 'Reports', icon: BarChart2 },
    ],
  },
  {
    section: 'System',
    items: [
      { path: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const collapsed = sidebarCollapsed;
  const width = collapsed ? '72px' : '260px';

  const handleLogout = () => {
    dispatch(logout());
    storageService.clearAuth();
    window.location.href = '/';
  };

  const getInitials = (name) => {
    if (!name) return 'AD';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside
      className="fixed top-0 left-0 h-full bg-black text-white z-30 flex flex-col transition-all duration-300 ease-in-out"
      style={{ width }}
      aria-label="Admin sidebar"
    >
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 flex-shrink-0">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Link to="/admin/dashboard" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="w-5 h-5 text-black transform -rotate-45" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
                  Wander<span className="text-[#00B4D8]">Lux</span>
                  <span className="text-xs text-gray-500 font-normal block -mt-0.5">Admin</span>
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <Link to="/admin/dashboard" className="mx-auto">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-black transform -rotate-45" />
            </div>
          </Link>
        )}

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => dispatch(toggleSidebarCollapse())}
          className={`p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ${
            collapsed ? 'hidden' : ''
          }`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Collapsed expand button */}
      {collapsed && (
        <button
          type="button"
          onClick={() => dispatch(toggleSidebarCollapse())}
          className="mx-auto mt-2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* ---- Navigation ---- */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2">
        {navItems.map((section) => (
          <div key={section.section} className="mb-1">
            {/* Section label */}
            {!collapsed && (
              <p className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {section.section}
              </p>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group my-0.5',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                      isActive
                        ? 'bg-white text-black font-semibold'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          isActive ? 'text-black' : 'text-gray-400 group-hover:text-white group-hover:scale-110'
                        }`}
                      />
                      {!collapsed && (
                        <span className="text-sm whitespace-nowrap truncate">
                          {item.label}
                        </span>
                      )}
                      {/* Active dot indicator when collapsed */}
                      {collapsed && isActive && (
                        <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

            {!collapsed && section.section !== 'System' && (
              <div className="my-2 border-t border-white/5" />
            )}
          </div>
        ))}
      </nav>

      {/* ---- User info + Logout ---- */}
      <div className="border-t border-white/10 p-3 flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
            <div className="w-8 h-8 bg-[#0B4F6C] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-0 group-hover:opacity-100"
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

export default Sidebar;
