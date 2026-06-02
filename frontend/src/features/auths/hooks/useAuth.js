/*
 *  FileName:-     useAuth.js
 *  Description:-  Custom hook for authentication state, login, logout, and role-based checks
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import {
  selectUser,
  selectIsAuthenticated,
  selectToken,
  selectIsLoading,
  setCredentials,
  logout as logoutAction,
  setLoading,
} from '../slices/authSlice';
import { useLoginMutation, useLogoutMutation } from '../apis/authApi';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = useCallback(async (credentials) => {
    dispatch(setLoading(true));
    try {
      const result = await loginMutation(credentials).unwrap();
      const { user: loggedInUser, accessToken, refreshToken } = result.data;
      dispatch(setCredentials({
        user: loggedInUser,
        token: accessToken,
        refreshToken,
      }));
      toast.success(`Welcome back, ${loggedInUser.firstName}!`);

      // Redirect to the page they were trying to access, or role-based default
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (loggedInUser.role === 'agent') {
        navigate('/agent/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
      return result;
    } catch (error) {
      const message = error?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, loginMutation, navigate]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Silently fail on server logout
    } finally {
      dispatch(logoutAction());
      authService.clearSession();
      toast.success('Logged out successfully');
      navigate('/auth/login');
    }
  }, [dispatch, logoutMutation, navigate]);

  // Role checks
  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';
  const isCustomer = user?.role === 'customer';
  const hasRole = (role) => user?.role === role;
  const hasAnyRole = (roles) => roles.includes(user?.role);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isAdmin,
    isAgent,
    isCustomer,
    hasRole,
    hasAnyRole,
    login,
    logout,
  };
};

export default useAuth;
