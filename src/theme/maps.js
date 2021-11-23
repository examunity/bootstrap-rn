import v from './variables';

const utilitiesColors = v.themeColors;

const utilitiesTextColors = {
  ...utilitiesColors,
  black: v.black,
  white: v.white,
  body: v.bodyColor,
};

const utilititesBgColors = {
  ...utilitiesColors,
  black: v.black,
  white: v.white,
  body: v.bodyBg,
};

const negativeSpacers = Object.values(v.spacers).map((spacer) => -1 * spacer);

const gutters = v.spacers;

const maps = {
  utilitiesColors,
  utilitiesTextColors,
  utilititesBgColors,
  negativeSpacers,
  gutters,
};

export default maps;
