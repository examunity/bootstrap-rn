import React from 'react';
import PropTypes from 'prop-types';
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
import toggleNavbar from './toggleNavbar';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['light', 'dark']),
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  expand: PropTypes.oneOf([true, 'sm', 'md', 'lg', 'xl']),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar': css`
    position: relative;
    display: flex;
    flex-wrap: wrap; // allow us to do the line break for collapsing content
    align-items: center;
    justify-content: space-between; // space out brand from logo
    padding-top: $navbar-padding-y;
    padding-right: $navbar-padding-x; // default: null
    padding-bottom: $navbar-padding-y;
    padding-left: $navbar-padding-x; // default: null
    // @include gradient-bg();
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))}`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        flex-wrap: nowrap;
        justify-content: flex-start;
      }
    `,
  })),
});

const Navbar = React.forwardRef((props, ref) => {
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
Navbar.propTypes = propTypes;

Navbar.Brand = NavbarBrand;
Navbar.Text = NavbarText;
Navbar.Collapse = NavbarCollapse;
Navbar.Toggler = NavbarToggler;
Navbar.toggle = toggleNavbar;

export default Navbar;
