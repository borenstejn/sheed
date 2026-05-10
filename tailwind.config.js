/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sheed: {
          pink: '#FF3B7A',
          purple: '#9A3BFF',
          neon: '#00F5A0',
        },
        neutral: {
          950: '#101012',  // Main background
          900: '#1C1C1E',  // Surface/cards
          800: '#3A3A3C',  // Borders
          400: '#8A8A8E',  // Secondary text
          100: '#F5F5F7',  // Primary text
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
