import css from '../style/css';
import {
  GRID_BREAKPOINTS,
  BORDER_WIDTHS,
  FONT_SIZES,
  POSITION_VALUES,
  SPACERS,
  THEME_COLORS,
} from './proxies';
import {
  UTILITIES_TEXT_COLORS,
  UTILITIES_BG_COLORS,
  NEGATIVE_SPACERS,
} from './maps';
import { each } from '../utils';

export function makeUtility(options) {
  return each(options.values, (key, value) => {
    const name = options.class || options.property;
    const suffix = key === 'null' ? '' : `-${key}`;

    const styles = {
      [`${name}${suffix}`]: css`
        ${options.property}: ${value};
      `,
    };

    if (!options.responsive) {
      return styles;
    }

    return {
      ...styles,
      ...each(GRID_BREAKPOINTS, (breakpoint) => {
        if (breakpoint === 'xs') {
          return null;
        }

        return {
          [`${name}-${breakpoint}${suffix}`]: css`
            @include media-breakpoint-up(${breakpoint}) {
              ${options.property}: ${value};
            }
          `,
        };
      }),
    };
  });
}

const utilities = {
  ...makeUtility({
    property: 'text-align-vertical',
    class: 'align',
    values: {
      // baseline: 'baseline',
      top: 'top',
      center: 'center', // 'middle',
      bottom: 'bottom',
      // 'text-bottom': 'text-bottom',
      // 'text-top': 'text-top',
    },
  }),
  /* ...makeUtility({
    responsive: true,
    property: 'float',
    values: {
      start: 'left',
      end: 'right',
      none: 'none',
    },
  }), */
  // Opacity utilities
  ...makeUtility({
    property: 'opacity',
    values: {
      0: '0',
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
  }),
  ...makeUtility({
    property: 'overflow',
    values: {
      // auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
  }),
  ...makeUtility({
    responsive: true,
    print: true,
    property: 'display',
    class: 'd',
    values: {
      // inline: 'inline',
      // 'inline-block': 'inline-block',
      // block: 'block',
      // grid: 'grid',
      // table: 'table',
      // 'table-row': 'table-row',
      // 'table-cell': 'table-cell',
      flex: 'flex',
      // 'inline-flex': 'inline-flex',
      none: 'none',
    },
  }),
  ...makeUtility({
    property: 'box-shadow',
    class: 'shadow',
    values: {
      null: (t) => t['box-shadow'],
      sm: (t) => t['box-shadow-sm'],
      lg: (t) => t['box-shadow-lg'],
      none: 'none',
    },
  }),
  ...makeUtility({
    property: 'position',
    values: {
      // static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      // fixed: 'fixed',
      // sticky: 'sticky',
    },
  }),
  ...makeUtility({
    property: 'top',
    values: POSITION_VALUES,
  }),
  ...makeUtility({
    property: 'bottom',
    values: POSITION_VALUES,
  }),
  ...makeUtility({
    property: 'left',
    class: 'start',
    values: POSITION_VALUES,
  }),
  ...makeUtility({
    property: 'right',
    class: 'end',
    values: POSITION_VALUES,
  }),
  /* ...makeUtility({
    property: 'transform',
    class: 'translate-middle',
    values: {
      null: translate(-50%, -50%),
      x: translateX(-50%),
      y: translateY(-50%),
    },
  }), */
  ...makeUtility({
    property: 'border',
    values: {
      null: (t) => `${t['border-width']} solid ${t['border-color']}`,
      0: '0',
    },
  }),
  // TODO: Find a way to write border-top as border-top-width, ...
  /* ...makeUtility({
    property: 'border-top',
    values: {
      null: (t) => `${t['border-width']} solid ${t['border-color']}`,
      0: '0',
    },
  }), */
  /* ...makeUtility({
    property: 'border-right',
    class: 'border-end',
    values: {
      null: (t) => `${t['border-width']} solid ${t['border-color']}`,
      0: '0',
    },
  }), */
  /* ...makeUtility({
    property: 'border-bottom',
    values: {
      null: (t) => `${t['border-width']} solid ${t['border-color']}`,
      0: '0',
    },
  }), */
  /* ...makeUtility({
    property: 'border-left',
    class: 'border-start',
    values: {
      null: (t) => `${t['border-width']} solid ${t['border-color']}`,
      0: '0',
    },
  }), */
  ...makeUtility({
    property: 'border-color',
    class: 'border',
    values: {
      ...THEME_COLORS,
      white: 'white',
    },
  }),
  ...makeUtility({
    property: 'border-width',
    class: 'border',
    values: BORDER_WIDTHS,
  }),
  ...makeUtility({
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
  ...makeUtility({
    property: 'max-width',
    class: 'mw',
    values: {
      100: '100%',
    },
  }),
  ...makeUtility({
    property: 'width',
    class: 'vw',
    values: {
      100: '100vw', // TODO: native support
    },
  }),
  ...makeUtility({
    property: 'min-width',
    class: 'min-vw',
    values: {
      100: '100vw', // TODO: native support
    },
  }),
  ...makeUtility({
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
  ...makeUtility({
    property: 'max-height',
    class: 'mh',
    values: {
      100: '100%',
    },
  }),
  ...makeUtility({
    property: 'height',
    class: 'vh',
    values: {
      100: '100vh', // TODO: native support
    },
  }),
  ...makeUtility({
    property: 'min-height',
    class: 'min-vh',
    values: {
      100: '100vh', // TODO: native support
    },
  }),
  // Flex utilities
  ...makeUtility({
    responsive: true,
    property: 'flex',
    values: {
      fill: '1 1 auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'flex-direction',
    class: 'flex',
    values: {
      row: 'row',
      column: 'column',
      'row-reverse': 'row-reverse',
      'column-reverse': 'column-reverse',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'flex-grow',
    class: 'flex',
    values: {
      'grow-0': '0',
      'grow-1': '1',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'flex-shrink',
    class: 'flex',
    values: {
      'shrink-0': '0',
      'shrink-1': '1',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'flex-wrap',
    class: 'flex',
    values: {
      wrap: 'wrap',
      nowrap: 'nowrap',
      'wrap-reverse': 'wrap-reverse',
    },
  }),
  /* ...makeUtility({
    responsive: true,
    property: 'gap',
    class: 'gap',
    values: SPACERS,
  }), */
  ...makeUtility({
    responsive: true,
    property: 'justify-content',
    values: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      // evenly: 'space-evenly', // TODO: For some reason this is converted into "spacNaNvenly"
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'align-items',
    values: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'align-content',
    values: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      stretch: 'stretch',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'align-self',
    values: {
      auto: 'auto',
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch',
    },
  }),
  /* ...makeUtility({
    responsive: true,
    property: 'order',
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
  // Margin utilities
  ...makeUtility({
    responsive: true,
    property: 'margin',
    class: 'm',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-horizontal',
    class: 'mx',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-vertical',
    class: 'my',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-top',
    class: 'mt',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-right',
    class: 'me',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-bottom',
    class: 'mb',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-left',
    class: 'ms',
    values: {
      ...SPACERS,
      auto: 'auto',
    },
  }),
  // Negative margin utilities
  ...makeUtility({
    responsive: true,
    property: 'margin',
    class: 'm',
    values: NEGATIVE_SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-horizontal',
    class: 'mx',
    values: NEGATIVE_SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-vertical',
    class: 'my',
    values: NEGATIVE_SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-top',
    class: 'mt',
    values: NEGATIVE_SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-right',
    class: 'me',
    values: NEGATIVE_SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-bottom',
    class: 'mb',
    values: NEGATIVE_SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'margin-left',
    class: 'ms',
    values: NEGATIVE_SPACERS,
  }),
  // Padding utilities
  ...makeUtility({
    responsive: true,
    property: 'padding',
    class: 'p',
    values: SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'padding-horizontal',
    class: 'px',
    values: SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'padding-vertical',
    class: 'py',
    values: SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'padding-top',
    class: 'pt',
    values: SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'padding-right',
    class: 'pe',
    values: SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'padding-bottom',
    class: 'pb',
    values: SPACERS,
  }),
  ...makeUtility({
    responsive: true,
    property: 'padding-left',
    class: 'ps',
    values: SPACERS,
  }),
  // Text
  ...makeUtility({
    property: 'font-family',
    class: 'font',
    values: {
      monospace: (t) => t['font-family-monospace'],
    },
  }),
  ...makeUtility({
    rfs: true,
    property: 'font-size',
    class: 'fs',
    values: FONT_SIZES,
  }),
  ...makeUtility({
    property: 'font-style',
    class: 'fst',
    values: {
      italic: 'italic',
      normal: 'normal',
    },
  }),
  ...makeUtility({
    property: 'font-weight',
    class: 'fw',
    values: {
      light: (t) => t['font-weight-light'],
      // lighter: (t) => t['font-weight-lighter'],
      normal: (t) => t['font-weight-normal'],
      bold: (t) => t['font-weight-bold'],
      // bolder: (t) => t['font-weight-bolder'],
    },
  }),
  ...makeUtility({
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
  ...makeUtility({
    responsive: true,
    property: 'text-align',
    class: 'text',
    values: {
      start: 'left',
      end: 'right',
      center: 'center',
    },
  }),
  ...makeUtility({
    property: 'text-decoration',
    class: 'text',
    values: {
      none: 'none',
      underline: 'underline',
      'line-through': 'line-through',
    },
  }),
  ...makeUtility({
    property: 'text-transform',
    class: 'text',
    values: {
      lowercase: 'lowercase',
      uppercase: 'uppercase',
      capitalize: 'capitalize',
    },
  }),
  /* ...makeUtility({
    property: 'white-space',
    class: 'text',
    values: {
      wrap: 'normal',
      nowrap: 'nowrap',
    },
  }), */
  /* ...makeUtility({
    property: ['word-wrap', 'word-break'],
    class: 'text',
    values: {
      break: 'break-word',
    },
    rtl: false,
  }), */
  ...makeUtility({
    property: 'color',
    class: 'text',
    // 'local-vars': { 'text-opacity': 1 },
    values: {
      ...UTILITIES_TEXT_COLORS,
      muted: (t) => t['text-muted'],
      'black-50': (t) => `rgba(${t.black}, 0.5)`,
      'white-50': (t) => `rgba(${t.white}, 0.5)`,
    },
  }),
  ...makeUtility({
    property: 'opacity',
    // 'css-var': true,
    class: 'text-opacity',
    values: {
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
  }),
  ...makeUtility({
    property: 'background-color',
    class: 'bg',
    // 'local-vars': { 'bg-opacity': 1 },
    values: {
      ...UTILITIES_BG_COLORS,
      transparent: 'transparent',
    },
  }),
  ...makeUtility({
    property: 'opacity',
    // 'css-var': true,
    class: 'bg-opacity',
    values: {
      10: '0.1',
      25: '0.25',
      50: '0.50',
      75: '0.75',
      100: '1',
    },
  }),
  /* ...makeUtility({
    property: 'background-image',
    class: 'bg',
    values: {
      gradient: 'var(--#{$variable-prefix}gradient))',
    },
  }), */
  /* ...makeUtility({
    property: 'user-select',
    values: {
      all: 'all',
      auto: 'auto',
      none: 'none',
    },
  }), */
  /* ...makeUtility({
    property: 'pointer-events',
    class: 'pe',
    values: {
      none: 'none',
      auto: 'auto',
    },
  }), */
  ...makeUtility({
    property: 'border-radius',
    class: 'rounded',
    values: {
      null: (t) => t['border-radius'],
      0: '0',
      1: (t) => t['border-radius-sm'],
      2: (t) => t['border-radius'],
      3: (t) => t['border-radius-lg'],
      circle: '500px', // TODO: How to implement 50%?
      pill: (t) => t['border-radius-pill'],
    },
  }),
  // TODO: Support multiple properties for rounded-* utilities.
  /* ...makeUtility({
    property: ['border-top-left-radius', 'border-top-right-radius'],
    class: 'rounded-top',
    values: {
      null: (t) => t['border-radius'],
    },
  }), */
  /* ...makeUtility({
    property: ['border-top-right-radius', 'border-bottom-right-radius'],
    class: 'rounded-end',
    values: {
      null: (t) => t['border-radius'],
    },
  }), */
  /* ...makeUtility({
    property: ['border-bottom-right-radius', 'border-bottom-left-radius'],
    class: 'rounded-bottom',
    values: {
      null: (t) => t['border-radius'],
    },
  }), */
  /* ...makeUtility({
    property: ['border-bottom-left-radius', 'border-top-left-radius'],
    class: 'rounded-start',
    values: {
      null: (t) => t['border-radius'],
    },
  }), */
  /* ...makeUtility({
    property: 'visibility',
    class: 'null',
    values: {
      visible: 'visible',
      invisible: 'hidden',
    },
  }), */
};

export default utilities;
