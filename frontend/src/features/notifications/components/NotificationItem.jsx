/*
 *  FileName:-     NotificationItem.jsx
 *  Description:-  Individual notification with icon, title, body, time and read/unread state
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { X, CheckCircle, AlertTriangle, Info, Gift, Package, Bell } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const TYPE_ICONS = {
  booking: Package,
  payment: CheckCircle,
  offer: Gift,
  alert: AlertTriangle,
  info: Info,
  system: Bell,
};

const TYPE_COLORS = {
  booking: { bg: 'bg-blue-100', icon: 'text-blue-600' },
  payment: { bg: 'bg-green-100', icon: 'text-green-600' },
  offer: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
  alert: { bg: 'bg-red-100', icon: 'text-red-600' },
  info: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  system: { bg: 'bg-gray-100', icon: 'text-gray-600' },
};

const NotificationItem = ({ notification, onMarkRead, onDelete, compact = false }) => {
  const {
    _id,
    type = 'info',
    title,
    body,
    isRead,
    createdAt,
    actionUrl,
  } = notification || {};

  const Icon = TYPE_ICONS[type] || TYPE_ICONS.info;
  const colors = TYPE_COLORS[type] || TYPE_COLORS.info;

  const timeAgo = createdAt ? dayjs(createdAt).fromNow() : '';

  const handleClick = () => {
    if (!isRead) onMarkRead?.(_id);
    if (actionUrl) window.location.href = actionUrl;
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex gap-3 p-3.5 rounded-xl transition-all cursor-pointer group
        ${isRead
          ? 'bg-white hover:bg-gray-50'
          : 'bg-blue-50/50 hover:bg-blue-50 border-l-2 border-l-[#0B4F6C]'
        }`}
    >
      {/* Icon */}
      <div className={`w-9 h-9 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${colors.icon}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm leading-tight ${isRead ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
            {title}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(_id); }}
            className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-gray-200 text-gray-400 flex-shrink-0 transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        {!compact && body && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{body}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
      </div>

      {/* Unread dot */}
      {!isRead && (
        <div className="absolute top-3.5 right-3 w-2 h-2 rounded-full bg-[#0B4F6C]" />
      )}
    </div>
  );
};

export default NotificationItem;
