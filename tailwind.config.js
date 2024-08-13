/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'checkmark-fade': 'checkmark-fade 0.5s ease-out'
      },
      keyframes: {
        'checkmark-fade': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
}
