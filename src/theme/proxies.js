import { makeProxy } from '../utils';

// These are proxy objects for the Bootstrap Sass maps that provide the map
// keys, but not the resolved values. The values are added later by the used
// theme.

// Color system

export const GRAYS = makeProxy('grays', [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]);

export const COLORS = makeProxy('colors', [
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
]);

export const THEME_COLORS = makeProxy('theme-colors', [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
]);

export const BLUES = makeProxy('blues', [
  'blue-100',
  'blue-200',
  'blue-300',
  'blue-400',
  'blue-500',
  'blue-600',
  'blue-700',
  'blue-800',
  'blue-900',
]);

export const INDIGOS = makeProxy('indigos', [
  'indigo-100',
  'indigo-200',
  'indigo-300',
  'indigo-400',
  'indigo-500',
  'indigo-600',
  'indigo-700',
  'indigo-800',
  'indigo-900',
]);

export const PURPLES = makeProxy('purples', [
  'purple-100',
  'purple-200',
  'purple-300',
  'purple-400',
  'purple-500',
  'purple-600',
  'purple-700',
  'purple-800',
  'purple-900',
]);

export const PINKS = makeProxy('pinks', [
  'pink-100',
  'pink-200',
  'pink-300',
  'pink-400',
  'pink-500',
  'pink-600',
  'pink-700',
  'pink-800',
  'pink-900',
]);

export const REDS = makeProxy('reds', [
  'red-100',
  'red-200',
  'red-300',
  'red-400',
  'red-500',
  'red-600',
  'red-700',
  'red-800',
  'red-900',
]);

export const ORANGES = makeProxy('oranges', [
  'orange-100',
  'orange-200',
  'orange-300',
  'orange-400',
  'orange-500',
  'orange-600',
  'orange-700',
  'orange-800',
  'orange-900',
]);

export const YELLOWS = makeProxy('yellows', [
  'yellow-100',
  'yellow-200',
  'yellow-300',
  'yellow-400',
  'yellow-500',
  'yellow-600',
  'yellow-700',
  'yellow-800',
  'yellow-900',
]);

export const GREENS = makeProxy('greens', [
  'green-100',
  'green-200',
  'green-300',
  'green-400',
  'green-500',
  'green-600',
  'green-700',
  'green-800',
  'green-900',
]);

export const TEALS = makeProxy('teals', [
  'teal-100',
  'teal-200',
  'teal-300',
  'teal-400',
  'teal-500',
  'teal-600',
  'teal-700',
  'teal-800',
  'teal-900',
]);

export const CYANS = makeProxy('cyans', [
  'cyan-100',
  'cyan-200',
  'cyan-300',
  'cyan-400',
  'cyan-500',
  'cyan-600',
  'cyan-700',
  'cyan-800',
  'cyan-900',
]);

// Spacing
//
// Control the default styling of most Bootstrap elements by modifying these
// variables. Mostly focused on spacing.
// You can add more entries to the $spacers map, should you need more variation.

export const SPACERS = makeProxy('spacers', [0, 1, 2, 3, 4, 5]);

// Grid breakpoints
//
// Define the minimum dimensions at which your layout will change,
// adapting to different screen sizes, for use in media queries.

export const GRID_BREAKPOINTS = makeProxy('grid-breakpoints', [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
]);

// Grid containers
//
// Define the maximum width of ".container" for different screen sizes.

export const CONTAINER_MAX_WIDTHS = makeProxy('container-max-widths', [
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
]);

// Grid columns
//
// Set the number of columns and specify the width of the gutters.

export const GRID_COLUMNS = 12;

export const GRID_ROW_COLUMNS = 6;

// Components
//
// Define common padding and border radius sizes and more.

export const BORDER_WIDTHS = makeProxy('border-widths', [1, 2, 3, 4, 5]);

export const ASPECT_RATIOS = makeProxy('aspect-ratios', [
  '1x1',
  '4x3',
  '16x9',
  '21x9',
]);

// Typography
//
// Font, line-height, and color for body text, headings, and more.

export const FONT_SIZES = makeProxy('font-sizes', [1, 2, 3, 4, 5, 6]);

export const DISPLAY_FONT_SIZES = makeProxy('display-font-sizes', [
  1,
  2,
  3,
  4,
  5,
  6,
]);

// Forms

export const FORM_VALIDATION_STATES = makeProxy('form-validation-states', [
  'valid',
  'invalid',
]);
