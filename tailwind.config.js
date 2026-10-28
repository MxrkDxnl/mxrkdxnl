/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: '#0C0C0C',
        surface: '#0C0C0C',
        muted: '#D7E2EA',
      },
    },
  },
  plugins: [],
}
