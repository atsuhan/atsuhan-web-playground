module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['json', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['error']
  },
  globals: {
    THREE: true,
    XR8: true,
    XRExtras: true,
    dat: true,
    Float32Array: true
  }
};
