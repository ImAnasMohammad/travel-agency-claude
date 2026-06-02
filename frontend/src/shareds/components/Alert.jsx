/*
 *  FileName:-     Alert.jsx
 *  Description:-  Alert / notification banner component with multiple variants
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  success: {
    container: 'bg-green-50 border-green-200',
    icon: CheckCircle,
    iconClass: 'text-green-600',
    titleClass: 'text-green-900',
    textClass: 'text-green-700',
    closeClass: 'text-green-500 hover:text-green-700 hover:bg-green-100',
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: AlertCircle,
    iconClass: 'text-red-600',
    titleClass: 'text-red-900',
    textClass: 'text-red-700',
    closeClass: 'text-red-400 hover:text-red-600 hover:bg-red-100',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: AlertTriangle,
    iconClass: 'text-yellow-600',
    titleClass: 'text-yellow-900',
    textClass: 'text-yellow-700',
    closeClass: 'text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100',
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: Info,
    iconClass: 'text-blue-600',
    titleClass: 'text-blue-900',
    textClass: 'text-blue-700',
    closeClass: 'text-blue-400 hover:text-blue-600 hover:bg-blue-100',
  },
  ocean: {
    container: 'bg-[#0B4F6C]/5 border-[#0B4F6C]/20',
    icon: Info,
    iconClass: 'text-[#0B4F6C]',
    titleClass: 'text-[#0B4F6C]',
    textClass: 'text-[#0B4F6C]/80',
    closeClass: 'text-[#0B4F6C]/50 hover:text-[#0B4F6C] hover:bg-[#0B4F6C]/10',
  },
};

function Alert({
  type = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
  icon: CustomIcon,
}) {
  const [visible, setVisible] = useState(true);
  const variant = variants[type] || variants.info;
  const Icon = CustomIcon || variant.icon;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
          className={[
            'flex gap-3 p-4 rounded-xl border',
            variant.container,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Icon
            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${variant.iconClass}`}
            aria-hidden="true"
          />

          <div className="flex-1 min-w-0">
            {title && (
              <p className={`text-sm font-semibold mb-1 ${variant.titleClass}`}>{title}</p>
            )}
            {children && (
              <div className={`text-sm ${variant.textClass}`}>{children}</div>
            )}
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className={`flex-shrink-0 p-1 rounded-md transition-colors ${variant.closeClass}`}
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Alert;
