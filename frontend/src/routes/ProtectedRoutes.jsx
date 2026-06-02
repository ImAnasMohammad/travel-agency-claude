/*
 *  FileName:-     ProtectedRoutes.jsx
 *  Description:-  Route guard component for authenticated users with role-based access
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute - Guards routes behind authentication
 * @param {string[]} allowedRoles - Roles permitted to access this route
 * @param {React.ReactNode} children - Optional children (for wrapper usage)
 */
function ProtectedRoute({ allowedRoles = [], children }) {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Role check if roles are specified
  if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children (wrapper usage) or Outlet (nested route usage)
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
