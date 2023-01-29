module.exports = {
  env: {
    es6: true,
    browser: true, /* need for document to be considered global */
    'jest/globals': true,
  },
  parserOptions: { /* necessary otherwise lints all react jsx */
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: { jsx: true },
  },
  plugins: ['jest'],
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  ignorePatterns: ['**/example/Link*'],
  rules: {
    'react/prop-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/extensions': ['error', { jsx: 'always' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    camelcase: ['error', {
      allow: [
        'product_id',
        'default_price',
        'created_at',
        'updated_at',
      ],
    }],
  },
};
