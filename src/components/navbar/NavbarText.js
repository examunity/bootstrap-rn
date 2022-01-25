import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-text': css`
    padding-top: $nav-link-padding-y;
    padding-bottom: $nav-link-padding-y;
  `,
  '.navbar-light .navbar-text': css`
    color: $navbar-light-color;
  `,
  '.navbar-dark .navbar-text': css`
    color: $navbar-dark-color;
  `,
});

const NavbarText = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const { variant } = useForcedContext(NavbarContext);

  const classes = getStyles(styles, [
    '.navbar-text',
    `.navbar-${variant} .navbar-text`,
  ]);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

NavbarText.displayName = 'NavbarText';
NavbarText.propTypes = propTypes;

export default NavbarText;
