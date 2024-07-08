import { Platform, PixelRatio } from 'react-native';

const transformREMUnitRE = /([+-]+)?([\d.Ee]+)rem/g;

const convertRemToPx = (value: number) =>
  PixelRatio.getFontScale() * 16 * value;

function rem(value: string) {
  if (Platform.OS === 'web') {
    return value;
  }

  return value.replace(
    transformREMUnitRE,
    (_, unary, number) => `${unary || ''}${convertRemToPx(number)}px`,
  );
}

export default rem;
