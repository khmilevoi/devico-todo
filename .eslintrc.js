module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0
  }
};
