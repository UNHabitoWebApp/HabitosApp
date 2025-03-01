/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5F936C',
        secondary: '#ADD9C5',
        accent: '#569788',
      },
    },
  },
  plugins: [],
};