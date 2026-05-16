/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f0ff',
          100: '#e4e4ff',
          200: '#cdcbff',
          300: '#aba8ff',
          400: '#857cfd',
          500: '#6554fa',
          600: '#5333f1',
          700: '#4522de',
          800: '#391db8',
          900: '#311a96',
          950: '#1d0e66',
        },
        accent: {
          cyan:  '#06b6d4',
          green: '#10b981',
          amber: '#f59e0b',
          rose:  '#f43f5e',
        }
      },
      animation: {
        'float':      'float 8s ease-in-out infinite',
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    }
  },
  plugins: []
}
