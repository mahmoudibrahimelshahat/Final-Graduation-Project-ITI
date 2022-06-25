/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      colors: {
        'lightorange': '#F66B0E',
        'lightgrey':'#727272',
        'bgcolor':'#EFEFEF'
        
      },
    }
  },
}


