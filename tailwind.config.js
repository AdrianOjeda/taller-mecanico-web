/** @type {import('tailwindcss').Config} */
export default {
  "darkMode": 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'azulBg': '#1A2130',
        'azulMedio': '#03346E'
      }
    },
  },
  plugins: [],

}

