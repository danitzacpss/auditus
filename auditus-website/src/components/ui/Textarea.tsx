'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    maxLength,
    showCharCount = false,
    resize = true,
    required = false,
    disabled = false,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(value?.toString().length || 0);
    const textareaId = React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCharCount(newValue.length);
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium mb-2 font-secondary',
              'text-gray-700 dark:text-gray-700',
              required && 'after:content-["*"] after:ml-0.5 after:text-red-500'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(
              // Base textarea styles from design system
              'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
              'font-secondary text-base min-h-[100px]',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-4 focus:ring-primary-200',
              // Resize behavior
              resize ? 'resize-y' : 'resize-none',
              // Default state
              'bg-gray-50 border-gray-200 text-gray-900',
              'dark:bg-gray-50 dark:border-gray-200 dark:text-gray-900',
              // Focus state
              isFocused && 'bg-white border-primary-400 dark:bg-white dark:border-primary-400',
              // Error state
              error && 'border-red-500 bg-red-50 dark:bg-red-50 dark:border-red-500',
              // Disabled state
              disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-100',
              className
            )}
            {...props}
          />
          
          {/* Error icon */}
          {error && (
            <div className="absolute top-3 right-3 pointer-events-none">
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

        {/* Helper text, error message, or character count */}
        <div className="mt-2 flex justify-between items-start">
          <div className="flex items-center">
            {error ? (
              <>
                <svg 
                  className="h-4 w-4 text-red-500 mr-1 flex-shrink-0 mt-0.5" 
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
            ) : helperText ? (
              <span className="text-sm text-gray-500 dark:text-gray-400 font-secondary">
                {helperText}
              </span>
            ) : null}
          </div>

          {/* Character count */}
          {showCharCount && maxLength && (
            <span className={cn(
              'text-sm font-secondary',
              charCount > maxLength * 0.9 
                ? 'text-orange-500' 
                : charCount === maxLength 
                  ? 'text-red-500' 
                  : 'text-gray-400'
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;