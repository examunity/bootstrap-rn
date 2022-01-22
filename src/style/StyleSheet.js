import { StyleSheet as BaseStyleSheet } from 'react-native';

let activeKey = null;

const themes = {};
const sheets = [];

const createSheet = (sheet) => {
  const theme = themes[activeKey];

  const statelessSource = {};
  const statefulSource = {};

  // Apply theme to themeable styles.
  Object.entries(sheet.source).forEach(([key, style]) => {
    // Resolve theme.
    const value = typeof style === 'function' ? style(theme, activeKey) : style;

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
  build(theme, key = 'default') {
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
  value(key) {
    if (activeKey === null) {
      throw new Error('Use of StyleSheet.value() before initializing.');
    }

    const theme = themes[activeKey];

    return theme[key];
  },
};

export default StyleSheet;
