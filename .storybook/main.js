const path = require('path');
// TODO(윤호): 스토리북 파일 ts파일로 전환시 아래 플러그인 활용하기
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    return config;
  },
};
