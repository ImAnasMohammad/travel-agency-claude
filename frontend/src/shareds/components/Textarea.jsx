/*
 *  FileName:-     Textarea.jsx
 *  Description:-  Reusable Textarea component with label, character count, and error support
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

const Textarea = React.forwardRef(
  (
    {
      label,
      name,
      placeholder,
      error,
      helperText,
      required = false,
      disabled = false,
      readOnly = false,
      rows = 4,
      maxLength,
      showCount = false,
      resize = 'vertical',
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(props.defaultValue?.length || 0);

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const textareaClasses = [
      'w-full bg-white text-black placeholder-gray-400',
      'border rounded-lg px-4 py-3 text-sm transition-all duration-200',
      'font-normal leading-relaxed tracking-tight',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 hover:border-gray-400 focus:border-black focus:ring-0',
      disabled ? 'bg-gray-50 cursor-not-allowed text-gray-500' : '',
      readOnly ? 'bg-gray-50 cursor-default' : '',
      resizeClasses[resize] || 'resize-y',
      'focus:outline-none',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e) => {
      if (showCount || maxLength) {
        setCharCount(e.target.value.length);
      }
      props.onChange?.(e);
    };

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
          <textarea
            ref={ref}
            id={name}
            name={name}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            className={textareaClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            onChange={handleChange}
            {...props}
          />

          {(showCount || maxLength) && (
            <div className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none">
              {charCount}
              {maxLength && `/${maxLength}`}
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

Textarea.displayName = 'Textarea';

export default Textarea;
