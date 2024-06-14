import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import useForcedContext from '../../hooks/useForcedContext';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import useMedia from '../../hooks/useMedia';
import NavbarContext from './NavbarContext';

export interface NavbarCollapseProps extends ViewProps {}

const styles = StyleSheet.create({
  '.navbar-collapse': css`
    flex-basis: 100%;
    flex-grow: 1;
    // For always expanded or extra full navbars, ensure content aligns itself
    // properly vertically. Can be easily overridden with flex utilities.
    // align-items: center;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint: keyof typeof GRID_BREAKPOINTS) => ({
    [`.navbar-expand${infix(next(breakpoint))} .navbar-collapse`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        flex-direction: row; // added for bootstrap-rn
        display: flex;
        flex-basis: auto;
        align-items: center; // added for bootstrap-rn
      }
    `,
  })),
});

const NavbarCollapse = React.forwardRef<ViewRef, NavbarCollapseProps>(
  (props, ref) => {
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
  },
);

NavbarCollapse.displayName = 'NavbarCollapse';

export default NavbarCollapse;
