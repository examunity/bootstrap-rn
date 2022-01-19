import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  '.dropdown-menu': css`
    min-width: $dropdown-min-width;
    padding: $dropdown-padding-y $dropdown-padding-x;
    margin: 0;
    font-size: $dropdown-font-size;
    color: $dropdown-color;
    text-align: left;
    background-color: $dropdown-bg;
    border: $dropdown-border-width solid $dropdown-border-color;
    border-radius: $dropdown-border-radius;
  `,
});

const DropdownMenu = (props) => {
  const { children } = props;
  const classes = getStyles(styles, ['.dropdown-menu']);
  return <View style={[classes]}>{children}</View>;
};

DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
