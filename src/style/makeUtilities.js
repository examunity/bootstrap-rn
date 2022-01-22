import css from './css';
import { GRID_BREAKPOINTS } from '../theme/proxies';
import utilities from '../theme/utilities';
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

export default function makeUtilities(resolve) {
  const customUtilities =
    typeof resolve === 'function' ? resolve(utilities) : resolve;

  const definitions = Object.values({
    ...utilities,
    ...customUtilities,
  }).reduce((result, utility) => {
    if (!utility) {
      return result;
    }

    return Object.assign(result, makeUtility(utility));
  }, {});

  return definitions;
}
