'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'gray' | 'current';
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const iconColors = {
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  gray: 'text-gray-600',
  current: 'text-current'
};

const iconVariants = {
  default: '',
  contained: 'p-2 bg-primary-100 text-primary-600 rounded-lg dark:bg-primary-900 dark:text-primary-300',
  outlined: 'p-2 border-2 border-primary-200 text-primary-600 rounded-lg hover:bg-primary-50 dark:border-primary-800 dark:text-primary-300'
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ 
    className, 
    size = 'md', 
    variant = 'default',
    color = 'current',
    children,
    ...props 
  }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(
          iconSizes[size],
          variant === 'default' && iconColors[color],
          iconVariants[variant],
          'flex-shrink-0',
          className
        )}
        fill="currentColor"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        suppressHydrationWarning
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

// Medical/Healthcare specific icons for Auditus
export const EarIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1s1-.45 1-1v-2.26c.91-.35 1.75-.92 2.46-1.68.34.22.72.4 1.12.51.24.07.49.02.69-.13.2-.15.32-.37.32-.61V11.5c.83-.71 1.52-1.61 2-2.63C16.95 8.34 17 7.68 17 7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3 0 .29-.05.57-.14.83-.46.84-1.05 1.58-1.73 2.17H12c-.55 0-1-.45-1-1s.45-1 1-1c.83 0 1.5-.67 1.5-1.5S12.83 5.5 12 5.5 10.5 6.17 10.5 7c0 .55-.45 1-1 1s-1-.45-1-1c0-1.66 1.34-3 3-3z"/>
  </Icon>
);

export const StethoscopeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12.5 2C11.67 2 11 2.67 11 3.5S11.67 5 12.5 5 14 4.33 14 3.5 13.33 2 12.5 2zm6.5 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM8.5 7C7.67 7 7 7.67 7 8.5v3.75c0 2.16 1.34 4.14 3.35 4.86.36.13.73.19 1.15.19s.79-.06 1.15-.19c2.01-.72 3.35-2.7 3.35-4.86V8.5C16 7.67 15.33 7 14.5 7h-6zm5 5.25c0 1.24-.78 2.39-1.94 2.8-.19.07-.37.1-.56.1s-.37-.03-.56-.1C9.28 14.64 8.5 13.49 8.5 12.25V8.5h5v3.75z"/>
  </Icon>
);

export const VideotoscopiaIcon = (props: IconProps) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeWidth={2}>
    {/* Ear shape - simplified and clear */}
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M14 4c3.5 0 6 2.5 6 6s-2.5 6-6 6c-1 0-2-.5-3-1.5"
    />
    
    {/* Inner ear canal curves - matching the image */}
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M17 7c0-1.5-1-3-2.5-3"
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16 9c0-1-0.5-1.5-1.5-1.5"
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15 11c0-0.5-0.5-1-1-1"
    />
    
    {/* Otoscope handle - simple rectangle */}
    <rect x="2" y="16" width="2" height="4" rx="0.5" strokeLinecap="round"/>
    <rect x="2.5" y="14" width="1" height="2" strokeLinecap="round"/>
    
    {/* Otoscope insertion line */}
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M4 16l7-6"
    />
    
    {/* Visualization dots - cleaner positioning */}
    <circle cx="9" cy="11" r="0.8" fill="currentColor" />
    <circle cx="10.5" cy="9.5" r="0.5" fill="currentColor" />
    <circle cx="11" cy="12" r="0.5" fill="currentColor" />
  </Icon>
);

export const WashIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2C8.69 4 6 6.83 6 10.5c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.67-2.69-6.5-6-8.5z"/>
    <path d="M12 4.5c2.5 1.5 4 3.83 4 6 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-2.17 1.5-4.5 4-6z"/>
    <circle cx="10" cy="9" r="1"/>
    <circle cx="14" cy="11" r="1"/>
    <path d="M12 13c.83 0 1.5-.67 1.5-1.5S12.83 10 12 10s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
  </Icon>
);

export const AudiometryIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-4c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v2.5c0 .55-.45 1-1 1zm2 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    <path d="M12 6c-1.66 0-3 1.34-3 3v2c0 1.66 1.34 3 3 3s3-1.34 3-3V9c0-1.66-1.34-3-3-3z"/>
  </Icon>
);

export const PhoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </Icon>
);

export const EmailIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </Icon>
);

export const LocationIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </Icon>
);

export const ClockIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
  </Icon>
);

export const StarIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </Icon>
);

export const WhatsAppIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </Icon>
);

export const CalendarIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </Icon>
);

export const QuoteIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
  </Icon>
);

export const AlertIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
  </Icon>
);

export const AwardIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.46,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
  </Icon>
);

export const GraduationIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </Icon>
);

export const HeartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
  </Icon>
);

export const ShieldIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5A1.5,1.5 0 0,1 17,12.5V18.5A1.5,1.5 0 0,1 15.5,20H8.5A1.5,1.5 0 0,1 7,18.5V12.5A1.5,1.5 0 0,1 8.5,11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
  </Icon>
);

export const InstagramIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
  </Icon>
);

export const FacebookIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </Icon>
);

export const TargetIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"/>
  </Icon>
);

export const EyeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17C7.58,17 4.15,13.5 2.46,12C4.15,10.5 7.58,7 12,7C16.42,7 19.85,10.5 21.54,12C19.85,13.5 16.42,17 12,17Z"/>
  </Icon>
);

export default Icon;