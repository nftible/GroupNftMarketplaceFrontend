const colors = require("tailwindcss/colors")
const plugin = require('tailwindcss/plugin')
const {fontFamily,maxWidth,height,width,boxShadow,maxHeight,minHeight} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ['Poppins', ...fontFamily.sans]
      },
      boxShadow:{
        ...boxShadow,
         outer:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
      },
      maxWidth: {
        ...maxWidth,
        "screen-3xl":"1460px"
       },
       width: {
        ...width,
        "100":"630px",
        "99":"600px",
        "98":"550px",
        "97":"500px"
       },

       maxHeight:{
          ...maxHeight,
          "md":"448px",
          "lg":"510px",
          "xl":"576px",
          "2xl":"650px",
          "3xl":"700px",
          "screen-90":"90vh",
          "screen-80":"80vh",
          "screen-70":"70vh",
          "screen-65":"65vh",
          "screen-60":"60vh",
        },
       minHeight:{
         ...minHeight,
         "screen-90":"90vh",
         "screen-80":"80vh",
         "screen-70":"70vh",
         "screen-65":"65vh",
         "screen-60":"60vh",
       },
       height:{
         ...height,
         "screen-90":"90vh",
         "screen-80":"80vh",
         "screen-70":"70vh",
         "screen-65":"65vh",
         "screen-60":"60vh",
       }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: []
}