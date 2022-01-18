import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.navbar-collapse': css`
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;

    &:hover {
      //text-decoration: if($link-hover-decoration == underline, none, null);
    }
    &:focus {
      //text-decoration: if($link-hover-decoration == underline, none, null);
    }
  `,
});

const NavbarCollapse = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.navbar-collapse']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
