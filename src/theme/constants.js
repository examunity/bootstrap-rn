// Color system

export const GRAYS = {
  100: (t) => t['gray-100'],
  200: (t) => t['gray-200'],
  300: (t) => t['gray-300'],
  400: (t) => t['gray-400'],
  500: (t) => t['gray-500'],
  600: (t) => t['gray-600'],
  700: (t) => t['gray-700'],
  800: (t) => t['gray-800'],
  900: (t) => t['gray-900'],
};

export const COLORS = {
  blue: (t) => t.blue,
  indigo: (t) => t.indigo,
  purple: (t) => t.purple,
  pink: (t) => t.pink,
  red: (t) => t.red,
  orange: (t) => t.orange,
  yellow: (t) => t.yellow,
  green: (t) => t.green,
  teal: (t) => t.teal,
  cyan: (t) => t.cyan,
};

export const THEME_COLORS = {
  primary: (t) => t.primary,
  secondary: (t) => t.secondary,
  success: (t) => t.success,
  info: (t) => t.info,
  warning: (t) => t.warning,
  danger: (t) => t.danger,
  light: (t) => t.light,
  dark: (t) => t.dark,
};

export const BLUES = {
  100: (t) => t['blue-100'],
  200: (t) => t['blue-200'],
  300: (t) => t['blue-300'],
  400: (t) => t['blue-400'],
  500: (t) => t['blue-500'],
  600: (t) => t['blue-600'],
  700: (t) => t['blue-700'],
  800: (t) => t['blue-800'],
  900: (t) => t['blue-900'],
};

export const INDIGOS = {
  100: (t) => t['indigo-100'],
  200: (t) => t['indigo-200'],
  300: (t) => t['indigo-300'],
  400: (t) => t['indigo-400'],
  500: (t) => t['indigo-500'],
  600: (t) => t['indigo-600'],
  700: (t) => t['indigo-700'],
  800: (t) => t['indigo-800'],
  900: (t) => t['indigo-900'],
};

export const PURPLES = {
  100: (t) => t['purple-100'],
  200: (t) => t['purple-200'],
  300: (t) => t['purple-300'],
  400: (t) => t['purple-400'],
  500: (t) => t['purple-500'],
  600: (t) => t['purple-600'],
  700: (t) => t['purple-700'],
  800: (t) => t['purple-800'],
  900: (t) => t['purple-900'],
};

export const PINKS = {
  100: (t) => t['pink-100'],
  200: (t) => t['pink-200'],
  300: (t) => t['pink-300'],
  400: (t) => t['pink-400'],
  500: (t) => t['pink-500'],
  600: (t) => t['pink-600'],
  700: (t) => t['pink-700'],
  800: (t) => t['pink-800'],
  900: (t) => t['pink-900'],
};

export const REDS = {
  100: (t) => t['red-100'],
  200: (t) => t['red-200'],
  300: (t) => t['red-300'],
  400: (t) => t['red-400'],
  500: (t) => t['red-500'],
  600: (t) => t['red-600'],
  700: (t) => t['red-700'],
  800: (t) => t['red-800'],
  900: (t) => t['red-900'],
};

export const ORANGES = {
  100: (t) => t['orange-100'],
  200: (t) => t['orange-200'],
  300: (t) => t['orange-300'],
  400: (t) => t['orange-400'],
  500: (t) => t['orange-500'],
  600: (t) => t['orange-600'],
  700: (t) => t['orange-700'],
  800: (t) => t['orange-800'],
  900: (t) => t['orange-900'],
};

export const YELLOWS = {
  100: (t) => t['yellow-100'],
  200: (t) => t['yellow-200'],
  300: (t) => t['yellow-300'],
  400: (t) => t['yellow-400'],
  500: (t) => t['yellow-500'],
  600: (t) => t['yellow-600'],
  700: (t) => t['yellow-700'],
  800: (t) => t['yellow-800'],
  900: (t) => t['yellow-900'],
};

export const GREENS = {
  100: (t) => t['green-100'],
  200: (t) => t['green-200'],
  300: (t) => t['green-300'],
  400: (t) => t['green-400'],
  500: (t) => t['green-500'],
  600: (t) => t['green-600'],
  700: (t) => t['green-700'],
  800: (t) => t['green-800'],
  900: (t) => t['green-900'],
};

export const TEALS = {
  100: (t) => t['teal-100'],
  200: (t) => t['teal-200'],
  300: (t) => t['teal-300'],
  400: (t) => t['teal-400'],
  500: (t) => t['teal-500'],
  600: (t) => t['teal-600'],
  700: (t) => t['teal-700'],
  800: (t) => t['teal-800'],
  900: (t) => t['teal-900'],
};

export const CYANS = {
  100: (t) => t['cyan-100'],
  200: (t) => t['cyan-200'],
  300: (t) => t['cyan-300'],
  400: (t) => t['cyan-400'],
  500: (t) => t['cyan-500'],
  600: (t) => t['cyan-600'],
  700: (t) => t['cyan-700'],
  800: (t) => t['cyan-800'],
  900: (t) => t['cyan-900'],
};

// Spacing
//
// Control the default styling of most Bootstrap elements by modifying these
// variables. Mostly focused on spacing.
// You can add more entries to the $spacers map, should you need more variation.

export const SPACER_KEYS = [0, 1, 2, 3, 4, 5];

export const SPACERS = {
  0: 0,
  1: (t) => t.spacer * 0.25,
  2: (t) => t.spacer * 0.5,
  3: (t) => t.spacer,
  4: (t) => t.spacer * 1.5,
  5: (t) => t.spacer * 3,
};

// Grid breakpoints
//
// Define the minimum dimensions at which your layout will change,
// adapting to different screen sizes, for use in media queries.

export const GRID_BREAKPOINT_KEYS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const GRID_COLUMNS = 12;

export const GRID_ROW_COLUMNS = 6;
