var tailwind_config = require("./tailwind.config")
module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
      path: ['assets/css', 'node_modules'],
    },
    'tailwindcss/nesting': {},
    tailwindcss: {...tailwind_config},
    autoprefixer: {},
  }
}