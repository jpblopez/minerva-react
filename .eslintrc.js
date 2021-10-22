const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'plugin:import/recommended',
    'react-app',
    'airbnb-base',
    'airbnb/rules/react',
    'prettier',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        useTabs: false,
        tabWidth: 2,
        jsxSingleQuote: false,
        singleQuote: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'consistent-return': 1,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'no-plusplus': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, 'src/')]],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
