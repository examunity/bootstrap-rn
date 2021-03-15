import { StyleSheet as BaseStyleSheet } from 'react-native';

let activeThemeKey = null;

const themes = [];
const sheets = [];

function updateThemeKey(source) {
  const hash = JSON.stringify(source);

  const key = themes.findIndex((theme) => theme.hash === hash);

  if (key === -1) {
    const length = themes.push({ hash, source });

    return length - 1;
  }

  return key;
}

function createSheet(sheet) {
  const theme = themes[activeThemeKey].source;

  const statelessSource = {};
  const statefulSource = {};

  // Apply theme to themeable styles.
  Object.entries(sheet.source).forEach(([key, style]) => {
    const value = typeof style === 'function' ? style(theme) : style;

    if (typeof value === 'function') {
      statelessSource[key] = value;
    } else {
      statefulSource[key] = value;
    }
  });

  // Wrap stateful and stateless in a proxy, so that we can access
  return new Proxy(
    {
      stateless: BaseStyleSheet.create(statelessSource),
      stateful: statefulSource,
    },
    {
      get(target, prop) {
        return target.stateless[prop] || target.stateful[prop] || undefined;
      },
    },
  );
}

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
      sheet.active = { ...source };
    }

    sheets.push(sheet);

    return sheet.active;
  },
  build(theme: Object) {
    const themeKey = updateThemeKey(theme);

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

    return theme[key.substr(1)];
  },
};

export default StyleSheet;
