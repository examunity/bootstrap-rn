const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpackConfig = require('./config/webpackConfig');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules = [...config.module.rules, ...webpackConfig.rules];
  config.resolve.alias = {
    ...config.resolve.alias,
    ...webpackConfig.resolve.alias,
  };

  return config;
};
