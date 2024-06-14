import { THEME_COLORS, SPACERS } from './proxies';
import { each } from '../utils';
import { ThemeVariables } from '../types';

export const UTILITIES_COLORS = THEME_COLORS;

export const UTILITIES_TEXT_COLORS = {
  ...UTILITIES_COLORS,
  black: (t: ThemeVariables) => t.black,
  white: (t: ThemeVariables) => t.white,
  body: (t: ThemeVariables) => t['body-color'],
};

export const UTILITIES_BG_COLORS = {
  ...UTILITIES_COLORS,
  black: (t: ThemeVariables) => t.black,
  white: (t: ThemeVariables) => t.white,
  body: (t: ThemeVariables) => t['body-bg'],
};

export const NEGATIVE_SPACERS = each(
  SPACERS,
  (key: number, value: (t: ThemeVariables) => void) => {
    if (key === 0) {
      return null;
    }

    return {
      [`n${key}`]: (t: ThemeVariables) => `-${value(t)}`,
    };
  },
);

export const GUTTERS = SPACERS;

const maps = {
  UTILITIES_COLORS,
  UTILITIES_TEXT_COLORS,
  UTILITIES_BG_COLORS,
  NEGATIVE_SPACERS,
  GUTTERS,
};

export default maps;
