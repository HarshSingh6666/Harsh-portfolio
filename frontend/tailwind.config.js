/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Yeh line batati hai ki src ke andar saari JSX files read karni hain
  ],
  theme: {
    extend: {
      colors: {
        dark: '#050505',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}