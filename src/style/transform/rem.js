import { Platform, PixelRatio } from 'react-native';

const transformREMUnitRE = /([+-]+)?([\d.Ee]+)rem/g;

function rem(value) {
  if (Platform.OS === 'web') {
    return value;
  }

  return value.replace(
    transformREMUnitRE,
    (_, unary, number) =>
      `${unary || ''}${PixelRatio.getFontScale() * 16 * number}px`,
  );
}

export default rem;
