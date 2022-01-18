import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import NavbarText from './NavbarText';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarToggler from './NavbarToggler';

const propTypes = {
  children: PropTypes.node.isRequired,
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
    //@include gradient-bg();
  `,
});

const Navbar = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.navbar']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Navbar.displayName = 'Navbar';
Navbar.propTypes = propTypes;

Navbar.Brand = NavbarBrand;
Navbar.Text = NavbarText;
Navbar.Collapse = NavbarCollapse;
Navbar.Toggler = NavbarToggler;

export default Navbar;
