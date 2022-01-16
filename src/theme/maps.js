import { THEME_COLORS, SPACERS } from './proxies';
import { each } from '../utils';

export const UTILITIES_COLORS = THEME_COLORS;

export const UTILITIES_TEXT_COLORS = {
  ...UTILITIES_COLORS,
  black: (t) => t.black,
  white: (t) => t.white,
  body: (t) => t['body-color'],
};

export const UTILITIES_BG_COLORS = {
  ...UTILITIES_COLORS,
  black: (t) => t.black,
  white: (t) => t.white,
  body: (t) => t['body-bg'],
};

export const NEGATIVE_SPACERS = each(SPACERS, (state, spacer) => ({
  [state]: (t) => -1 * spacer(t),
}));

export const GUTTERS = SPACERS;
