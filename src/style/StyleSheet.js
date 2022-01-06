import { StyleSheet as BaseStyleSheet } from 'react-native';
import transform from './transform';
import { BOOTSTYLE_DEFINITION } from './symbols';
import variables from '../theme/variables';

let activeThemeKey = null;

const themes = [];
const sheets = [];

const updateThemeKey = (source) => {
  const hash = JSON.stringify(source);

  const key = themes.findIndex((theme) => theme.hash === hash);

  if (key === -1) {
    const length = themes.push({ hash, source });

    return length - 1;
  }

  return key;
};

const resolveVariables = (theme) => {
  if (variables.$$typeof !== BOOTSTYLE_DEFINITION) {
    return { ...variables, ...theme.variables };
  }

  const result = transform(variables.ast.children, theme);

  return result[0].variables;
};

const createSheet = (sheet) => {
  const theme = themes[activeThemeKey].source;

  const statelessSource = {};
  const statefulSource = {};

  // Apply theme to themeable styles.
  Object.entries(sheet.source).forEach(([key, style]) => {
    // Resolve theme.
    const value = typeof style === 'function' ? style(theme) : style;

    if (typeof value === 'function') {
      statefulSource[key] = value;
    } else {
      statelessSource[key] = value;
    }
  });

  // Wrap stateful and stateless in a proxy, so that we can update the styles on theme change.
  // For using Object.assign below we need some additional methods on the proxy that are mentioned here:
  // https://stackoverflow.com/questions/43185453/object-assign-and-proxies
  return new Proxy(
    {
      keys: Object.keys(sheet.source),
      stateless: BaseStyleSheet.create(statelessSource),
      stateful: statefulSource,
    },
    {
      get(target, prop) {
        return target.stateless[prop] || target.stateful[prop] || undefined;
      },
      ownKeys: (target) => target.keys,
      getOwnPropertyDescriptor(target, name) {
        const proxy = this;
        return {
          get value() {
            return proxy.get(target, name);
          },
          configurable: true,
          enumerable: true,
        };
      },
      has: (target, name) => target.keys.indexOf(name) >= 0,
    },
  );
};

const StyleSheet = {
  create(source) {
    // Create sheet object.
    const sheet = {
      source,
      cache: {},
      active: null,
    };

    // If initialized, set active sheet based by active theme.
    if (activeThemeKey !== null) {
      sheet.cache[activeThemeKey] = createSheet(sheet);
      sheet.active = sheet.cache[activeThemeKey];
    } else {
      // Placeholder until build method is called.
      sheet.active = {};
    }

    sheets.push(sheet);

    return sheet.active;
  },
  build(theme = {}) {
    const themeKey = updateThemeKey({
      variables: resolveVariables(theme),
    });

    // If theme is already set, we don't need to do anything.
    if (themeKey === activeThemeKey) {
      return;
    }

    // Set new theme active.
    activeThemeKey = themeKey;

    // Update style sheets.
    sheets.forEach((_, key) => {
      // If there is no result for the active theme, we'll create a themed
      // style sheet.
      if (!sheets[key].cache[themeKey]) {
        sheets[key].cache[themeKey] = createSheet(sheets[key]);
      }

      // Assign active object, which is also returned from the create
      // function, so style changes will be applied on next rerender in
      // the components as well.
      Object.assign(sheets[key].active, sheets[key].cache[themeKey]);
    });
  },
  value(key) {
    if (activeThemeKey === null) {
      throw new Error('Use of StyleSheet.value() before initializing.');
    }

    const theme = themes[activeThemeKey].source;

    return theme.variables[key];
  },
};

export default StyleSheet;
