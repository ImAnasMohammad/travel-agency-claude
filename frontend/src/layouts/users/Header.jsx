/*
 *  FileName:-     Header.jsx
 *  Description:-  WanderLux main navigation header with glass morphism, search, and user menu
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Plane, Search, Heart, Bell, User, Menu, X, ChevronDown,
  LogOut, Settings, BookOpen, MapPin, Package, Home,
  TrendingUp, Star, Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '@/features/auths/slices/authSlice';
import { NAV_LINKS } from '@constants/appConstants';
import useClickOutside from '@hooks/useClickOutside';
import storageService from '@services/storageService';

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Destinations', path: '/destinations', icon: MapPin },
  { label: 'Packages', path: '/packages', icon: Package },
  { label: 'Deals', path: '/deals', icon: TrendingUp },
  { label: 'About', path: '/about', icon: Star },
];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { count: wishlistCount } = useSelector((state) => state.wishlist);
  const { unreadCount: notifCount } = useSelector((state) => state.notifications);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userMenuRef = useClickOutside(() => setUserMenuOpen(false));
  const searchRef = useRef(null);

  // Scroll handler for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Focus search input on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const handleLogout = () => {
    dispatch(logout());
    storageService.clearAuth();
    navigate('/');
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-nav'
            : 'bg-white',
        ].join(' ')}
        style={{ height: '72px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

          {/* ---- Logo ---- */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="WanderLux - Home"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-[#0B4F6C] transition-colors duration-200">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <span className="text-xl font-bold text-black tracking-tight leading-none">
              Wander<span className="text-[#00B4D8]">Lux</span>
            </span>
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  [
                    'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-150',
                    'tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ---- Right Actions ---- */}
          <div className="flex items-center gap-2">

            {/* Search icon (desktop) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search...</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#FF6B35] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label={`Notifications${notifCount > 0 ? ` (${notifCount} unread)` : ''}`}
              >
                <Bell className="w-5 h-5" />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notifCount > 9 ? '9+' : notifCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu / Login */}
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-black truncate max-w-[100px]">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-deep overflow-hidden z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-black truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        {[
                          { icon: User, label: 'My Profile', path: '/profile' },
                          { icon: BookOpen, label: 'My Bookings', path: '/my-bookings' },
                          { icon: Heart, label: 'Wishlist', path: '/wishlist' },
                        ].map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-gray-400" />
                            {item.label}
                          </Link>
                        ))}

                        {/* Admin/Agent links */}
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                          >
                            <Settings className="w-4 h-4 text-gray-400" />
                            Admin Panel
                          </Link>
                        )}
                        {user?.role === 'agent' && (
                          <Link
                            to="/agent/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                          >
                            <Settings className="w-4 h-4 text-gray-400" />
                            Agent Panel
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-gray-600 transition-colors rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          Search Overlay
         ============================================================ */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-6 left-4 right-4 max-w-2xl mx-auto z-[61]"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-deep border border-gray-200">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, packages, deals..."
                    className="flex-1 text-base text-black placeholder-gray-400 outline-none bg-transparent font-normal tracking-tight"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
                      aria-label="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Quick suggestions */}
              <div className="mt-3 bg-white rounded-2xl shadow-deep border border-gray-200 overflow-hidden p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Popular Destinations
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Goa', 'Kerala', 'Manali', 'Rajasthan', 'Maldives', 'Bali', 'Kashmir', 'Andaman'].map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => {
                        navigate(`/search?q=${dest}`);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-sm font-medium rounded-full transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
          Mobile Menu Drawer
         ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-out drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden flex flex-col shadow-deep"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <span className="text-lg font-bold text-black tracking-tight">
                    Wander<span className="text-[#00B4D8]">Lux</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search destinations...
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-4 px-5 py-3.5 text-sm font-medium transition-colors',
                          isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-black',
                        ].join(' ')
                      }
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {link.label}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Bottom: Auth or user actions */}
              <div className="border-t border-gray-100 p-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-1 mb-4">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {getInitials(user?.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      My Bookings
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center px-4 py-3 border-2 border-black text-black text-sm font-semibold rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center px-4 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
