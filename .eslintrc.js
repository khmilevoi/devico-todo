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
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-plusplus': 0,
    'class-methods-use-this': 0
  }
};
