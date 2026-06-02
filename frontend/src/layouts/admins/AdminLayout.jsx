/*
 *  FileName:-     AdminLayout.jsx
 *  Description:-  Admin panel layout with collapsible sidebar and sticky navbar
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import AdminNavbar from './Navbar';

function AdminLayout() {
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area - offset by sidebar */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Top navbar */}
        <AdminNavbar />

        {/* Page content - offset by navbar height */}
        <main
          className="min-h-screen pt-16"
          id="admin-main-content"
        >
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;
