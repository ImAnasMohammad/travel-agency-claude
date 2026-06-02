/*
 *  FileName:-     Toast.jsx
 *  Description:-  Custom toast wrapper functions using react-hot-toast
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';

/* ============================================================
   Toast helper functions
   ============================================================ */

const toastStyle = {
  background: '#000000',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: '-0.01em',
  borderRadius: '10px',
  padding: '12px 16px',
  maxWidth: '380px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
};

export const showToast = {
  success: (message, options = {}) =>
    toast.success(message, {
      style: toastStyle,
      iconTheme: { primary: '#00B4D8', secondary: '#000' },
      duration: 4000,
      ...options,
    }),

  error: (message, options = {}) =>
    toast.error(message, {
      style: toastStyle,
      iconTheme: { primary: '#FF6B35', secondary: '#000' },
      duration: 5000,
      ...options,
    }),

  loading: (message, options = {}) =>
    toast.loading(message, {
      style: toastStyle,
      iconTheme: { primary: '#FFD166', secondary: '#000' },
      ...options,
    }),

  info: (message, options = {}) =>
    toast(message, {
      style: { ...toastStyle, background: '#0B4F6C' },
      icon: '💡',
      duration: 4000,
      ...options,
    }),

  warning: (message, options = {}) =>
    toast(message, {
      style: { ...toastStyle, background: '#1a1a1a' },
      icon: '⚠️',
      duration: 5000,
      ...options,
    }),

  custom: (message, options = {}) =>
    toast(message, {
      style: toastStyle,
      duration: 4000,
      ...options,
    }),

  promise: (promise, messages, options = {}) =>
    toast.promise(
      promise,
      {
        loading: messages.loading || 'Processing...',
        success: messages.success || 'Done!',
        error: messages.error || 'Something went wrong',
      },
      {
        style: toastStyle,
        iconTheme: { primary: '#00B4D8', secondary: '#000' },
        ...options,
      }
    ),

  dismiss: (id) => toast.dismiss(id),
  dismissAll: () => toast.dismiss(),
};

/* ============================================================
   Custom Toast Component (for advanced use)
   ============================================================ */
export function CustomToast({ t, type = 'info', title, message }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#00B4D8]" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF6B35]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#FFD166]" />,
    info: <Info className="w-5 h-5 text-white/70" />,
    loading: <Loader2 className="w-5 h-5 text-white/70 animate-spin" />,
  };

  return (
    <div
      className={`flex items-start gap-3 bg-black text-white rounded-xl px-4 py-3 shadow-deep max-w-sm
        ${t.visible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type] || icons.info}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold leading-snug">{title}</p>}
        {message && (
          <p className={`text-sm text-white/70 ${title ? 'mt-0.5' : ''}`}>{message}</p>
        )}
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export default showToast;
