// Forked from https://github.com/GeekyAnts/NativeBase/tree/master/example

const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('@expo/metro-config');
// eslint-disable-next-line import/no-extraneous-dependencies
const exclusionList = require('metro-config/src/defaults/exclusionList');

const pak = require('../package.json');

const config = getDefaultConfig(__dirname);

const escape = (string) =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

config.projectRoot = __dirname;
config.watchFolders = [root];

// We need to make sure that only one version is loaded for peerDependencies
// So we blacklist them at the root, and alias them to the versions in example's node_modules
config.resolver = {
  ...config.resolver,
  blacklistRE: exclusionList(
    modules.map(
      (m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`),
    ),
  ),
  extraNodeModules: modules.reduce((acc, name) => {
    acc[name] = path.join(__dirname, 'node_modules', name);
    return acc;
  }, {}),
};

module.exports = config;
