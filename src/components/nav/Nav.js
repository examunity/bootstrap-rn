import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import NavContext from './NavContext';
import NavLink from './NavLink';
import Tab from './Tab';
import Pill from './Pill';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.nav': css`
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  `,
});

const Nav = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.nav']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Context = NavContext;
Nav.Link = NavLink;
Nav.Tab = Tab;
Nav.Pill = Pill;

export default Nav;
