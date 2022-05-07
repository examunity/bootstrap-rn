const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const escape = (string) =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields = [
  'sbmodern',
  ...defaultConfig.resolver.resolverMainFields,
];

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

defaultConfig.projectRoot = __dirname;

defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders,
  root,
  './.ondevice',
];

// We need to make sure that only one version is loaded for peerDependencies
// So we blacklist them at the root, and alias them to the versions in example's node_modules
defaultConfig.resolver = {
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

module.exports = defaultConfig;
