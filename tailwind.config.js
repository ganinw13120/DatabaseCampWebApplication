const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      primary : '#005FB7',
      darkPrimary : '#364655',
      darkSecondary : '#2F4057',
      grayPrimary : '#5A5A5A',
      bluePrimary :'#007EF3',
      blueSecondary : '#0777DE',
      bgProgress : '#C4C4C4',
      'bg-dark' : '#E7E5DE',
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
    extend: {
      dropShadow: {
        'shadowProfile': '2.7px 2.7px 1px rgba(0, 0, 0, 0.1)',
      },
      outline: {
        blackProfile: ['0.1px solid #E7E5DE', '1px'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}