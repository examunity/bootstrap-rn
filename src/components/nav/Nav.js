import React, { useContext } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import NavbarContext from '../navbar/NavbarContext';
import NavContext from './NavContext';
import NavLink from './NavLink';
import TabContext from './TabContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['tabs', 'pills']),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.nav': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    // flex-wrap: wrap; // bootstrap-rn: width will shrink on native with "flex-direction: column;"
    padding-left: 0;
    margin-bottom: 0;
    // list-style: none;
  `,
  '.nav-tabs': css`
    border-bottom-width: $nav-tabs-border-width;
    border-style: solid;
    border-color: $nav-tabs-border-color;
  `,
  // Navbar styles
  '.navbar-nav': css`
    display: flex;
    flex-direction: column; // cannot use "inherit" to get the ".navbar"s value
    padding-left: 0;
    margin-bottom: 0;
    // list-style: none;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))} .navbar-nav`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        flex-direction: row;
      }
    `,
  })),
});

const getRole = (tabbable, navbar) => {
  if (tabbable) {
    return 'tablist';
  }

  if (Platform.OS === 'web' && !navbar) {
    return 'navigation';
  }

  return null;
};

const Nav = React.forwardRef((props, ref) => {
  const { children, variant, style, ...elementProps } = props;

  const navbar = useContext(NavbarContext);
  const tabbable = useContext(TabContext);

  const classes = getStyles(styles, [
    !navbar && '.nav',
    variant === 'tabs' && '.nav-tabs',
    // Navbar styles
    navbar && '.navbar-nav',
    navbar &&
      navbar.expand &&
      `.navbar-expand${
        navbar.expand === true ? '' : `-${navbar.expand}`
      } .navbar-nav`,
  ]);

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={getRole(tabbable, navbar)}
      style={[classes, style]}
    >
      <NavContext.Provider value={{ variant }}>{children}</NavContext.Provider>
    </View>
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Context = NavContext;
Nav.Link = NavLink;

export default Nav;
