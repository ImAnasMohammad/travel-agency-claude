/*
 *  FileName:-     App.jsx
 *  Description:-  Root application component that renders the route configuration
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import AppRoutes from '@routes/AppRoutes';
import ErrorBoundary from '@components/ErrorBoundary';
import ScrollToTop from '@components/ScrollToTop';

function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
