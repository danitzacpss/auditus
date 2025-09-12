import React from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

const cardVariants = {
  elevated: 'bg-white shadow-lg hover:shadow-xl dark:bg-gray-800',
  gradient: 'bg-gradient-to-br from-primary-400 to-secondary-400 text-white',
  glass: 'bg-white/80 backdrop-blur-md border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/20',
  flat: 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700'
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    children, 
    variant = 'elevated', 
    hover = true,
    padding = 'md',
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base card styles from design system
          'rounded-2xl transition-all duration-300 ease-out',
          // Variant styles
          cardVariants[variant],
          // Padding
          cardPadding[padding],
          // Hover effects
          hover && 'hover:-translate-y-1 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents for better composition
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-gray-900 dark:text-white font-primary', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-gray-600 dark:text-gray-300 font-secondary', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};