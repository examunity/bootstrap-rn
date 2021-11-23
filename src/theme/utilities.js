import maps from './maps';
import css from '../style/css';

const make = (options) => {
  const result = {};

  Object.entries(options.values).forEach(([key, value]) => {
    result[`${options.class}-${key}`] = css`
      ${options.property}: ${value};
    `;
  });

  return result;
};

const utilities = {
  /* ...make({
    property: 'vertical-align',
    class: 'align',
    values: {
      baseline: 'baseline',
      top: 'top',
      middle: 'middle',
      bottom: 'bottom',
      textBottom: 'text-bottom',
      textTop: 'text-top',
    },
  }), */
  ...make({
    property: 'background-color',
    class: 'bg',
    values: {
      ...maps.utilititesBgColors,
      transparent: 'transparent',
    },
  }),
};

export default utilities;
