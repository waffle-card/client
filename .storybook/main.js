const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async config => {
    config.resolve.alias['@components'] = path.resolve(
      __dirname,
      '../src/components',
    );
    config.resolve.alias['@hooks'] = path.resolve(__dirname, '../src/hooks');
    config.resolve.alias['@contexts'] = path.resolve(
      __dirname,
      '../src/contexts',
    );
    config.resolve.alias['@pages'] = path.resolve(__dirname, '../src/pages');
    config.resolve.alias['@styles'] = path.resolve(__dirname, '../src/styles');
    config.resolve.alias['@validators'] = path.resolve(
      __dirname,
      '../src/validators',
    );
    return config;
  },
};
