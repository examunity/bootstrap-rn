import { UTILITIES_BG_COLORS } from './maps';
import css from '../style/css';
import { each } from '../utils';

const make = (options) =>
  each(options.values, (key, value) => ({
    [`${options.class}-${key}`]: css`
      ${options.property}: ${value};
    `,
  }));

const utilities = {
  /* ...make({
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
  }), */
  ...make({
    property: 'background-color',
    class: 'bg',
    values: {
      ...UTILITIES_BG_COLORS,
      transparent: () => 'transparent',
    },
  }),
};

export default utilities;
