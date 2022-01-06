import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { GRID_BREAKPOINT_KEYS, GRID_COLUMNS } from '../../theme/constants';
import { getStyles } from '../../utils';

const SIZES = [...Array(GRID_COLUMNS).keys()];

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['auto', ...SIZES]),
  sizeSm: PropTypes.oneOf(['auto', ...SIZES]),
  sizeMd: PropTypes.oneOf(['auto', ...SIZES]),
  sizeLg: PropTypes.oneOf(['auto', ...SIZES]),
  sizeXl: PropTypes.oneOf(['auto', ...SIZES]),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const normalize = (value) =>
  value.reduce((carry, item) => Object.assign(carry, item), {});

const infix = (breakpoint) => {
  if (breakpoint === 'xs') {
    return '';
  }

  return `-${breakpoint}`;
};

const styles = StyleSheet.create({
  ...normalize(
    GRID_BREAKPOINT_KEYS.map((breakpoint) => ({
      [`.col${infix(breakpoint)}`]: css`
        @include media-breakpoint-up(${breakpoint}) {
          flex: 1 0 0%; // Flexbugs #4: https://github.com/philipwalton/flexbugs#flexbug-4
        }
      `,
      [`.col${infix(breakpoint)}-auto`]: css`
        @include media-breakpoint-up(${breakpoint}) {
          flex: 0 0 auto;
          width: auto;
        }
      `,
      ...normalize(
        Array.from({ length: GRID_COLUMNS - 1 }, (_, i) => ({
          [`.col${infix(breakpoint)}-${i + 1}`]: css`
            @include media-breakpoint-up(${breakpoint}) {
              flex: 0 0 auto;
              width: ${((i + 1) / GRID_COLUMNS) * 100}%;
            }
          `,
          [`.offset${infix(breakpoint)}-${i}`]: css`
            @include media-breakpoint-up(${breakpoint}) {
              margin-left: ${(i / GRID_COLUMNS) * 100}%;
            }
          `,
        })),
      ),
    })),
  ),
});

const Col = React.forwardRef((props, ref) => {
  const {
    children,
    size,
    sizeSm,
    sizeMd,
    sizeLg,
    sizeXl,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    `.col-${size.toString()}`,
    sizeSm && `.col-sm-${sizeSm.toString()}`,
    sizeMd && `.col-md-${sizeMd.toString()}`,
    sizeLg && `.col-lg-${sizeLg.toString()}`,
    sizeXl && `.col-xl-${sizeXl.toString()}`,
  ]);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Col.displayName = 'Col';
Col.propTypes = propTypes;

export default Col;
