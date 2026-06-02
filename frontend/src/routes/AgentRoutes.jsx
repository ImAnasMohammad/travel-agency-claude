/*
 *  FileName:-     AgentRoutes.jsx
 *  Description:-  Route guard for agent-only access
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * AgentRoute - Guards agent panel routes
 * Allows both 'agent' and 'admin' roles (admin can access agent panel)
 */
function AgentRoute({ children }) {
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

  if (!['agent', 'admin'].includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default AgentRoute;
