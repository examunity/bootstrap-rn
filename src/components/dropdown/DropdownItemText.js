import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import Text from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown-item-text': css`
    // display: block;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
  `,
  '.dropdown-item-text --text': css`
    color: $dropdown-link-color;
  `,
});

const DropdownItemText = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.dropdown-item-text']);
  const textClasses = getStyles(styles, ['.dropdown-item-text --text']);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Text style={[textClasses, textStyle]}>{children}</Text>
    </View>
  );
});

DropdownItemText.displayName = 'DropdownItemText';
DropdownItemText.propTypes = propTypes;

export default DropdownItemText;
