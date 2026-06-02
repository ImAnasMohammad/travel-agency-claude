/*
 *  FileName:-     Select.jsx
 *  Description:-  Reusable Select dropdown component with label and error support
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

const Select = React.forwardRef(
  (
    {
      label,
      name,
      options = [],
      placeholder = 'Select an option',
      error,
      helperText,
      required = false,
      disabled = false,
      className = '',
      containerClassName = '',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const selectClasses = [
      'w-full bg-white text-black appearance-none',
      'border rounded-lg pr-10 transition-all duration-200',
      'font-normal leading-normal tracking-tight cursor-pointer',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 hover:border-gray-400 focus:border-black focus:ring-0',
      disabled ? 'bg-gray-50 cursor-not-allowed text-gray-500' : '',
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
            }`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={name}
            name={name}
            disabled={disabled}
            className={selectClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => {
              const value = typeof option === 'object' ? option.value : option;
              const label = typeof option === 'object' ? option.label : option;
              return (
                <option key={value} value={value} disabled={option.disabled}>
                  {label}
                </option>
              );
            })}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
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

Select.displayName = 'Select';

export default Select;
