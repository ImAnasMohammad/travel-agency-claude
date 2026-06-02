/*
 *  FileName:-     notificationSlice.js
 *  Description:-  Redux slice for notification state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
  isDropdownOpen: false,
  isLoading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find((n) => n._id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach((n) => { n.isRead = true; });
      state.unreadCount = 0;
    },
    removeNotification: (state, action) => {
      const removed = state.notifications.find((n) => n._id === action.payload);
      state.notifications = state.notifications.filter((n) => n._id !== action.payload);
      if (removed && !removed.isRead) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    setDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  addNotification,
  setDropdownOpen,
  setLoading,
} = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectDropdownOpen = (state) => state.notifications.isDropdownOpen;
export const selectNotificationLoading = (state) => state.notifications.isLoading;
