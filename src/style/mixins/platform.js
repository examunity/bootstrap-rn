import { Platform } from 'react-native';

const platform = {
  include(scope) {
    return scope.args[0] === 'native'
      ? Platform.OS === 'android' || Platform.OS === 'ios'
      : Platform.OS === scope.args[0];
  },
  apply() {
    return true;
  },
};

export default platform;
