import { UTILITIES_TEXT_COLORS, UTILITIES_BG_COLORS } from './maps';
import css from '../style/css';
import { each } from '../utils';

const make = (options) =>
  each(options.values, (key, value) => ({
    [`${options.class}-${key}`]: css`
      ${options.property}: ${value};
    `,
  }));

const utilities = {
  ...make({
    property: 'vertical-align',
    class: 'align',
    values: {
      baseline: 'baseline',
      top: 'top',
      middle: 'middle',
      bottom: 'bottom',
      'text-bottom': 'text-bottom',
      'text-top': 'text-top',
    },
  }),
  ...make({
    property: 'color',
    class: 'text',
    values: {
      ...UTILITIES_TEXT_COLORS,
      muted: (t) => t['text-muted'],
      'black-50': (t) => `rgba(${t.black}, 0.5)`,
      'white-50': (t) => `rgba(${t.white}, 0.5)`,
    },
  }),
  ...make({
    property: 'background-color',
    class: 'bg',
    values: {
      ...UTILITIES_BG_COLORS,
      transparent: 'transparent',
    },
  }),

};

export default utilities;
/*

  ...make({
    property: 'boxshadow',
    class: 'shadow',
    values: {
      null: $box - shadow,
      sm: $box - shadow - sm,
      lg: $box - shadow - lg,
      none: none,
    },
  }),
*/