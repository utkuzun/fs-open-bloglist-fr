/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true,
    'cypress/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    indent: ['error', 2],
    'no-trailing-spaces': 'error',
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'windows'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
