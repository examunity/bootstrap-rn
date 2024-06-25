import { StyleSheet } from 'react-native';
import { BaseStyle } from '../types';

type Position = 'center' | 'left' | 'right' | 'top' | 'bottom';
type PositionX = 'center' | 'left' | 'right';
type PositionY = 'center' | 'top' | 'bottom';

type BackgroundStyleType = BaseStyle & {
  backgroundSize?: 'contain' | 'cover' | string | number;
  backgroundPosition?: Position;
  backgroundPositionX?:
    | PositionX
    | { position: PositionX; offset: string | number };
  backgroundPositionY?:
    | PositionY
    | { position: PositionY; offset: string | number };
};

const styles = StyleSheet.create({
  reset: {
    // Background repeat is not supported on native yet.
    // @ts-expect-error 'backgroundRepeat' does not exist in type 'ViewStyle | ImageStyle | TextStyl
    backgroundRepeat: 'no-repeat',
  },
});

const normalizeValue = (value: number | string): string =>
  typeof value === 'number' && value !== 0 ? `${value}px` : String(value);

const resolveBackgroundSize = (style: BackgroundStyleType) => {
  const { backgroundSize } = style;

  if (typeof backgroundSize !== 'object') {
    return backgroundSize;
  }

  const { width = 'auto', height = 'auto' } = backgroundSize;

  return `${normalizeValue(width)} ${normalizeValue(height)}`;
};

const resolveBackgroundPosition = (style: BackgroundStyleType) => {
  const { backgroundPosition, backgroundPositionX, backgroundPositionY } =
    style;

  if (!backgroundPosition && !backgroundPositionX && !backgroundPositionY) {
    return null;
  }

  const value = {
    positionX: backgroundPosition || 'left',
    offsetX: '0',
    positionY: backgroundPosition || 'top',
    offsetY: '0',
  };

  if (backgroundPositionX) {
    const { position: positionX = 'left', offset: offsetX = 0 } =
      typeof backgroundPositionX === 'object'
        ? backgroundPositionX
        : { position: backgroundPositionX };

    value.positionX = positionX;
    value.offsetX = normalizeValue(offsetX);
  }

  if (backgroundPositionY) {
    const { position: positionY = 'top', offset: offsetY = 0 } =
      typeof backgroundPositionY === 'object'
        ? backgroundPositionY
        : { position: backgroundPositionY };

    value.positionY = positionY;
    value.offsetY = normalizeValue(offsetY);
  }

  const valueX = value.offsetX
    ? `${value.positionX} ${value.offsetX}`
    : value.positionX;
  const valueY = value.offsetY
    ? `${value.positionY} ${value.offsetY}`
    : value.positionY;

  return `${valueX} ${valueY}`;
};

export default function useBackground(style: BaseStyle[]) {
  const flattenedStyle = StyleSheet.flatten(style);

  return {
    style: [
      flattenedStyle,
      styles.reset,
      {
        // Transform background size
        backgroundSize: resolveBackgroundSize(flattenedStyle),
        // Workaround, because some browsers do not support two-value syntax:
        // https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-x#browser_compatibility
        backgroundPositionX: null,
        backgroundPositionY: null,
        backgroundPosition: resolveBackgroundPosition(flattenedStyle),
      },
    ],
    element: null,
  };
}
