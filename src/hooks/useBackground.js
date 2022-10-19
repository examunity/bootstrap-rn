import { Platform } from 'react-native';
import useBackgroundWeb from './useBackgroundWeb';
import useBackgroundNative from './useBackgroundNative';

// The assumed background styles are typed as followed:
//
// type Position = 'center' | 'left' | 'right' | 'top' | 'bottom';
// type PositionX = 'center' | 'left' | 'right';
// type PositionY = 'center' | 'top' | 'bottom';
//
// type BackgroundStyles = {
//   backgroundImage: string,
//   backgroundSize: 'contain' | 'cover' | string | number,
//   backgroundPosition: Position,
//   backgroundPositionX:
//     | PositionX
//     | { position: PositionX, offset: string | number },
//   backgroundPositionY:
//     | PositionY
//     | { position: PositionY, offset: string | number },
// };

export default function useBackground(style, styleName) {
  // TODO: Use *.web.js / *.native.js file endings to select platforms, but
  // before we need to make sure that the published bundles are all functional.
  const useBackgroundForPlatform = Platform.select({
    web: useBackgroundWeb,
    default: useBackgroundNative,
  });

  return useBackgroundForPlatform(style, styleName);
}
