/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/tw-elements/dist/js/**/*.js',"./node_modules/flowbite/**/*.js"],
  plugins: [
    require('tw-elements/dist/plugin'),'flowbite/plugin'
  ],
  theme: {
  gap:{
    'first':'2.5rem'
  },
    extend: {

      screens:{
          'sm':'300px',
          
      },

      colors: {
        'lightorange': '#F66B0E',
        'lightgrey':'#727272',
        'bgcolor':'#EFEFEF'
        
      },
    },
        letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      widest: '.25em',
    }
  },
}


