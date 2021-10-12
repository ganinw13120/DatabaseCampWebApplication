const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      primary : '#005FB7',
      darkPrimary : '#364655',
      bg : '#FEFCF4',
      gray : '#BBBFC0',
      red: colors.rose,
      // red : '#D5393B',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      yellow: colors.amber,
    },
    fontFamily: {
     'header': [ 'Roboto', 'sans-serif'],
     'prompt': [ 'Prompt', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}