import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import Pressable from '../Pressable';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-text': css`
    padding-top: $nav-link-padding-y;
    padding-bottom: $nav-link-padding-y;
    color: $navbar-dark-color;

    &:hover {
      color: $navbar-dark-active-color;
    }
  `,
});

const NavbarText = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.navbargroup']);

  return (
    <Pressable {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Pressable>
  );
});

NavbarText.displayName = 'NavbarText';
NavbarText.propTypes = propTypes;

export default NavbarText;
