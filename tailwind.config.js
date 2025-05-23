/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        mono: [
          'SF Mono', 
          'Menlo', 
          'Monaco', 
          'Consolas', 
          'Liberation Mono', 
          'Courier New', 
          'monospace'
        ],
      },
      animation: {
        'flip': 'flip 0.6s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};