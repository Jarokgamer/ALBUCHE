/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'albuche-orange': '#FF6B00',
        'albuche-black': '#1A1A1A',
        'albuche-gray': '#2A2A2A',
        'albuche-gray-light': '#333333',
      },
    },
  },
  plugins: [],
} 