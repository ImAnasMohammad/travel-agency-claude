/*
 *  FileName:-     AdminRoutes.jsx
 *  Description:-  Route guard for admin-only access
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * AdminRoute - Guards admin panel routes
 * Redirects unauthenticated users to login, non-admins to unauthorized
 */
function AdminRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default AdminRoute;
