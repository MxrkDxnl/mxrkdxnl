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
      keyframes: {
        'glow-breathe': {
          '0%, 100%': { opacity: '0.65', transform: 'scale(0.92)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'glow-breathe': 'glow-breathe 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
