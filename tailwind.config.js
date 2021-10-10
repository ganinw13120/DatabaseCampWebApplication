const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      primary : '#005FB7',
      darkPrimary : '#364655',
      bg : '#FEFCF4',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
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