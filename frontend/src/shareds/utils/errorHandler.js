/*
 *  FileName:-     errorHandler.js
 *  Description:-  Centralized error handling utilities for API and application errors
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import toast from 'react-hot-toast';

/* ============================================================
   Error message extraction
   ============================================================ */
export const getErrorMessage = (error) => {
  // Axios error with response
  if (error?.response?.data) {
    const { data } = error.response;
    if (typeof data === 'string') return data;
    if (data.message) return data.message;
    if (data.error) return data.error;
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map((e) => e.message || e.msg || e).join(', ');
    }
  }

  // Network error
  if (error?.request && !error?.response) {
    return 'Network error. Please check your internet connection.';
  }

  // Standard error
  if (error?.message) return error.message;

  return 'An unexpected error occurred. Please try again.';
};

/* ============================================================
   HTTP status-specific messages
   ============================================================ */
export const getStatusMessage = (status) => {
  const messages = {
    400: 'Bad request. Please check your input.',
    401: 'Session expired. Please log in again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'This action conflicts with existing data.',
    422: 'Validation failed. Please check your input.',
    429: 'Too many requests. Please slow down.',
    500: 'Server error. Please try again later.',
    502: 'Service unavailable. Please try again later.',
    503: 'Service temporarily down for maintenance.',
  };
  return messages[status] || `Error ${status}: Something went wrong.`;
};

/* ============================================================
   Handle API errors with toast notifications
   ============================================================ */
export const handleApiError = (error, customMessage = null) => {
  const status = error?.response?.status;
  const message = customMessage || (status ? getStatusMessage(status) : getErrorMessage(error));

  toast.error(message);

  if (import.meta.env.DEV) {
    console.error('[API Error]:', error);
  }

  return message;
};

/* ============================================================
   Form validation error formatter
   ============================================================ */
export const formatValidationErrors = (errors) => {
  if (!errors) return {};

  if (Array.isArray(errors)) {
    return errors.reduce((acc, err) => {
      const field = err.field || err.path || err.param;
      if (field) {
        acc[field] = err.message || err.msg;
      }
      return acc;
    }, {});
  }

  if (typeof errors === 'object') {
    return errors;
  }

  return {};
};

/* ============================================================
   Error boundary helper
   ============================================================ */
export const logError = (error, errorInfo = null) => {
  if (import.meta.env.DEV) {
    console.group('[Error Boundary]');
    console.error('Error:', error);
    if (errorInfo) console.error('Error Info:', errorInfo);
    console.groupEnd();
  }

  // In production, send to error tracking service (e.g., Sentry)
  // if (import.meta.env.PROD && window.Sentry) {
  //   window.Sentry.captureException(error, { extra: errorInfo });
  // }
};

export default {
  getErrorMessage,
  getStatusMessage,
  handleApiError,
  formatValidationErrors,
  logError,
};
