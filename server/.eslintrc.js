module.exports = {
  env: {
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  ignorePatterns: ['cypress', 'www.js'],
};
