import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg border-0',
  secondary: 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50 focus:ring-4 focus:ring-blue-200 shadow-md',
  outline: 'bg-transparent text-blue-600 border-2 border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-200 shadow-md',
  ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-4 focus:ring-blue-200',
  link: 'bg-transparent text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline focus:ring-4 focus:ring-blue-200'
};

const buttonSizes = {
  sm: 'text-sm px-4 py-2 h-9',
  md: 'text-base px-6 py-3 h-11',
  lg: 'text-lg px-8 py-4 h-13'
};

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    children, 
    disabled = false, 
    loading = false, 
    onClick,
    type = 'button',
    href,
    external = false,
    ...props 
  }, ref) => {
    const baseStyles = cn(
      // Base button styles optimized for medical applications
      'inline-flex items-center justify-center gap-2',
      'rounded-xl font-semibold',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-4 focus:ring-offset-2',
      // Enhanced disabled state for medical context
      'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none',
      // Subtle hover effects appropriate for medical interface
      'transform hover:-translate-y-0.5 active:translate-y-0',
      'hover:shadow-xl',
      // Ensure minimum touch target size (44px) for accessibility
      'min-h-[44px]',
      // Size and variant
      buttonSizes[size],
      buttonVariants[variant],
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseStyles}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...props}
          >
            {content}
          </a>
        );
      }
      
      return (
        <Link
          href={href}
          className={baseStyles}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...props}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        className={baseStyles}
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
        ref={ref as React.Ref<HTMLButtonElement>}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;