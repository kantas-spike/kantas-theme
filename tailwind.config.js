const path = require('path')
const theme_dir = path.basename(__dirname)

const colors = require('tailwindcss/colors')
module.exports = {
  content: [`./hugo_stats.json`, `./themes/${theme_dir}/assets/**/*.{js,jsx,css}`],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#32569a',
          dark: '#192b4d',
          light: '#d8e2f3',
        },
        secondary: {
          DEFAULT: '#8b9a32',
          dark: '#454d19',
          light: '#f3e9d8',
        },
        site_title: {
            DEFAULT: "#f5b748",
            dark: "#b88936",
            light: "#f5cb7f",
        },
        on: {
          primary: {
            DEFAULT: '#ffffff',
            dark: '#ffffff',
            light: '#0c1627',
          },
          secondary: {
            DEFAULT: '#ffffff',
            dark: '#ffffff',
            light: '#23270c',
          },
        },
        background: colors.gray['300'],
        surface: colors.gray['100'],
        error: colors.pink['700'],
      }
    },
  },
  plugins: [],
}