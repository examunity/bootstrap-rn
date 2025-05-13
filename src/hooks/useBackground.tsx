import { Platform } from 'react-native';
import useBackgroundWeb from './useBackgroundWeb';
import useBackgroundNative from './useBackgroundNative';

export default Platform.OS === 'web' ? useBackgroundWeb : useBackgroundNative;
