/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'pastel-green': '#77B0AA',
        'dark-green': '#507572',
        'light-green': '#c4d3cd',
        'beige': '#DACFBE',
        'sandy': '#D1D0CB'
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'], 
        'raleway': ['Raleway', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
