/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@z3ro/nano/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        tanj: {
          gray: "#22201f",
          brown: "#4b2d2d",
          pink: "#863841",
          white: "#eeeeed",
          green: "#46b077"
        },
        gray: {
          900: '#0e1013',
          800: '#17181b',
          700: '#202124',
          600: '#282a2d',
          550: '#2e3134',
          500: '#3c4043',
          450: '#5f6368',
          400: '#80868b',
          350: '#9aa0a6',
          300: '#bdc1c6',
          250: '#dadce0',
          200: '#e8eaed',
          150: '#f1f3f4',
          100: '#f8f9fa'
        }
      }
    },
  },
  plugins: [],
}
