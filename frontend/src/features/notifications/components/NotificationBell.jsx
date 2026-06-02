/*
 *  FileName:-     NotificationBell.jsx
 *  Description:-  Bell icon with animated unread count badge
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationBell = ({ className = '' }) => {
  const { unreadCount, toggleDropdown } = useNotifications();

  return (
    <button
      onClick={toggleDropdown}
      className={`relative p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      aria-label="Notifications"
    >
      <motion.div
        animate={unreadCount > 0 ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
        transition={{ duration: 0.6, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 5 }}
      >
        <Bell className="w-5 h-5 text-gray-700" />
      </motion.div>

      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-sm"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default NotificationBell;
