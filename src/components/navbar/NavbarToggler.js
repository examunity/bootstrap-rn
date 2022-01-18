import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-toggler': css`
    padding-top: $nav-link-padding-y;
    padding-bottom: $nav-link-padding-y;
  `,
  '.navbar-toggler-text': css`
    color: $navbar-dark-color;

    &:hover {
      color: $navbar-dark-active-color;
    }
  `,
});

const NavbarToggler = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.navbar-toggler']);

  const textClasses = getStyles(styles, ['.navbar-toggler-text']);

  return (
    <Pressable
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </Pressable>
  );
});

NavbarToggler.displayName = 'NavbarToggler';
NavbarToggler.propTypes = propTypes;

export default NavbarToggler;
