import type { ExtendedStyle, ThemeVariables, StyleValue } from './types';

export function each<
  T extends Record<string, string | ((t: ThemeVariables) => StyleValue)>,
>(
  source: T,
  apply: (
    key: keyof T,
    resolve: (t: ThemeVariables) => StyleValue,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Record<string, any>,
) {
  return Object.entries(source)
    .map(([key, value]) => {
      const resolve = typeof value === 'function' ? value : () => value;
      return apply(key, resolve);
    })
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function normalize(value: object[]) {
  return value.reduce((carry, item) => Object.assign(carry, item), {});
}

export function makeProxy<T extends (string | number)[]>(
  name: string,
  keys: T,
) {
  return keys.reduce(
    (result, key) => ({
      ...result,
      [key]: (t: ThemeVariables) => t[name][key],
    }),
    {} as { [key in T[number]]: (t: ThemeVariables) => StyleValue },
  );
}

export function makeArray(length: number, callback: (index: number) => object) {
  return Array.from({ length }, (_, i) => callback(i));
}

type FalsyValue = false | undefined | null | '' | 0;

export function getStyles<T extends string>(
  styles: Record<string, ExtendedStyle>,
  keys: (T | FalsyValue)[],
) {
  return keys
    .filter((key: T | FalsyValue): key is T => !!key)
    .map((key) => styles[key]);
}

export function concatRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.Ref<T> {
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

export function optional(condition: boolean, value: object) {
  return condition ? value : undefined;
}

export function getElementId(identifier: string, name: string) {
  return `${identifier}${name ? `-${name}` : ''}`;
}
