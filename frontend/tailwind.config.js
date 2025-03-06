/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        verdePrincipal: '#569788', 
        verdeSecundario: {
          DEFAULT: '#DCFAE6', 
          '20': 'rgba(220, 250, 230, 0.4)',
        },
        verdeTerciario: '#ADD9C5',
        verdeFondo:"#5F936C",
        verdeLayout: '#5F936C'
      },
    },
  },
  plugins: [],
};
