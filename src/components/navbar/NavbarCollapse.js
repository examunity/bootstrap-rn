import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import useForcedContext from '../../hooks/useForcedContext';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import useMedia from '../../hooks/useMedia';
import NavbarContext from './NavbarContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-collapse': css`
    flex-direction: row; // added for bootstyle
    flex-basis: 100%;
    flex-grow: 1;
    // For always expanded or extra full navbars, ensure content aligns itself
    // properly vertically. Can be easily overridden with flex utilities.
    align-items: center;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))} .navbar-collapse`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        display: flex;
        flex-basis: auto;
      }
    `,
  })),
});

const NavbarCollapse = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const { expand, expanded } = useForcedContext(NavbarContext);
  const media = useMedia();

  const classes = getStyles(styles, [
    '.navbar-collapse',
    expand &&
      `.navbar-expand${expand === true ? '' : `-${expand}`} .navbar-collapse`,
  ]);

  const show = expanded || (expand && (expand === true || media.up(expand)));

  if (!show) {
    return null;
  }

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
