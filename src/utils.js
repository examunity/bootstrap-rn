import { PixelRatio } from 'react-native';
import css from './style/css';

export function each(source, apply) {
  return Object.entries(source)
    .map(([key, value]) => {
      const resolve = typeof value === 'function' ? value : () => value;

      return apply(key, resolve);
    })
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function makeProxy(name, keys) {
  return keys.reduce(
    (result, key) => ({ ...result, [key]: (t) => t[name][key] }),
    {},
  );
}

export function makeArray(length, callback) {
  return Array.from({ length }, (_, i) => (callback ? callback(i) : i));
}

export function makeUtility(options) {
  return each(options.values, (key, value) => ({
    [`${options.class || options.property}-${key}`]: css`
      ${options.property}: ${value};
    `,
  }));
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
