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
  '.dropdown-item': css`
    width: 100%;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    // clear: both;
    font-weight: $font-weight-normal;
    color: $dropdown-link-color;
    // text-align: inherit;
    // text-decoration: if($link-decoration == none, null, none);
    // white-space: nowrap;
    background-color: transparent;
    border: 0;
  `,
});

const DropdownItem = (props) => {
  const { children } = props;
  const classes = getStyles(styles, ['.dropdown-item']);

  return <View style={[classes]}>{children}</View>;
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;
