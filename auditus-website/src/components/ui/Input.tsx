'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from '@/types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    placeholder,
    error,
    helperText,
    required = false,
    disabled = false,
    type = 'text',
    value,
    onChange,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium mb-2 font-secondary',
              'text-gray-700 dark:text-gray-300',
              required && 'after:content-["*"] after:ml-0.5 after:text-red-500'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              // Base input styles from design system
              'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
              'font-secondary text-base',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-4 focus:ring-primary-200',
              // Default state
              'bg-gray-50 border-gray-200 text-gray-900',
              'dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100',
              // Focus state
              isFocused && 'bg-white border-primary-400 dark:bg-gray-700',
              // Error state
              error && 'border-red-500 bg-red-50 dark:bg-red-900/20',
              // Disabled state
              disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900',
              className
            )}
            {...props}
          />
          
          {/* Error icon */}
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-red-500" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {(error || helperText) && (
          <div className="mt-2 flex items-center">
            {error ? (
              <>
                <svg 
                  className="h-4 w-4 text-red-500 mr-1 flex-shrink-0" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-sm text-red-600 dark:text-red-400 font-secondary">
                  {error}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400 font-secondary">
                {helperText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;