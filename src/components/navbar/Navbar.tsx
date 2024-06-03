import React from 'react';
import type { View as BaseView } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import NavbarText from './NavbarText';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarToggler from './NavbarToggler';
import NavbarContext from './NavbarContext';
import useNavbar from './useNavbar';
import useDismissNavbar from './useDismissNavbar';
import useToggleNavbar from './useToggleNavbar';
import { NavbarExpand, NavbarVariant } from '../../theme/types';

export type NavbarProps = {
  children: React.ReactNode;
  variant?: NavbarVariant;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle: () => void;
  expand: NavbarExpand;
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.navbar': css`
    position: relative;
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap; // allow us to do the line break for collapsing content
    align-items: center;
    justify-content: space-between; // space out brand from logo
    padding-top: $navbar-padding-y;
    padding-right: $navbar-padding-x; // default: null
    padding-bottom: $navbar-padding-y;
    padding-left: $navbar-padding-x; // default: null
    // @include gradient-bg();
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint: keyof typeof GRID_BREAKPOINTS) => ({
    [`.navbar-expand${infix(next(breakpoint))}`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        flex-wrap: nowrap;
        justify-content: flex-start;
      }
    `,
  })),
});

const Navbar = React.forwardRef<BaseView, NavbarProps>((props, ref) => {
  const {
    children,
    variant = 'light',
    defaultExpanded = false,
    expanded,
    onToggle,
    expand,
    style,
    ...elementProps
  } = props;

  const navbar = useNavbar(
    variant,
    defaultExpanded,
    expanded,
    onToggle,
    expand,
  );

  const classes = getStyles(styles, [
    '.navbar',
    expand && `.navbar-expand${expand === true ? '' : `-${expand}`}`,
  ]);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <NavbarContext.Provider value={navbar}>{children}</NavbarContext.Provider>
    </View>
  );
});

Navbar.displayName = 'Navbar';

export default Object.assign(Navbar, {
  Brand: NavbarBrand,
  Text: NavbarText,
  Collapse: NavbarCollapse,
  Toggler: NavbarToggler,
  useDismiss: useDismissNavbar,
  useToggle: useToggleNavbar,
});
