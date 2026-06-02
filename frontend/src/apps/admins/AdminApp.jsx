/*
 *  FileName:-     AdminApp.jsx
 *  Description:-  Admin application wrapper with auth initialization and admin-specific setup
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/features/auths/slices/authSlice';
import { setNotifications } from '@/features/notifications/slices/notificationSlice';
import storageService from '@services/storageService';

/**
 * AdminApp - Initializes admin session and verifies role on mount
 */
function AdminApp() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Restore auth state from storage on mount
  useEffect(() => {
    if (!isAuthenticated) {
      const token = storageService.getToken();
      const savedUser = storageService.getUser();

      if (token && savedUser) {
        dispatch(setCredentials({ user: savedUser, token }));
      }
    }
  }, [dispatch, isAuthenticated]);

  // Load mock notifications on mount (replace with API call)
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      // In a real app, fetch from API
      dispatch(setNotifications([]));
    }
  }, [dispatch, isAuthenticated, user]);

  // Guard: redirect if not admin
  if (isAuthenticated && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default AdminApp;
