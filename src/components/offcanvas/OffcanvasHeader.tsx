import React, { useContext } from 'react';
import css from '../../style/css';
import StyleSheet from '../../style/StyleSheet';
import View, { ViewProps, ViewRef } from '../View';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import NavbarContext from '../navbar/NavbarContext';

export interface OffcanvasHeaderProps extends ViewProps {}

const styles = StyleSheet.create({
  '.offcanvas-header': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    align-items: center;
    justify-content: space-between;
    padding: $offcanvas-padding-y $offcanvas-padding-x;
  `,
  // Navbar styles
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))} .offcanvas-header`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        display: none;
      }
    `,
  })),
});

const OffcanvasHeader = React.forwardRef<ViewRef, OffcanvasHeaderProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const navbar = useContext(NavbarContext);

    const classes = getStyles(styles, [
      '.offcanvas-header',
      navbar &&
        navbar.expand &&
        `.navbar-expand${
          navbar.expand === true ? '' : `-${navbar.expand}`
        } .offcanvas-header`,
    ]);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        {children}
      </View>
    );
  },
);

OffcanvasHeader.displayName = 'OffcanvasHeader';

export default OffcanvasHeader;
