/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core Brand Accent: Precision Indigo-Blue
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          active: '#1D4ED8',
          subtle: '#EFF6FF',
          darkSubtle: 'rgba(59, 130, 246, 0.12)',
        },
        // Secondary / Bio-Cyan
        secondary: {
          DEFAULT: '#0EA5E9',
          hover: '#0284C7',
          subtle: '#F0F9FF',
          darkSubtle: 'rgba(14, 165, 233, 0.12)',
        },
        // Clinical Alert: Coral Crimson
        danger: {
          DEFAULT: '#F43F5E',
          hover: '#E11D48',
          subtle: '#FFF1F2',
          darkSubtle: 'rgba(244, 63, 94, 0.12)',
        },
        // Clinical Clear: Emerald Jade
        success: {
          DEFAULT: '#10B981',
          hover: '#059669',
          subtle: '#ECFDF5',
          darkSubtle: 'rgba(16, 185, 129, 0.12)',
        },
        // Clinical Warning / Notice: Warm Gold
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          subtle: '#FFFBEB',
          darkSubtle: 'rgba(245, 158, 11, 0.12)',
        },
        // Surfaces & Backgrounds
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#11141D',
          elevated: '#F8FAFC',
          elevatedDark: '#171B26',
          panelDark: '#0E1017',
        },
        'border-color': {
          DEFAULT: '#E2E8F0',
          dark: 'rgba(255, 255, 255, 0.08)',
          darkHover: 'rgba(255, 255, 255, 0.16)',
        },
        'text-primary': {
          DEFAULT: '#0F172A',
          dark: '#F8FAFC',
        },
        'text-secondary': {
          DEFAULT: '#64748B',
          dark: '#94A3B8',
        },
        background: {
          DEFAULT: '#F8FAFC',
          dark: '#08090D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'premium': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'premium-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.1), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'premium-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'glow-primary': '0 0 24px -2px rgba(59, 130, 246, 0.35)',
        'glow-danger': '0 0 24px -2px rgba(244, 63, 94, 0.35)',
        'glow-success': '0 0 24px -2px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
    },
  },
  plugins: [],
}
