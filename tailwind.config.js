/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#f0fdfb',
          100: '#ccfbf4',
          200: '#99f6ea',
          300: '#5eeadb',
          400: '#2dd4c6',
          500: '#14b8ab',
          600: '#0d938c',
          700: '#0f7571',
          800: '#115e5b',
          900: '#134e4c',
          950: '#042f2e',
        }
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
};