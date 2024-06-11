import React, { useContext } from 'react';
import { ScrollView as BaseScrollView } from 'react-native';
import css from '../../style/css';
import StyleSheet from '../../style/StyleSheet';
import ScrollView from '../ScrollView';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import NavbarContext from '../navbar/NavbarContext';

export type OffcanvasBodyProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  contentContainerStyle?: unknown;
};

const styles = StyleSheet.create({
  '.offcanvas-body': css`
    // flex-grow: 1;
    padding: $offcanvas-padding-y $offcanvas-padding-x;
    // overflow-y: auto;
  `,
  // Navbar styles
  ...each(GRID_BREAKPOINTS, (breakpoint: keyof typeof GRID_BREAKPOINTS) => ({
    [`.navbar-expand${infix(next(breakpoint))} .offcanvas-body`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        display: flex;
        flex-grow: 0;
        padding: 0;
        // overflow-y: visible;
      }
    `,
  })),
});

const OffcanvasBody = React.forwardRef<BaseScrollView, OffcanvasBodyProps>(
  (props, ref) => {
    const { children, style, contentContainerStyle, ...elementProps } = props;

    const navbar = useContext(NavbarContext);

    const contentContainerClasses = getStyles(styles, [
      '.offcanvas-body',
      navbar &&
        navbar.expand &&
        `.navbar-expand${
          navbar.expand === true ? '' : `-${navbar.expand}`
        } .offcanvas-body`,
    ]);

    return (
      <ScrollView
        {...elementProps}
        ref={ref}
        style={style}
        contentContainerStyle={[contentContainerClasses, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    );
  },
);

OffcanvasBody.displayName = 'OffcanvasBody';

export default OffcanvasBody;
