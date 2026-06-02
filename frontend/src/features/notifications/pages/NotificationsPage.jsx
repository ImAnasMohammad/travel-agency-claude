/*
 *  FileName:-     NotificationsPage.jsx
 *  Description:-  Full notifications page with filter tabs and mark-all-read
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Loader2 } from 'lucide-react';
import NotificationItem from '../components/NotificationItem';
import { useNotifications } from '../hooks/useNotifications';

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'booking', label: 'Bookings' },
  { key: 'payment', label: 'Payments' },
  { key: 'offer', label: 'Offers' },
];

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    handleMarkRead,
    handleMarkAllRead,
    handleDelete,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.isRead;
    return n.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-3xl font-black">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-gray-400 text-sm mt-0.5">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm mb-6 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                ${activeTab === tab.key
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab.label}
              {tab.key === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-3" />
            <p className="text-gray-500">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Bell className="w-16 h-16 text-gray-200 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {activeTab === 'unread' ? 'All caught up!' : 'No notifications'}
            </h3>
            <p className="text-gray-500 text-sm">
              {activeTab === 'unread' ? "You're all up to date." : "We'll notify you about important updates."}
            </p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((n, i) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, padding: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-100 last:border-0"
                >
                  <NotificationItem
                    notification={n}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
