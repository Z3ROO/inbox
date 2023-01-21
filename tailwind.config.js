/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
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
        }
      }
    },
  },
  plugins: [],
}
