/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Custom badge classes
    'professional-badge',
    'professional-badge-light',
    'professional-badge-certified',
    'hero-gradient',
    // Common gradient combinations that might be purged
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'bg-gradient-to-b',
    'bg-gradient-to-t',
    'from-blue-50',
    'to-cyan-50',
    'from-blue-100',
    'to-cyan-100',
    'from-blue-500',
    'to-cyan-500',
    'from-blue-600',
    'to-cyan-600',
    'from-green-50',
    'to-emerald-50',
    'from-green-500',
    'to-emerald-500',
    'from-pink-50',
    'to-rose-50',
    'from-purple-50',
    'to-pink-50',
    'from-purple-100',
    'to-pink-100',
    'from-purple-500',
    'to-pink-500',
    'from-cyan-50',
    'to-teal-50',
    'from-cyan-500',
    'to-teal-500',
    // Primary colors that might not be detected
    'bg-primary-blue',
    'text-primary-blue',
    'bg-secondary-turquoise',
    'text-secondary-turquoise',
    // Border colors
    'border-blue-100',
    'border-blue-200',
    'border-green-100',
    'border-cyan-100',
    'border-pink-100',
    'border-purple-200',
    // Shadow effects
    'shadow-primary',
    'shadow-secondary',
    // Button classes
    'btn-primary',
    'btn-secondary',
    'btn-cta-primary',
    // Professional card and sections
    'professional-card',
    'professional-cta-section',
    // Background clip text
    'bg-clip-text',
    'text-transparent',
    // Hover states that might be purged
    'hover:from-blue-700',
    'hover:to-cyan-700',
    'hover:from-green-700',
    'hover:to-emerald-700',
    'hover:from-purple-700',
    'hover:to-indigo-700',
    // Animation classes
    'animate-pulse',
    'animate-bounce',
    // Additional gradient combinations
    'from-f59e0b',
    'to-f97316',
    'from-orange-500',
    'to-amber-500',
  ],
  theme: {
    extend: {
      // Auditus Design System Colors - Nueva paleta azul predominante
      colors: {
        // Primary colors (deep blue for medical trust and professionalism)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e2a78',
        },
        // Secondary colors (turquoise for fresh medical accent)
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Accent colors (soft pink for warmth)
        accent: {
          pink: '#fce7f3',
          rose: '#fb7185',
          softBlue: '#e0f2fe',
        },
        // Enhanced gray scale for better contrast
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      // Typography from design system
      fontFamily: {
        primary: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        secondary: ['Lato', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        accent: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      // Typography scales
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      // Spacing scale (8px base)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Border radius from design system
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      // Box shadows for depth - updated for new blue palette
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 32px -4px rgba(0, 0, 0, 0.12)',
        'primary': '0 4px 12px -2px rgba(37, 99, 235, 0.15)',
        'secondary': '0 4px 12px -2px rgba(8, 145, 178, 0.15)',
      },
      // Animation and transitions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      // Backdrop blur for glassmorphism
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}