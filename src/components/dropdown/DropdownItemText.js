import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import Text from '../Text';

const propTypes = {
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  '.dropdown-item-text': css`
    // display: block;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    color: $dropdown-link-color;
  `,
});

const DropdownItemText = (props) => {
  const { children } = props;
  const classes = getStyles(styles, ['.dropdown-item-text']);

  return <Text style={[classes]}>{children}</Text>;
};

DropdownItemText.propTypes = propTypes;

export default DropdownItemText;
