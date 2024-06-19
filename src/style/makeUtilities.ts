import css from './css';
import { GRID_BREAKPOINTS } from '../theme/proxies';
import utilities from '../theme/utilities';
import { each } from '../utils';
import type { StyleUtility } from '../types';

export function makeUtility(options: StyleUtility) {
  return each(options.values, (key, value) => {
    const name = options.class || options.property;
    const suffix = key === 'null' ? '' : `-${key}`;

    const rule = `${options.property}: ${value};`;

    const styles = {
      [`${name}${suffix}`]: css`
        ${rule}
      `,
    };

    if (!options.responsive) {
      return styles;
    }

    return {
      ...styles,
      ...each(GRID_BREAKPOINTS, (breakpoint) => {
        if (breakpoint === 'xs') {
          return {};
        }

        return {
          [`${name}-${breakpoint}${suffix}`]: css`
            @include media-breakpoint-up(${breakpoint}) {
              ${rule}
            }
          `,
        };
      }),
    };
  });
}

export default function makeUtilities(
  resolve:
    | Record<string, StyleUtility>
    | ((u: Record<string, StyleUtility>) => StyleUtility),
) {
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
