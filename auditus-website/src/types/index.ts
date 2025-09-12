// Design System Types
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'gray';
export type ColorIntensity = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'elevated' | 'gradient' | 'glass' | 'flat';

// Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  external?: boolean;
}

export interface CardProps extends BaseComponentProps {
  variant?: CardVariant;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface InputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  value?: string;
  onChange?: (value: string) => void;
}

// Business Domain Types
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  slug: string;
  features: string[];
  preparation?: string[];
  aftercare?: string[];
  image?: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    office: string;
    city: string;
    region: string;
    postalCode?: string;
  };
  hours: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
  };
  social?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
  service?: string;
  verified?: boolean;
}

export interface Professional {
  name: string;
  title: string;
  credentials: string[];
  experience: string;
  education: string[];
  specializations: string[];
  image?: string;
  bio: string;
}

export interface Appointment {
  id?: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact?: 'email' | 'phone' | 'whatsapp';
  consent: boolean;
}

// SEO and Meta Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  canonical?: string;
}

export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form State Types
export interface FormState {
  isLoading: boolean;
  error?: string;
  success?: boolean;
}

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: 'engagement' | 'conversion' | 'navigation' | 'error';
  label?: string;
  value?: number;
}