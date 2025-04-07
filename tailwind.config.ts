import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'albuche-black': '#1A1A1A',
        'albuche-orange': '#FF6B00',
        'albuche-gray': '#2A2A2A',
      },
    },
  },
  plugins: [],
};

export default config; 