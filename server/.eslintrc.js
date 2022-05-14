module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
