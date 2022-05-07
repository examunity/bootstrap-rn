const webpackConfig = require('../config/webpackConfig');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.module.rules = [...config.module.rules, ...webpackConfig.rules];
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackConfig.resolve.alias,
    };

    return config;
  },
};
