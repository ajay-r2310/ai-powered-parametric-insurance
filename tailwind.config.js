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
        forest: {
          50: '#f2f9f5',
          100: '#e1f2e8',
          200: '#c5e5d3',
          300: '#9bcfb4',
          400: '#6bb390',
          500: '#469671',
          600: '#34785a',
          700: '#2a6049',
          800: '#234d3b',
          900: '#0F382C',
          950: '#09211a',
        },
        agri: {
          gold: '#EAB308',
          amber: '#F59E0B',
          earth: '#8B5CF6',
          emerald: '#10B981',
          crimson: '#EF4444',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
