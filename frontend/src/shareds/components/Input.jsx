/*
 *  FileName:-     Input.jsx
 *  Description:-  Reusable Input component with label, error state, and icon support
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      required = false,
      disabled = false,
      readOnly = false,
      className = '',
      containerClassName = '',
      labelClassName = '',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const inputClasses = [
      'w-full bg-white text-black placeholder-gray-400',
      'border rounded-lg transition-all duration-200',
      'font-normal leading-normal',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 hover:border-gray-400 focus:border-black focus:ring-0',
      LeftIcon ? 'pl-10' : '',
      RightIcon || isPassword ? 'pr-10' : '',
      disabled ? 'bg-gray-50 cursor-not-allowed text-gray-500' : '',
      readOnly ? 'bg-gray-50 cursor-default' : '',
      'focus:outline-none',
      sizeClasses[size] || sizeClasses.md,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={name}
            className={`block text-sm font-medium text-black tracking-tight ${
              required ? "after:content-['*'] after:text-red-500 after:ml-0.5" : ''
            } ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LeftIcon className="w-4 h-4 text-gray-400" />
            </div>
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {RightIcon && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <RightIcon className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${name}-error`}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-600 font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${name}-helper`} className="text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
