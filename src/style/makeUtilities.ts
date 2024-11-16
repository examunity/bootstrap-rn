import css from './css';
import { GRID_BREAKPOINTS } from '../theme/proxies';
import utilities from '../theme/utilities';
import { each } from '../utils';
import type { ExtendedStyle, StyleUtility } from '../types';

export function makeUtility(options: StyleUtility) {
  return each(options.values, (key, value) => {
    const name = options.class || options.property;
    const suffix = key === 'null' ? '' : `-${key}`;

    // We use css as a function, because of ts-styled-plugin error.
    //
    // Equivalent code:
    // css`
    //   ${options.property}: ${value};
    // `

    const styles = {
      [`${name}${suffix}`]: css(['', ': ', ';'], options.property, value),
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

        // We use css as a function, because of ts-styled-plugin error.
        //
        // Equivalent code:
        // css`
        //   @include media-breakpoint-up(${breakpoint}) {
        //     ${options.property}: ${value};
        //   }
        // `

        return {
          [`${name}-${breakpoint}${suffix}`]: css(
            ['@include media-breakpoint-up(', ') {\n', ': ', ';\n}'],
            breakpoint,
            options.property,
            value,
          ),
        };
      }),
    };
  });
}

export default function makeUtilities<T extends string>(
  resolve:
    | { [K in T]: StyleUtility }
    | ((u: Record<string, StyleUtility>) => { [K in T]: StyleUtility }),
) {
  const customUtilities =
    typeof resolve === 'function' ? resolve(utilities) : resolve;

  const definitions = Object.values({
    ...utilities,
    ...customUtilities,
  }).reduce(
    (result, utility) => {
      if (!utility) {
        return result;
      }

      return Object.assign(result, makeUtility(utility));
    },
    {} as { [K in T]: ExtendedStyle },
  );

  return definitions;
}
