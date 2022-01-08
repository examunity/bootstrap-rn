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
  /* ...make({
    property: 'vertical-align',
    class: 'align',
    values: {
      baseline: 'baseline',
      top: 'baseline',
      middle: 'baseline',
      bottom: 'baseline',
      'text-bottom': 'text-bottom',
      'text-top': 'text-top',
    },
  }), */
  /* ...make({
    property: 'float',
    class: 'float',
    values: {
      start: 'left',
      end: 'right',
      none: 'none',
    },
  }), */
  ...make({
    property: 'opacity',
    class: 'opacity',
    values: {
      0: '0',
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
  }),
  ...make({
    property: 'overflow',
    class: 'overflow',
    values: {
      // auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
  }),
  /* ...make({
    // print: true,
    property: 'display',
    class: 'd',
    values: {
      inline: 'inline',
      'inline-block': 'inline-block',
      block: 'block',
      grid: 'grid',
      table: 'table',
      'table-row': 'table-row',
      'table-cell': 'table-cell',
      'inline-flex': 'inline-flex',
      none: 'none',
    },
  }), */
  ...make({
    property: 'box-shadow',
    class: 'shadow',
    values: {
      null: (t) => t['box-shadow'],
      sm: (t) => t['box-shadow-sm'],
      lg: (t) => t['box-shadow-lg'],
      none: 'none',
    },
  }),
  ...make({
    property: 'position',
    class: 'position',
    values: {
      // static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      // fixed: 'fixed',
      // sticky: 'sticky',
    },
  }),
  ...make({
    property: 'top',
    class: 'top',
    values: {
      // $position-values
    },
  }),
  ...make({
    property: 'bottom',
    class: 'bottom',
    values: {
      // values: $position-values
    },
  }),
  ...make({
    property: 'left',
    class: 'start',
    values: {
      // values: $position-values
    },
  }),
  /* TODO:
  ...make({
    property: 'transform',
    class: 'translate-middle',
    values: {
      null: translate(-50%, -50%),
      x: translateX(-50%),
      y: translateY(-50%),
    },
  }),
  */
  ...make({
    property: 'border',
    class: 'border',
    values: {
      // null: $border-width solid $border-color,
      0: '0',
    },
  }),
  /* ...make({
    property: 'border-top',
    class: 'border-top',
    values: {
      // null: $border-width solid $border-color,
      0: '0',
    },
  }),
  ...make({
    property: 'border-right',
    class: 'border-end',
    values: {
      // null: $border-width solid $border-color,
      0: '0',
    },
  }),
  ...make({
    property: 'border-bottom',
    class: 'border-bottom',
    values: {
      // null: $border-width solid $border-color,
      0: '0',
    },
  }),
  ...make({
    property: 'border-left',
    class: 'border-start',
    values: {
      // null: $border-width solid $border-color,
      0: '0',
    },
  }), */
  ...make({
    property: 'border-color',
    class: 'border',
    values: {
      // values: map-merge($theme-colors, ("white": $white))
    },
  }),
  ...make({
    property: 'border-width',
    class: 'border',
    values: {
      // $border-widths
    },
  }),
  ...make({
    property: 'width',
    class: 'w',
    values: {
      25: '25%',
      50: '50%',
      75: '75%',
      100: '100%',
      auto: 'auto',
    },
  }),
  ...make({
    property: 'max-width',
    class: 'mw',
    values: {
      100: '100%',
    },
  }),
  ...make({
    // "viewport-width": (
    property: 'width',
    class: 'vw',
    values: {
      100: '100vw',
    },
  }),
  ...make({
    // "min-viewport-width": (
    property: 'min-width',
    class: 'min-vw',
    values: {
      100: '100vw',
    },
  }),
  ...make({
    property: 'height',
    class: 'h',
    values: {
      25: '25%',
      50: '50%',
      75: '75%',
      100: '100%',
      auto: 'auto',
    },
  }),
  ...make({
    property: 'max-height',
    class: 'mh',
    values: {
      100: '100%',
    },
  }),
  ...make({
    // "viewport-height": (
    property: 'height',
    class: 'vh',
    values: {
      100: '100vh',
    },
  }),
  ...make({
    // "min-viewport-height": (
    property: 'min-height',
    class: 'min-vh',
    values: {
      100: '100vh',
    },
  }),
  ...make({
    property: 'flex',
    class: 'flex',
    values: {
      fill: '1 1 auto',
    },
  }),
  ...make({
    property: 'flex-direction',
    class: 'flex',
    values: {
      row: 'row',
      colum: 'column',
      'row-reverse': 'row-reverse',
      'column-reverse': 'column-reverse',
    },
  }),
  ...make({
    property: 'flex-grow',
    class: 'flex',
    values: {
      'grow-0': '0',
      'grow-1': '1',
    },
  }),
  ...make({
    property: 'flex-shrink',
    class: 'flex',
    values: {
      'shrink-0': '0',
      'shrink-1': '1',
    },
  }),
  ...make({
    property: 'flex-wrap',
    class: 'flex',
    values: {
      wrap: 'wrap',
      nowrap: 'nowrap',
      'wrap-reverse': 'wrap-reverse',
    },
  }),
  ...make({
    property: 'gap',
    class: 'gap',
    values: {
      // $spacers
    },
  }),
  ...make({
    property: 'justify-content',
    class: 'justify-content',
    values: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      // evenly: 'space-evenly',
    },
  }),
  ...make({
    property: 'align-items',
    class: 'align-items',
    values: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch',
    },
  }),
  ...make({
    property: 'align-content',
    class: 'align-content',
    values: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      stretch: 'stretch',
    },
  }),
  ...make({
    property: 'align-self',
    class: 'align-self',
    values: {
      auto: 'auto',
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch',
    },
  }),
  /* ...make({
    property: 'order',
    class: 'order',
    values: {
      first: '-1',
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      last: '6',
    },
  }), */
  ...make({
    property: 'margin',
    class: 'm',
    values: {
      // values: map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    // "margin-x": (
    // property: margin-right margin-left,
    property: 'margin-x',
    class: 'mx',
    values: {
      // values: map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    // property: margin-top margin-bottom,
    property: 'margin-y',
    class: 'my',
    values: {
      // map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    property: 'margin-top',
    class: 'mt',
    values: {
      // map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    // "margin-end": (
    property: 'margin-right',
    class: 'me',
    values: {
      // values: map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    property: 'margin-bottom',
    class: 'mb',
    values: {
      // values: map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    // "margin-start": (
    property: 'margin-left',
    class: 'ms',
    values: {
      // values: map-merge($spacers, (auto: auto))
    },
  }),
  ...make({
    // "negative-margin": (
    property: 'margin',
    class: 'm',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    // property: margin-right margin-left,
    property: 'negative-margin-x',
    class: 'mx',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    // property: margin-top margin-bottom,
    property: 'negative-margin-y',
    class: 'my',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    // "negative-margin-top": (
    property: 'margin-top',
    class: 'mt',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    // "negative-margin-end": (
    property: 'margin-right',
    class: 'me',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    // "negative-margin-bottom": (
    property: 'margin-bottom',
    class: 'mb',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    // "negative-margin-start": (
    property: 'margin-left',
    class: 'ms',
    values: {
      // values: $negative-spacers
    },
  }),
  ...make({
    property: 'padding',
    class: 'p',
    values: {
      // values: $spacers
    },
  }),
  ...make({
    // property: padding-right padding-left,
    property: 'padding-x',
    class: 'px',
    values: {
      // values: $spacers
    },
  }),
  ...make({
    // property: padding-top padding-bottom,
    property: 'padding-y',
    class: 'py',
    values: {
      // values: $spacers,
    },
  }),
  ...make({
    property: 'padding-top',
    class: 'pt',
    values: {
      // values: $spacers
    },
  }),
  ...make({
    // "padding-end": (
    property: 'padding-right',
    class: 'pe',
    values: {
      // values: $spacers
    },
  }),
  ...make({
    property: 'padding-bottom',
    class: 'pb',
    values: {
      // values: $spacers
    },
  }),
  ...make({
    // "padding-start": (
    property: 'padding-left',
    class: 'ps',
    values: {
      // values: $spacers
    },
  }),
  ...make({
    property: 'font-family',
    class: 'font',
    values: {
      // values: (monospace: var(--#{$variable-prefix}font-monospace))
    },
  }),
  ...make({
    property: 'font-size',
    class: 'fs',
    values: {
      // values: $font-sizes
    },
  }),
  ...make({
    property: 'font-style',
    class: 'fst',
    values: {
      italic: 'italic',
      normal: 'normal',
    },
  }),
  ...make({
    property: 'font-weight',
    class: 'fw',
    values: {
      light: (t) => t['font-weight-light'],
      lighter: (t) => t['font-weight-lighter'],
      normal: (t) => t['font-weight-normal'],
      bold: (t) => t['font-weight-bold'],
      bolder: (t) => t['font-weight-bolder'],
    },
  }),
  ...make({
    property: 'line-height',
    class: 'lh',
    // Multiply line-height with font-size for react-native support.
    values: {
      1: (t) => t['font-size-base'],
      sm: (t) => `${t['font-size-sm']} * ${t['line-height-sm']}`,
      base: (t) => `${t['font-size-base']} * ${t['line-height-base']}`,
      lg: (t) => `${t['font-size-lg']} * ${t['line-height-lg']}`,
    },
  }),
  ...make({
    property: 'text-align',
    class: 'text',
    values: {
      start: 'left',
      end: 'right',
      center: 'center',
    },
  }),
  ...make({
    property: 'text-decoration',
    class: 'text',
    values: {
      none: 'none',
      underline: 'underline',
      'line-through': 'line-through',
    },
  }),
  ...make({
    property: 'text-transform',
    class: 'text',
    values: {
      lowercase: 'lowercase',
      uppercase: 'uppercase',
      capitalize: 'capitalize',
    },
  }),
  /* ...make({
    property: 'white-space',
    class: 'text',
    values: {
      wrap: 'normal',
      nowrap: 'nowrap',
    },
  }),
  ...make({
    // property: 'word-wrap word-break,',
    property: 'word-wrap',
    class: 'text',
    values: {
      break: 'break',
      'break-word': 'break-word',
      // rtl: false
    },
  }), */
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
  /* ...make({
    property: 'text-opacity',
    // css-var: true,
    class: 'text-opacity',
    values: {
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
  }), */
  ...make({
    property: 'background-color',
    class: 'bg',
    values: {
      ...UTILITIES_BG_COLORS,
      transparent: 'transparent',
    },
  }),
  ...make({
    property: 'opacity',
    // css-var: true,
    class: 'bg-opacity',
    values: {
      10: '0.1',
      25: '0.25',
      50: '0.50',
      75: '0.75',
      100: '1',
    },
  }),
  /* ...make({
    // scss-docs-end utils-bg-color
    // "gradient": (
    property: 'background-image',
    class: 'bg',
    values: {
      gradient: '',
      // gradient: var(--#{$variable-prefix}gradient)),
    },
  }),
  ...make({
    property: 'user-select',
    class: 'user-select',
    values: {
      all: 'all',
      auto: 'auto',
      none: 'none',
    },
  }),
  ...make({
    property: 'pointer-events',
    class: 'pe',
    values: {
      none: 'none',
      auto: 'auto',
    },
  }), */
  ...make({
    property: 'border-radius',
    class: 'rounded',
    values: {
      null: (t) => t['border-radius'],
      0: '0',
      1: (t) => t['border-radius-sm'],
      2: (t) => t['border-radius'],
      3: (t) => t['border-radius-lg'],
      circle: '50px', // TODO: How to implement 50%?
      pill: (t) => t['border-radius-pill'],
    },
  }),
  // property: border-top-left-radius border-top-right-radius,
  ...make({
    property: 'rounded-top',
    class: 'rounded-top',
    values: {
      // null: (t) => t['border-radius'],
    },
  }),
  ...make({
    property: 'rounded-end',
    class: 'rounded-end',
    values: {
      // null: (t) => t['border-radius'],
    },
  }),
  ...make({
    property: 'rounded-bottom',
    class: 'rounded-bottom',
    values: {
      // null: (t) => t['border-radius'],
    },
  }),
  ...make({
    property: 'rounded-start',
    class: 'rounded-start',
    values: {
      // null: (t) => t['border-radius'],
    },
  }),
  /* ...make({
    property: 'visibility',
    // class: null,
    class: 'visibility',
    values: {
      visible: 'visible',
      invisible: 'hidden',
    },
  }), */
};

export default utilities;
/* NOTE Anton Delete me Later
  ...make({
    property: 'property',
    class: 'classhere',
    values: {
      test: 'test',
    },
  }),

*/
