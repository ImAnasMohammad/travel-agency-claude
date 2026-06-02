/*
 *  FileName:-     useNotifications.js
 *  Description:-  Custom hook for notification management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  setDropdownOpen,
  selectNotifications,
  selectUnreadCount,
  selectDropdownOpen,
} from '../slices/notificationSlice';
import {
  useGetNotificationsQuery,
  useMarkReadMutation,
  useMarkAllReadMutation,
  useDeleteNotificationMutation,
} from '../apis/notificationApi';

export const useNotifications = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const isDropdownOpen = useSelector(selectDropdownOpen);

  const {
    data,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({}, { pollingInterval: 30000 });

  const [markRead] = useMarkReadMutation();
  const [markAllRead] = useMarkAllReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      dispatch(setNotifications(data.data));
    }
  }, [data, dispatch]);

  const handleMarkRead = useCallback(async (id) => {
    dispatch(markNotificationRead(id));
    try {
      await markRead(id).unwrap();
    } catch {
      // Optimistic update already applied
    }
  }, [dispatch, markRead]);

  const handleMarkAllRead = useCallback(async () => {
    dispatch(markAllNotificationsRead());
    try {
      await markAllRead().unwrap();
    } catch {
      refetch();
    }
  }, [dispatch, markAllRead, refetch]);

  const handleDelete = useCallback(async (id) => {
    dispatch(removeNotification(id));
    try {
      await deleteNotification(id).unwrap();
    } catch {
      refetch();
    }
  }, [dispatch, deleteNotification, refetch]);

  const toggleDropdown = useCallback(() => {
    dispatch(setDropdownOpen(!isDropdownOpen));
  }, [dispatch, isDropdownOpen]);

  const closeDropdown = useCallback(() => {
    dispatch(setDropdownOpen(false));
  }, [dispatch]);

  return {
    notifications,
    unreadCount,
    isDropdownOpen,
    isLoading,
    handleMarkRead,
    handleMarkAllRead,
    handleDelete,
    toggleDropdown,
    closeDropdown,
    refetch,
  };
};
