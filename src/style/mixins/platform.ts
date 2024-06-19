import { Platform } from 'react-native';
import type { MixinStyleScope } from '../transform';

const platform = {
  include(scope: MixinStyleScope) {
    return scope.args[0] === 'native'
      ? Platform.OS === 'android' || Platform.OS === 'ios'
      : Platform.OS === scope.args[0];
  },
  apply() {
    return true;
  },
};

export default platform;
