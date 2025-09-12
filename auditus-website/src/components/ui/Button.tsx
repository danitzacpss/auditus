import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

const buttonVariants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-200 shadow-primary',
  secondary: 'bg-white text-primary-600 border-2 border-primary-200 hover:bg-primary-50 focus:ring-primary-200',
  outline: 'bg-transparent text-primary-600 border-2 border-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-200',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-200',
  link: 'bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-200'
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
      // Base button styles from design system
      'inline-flex items-center justify-center gap-2',
      'rounded-xl font-medium',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-4',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      // Hover effects
      'transform hover:-translate-y-0.5',
      'hover:shadow-lg',
      // Size and variant
      buttonSizes[size],
      buttonVariants[variant],
      className
    );

    const content = (
      <>
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
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
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;