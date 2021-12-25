import { THEME_COLORS, SPACERS } from './constants';

export const UTILITIES_COLORS = THEME_COLORS;

export const UTILITIES_TEXT_COLORS = {
  ...UTILITIES_COLORS,
  black: 'black',
  white: 'white',
  body: 'body-color',
};

export const UTILITIES_BG_COLORS = {
  ...UTILITIES_COLORS,
  black: 'black',
  white: 'white',
  body: 'body-bg',
};

export const NEGATIVE_SPACERS = Object.values(SPACERS).map(
  (spacer) => -1 * spacer,
);

export const GUTTERS = SPACERS;
