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
        primary: {
          DEFAULT: '#0284C7',
          hover: '#0369A1',
          subtle: '#E0F2FE',
          darkSubtle: '#082F49',
        },
        secondary: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
          subtle: '#CCFBF1',
        },
        danger: {
          DEFAULT: '#E11D48',
          hover: '#BE123C',
          subtle: '#FFE4E6',
          darkSubtle: '#4C0519',
        },
        success: {
          DEFAULT: '#059669',
          hover: '#047857',
          subtle: '#D1FAE5',
          darkSubtle: '#064E3B',
        },
        warning: {
          DEFAULT: '#D97706',
          hover: '#B45309',
          subtle: '#FEF3C7',
          darkSubtle: '#451A03',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
          elevated: '#F8FAFC',
          elevatedDark: '#1E293B',
        },
        'border-color': {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
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
          dark: '#0B0F17',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'clinical': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'clinical-lg': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'clinical-xl': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'glow-primary': '0 0 20px -3px rgba(2, 132, 199, 0.25)',
        'glow-danger': '0 0 20px -3px rgba(225, 29, 72, 0.25)',
        'glow-success': '0 0 20px -3px rgba(5, 150, 105, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}
