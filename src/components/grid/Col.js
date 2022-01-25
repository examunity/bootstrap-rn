import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { GRID_BREAKPOINTS, GRID_COLUMNS } from '../../theme/proxies';
import { infix } from '../../theme/breakpoints';
import { getStyles, each, makeArray, normalize } from '../../utils';

const sizes = makeArray(GRID_COLUMNS);

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['auto', ...sizes]),
  sizeSm: PropTypes.oneOf(['auto', ...sizes]),
  sizeMd: PropTypes.oneOf(['auto', ...sizes]),
  sizeLg: PropTypes.oneOf(['auto', ...sizes]),
  sizeXl: PropTypes.oneOf(['auto', ...sizes]),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
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
      makeArray(GRID_COLUMNS - 1, (i) => ({
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
