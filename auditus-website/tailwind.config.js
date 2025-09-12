/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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