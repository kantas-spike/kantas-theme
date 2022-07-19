const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./layouts/**/*.html", "./themes/kantas/layouts/**/*.html", "./content/**/*.md"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01579b',
          dark: '#002f6c',
          light: '#4f83cc',
        },
        secondary: {
          DEFAULT: '#26c6da',
          dark: '#0095a8',
          light: '#6ff9ff',
        },
        accent: {
            DEFAULT: "#f5b748",
            dark: "#b88936",
            light: "#f5cb7f",
        },
        on: {
          primary: {
            DEFAULT: '#ffffff',
            dark: '#ffffff',
            light: '#000000',
          },
          secondary: {
            DEFAULT: '#000000',
            dark: '#000000',
            light: '#000000',
          },
        },
        background: colors.slate['300'],
        surface: colors.gray['100'],
        error: colors.pink['700'],
      }
    },
  },
  plugins: [],
}