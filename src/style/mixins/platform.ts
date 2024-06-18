import { Platform } from 'react-native';
import type { StyleScope } from '../createStyle';

const platform = {
  include(scope: StyleScope) {
    return scope.args[0] === 'native'
      ? Platform.OS === 'android' || Platform.OS === 'ios'
      : Platform.OS === scope.args[0];
  },
  apply() {
    return true;
  },
};

export default platform;
