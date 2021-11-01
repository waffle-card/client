const path = require('path');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@validators': path.resolve(__dirname, 'src/validators'),
    },
  },
};
