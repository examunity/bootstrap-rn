import { PixelRatio } from 'react-native';

export function each(source, apply) {
  return Object.entries(source)
    .map(([key, value]) => {
      const resolve = typeof value === 'function' ? value : () => value;

      return apply(key, resolve);
    })
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function getStyles(styles, keys) {
  return keys.filter((key) => !!key).map((key) => styles[key]);
}

export function convertToREM(value) {
  return value.replace(
    /([+-]+)?([\d.Ee]+)px/,
    (_, unary, number) =>
      `${unary || ''}${number / (PixelRatio.getFontScale() * 16)}rem`,
  );
}
