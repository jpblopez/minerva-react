const path = require('path');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  style: {
    postcss: {
      plugins: [tailwind, autoprefixer],
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
