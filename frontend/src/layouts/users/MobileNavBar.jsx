/*
 *  FileName:-     MobileNavBar.jsx
 *  Description:-  Fixed bottom mobile navigation bar with 5 tabs and active indicators
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, MapPin, Package, Heart, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: Home, end: true },
  { path: '/destinations', label: 'Explore', icon: MapPin },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/wishlist', label: 'Wishlist', icon: Heart },
  { path: '/profile', label: 'Profile', icon: User },
];

function MobileNavBar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { count: wishlistCount } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  const getItemPath = (item) => {
    if (item.path === '/profile' && !isAuthenticated) return '/auth/login';
    return item.path;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 safe-bottom"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const path = getItemPath(item);
          const showBadge = item.label === 'Wishlist' && wishlistCount > 0;

          return (
            <NavLink
              key={item.path}
              to={path}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px]',
                  'transition-colors duration-150 relative',
                  'focus-visible:outline-none focus-visible:bg-gray-100',
                  isActive ? 'text-black' : 'text-gray-400',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-black rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Icon with badge */}
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-all duration-150 ${
                        isActive ? 'scale-110' : ''
                      }`}
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                    {showBadge && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-0.5 bg-[#FF6B35] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] font-medium leading-none ${
                      isActive ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNavBar;
