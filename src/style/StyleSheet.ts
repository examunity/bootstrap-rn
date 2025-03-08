import { StyleSheet as BaseStyleSheet } from 'react-native';
import type { ExtendedStyle, BaseStyle, ThemeVariables } from '../types';

type StyleSourceEntry =
  | ((theme: object, key: string) => ExtendedStyle)
  | ExtendedStyle;

type NamedExtendedStyles<T extends string> = {
  [K in T]: ExtendedStyle;
};
type NamedStyles<T extends string> = {
  [K in T]: BaseStyle;
};

type StyleSheetDefinition<T extends string> = {
  source: {
    [K in T]: StyleSourceEntry;
  };
  cache: Record<string, NamedExtendedStyles<T>>;
  active: NamedExtendedStyles<T>;
};

let activeKey: string | null = null;

const themes: Record<string, ThemeVariables> = {};
const sheets: StyleSheetDefinition<string>[] = [];

const createSheet = <T extends string>(
  sheet: StyleSheetDefinition<T>,
): NamedExtendedStyles<T> => {
  if (!activeKey) {
    throw new Error('No active theme key.');
  }

  const theme = themes[activeKey];

  const statelessSource: Partial<NamedStyles<T>> = {};
  const statefulSource: Partial<NamedExtendedStyles<T>> = {};

  // Apply theme to themeable styles.
  Object.entries(sheet.source).forEach(([key, style]) => {
    // Resolve theme.
    const value = typeof style === 'function' ? style(theme, activeKey) : style;

    if (typeof value === 'function') {
      statefulSource[key as T] = value;
    } else {
      statelessSource[key as T] = value as BaseStyle;
    }
  });

  // Wrap stateful and stateless in a proxy, so that we can update the styles on theme change.
  // For using Object.assign below we need some additional methods on the proxy that are mentioned here:
  // https://stackoverflow.com/questions/43185453/object-assign-and-proxies
  return new Proxy(
    {
      keys: Object.keys(sheet.source),
      stateless: BaseStyleSheet.create(statelessSource as NamedStyles<string>),
      stateful: statefulSource,
    },
    {
      get(target, prop: T) {
        return target.stateless[prop] || target.stateful[prop] || undefined;
      },
      ownKeys: (target) => target.keys,
      getOwnPropertyDescriptor(target, name: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const proxy = this;

        return {
          get value() {
            return proxy.get(target, name);
          },
          configurable: true,
          enumerable: true,
        };
      },
      has: (target, name: string) => target.keys.indexOf(name) >= 0,
    },
  ) as NamedExtendedStyles<T>;
};

const { absoluteFill, absoluteFillObject, hairlineWidth } = BaseStyleSheet;

const StyleSheet = {
  create<T extends string>(source: { [K in T]: StyleSourceEntry }): {
    [K in T]: ExtendedStyle;
  } {
    // Create sheet object.
    const sheet: StyleSheetDefinition<T> = {
      source,
      cache: {},
      // @ts-expect-error Placeholder until build method is called.
      active: {},
    };

    // If initialized, set active sheet based by active theme.
    if (activeKey !== null) {
      sheet.cache[activeKey] = createSheet(sheet);
      Object.assign(sheet.active, sheet.cache[activeKey]);
    }

    sheets.push(sheet);

    return sheet.active;
  },
  build(theme: ThemeVariables, key: string = 'default') {
    if (!themes[key]) {
      themes[key] = theme;
    }

    // If theme is already set, we don't need to do anything.
    if (key === activeKey) {
      return;
    }

    // Set new theme active.
    activeKey = key;

    // Update style sheets.
    sheets.forEach((_, i) => {
      // If there is no result for the active theme, we'll create a themed
      // style sheet.
      if (!sheets[i].cache[key]) {
        sheets[i].cache[key] = createSheet(sheets[i]);
      }

      // Assign active object, which is also returned from the create
      // function, so style changes will be applied on next rerender in
      // the components as well.
      Object.assign(sheets[i].active, sheets[i].cache[key]);
    });
  },
  value(key: keyof ThemeVariables) {
    if (activeKey === null) {
      throw new Error('Use of StyleSheet.value() before initializing.');
    }

    const theme = themes[activeKey];

    return theme[key];
  },
  // Add default styles from StyleSheet
  absoluteFill,
  absoluteFillObject,
  hairlineWidth,
};

export default StyleSheet;
