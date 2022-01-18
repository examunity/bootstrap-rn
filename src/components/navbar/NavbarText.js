import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-text': css`
    padding-top: $nav-link-padding-y;
    padding-bottom: $nav-link-padding-y;
    color: $navbar-light-color;
  `,
});

const NavbarText = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.navbar-text']);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

NavbarText.displayName = 'NavbarText';
NavbarText.propTypes = propTypes;

export default NavbarText;
