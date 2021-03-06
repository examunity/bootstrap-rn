import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import Text from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown-item-text': css`
    // display: block;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    color: $dropdown-link-color;
  `,
});

const DropdownTextItem = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;
  const classes = getStyles(styles, ['.dropdown-item-text']);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

DropdownTextItem.displayName = 'DropdownTextItem';
DropdownTextItem.propTypes = propTypes;

export default DropdownTextItem;
