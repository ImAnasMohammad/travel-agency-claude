/*
 *  FileName:-     NotificationDropdown.jsx
 *  Description:-  Dropdown panel with recent notifications list and mark-all-read
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../hooks/useNotifications';

const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    isDropdownOpen,
    isLoading,
    handleMarkRead,
    handleMarkAllRead,
    handleDelete,
    closeDropdown,
  } = useNotifications();

  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeDropdown();
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDropdownOpen, closeDropdown]);

  const recentNotifications = notifications.slice(0, 8);

  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-700" />
              <h3 className="font-bold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-xs text-[#0B4F6C] hover:text-[#00B4D8] font-medium transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Body */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : recentNotifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell className="w-10 h-10 text-gray-200 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm text-gray-500">No notifications yet</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {recentNotifications.map((n) => (
                  <NotificationItem
                    key={n._id}
                    notification={n}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                    compact
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-100 p-3">
              <Link
                to="/notifications"
                onClick={closeDropdown}
                className="block w-full text-center text-sm font-medium text-gray-600 hover:text-gray-900 py-1 transition-colors"
              >
                View all notifications
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
