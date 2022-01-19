import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import Text from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  '.dropdown-item': css`
    width: 100%;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    clear: both;
    font-weight: $font-weight-normal;
    color: $dropdown-link-color;
    text-align: inherit;
    // text-decoration: if($link-decoration == none, null, none);
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  `,
  '.dropdown-item-text': css`
    display: block;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    color: $dropdown-link-color;
  `,
});

const DropdownItem = (props) => {
  const { children } = props;
  const classes = getStyles(styles, ['.dropdown-item']);
  const contentTextClasses = getStyles(styles, ['.dropdown-item-text']);

  return (
    <View style={[classes]}>
      <Text style={[contentTextClasses]}>{children}</Text>
    </View>
  );
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;
