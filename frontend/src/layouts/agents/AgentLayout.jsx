/*
 *  FileName:-     AgentLayout.jsx
 *  Description:-  Agent panel layout with sidebar and content area
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgentSidebar from './AgentSidebar';

function AgentLayout() {
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const sidebarWidth = sidebarCollapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Agent Sidebar */}
      <AgentSidebar />

      {/* Main content */}
      <div
        className="transition-all duration-300 ease-in-out min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Simple top bar */}
        <header
          className="fixed top-0 right-0 h-14 bg-white border-b border-gray-200 z-20 flex items-center px-6"
          style={{ left: sidebarWidth, transition: 'left 0.3s ease-in-out' }}
        >
          <h1 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
            Agent Portal
          </h1>
        </header>

        <main className="pt-14 p-4 lg:p-6" id="agent-main-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default AgentLayout;
