/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        primary: '#5F936C',
        secondary: '#ADD9C5',
        accent: '#569788',
=======
        verdePrincipal: '#569788', 
        verdeSecundario: {
          DEFAULT: '#DCFAE6', 
          '20': 'rgba(220, 250, 230, 0.4)',
        },
        verdeTerciario: '#ADD9C5'
>>>>>>> main
      },
    },
  },
  plugins: [],
};
