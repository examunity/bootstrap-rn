import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import Text from '../Text';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  '.popover-body': css`
    padding: $popover-body-padding-y $popover-body-padding-x;
    color: $popover-body-color;
  `,
});

const PopoverBody = (props) => {
  const { children } = props;

  const classes = getStyles(styles, ['.popover-body']);

  return (
    <View style={[classes]}>
      <Text>{children}</Text>
    </View>
  );
};

PopoverBody.propTypes = propTypes;

export default PopoverBody;
