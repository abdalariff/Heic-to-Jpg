/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FAFBFC',
          dark: '#0F1117',
        },
        secondary: {
          light: '#FFFFFF',
          dark: '#1A1D27',
        },
        accent: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          dark: '#818CF8',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
