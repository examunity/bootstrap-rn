import { StyleSheet as BaseStyleSheet } from 'react-native';
import { UniversalStyle, UniversalBaseStyle, ThemeVariables } from '../types';

type StyleSource = Record<
  string,
  (theme: object, key: string) => UniversalStyle | UniversalStyle
>;

type StyleSheetDefinition = {
  source: StyleSource;
  cache: Record<string, Record<string, UniversalStyle>>;
  active: Record<string, UniversalStyle> | null;
};

let activeKey: string | null = null;

const themes: Record<string, ThemeVariables> = {};
const sheets: StyleSheetDefinition[] = [];

const createSheet = (
  sheet: StyleSheetDefinition,
): Record<string, UniversalStyle> => {
  const theme = themes[activeKey as string];

  const statelessSource: Record<string, UniversalBaseStyle> = {};
  const statefulSource: Record<string, UniversalStyle> = {};

  // Apply theme to themeable styles.
  Object.entries(sheet.source).forEach(([key, style]) => {
    // Resolve theme.
    const value =
      typeof style === 'function' ? style(theme, activeKey as string) : style;

    if (typeof value === 'function') {
      statefulSource[key] = value;
    } else {
      statelessSource[key] = value as UniversalBaseStyle;
    }
  });

  // Wrap stateful and stateless in a proxy, so that we can update the styles on theme change.
  // For using Object.assign below we need some additional methods on the proxy that are mentioned here:
  // https://stackoverflow.com/questions/43185453/object-assign-and-proxies
  // @ts-expect-error proxy is equivalent to Record<string, UniversalStyle>
  return new Proxy(
    {
      keys: Object.keys(sheet.source),
      stateless: BaseStyleSheet.create(statelessSource),
      stateful: statefulSource,
    },
    {
      get(target, prop: string) {
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
  );
};

const { absoluteFill, absoluteFillObject, hairlineWidth } = BaseStyleSheet;

const StyleSheet = {
  create(source: StyleSource) {
    // Create sheet object.
    const sheet: StyleSheetDefinition = {
      source,
      cache: {},
      active: null,
    };

    // If initialized, set active sheet based by active theme.
    if (activeKey !== null) {
      sheet.cache[activeKey] = createSheet(sheet);
      sheet.active = sheet.cache[activeKey];
    } else {
      // Placeholder until build method is called.
      sheet.active = {};
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
  value(key: string) {
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
