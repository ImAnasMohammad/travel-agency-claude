/*
 *  FileName:-     tailwind.config.js
 *  Description:-  Tailwind CSS configuration with WanderLux design system
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#0B4F6C',
          50: '#E6F4F9',
          100: '#C0E2EF',
          200: '#8ACAE0',
          300: '#54B2D1',
          400: '#2E9EC5',
          500: '#0B4F6C',
          600: '#094460',
          700: '#073650',
          800: '#052840',
          900: '#031A2A',
        },
        teal: {
          DEFAULT: '#00B4D8',
          50: '#E0F7FC',
          100: '#B3ECF6',
          200: '#80DFF0',
          300: '#4DD2EA',
          400: '#26C7E1',
          500: '#00B4D8',
          600: '#00A0C2',
          700: '#0088A5',
          800: '#007088',
          900: '#00506A',
        },
        sunset: {
          DEFAULT: '#FF6B35',
          50: '#FFF0EB',
          100: '#FFD9CC',
          200: '#FFB59A',
          300: '#FF9168',
          400: '#FF7D4A',
          500: '#FF6B35',
          600: '#E85A25',
          700: '#CC4A18',
          800: '#B03B0E',
          900: '#8C2D08',
        },
        gold: {
          DEFAULT: '#FFD166',
          50: '#FFFBF0',
          100: '#FFF5D6',
          200: '#FFECAD',
          300: '#FFE285',
          400: '#FFD96B',
          500: '#FFD166',
          600: '#FFC233',
          700: '#FFAF00',
          800: '#CC8C00',
          900: '#996900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        snug: '-0.01em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      borderRadius: {
        pill: '9999px',
        card: '8px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'nav': '0 2px 20px rgba(0,0,0,0.1)',
        'glass': '0 4px 30px rgba(0,0,0,0.1)',
        'deep': '0 20px 60px rgba(0,0,0,0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 50%, #FF6B35 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FFD166 100%)',
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #111111 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-up': 'fadeUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        88: '22rem',
        100: '25rem',
        112: '28rem',
        128: '32rem',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
      },
    },
  },
  plugins: [],
};
