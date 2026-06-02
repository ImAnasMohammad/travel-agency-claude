/*
 *  FileName:-     UserLayout.jsx
 *  Description:-  Main user-facing layout with Header, Footer, and mobile nav
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNavBar from './MobileNavBar';

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top navigation */}
      <Header />

      {/* Main content - offset by header height */}
      <main
        className="flex-1 w-full"
        style={{ paddingTop: '72px', paddingBottom: '0' }}
        id="main-content"
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile bottom navigation - visible on < md only */}
      <MobileNavBar />
    </div>
  );
}

export default UserLayout;
