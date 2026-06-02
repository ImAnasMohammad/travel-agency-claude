/*
 *  FileName:-     UserApp.jsx
 *  Description:-  User application wrapper with user-specific context and providers
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auths/slices/authSlice';
import { setWishlistPackages } from '@/features/wishlists/slices/wishlistSlice';
import storageService from '@services/storageService';

/**
 * UserApp - Initializes user session from persisted storage on mount
 * Wraps user-facing pages
 */
function UserApp() {
  const dispatch = useDispatch();

  // Restore auth state from localStorage on app init
  useEffect(() => {
    const token = storageService.getToken();
    const user = storageService.getUser();

    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }

    // Restore wishlist
    const savedWishlist = storageService.getWishlist();
    if (savedWishlist?.length > 0) {
      dispatch(setWishlistPackages(savedWishlist));
    }
  }, [dispatch]);

  return <Outlet />;
}

export default UserApp;
