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
        // Theme-aware tokens mapped to CSS variables
        theme: {
          bg: 'var(--bg-app)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          panel: 'var(--bg-panel)',
          primary: 'var(--primary)',
          'primary-hover': 'var(--primary-hover)',
          'primary-subtle': 'var(--primary-subtle)',
          secondary: 'var(--secondary)',
          'secondary-hover': 'var(--secondary-hover)',
          'secondary-subtle': 'var(--secondary-subtle)',
          accent: 'var(--accent)',
          'accent-hover': 'var(--accent-hover)',
          'accent-subtle': 'var(--accent-subtle)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)',
          border: 'var(--border-color)',
          'border-hover': 'var(--border-color-hover)',
          success: 'var(--success)',
          danger: 'var(--danger)',
        },

        // Named palette tokens for explicit use
        forest: {
          DEFAULT: '#244A3C',
          50: '#F0F5F2',
          100: '#E1ECE6',
          200: '#C2D9CD',
          300: '#A3C6B4',
          400: '#679B82',
          500: '#244A3C',
          600: '#1E3F33',
          700: '#17332A',
          800: '#10241E',
          900: '#0B1814',
        },
        sage: {
          DEFAULT: '#7A9B86',
          50: '#F4F7F5',
          100: '#E8EFEA',
          200: '#D1DFD6',
          300: '#B5CCC0',
          400: '#94B4A1',
          500: '#7A9B86',
          600: '#63846E',
          700: '#4D6857',
        },
        terracotta: {
          DEFAULT: '#D27A5C',
          50: '#FDF7F5',
          100: '#FBECE7',
          200: '#F7D7CC',
          300: '#EEB9A6',
          400: '#E08B6D',
          500: '#D27A5C',
          600: '#BE674A',
          700: '#A15137',
        },
        ivory: {
          DEFAULT: '#F6F5F0',
          50: '#FAF9F6',
          100: '#F6F5F0',
          200: '#EDECE6',
          300: '#E4E7E0',
        },
        charcoal: {
          DEFAULT: '#202923',
          500: '#758078',
          600: '#4F5C53',
          700: '#34443A',
          800: '#2A362E',
          900: '#202923',
        },
        darkEmerald: {
          bg: '#131B17',
          card: '#1C2821',
          elevated: '#23322A',
          panel: '#17221C',
          primary: '#8BB49A',
          accent: '#E08B6D',
          text: '#E7EEE8',
          muted: '#8FA295',
          border: '#34443A',
        },

        // Semantic mapping for backward compatibility
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-hover)',
          subtle: 'var(--primary-subtle)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-hover)',
          subtle: 'var(--secondary-subtle)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          hover: 'var(--accent-hover)',
          subtle: 'var(--danger-subtle)',
        },
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--primary-hover)',
          subtle: 'var(--success-subtle)',
        },
        surface: {
          DEFAULT: 'var(--bg-card)',
          dark: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          elevatedDark: 'var(--bg-elevated)',
          panelDark: 'var(--bg-panel)',
        },
        'border-color': {
          DEFAULT: 'var(--border-color)',
          dark: 'var(--border-color)',
          darkHover: 'var(--border-color-hover)',
        },
        'text-primary': {
          DEFAULT: 'var(--text-main)',
          dark: 'var(--text-main)',
        },
        'text-secondary': {
          DEFAULT: 'var(--text-muted)',
          dark: 'var(--text-muted)',
        },
        background: {
          DEFAULT: 'var(--bg-app)',
          dark: 'var(--bg-app)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(32, 41, 35, 0.05)',
        'premium': '0 4px 20px -2px rgba(32, 41, 35, 0.06), 0 2px 6px -1px rgba(32, 41, 35, 0.03)',
        'premium-lg': '0 10px 30px -4px rgba(32, 41, 35, 0.09), 0 4px 10px -2px rgba(32, 41, 35, 0.04)',
        'premium-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        'glow-primary': '0 0 20px -2px rgba(36, 74, 60, 0.28)',
        'glow-accent': '0 0 20px -2px rgba(210, 122, 92, 0.32)',
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
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
