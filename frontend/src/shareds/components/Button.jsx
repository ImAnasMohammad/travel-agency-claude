/*
 *  FileName:-     Button.jsx
 *  Description:-  Reusable Button component with multiple variants, sizes, and loading state
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

/* ============================================================
   Variant & Size Maps
   ============================================================ */
const variantClasses = {
  'solid-black':
    'bg-black text-white border-2 border-black hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black active:scale-95',
  'solid-white':
    'bg-white text-black border-2 border-white hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white active:scale-95',
  outline:
    'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white active:scale-95',
  'outline-white':
    'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black active:scale-95',
  ghost:
    'bg-transparent text-black border-2 border-transparent hover:bg-black/5 focus-visible:bg-black/5 active:bg-black/10',
  'ghost-white':
    'bg-transparent text-white border-2 border-transparent hover:bg-white/10 focus-visible:bg-white/10 active:bg-white/20',
  ocean:
    'bg-[#0B4F6C] text-white border-2 border-[#0B4F6C] hover:bg-[#00B4D8] hover:border-[#00B4D8] active:scale-95',
  teal:
    'bg-[#00B4D8] text-white border-2 border-[#00B4D8] hover:bg-[#0B4F6C] hover:border-[#0B4F6C] active:scale-95',
  sunset:
    'bg-[#FF6B35] text-white border-2 border-[#FF6B35] hover:bg-[#e55a24] hover:border-[#e55a24] active:scale-95',
  gold:
    'bg-[#FFD166] text-black border-2 border-[#FFD166] hover:bg-[#ffbf33] hover:border-[#ffbf33] active:scale-95',
  danger:
    'bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 active:scale-95',
};

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3 text-base gap-2',
  xl: 'px-10 py-4 text-lg gap-2.5',
};

const iconSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

/* ============================================================
   Button Component
   ============================================================ */
const Button = React.forwardRef(
  (
    {
      children,
      variant = 'solid-black',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon: LeftIcon = null,
      rightIcon: RightIcon = null,
      className = '',
      onClick,
      type = 'button',
      as: Component = 'button',
      animate = true,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseClasses = [
      'inline-flex items-center justify-center font-semibold',
      'rounded-pill select-none transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      variantClasses[variant] || variantClasses['solid-black'],
      sizeClasses[size] || sizeClasses.md,
      fullWidth ? 'w-full' : '',
      loading ? 'cursor-wait' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = iconSizeClasses[size] || iconSizeClasses.md;

    const content = (
      <>
        {loading ? (
          <Spinner
            size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16}
            color="currentColor"
          />
        ) : (
          LeftIcon && <LeftIcon className={iconSize} aria-hidden="true" />
        )}
        {children && <span className="leading-none">{children}</span>}
        {!loading && RightIcon && <RightIcon className={iconSize} aria-hidden="true" />}
      </>
    );

    if (animate && !isDisabled) {
      return (
        <motion.button
          ref={ref}
          type={type}
          className={baseClasses}
          disabled={isDisabled}
          onClick={onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          {...props}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <Component
        ref={ref}
        type={Component === 'button' ? type : undefined}
        className={baseClasses}
        disabled={isDisabled}
        onClick={onClick}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
