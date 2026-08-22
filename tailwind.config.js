/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#14b8a6',
          tealLight: '#2dd4bf',
          tealDark: '#0d9488',
          cyan: '#38bdf8',
          indigo: '#6366f1',
          darkBg: '#0b0f19',
          darkCard: '#111827',
          darkSurface: '#182234',
          darkBorder: '#1f293d',
          lightBg: '#f8fafc',
          lightCard: '#ffffff',
          lightBorder: '#e2e8f0',
          lightSurface: '#f1f5f9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
