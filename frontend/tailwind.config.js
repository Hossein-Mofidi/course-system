/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'yekan': ['Yekan Bakh FaNum', 'sans-serif'],
        'modam': ['Modam', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

