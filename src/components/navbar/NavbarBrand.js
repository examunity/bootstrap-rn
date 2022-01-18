import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-brand': css`
    padding-top: $navbar-brand-padding-y;
    padding-bottom: $navbar-brand-padding-y;
    margin-right: $navbar-brand-margin-end;
    //@include font-size($navbar-brand-font-size);
    //text-decoration: if($link-decoration == none, null, none);
    //white-space: nowrap;

    &:hover {
      //text-decoration: if($link-hover-decoration == underline, none, null);
    }
    &:focus {
      //text-decoration: if($link-hover-decoration == underline, none, null);
    }
  `,
});

const NavbarBrand = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.navbargroup']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

NavbarBrand.displayName = 'NavbarBrand';
NavbarBrand.propTypes = propTypes;

export default NavbarBrand;
