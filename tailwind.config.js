/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#267D8C',
        'primary-focus': '#85afb7',
        secondary: '#a4c6cd',
        accent: '#9ED6C1',
        'base-100': '#E7EEEF',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
