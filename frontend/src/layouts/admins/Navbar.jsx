/*
 *  FileName:-     Navbar.jsx
 *  Description:-  Admin top navbar with breadcrumb, notifications, and user profile
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, Menu, ChevronRight, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleSidebarCollapse } from '@stores/rootReducer';
import { markAllNotificationsRead } from '@/features/notifications/slices/notificationSlice';
import useClickOutside from '@hooks/useClickOutside';
import { formatRelativeTime } from '@utils/formatter';

/* ---- Breadcrumb path map ---- */
const pathLabels = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  packages: 'Packages',
  destinations: 'Destinations',
  bookings: 'Bookings',
  users: 'Users',
  agents: 'Agents',
  reviews: 'Reviews',
  reports: 'Reports',
  settings: 'Settings',
};

function AdminNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const { items: notifications, unreadCount } = useSelector((state) => state.notifications);

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useClickOutside(() => setNotifOpen(false));

  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  // Build breadcrumb from path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, i) => ({
    label: pathLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    path: '/' + pathSegments.slice(0, i + 1).join('/'),
    isLast: i === pathSegments.length - 1,
  }));

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      <div className="flex-1 flex items-center justify-between px-4 lg:px-6">

        {/* Left: Collapse toggle + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleSidebarCollapse())}
            className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex">
            <ol className="flex items-center gap-1" role="list">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
                  {crumb.isLast ? (
                    <span className="text-sm font-semibold text-black capitalize">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="text-sm text-gray-500 hover:text-black transition-colors capitalize"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* View site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-full hover:border-gray-400 hover:text-black transition-colors"
          >
            View Site
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              className="relative p-2 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
              aria-expanded={notifOpen}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-deep overflow-hidden z-50"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-black">
                      Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </p>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={() => dispatch(markAllNotificationsRead())}
                        className="text-xs text-gray-500 hover:text-black transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* List */}
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">
                        No notifications
                      </p>
                    ) : (
                      notifications.slice(0, 10).map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            !notif.read ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!notif.read ? 'bg-black' : 'bg-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-black font-medium leading-snug">
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatRelativeTime(notif.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="w-full text-xs text-center text-gray-500 py-1.5 hover:text-black transition-colors"
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 ml-1">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-black leading-none">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role || 'admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
