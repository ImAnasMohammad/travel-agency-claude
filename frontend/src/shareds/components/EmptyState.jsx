/*
 *  FileName:-     EmptyState.jsx
 *  Description:-  Beautiful empty state component with icon, title, description, and action
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Search, MapPin, Calendar, Heart, Package, Users } from 'lucide-react';
import Button from './Button';

const presetIcons = {
  default: Inbox,
  search: Search,
  destination: MapPin,
  booking: Calendar,
  wishlist: Heart,
  package: Package,
  users: Users,
};

function EmptyState({
  icon: CustomIcon,
  preset = 'default',
  title = 'Nothing here yet',
  description,
  action,
  actionLabel,
  onAction,
  size = 'md',
  className = '',
}) {
  const Icon = CustomIcon || presetIcons[preset] || presetIcons.default;

  const sizeClasses = {
    sm: {
      container: 'py-8',
      iconWrapper: 'w-12 h-12',
      icon: 'w-6 h-6',
      title: 'text-base',
      desc: 'text-sm',
    },
    md: {
      container: 'py-16',
      iconWrapper: 'w-16 h-16',
      icon: 'w-8 h-8',
      title: 'text-lg',
      desc: 'text-sm',
    },
    lg: {
      container: 'py-24',
      iconWrapper: 'w-20 h-20',
      icon: 'w-10 h-10',
      title: 'text-xl',
      desc: 'text-base',
    },
  };

  const sc = sizeClasses[size] || sizeClasses.md;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center ${sc.container} ${className}`}
    >
      {/* Icon */}
      <div
        className={`${sc.iconWrapper} bg-gray-100 rounded-2xl flex items-center justify-center mb-4`}
      >
        <Icon className={`${sc.icon} text-gray-400`} />
      </div>

      {/* Decorative dots */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
      </div>

      {/* Title */}
      <h3 className={`font-bold text-black tracking-tight ${sc.title} mb-2`}>{title}</h3>

      {/* Description */}
      {description && (
        <p className={`text-gray-500 max-w-sm mx-auto leading-relaxed ${sc.desc} mb-6`}>
          {description}
        </p>
      )}

      {/* Action */}
      {(action || (actionLabel && onAction)) && (
        <div className="mt-2">
          {action || (
            <Button variant="solid-black" size="md" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default EmptyState;
