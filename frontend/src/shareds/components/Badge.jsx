/*
 *  FileName:-     Badge.jsx
 *  Description:-  Badge component with multiple color variants and optional dot indicator
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';

const variantClasses = {
  default: 'bg-gray-100 text-gray-800',
  black: 'bg-black text-white',
  white: 'bg-white text-black border border-gray-200',
  ocean: 'bg-[#0B4F6C] text-white',
  teal: 'bg-[#00B4D8]/10 text-[#0B4F6C]',
  sunset: 'bg-[#FF6B35]/10 text-[#FF6B35]',
  gold: 'bg-[#FFD166]/20 text-[#b8860b]',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-yellow-50 text-yellow-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
  // Solid variants
  'solid-success': 'bg-green-500 text-white',
  'solid-warning': 'bg-yellow-400 text-black',
  'solid-danger': 'bg-red-500 text-white',
  'solid-info': 'bg-blue-500 text-white',
};

const sizeClasses = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  dotColor,
  rounded = 'rounded-full',
  className = '',
  icon: Icon,
  ...props
}) {
  const variantClass = variantClasses[variant] || variantClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // Default dot color based on variant
  const dotColorClass = dotColor || {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    teal: 'bg-[#00B4D8]',
    ocean: 'bg-[#0B4F6C]',
    sunset: 'bg-[#FF6B35]',
    gold: 'bg-[#FFD166]',
  }[variant] || 'bg-gray-400';

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-medium tracking-tight',
        rounded,
        variantClass,
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColorClass}`}
          aria-hidden="true"
        />
      )}
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}

export default Badge;
