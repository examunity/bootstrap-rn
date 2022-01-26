import { PixelRatio } from 'react-native';

export function each(source, apply) {
  return Object.entries(source)
    .map(([key, value]) => {
      const resolve = typeof value === 'function' ? value : () => value;

      return apply(key, resolve);
    })
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function normalize(value) {
  return value.reduce((carry, item) => Object.assign(carry, item), {});
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

export function getStyles(styles, keys) {
  return keys.filter((key) => !!key).map((key) => styles[key]);
}

export function concatRefs(...refs) {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = element;
      }
    });
  };
}

export function concatFns(...fns) {
  return (event) => {
    fns.forEach((fn) => {
      if (fn) {
        fn(event);
      }
    });
  };
}

export function optional(condition, value) {
  return condition ? value : undefined;
}

export function getElementId(identifier, name) {
  return `${identifier}${name ? `-${name}` : ''}`;
}

export function convertToREM(value) {
  return value.replace(
    /([+-]+)?([\d.Ee]+)px/,
    (_, unary, number) =>
      `${unary || ''}${number / (PixelRatio.getFontScale() * 16)}rem`,
  );
}
