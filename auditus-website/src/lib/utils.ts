import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function for theme-aware class names
export function withTheme(baseClass: string, lightClass?: string, darkClass?: string) {
  return cn(
    baseClass,
    lightClass && `light:${lightClass}`,
    darkClass && `dark:${darkClass}`
  )
}

// Phone number formatting for Chilean numbers
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Chilean mobile numbers (+56 9 XXXX XXXX)
  if (cleaned.length === 11 && cleaned.startsWith('569')) {
    return `+56 9 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  
  // Format Chilean landline numbers (+56 XX XXX XXXX)
  if (cleaned.length === 10 && cleaned.startsWith('56')) {
    return `+56 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
}

// WhatsApp URL generator
export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Chilean RUT validation
export function isValidRUT(rut: string): boolean {
  // Remove dots and dash
  const cleanRUT = rut.replace(/[.-]/g, '');
  
  if (cleanRUT.length < 8 || cleanRUT.length > 9) return false;
  
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1).toLowerCase();
  
  if (!/^\d+$/.test(body)) return false;
  
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const calculatedDV = remainder === 0 ? '0' : remainder === 1 ? 'k' : (11 - remainder).toString();
  
  return dv === calculatedDV;
}

// Price formatting for Chilean pesos
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}

// Currency formatting alias for consistency
export function formatCurrency(price: number): string {
  return formatPrice(price);
}

// Duration formatting in minutes
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutos`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hora${hours > 1 ? 's' : ''} y ${remainingMinutes} minutos`;
    }
  }
}

// Date formatting for appointments
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

// Time formatting
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObj);
}

// SEO helpers
export function generateMetaTitle(title: string, siteName = 'Centro Auditus'): string {
  return `${title} | ${siteName}`;
}

export function generateMetaDescription(description: string, maxLength = 160): string {
  return description.length > maxLength 
    ? description.substring(0, maxLength - 3) + '...' 
    : description;
}